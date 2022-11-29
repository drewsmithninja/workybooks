import React, { useState, useEffect } from 'react';
import { Space, Tabs } from 'antd';
import { FaPencilAlt, FaPlusCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import MainLayout from '../../components/layout/MainLayout';
import ADTitle from '../../components/antd/ADTitle';
import ADSelect from '../../components/antd/ADSelect';
import StudentsPage from '../../components/myClassRooms/students/Students';
import AssignmentPage from './myClassRooms/assignment/AssignmentPage';
import { getClassRoomOptions } from '../../app/features/classRoom/classRoomSlice';
import { getStudents } from '../../app/features/students/studentsSlice';
import Fallback from '../../components/fallback/Fallback';
import Spinner from '../../components/spinner/Spinner';
import ADButton from '../../components/antd/ADButton';
import CreateClassModal from '../../components/modals/CreateClassModal';

function MyClassrooms() {
  const dispatch = useDispatch();
  const [classRoomsOptions, setClassRoomsOptions] = useState([
    {
      value: '',
      label: 'All'
    }
  ]);
  const [currentTab, setCurrentTab] = useState('students');
  const [isCreateClassModalOpen, setIsCreateClassModalOpen] = useState(false);
  const { classes, isError, isLoading, isSuccess } = useSelector((state) => state.classRoom);
  const [selectedClass, setSelectedClass] = useState(null);
  useEffect(() => {
    dispatch(getClassRoomOptions());
    setClassRoomsOptions(classes?.collection);
  }, []);

  const handleChange = async (e) => {
    await dispatch(getStudents(e));
    await setSelectedClass(e);
  };

  const showCreateClassModal = () => {
    setIsCreateClassModalOpen(true);
  };

  const handleCreateClassOk = () => {
    setIsCreateClassModalOpen(false);
  };

  const handleCreateClassCancel = () => {
    setIsCreateClassModalOpen(false);
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

  const classOptions = classRoomsOptions.map(({ _id: value, name: label, ...rest }) => ({
    value,
    label,
    ...rest
  }));

  const updatedClassOptions = [
    {
      value: '',
      label: 'All'
    },
    ...classOptions
  ];
  const createClassRoom = <CreateClassModal open={isCreateClassModalOpen} onShow={showCreateClassModal} onOk={handleCreateClassOk} onCancel={handleCreateClassCancel} />;
  return (
    <MainLayout>
      {createClassRoom}
      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <Fallback />
      ) : (
        isSuccess &&
        classes?.collection?.length && (
          <div className='p-4 w-full'>
            <div className='py-2'>
              <Space size='large'>
                <ADTitle level={3}>Class</ADTitle>
                <ADSelect
                  className='w-34'
                  defaultValue={updatedClassOptions[0]} // initially load with all class students
                  onChange={handleChange}
                  options={updatedClassOptions}
                />
                <div className='flex'>
                  <FaPencilAlt className='text-gray-400 text-lg' />
                </div>
                <div className='flex'>
                  <ADButton type='text' className='!p-0' onClick={showCreateClassModal}>
                    <FaPlusCircle className='text-gray-400 text-lg' />
                  </ADButton>
                </div>
              </Space>
            </div>
            <Tabs onChange={tabChangeHandler} activeKey={currentTab} items={tabItems} />
          </div>
        )
      )}
    </MainLayout>
  );
}

export default MyClassrooms;
