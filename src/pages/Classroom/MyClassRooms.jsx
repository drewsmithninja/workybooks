import React from 'react';
import { Row, Select, Space, Tabs } from 'antd';
import { FaPencilAlt, FaPlusCircle } from 'react-icons/fa';
import MainLayout from '../../components/layout/MainLayout';
import ADTitle from '../../components/antd/ADTitle';
import StudentsPage from '../../components/myClassRooms/students/Students';
import AssignmentPage from './myClassRooms/assignment/AssignmentPage';

function MyClassrooms() {
  const { Option } = Select;
  const handleChange = (value) => {};

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
        <Tabs defaultActiveKey='2'>
          <Tabs.TabPane tab='Students' key='1'>
            <StudentsPage />
          </Tabs.TabPane>
          <Tabs.TabPane tab='Assignment' key='2'>
            <AssignmentPage />
          </Tabs.TabPane>
          <Tabs.TabPane tab='Reports' key='3'>
            <ADTitle level={4}>Report content will go here...</ADTitle>
          </Tabs.TabPane>
        </Tabs>
      </div>
    </MainLayout>
  );
}

export default MyClassrooms;
