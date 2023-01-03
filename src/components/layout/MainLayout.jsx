import { Layout } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetSelectedWorksheets } from '../../app/features/worksheet/worksheetSlice';
import FileUtils from '../common/FileUtils';
import Headers from '../common/Headers';
import SearchBar from '../common/SearchBar';

const { Content } = Layout;

function MainLayout({ children, className }) {
  const selectedWorksheets = useSelector((state) => state.worksheet.selectedWorksheets);
  const [showMultiple, setShowMultiple] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetSelectedWorksheets());
  }, []);

  useEffect(() => {
    setShowMultiple(selectedWorksheets?.length);
  }, [selectedWorksheets]);

  return (
    <Layout className={`${className ?? ''}`}>
      <Headers />
      {user && <SearchBar />}
      <Content className="bg-white">{children}</Content>
      {showMultiple > 0 && <FileUtils show={showMultiple > 0} />}
    </Layout>
  );
}

export default MainLayout;
