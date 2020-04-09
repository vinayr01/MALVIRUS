import React from 'react';

import { Routes, Route, useLocation, Link } from 'react-router-dom';

import { Layout, Menu } from 'antd';
import { BarsOutlined, DiffFilled } from '@ant-design/icons';

import logo from './logo.png';

import IndexList from './pages/IndexList';
import Index from './pages/Index';
import CallList from './pages/CallList';
import Call from './pages/Call';

import './App.css';

const { Header, Content, Footer } = Layout;

function App() {
  const { pathname } = useLocation();
  const idx = pathname.indexOf('/', 1);
  const prefix = idx === -1 ? pathname : pathname.substr(0, idx);
  return (
    <Layout className="layout">
      <Header>
        <div className="logo">
          <img
            src={logo}
            alt="Bio-AlgoLab logo"
            style={{ height: '100%', verticalAlign: 'top' }}
          />
          <div
            style={{
              padding: '0 1em',
              display: 'inline-block',
              fontSize: '1.75em',
              fontWeight: 800,
              lineHeight: '64px',
              backgroundColor: '#19284B',
              color: '#fff',
            }}
          >
            MALVA
          </div>
        </div>
        <Menu theme="dark" mode="horizontal" selectedKeys={[prefix]}>
          <Menu.Item key="/index">
            <Link to="/index">
              <BarsOutlined /> Index
            </Link>
          </Menu.Item>
          <Menu.Item key="/calls">
            <Link to="/calls">
              <DiffFilled /> Variant calls
            </Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content>
        <div className="site-layout-content">
          <Routes>
            <Route path="index" element={<IndexList />} />
            <Route path="index/:id" element={<Index />} />
            <Route path="calls" element={<CallList />} />
            <Route path="calls/:id" element={<Call />} />
            <Route path="*" to="calls" />
          </Routes>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>MALVA ©2018 - Bio-AlgoLab</Footer>
    </Layout>
  );
}

export default App;