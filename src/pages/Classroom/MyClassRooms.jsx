import React, { useState, useEffect } from 'react';
import { Select, Space, Tabs } from 'antd';
import { FaPencilAlt, FaPlusCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import MainLayout from '../../components/layout/MainLayout';
import ADTitle from '../../components/antd/ADTitle';
import StudentsPage from '../../components/myClassRooms/students/Students';
import AssignmentPage from './myClassRooms/assignment/AssignmentPage';
import { getStudents } from '../../app/features/students/studentsSlice';

function MyClassrooms() {
  const { Option } = Select;
  const dispatch = useDispatch();
  const [currentTab, setCurrentTab] = useState('students');
  const [studentList, setStudentList] = useState([]);
  const students = useSelector((state) => state.students);

  const handleChange = (value) => {};

  useEffect(() => {
    dispatch(getStudents());
  }, []);

  const tabChangeHandler = (e) => {
    if (e === 'students') {
      setCurrentTab(e);
      // dispatch(getStudents()).unwrap().then(setStudentList(students));
    } else if (e === 'assignment') {
      setCurrentTab(e);
      // dispatch(favoriteData());
    } else if (e === 'reports') {
      setCurrentTab(e);
      // dispatch(recentList());
    }
  };
  console.log(students, 'students');

  const tabItems = [
    {
      label: 'students',
      key: 'students',
      children: <StudentsPage studentList={studentList} />
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
      {students.isLoading && 'Loading...'}
      {!students.isLoading && students.isError && 'Getting Some Error'}
      {!students.isLoading && students.length ? <div>Hello</div> : null}
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
        <Tabs onChange={tabChangeHandler} activeKey={currentTab} items={tabItems} />
      </div>
    </MainLayout>
  );
}

export default MyClassrooms;
