import React from 'react';
import { Row, Select, Space, Tabs } from 'antd';
import { FaPencilAlt, FaPlusCircle } from 'react-icons/fa';
import MainLayout from '../../components/layout/MainLayout';
import ADTitle from '../../components/antd/ADTitle';
import Students from '../../components/myClassRooms/students/Students';
import Assignment from '../../components/myClassRooms/assignment/Assignment';

function MyClassrooms() {
  const [currentTab, setCurrentTab] = React.useState('assignment');
  const { Option } = Select;
  const handleChange = (value) => {
    // eslint-disable-next-line no-console
    console.log(`selected ${value}`);
  };

  return (
    <MainLayout>
      <div className='p-4 w-full'>
        <div className='py-2'>
          <Space size='large'>
            <ADTitle level={3}>Class</ADTitle>
            <Select defaultValue='lucy' onChange={handleChange} className='custom-select'>
              <Option value='class3B'>Class 3B</Option>
            </Select>
            <div className='flex'>
              <FaPencilAlt className='text-gray-400 text-lg' />
            </div>
            <div className='flex'>
              <FaPlusCircle className='text-gray-400 text-lg' />
            </div>
          </Space>
        </div>
        <Row gutter={[0, 16]}>
          <Tabs className='ant-custom-tabs' defaultActiveKey={currentTab} onChange={(e) => setCurrentTab(e)}>
            <Tabs.TabPane tab='STUDENTS' key='students'>
              <Students />
            </Tabs.TabPane>
            <Tabs.TabPane tab='ASSIGNMENT' key='assignment'>
              <Assignment />
            </Tabs.TabPane>
            <Tabs.TabPane tab='REPORTS' key='reports'>
              Content of Tab Reports
            </Tabs.TabPane>
          </Tabs>
        </Row>
      </div>
    </MainLayout>
  );
}

export default MyClassrooms;
