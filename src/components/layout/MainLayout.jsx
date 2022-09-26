import { Layout } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import Headers from '../common/Headers';
import SearchBar from '../common/SearchBar';

const { Content } = Layout;

function MainLayout({ children }) {
  const {
    user = {}
  } = useSelector((state) => state);
  return (
    <Layout>
      <Headers />
      {user.loggedIn && <SearchBar />}
      <Content className='min-h-[90vh]'>{ children }</Content>
    </Layout>
  );
}

export default MainLayout;
