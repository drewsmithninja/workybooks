import React from 'react';
import { Row, Select, Space, Tabs } from 'antd';
import { FaPencilAlt, FaPlusCircle } from 'react-icons/fa';
import MainLayout from '../../components/layout/MainLayout';
import ADTitle from '../../components/antd/ADTitle';
import StudentsPage from '../../components/myClassRooms/students/Students';
import ADTabs from '../../components/antd/ADTabs';
import AssignmentPage from './myClassRooms/assignment/AssignmentPage';

function MyClassrooms() {
  // const [currentTab, setCurrentTab] = React.useState('students');
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
          <ADTabs
            elements={[
              {
                tabTitle: 'Students',
                tabBody: <StudentsPage />,
                path: 'students'
              },
              {
                tabTitle: 'Assignment',
                tabBody: <AssignmentPage />,
                path: 'assignment'
              },
              {
                tabTitle: 'Report',
                tabBody: <h3>Report Content...</h3>,
                path: 'report'
              }
            ]}
          />
        </Row>
      </div>
    </MainLayout>
  );
}

export default MyClassrooms;
