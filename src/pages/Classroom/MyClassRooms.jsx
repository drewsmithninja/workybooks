import React, { useState, useEffect } from 'react';
import { Select, Space, Tabs } from 'antd';
import { FaPencilAlt, FaPlusCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import MainLayout from '../../components/layout/MainLayout';
import ADTitle from '../../components/antd/ADTitle';
import StudentsPage from '../../components/myClassRooms/students/Students';
import AssignmentPage from './myClassRooms/assignment/AssignmentPage';
import { getClassRoomOptions } from '../../app/features/classRoom/classRoomSlice';
import { getStudents } from '../../app/features/students/studentsSlice';

function MyClassrooms() {
  const { Option } = Select;
  const dispatch = useDispatch();
  const [classRoomsOptions, setClassRoomsOptions] = useState([]);
  const [currentTab, setCurrentTab] = useState('students');
  const classes = useSelector((state) => state.classRoom);
  const [selectedClass, setSelectedClass] = useState(null);

  useEffect(() => {
    dispatch(getClassRoomOptions());
    setClassRoomsOptions(classes?.classes.collection);
  }, []);

  const handleChange = (e) => {
    dispatch(getStudents(e));
    setSelectedClass(e);
  };

  const tabChangeHandler = (e) => {
    if (e === 'students') {
      setCurrentTab(e);
    } else if (e === 'assignment') {
      setCurrentTab(e);
      // dispatch(favoriteData());
    } else if (e === 'reports') {
      setCurrentTab(e);
      // dispatch(recentList());
    }
  };

  const tabItems = [
    {
      label: 'students',
      key: 'students',
      children: <StudentsPage classId={selectedClass} />
    },
    {
      label: 'assignment',
      key: 'assignment',
      children: <AssignmentPage />
    },
    {
      label: 'reports',
      key: 'reports',
      children: <ADTitle level={4}>Report content will go here...</ADTitle>
    }
  ];

  return (
    <MainLayout>
      <div className='p-4 w-full'>
        <div className='py-2'>
          <Space size='large'>
            <ADTitle level={3}>Class</ADTitle>
            <Select defaultValue='-' onChange={handleChange} className='custom-select'>
              {classRoomsOptions.length ? (
                classRoomsOptions.map((option) => (
                  <Option key={option._id} value={option._id}>
                    {option.name}
                  </Option>
                ))
              ) : (
                <Option value='-' disabled>
                  No Class Options
                </Option>
              )}
            </Select>
            <div className='flex'>
              <FaPencilAlt className='text-gray-400 text-lg' />
            </div>
            <div className='flex'>
              <FaPlusCircle className='text-gray-400 text-lg' />
            </div>
          </Space>
        </div>
        <Tabs onChange={tabChangeHandler} activeKey={currentTab} items={tabItems} />
      </div>
    </MainLayout>
  );
}

export default MyClassrooms;
