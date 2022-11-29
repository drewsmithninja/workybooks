import { Layout } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import FileUtils from '../common/FileUtils';
import Headers from '../common/Headers';
import SearchBar from '../common/SearchBar';

const { Content } = Layout;

function MainLayout({ children, className }) {
  const user = JSON.parse(localStorage.getItem('user'));
  const { collections } = useSelector((state) => state);
  const [showPrint, setShowPrint] = useState(0);
  useEffect(() => {
    setShowPrint(collections?.selectedCollections?.length);
  }, [collections]);
  return (
    <Layout className={`${className ?? ''}`}>
      <Headers />
      {user && <SearchBar />}
      <Content className='bg-white'>{children}</Content>
      {showPrint > 0 && <FileUtils show={showPrint > 0} />}
    </Layout>
  );
}

export default MainLayout;
