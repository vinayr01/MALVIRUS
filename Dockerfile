FROM node:12.16.1-alpine as build-frontend
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY frontend/package.json ./
COPY frontend/yarn.lock ./
RUN yarn install --frozen-lockfile
COPY frontend ./
RUN rm public/help
COPY help/ ./public/help
RUN yarn run build


FROM tiangolo/uwsgi-nginx-flask:python3.7 as build-software
WORKDIR /software-build

RUN apt-get update && apt-get install -y --no-install-recommends cmake

RUN git clone --recursive --branch malvirus --shallow-submodules https://github.com/AlgoLab/malva.git

RUN cd malva && git pull && git checkout 7f45bedd74e530d34199cf7317b2fa8f911213f4

RUN cd malva/sdsl-lite && \
    ./install.sh /software
RUN cd malva/KMC && \
    make -j4
RUN cd malva/htslib && \
    autoreconf -i -f && \
    ./configure --disable-libcurl --disable-lzma --disable-bz2 --prefix=/software && \
    make -j4 && \
    make install

COPY ./patches/malva/ /software-build/malva/
RUN cd malva && \
    make && \
    cp malva-geno /software/bin

COPY ./software/ /software/


FROM tiangolo/uwsgi-nginx-flask:python3.7 as download-jobs
WORKDIR /jobs
RUN git clone https://github.com/AlgoLab/MALVIRUS-data.git .



FROM tiangolo/uwsgi-nginx-flask:python3.7

RUN wget --quiet https://repo.anaconda.com/miniconda/Miniconda3-py37_4.8.2-Linux-x86_64.sh -O ~/miniconda.sh && \
    /bin/bash ~/miniconda.sh -b -p /opt/conda && \
    rm ~/miniconda.sh && \
    /opt/conda/bin/conda clean -tipsy && \
    ln -s /opt/conda/etc/profile.d/conda.sh /etc/profile.d/conda.sh && \
    echo ". /opt/conda/etc/profile.d/conda.sh" >> ~/.bashrc && \
    echo "conda activate base" >> ~/.bashrc

ENV PATH /opt/conda/bin:$PATH

COPY ./environment.yml environment.yml
RUN conda env create -f environment.yml
RUN echo "conda activate malva-env" >> ~/.profile

# Clean conda packages
RUN find /opt/conda/ -follow -type f -name '*.a' -delete && \
    find /opt/conda/ -follow -type f -name '*.js.map' -delete && \
    /opt/conda/bin/conda clean -afy

# Remove unused packages
RUN apt-get remove -y \
     tcl x11-common g++ gcc gcc-6 cpp cpp-6 subversion mysql-common && \
   apt-get autoremove -y


RUN echo "PATH=/software/bin:$PATH" >> ~/.bashrc
COPY --from=build-frontend /app/build /static
COPY --from=build-software /software /software
COPY --from=download-jobs /jobs /jobs
COPY flask /app
COPY snakemake /snakemake
VOLUME [ "/jobs" ]
