import React, { useCallback, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import {
  Form,
  Input,
  Button,
  Upload,
  Space,
  message,
  Modal,
  InputNumber,
} from 'antd';

import { UploadOutlined } from '@ant-design/icons';

import { normFile, getFalse } from 'utils';

function VcfNew({ createVcf }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onFinish = useCallback(
    ({ file, ...values }) => {
      new Promise((resolve, reject) => {
        setLoading(true);
        const params = {
          ...values,
          filetype: 'fasta',
        };
        createVcf(file[0], params, resolve, reject);
      }).then(
        (vcf) => {
          setLoading(false);
          message.success('Job submission successful!');
          navigate(`../${vcf.id}`);
        },
        (error) => {
          setLoading(false);
          Modal.error({
            title: 'Error during job submission',
            content: error.toString(),
          });
        }
      );
    },
    [createVcf, navigate]
  );

  const onClickCancel = useCallback(() => navigate(-1), [navigate]);
  return (
    <>
      <h1>Create a new reference VCF from genomic sequences</h1>
      <Form
        initialValues={{ cores: 4 }}
        layout="vertical"
        name="newvcf"
        onFinish={onFinish}
      >
        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message:
                'Please provide a brief description of the set of genomic sequences!',
            },
          ]}
          extra="A brief description of the file, so that you can retrieve it in the future"
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="file"
          label="Genomic sequences (FASTA)"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[
            {
              required: true,
              message: 'Please select a set of genomic sequences!',
            },
          ]}
        >
          <Upload name="file" beforeUpload={getFalse}>
            <Button icon={<UploadOutlined />}>Select file</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          label="Number of cores"
          name="cores"
          rules={[
            {
              required: true,
              message: 'Please provide a valid number!',
            },
          ]}
          extra="The number of cores that can be used during the construction of the reference VCF"
        >
          <InputNumber min={1} type="number" />
        </Form.Item>

        <div style={{ textAlign: 'center' }}>
          <Space>
            <Button type="primary" htmlType="submit" loading={loading}>
              Submit
            </Button>
            <Button type="default" onClick={onClickCancel}>
              Cancel
            </Button>
          </Space>
        </div>
      </Form>
    </>
  );
}

export default VcfNew;
