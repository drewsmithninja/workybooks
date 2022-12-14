import React, { useState, useEffect } from 'react';
import { Space, Tabs } from 'antd';
import { FaPencilAlt, FaPlusCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import MainLayout from '../../components/layout/MainLayout';
import ADTitle from '../../components/antd/ADTitle';
import ADSelect from '../../components/antd/ADSelect';
import StudentsPage from '../../components/myClassRooms/students/Students';
import AssignmentPage from './myClassRooms/assignment/AssignmentPage';
import Spinner from '../../components/spinner/Spinner';
import ADButton from '../../components/antd/ADButton';
import CreateClassModal from '../../components/modals/CreateClassModal';
import EditClassModal from '../../components/modals/EditClassModal';
import { getClassrooms, setClass } from '../../app/features/classroom/classroomSlice';

function MyClassrooms() {
  const { classes, isLoading } = useSelector((state) => state.classroom);
  const [currentTab, setCurrentTab] = useState('students');
  const [isCreateClassModalOpen, setIsCreateClassModalOpen] = useState(false);
  const [isEditClassModalOpen, setIsEditClassModalOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getClassrooms());
    dispatch(setClass(classes?.list?.[0]));
  }, []);

  const onClassChangeHandler = async (e) => {
    const sc = classes?.list?.find((item) => item?._id === e);
    dispatch(setClass(sc));
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

  const showEditClassModal = (e) => {
    setIsEditClassModalOpen(true);
  };

  const handleEditClassOk = () => {
    setIsEditClassModalOpen(false);
  };

  const handleEditClassCancel = () => {
    setIsEditClassModalOpen(false);
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
      children: <StudentsPage />
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

  const classOptions = classes?.list?.map(({ _id: value, name: label, ...rest }) => ({
    value,
    label,
    ...rest
  }));

  const createClassRoom = <CreateClassModal open={isCreateClassModalOpen} onShow={showCreateClassModal} onOk={handleCreateClassOk} onCancel={handleCreateClassCancel} />;
  const editClassRoom = <EditClassModal open={isEditClassModalOpen} onShow={(e) => showEditClassModal(e)} onOk={handleEditClassOk} onCancel={handleEditClassCancel} />;
  return (
    <MainLayout>
      {createClassRoom}
      {editClassRoom}
      {isLoading ? (
        <Spinner full />
      ) : (
        <div className='p-4 w-full'>
          <div className='py-2'>
            <Space size='large'>
              <ADTitle level={3}>Class</ADTitle>
              <ADSelect className='w-34' defaultValue={classOptions?.[0]} onChange={onClassChangeHandler} options={classOptions} />
              <div className='flex'>
                <ADButton type='text' className='!p-0' onClick={showEditClassModal}>
                  <FaPencilAlt className='text-gray-400 text-lg' />
                </ADButton>
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
      )}
    </MainLayout>
  );
}

export default MyClassrooms;
