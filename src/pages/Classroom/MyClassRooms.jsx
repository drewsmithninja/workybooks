/* eslint-disable no-debugger */
import React, { useState, useEffect } from 'react';
import { Space, Tabs } from 'antd';
import { FaPencilAlt, FaPlusCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
import { getAssignments } from '../../app/features/assignment/assignmentSlice';
import { getStudents } from '../../app/features/students/studentsSlice';

function MyClassrooms() {
  const { classes, isLoading, currentClass } = useSelector((state) => state.classroom);

  const [currentTab, setCurrentTab] = useState('students');
  const [isCreateClassModalOpen, setIsCreateClassModalOpen] = useState(false);
  const [isEditClassModalOpen, setIsEditClassModalOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getClassrooms());
  }, []);

  const onClassChangeHandler = async (e) => {
    const sc = await classes?.list?.find((item) => item?._id === e);
    await dispatch(setClass(await sc));
    if ((await currentTab) === 'students') {
      dispatch(getStudents(sc?._id));
    }
    if ((await currentTab) === 'assignment') {
      dispatch(getAssignments(sc?._id));
    }
  };

  const showCreateClassModal = () => {
    setIsCreateClassModalOpen(true);
  };

  const handleCreateClassOk = async () => {
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

  const tabChangeHandler = async (e) => {
    if (e === 'students') {
      setCurrentTab(e);
      await dispatch(getStudents(await currentClass?._id));
    } else if (e === 'assignment') {
      setCurrentTab(e);
      await dispatch(getAssignments(await currentClass?._id));
    } else if (e === 'reports') {
      setCurrentTab(e);
      // dispatch(getReports());
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

  const classOptions = classes?.list?.length
    ? classes?.list?.map(({ _id: value, name: label, ...rest }) => ({
        value,
        label,
        ...rest
      }))
    : [
        {
          value: '',
          label: 'No Class'
        }
      ];

  const createClassRoom = <CreateClassModal closable={false} open={isCreateClassModalOpen} onShow={showCreateClassModal} onOk={handleCreateClassOk} onCancel={handleCreateClassCancel} />;
  const editClassRoom = <EditClassModal closable={false} open={isEditClassModalOpen} onShow={(e) => showEditClassModal(e)} onOk={handleEditClassOk} onCancel={handleEditClassCancel} />;

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
              <ADSelect className='w-32' defaultValue={classOptions?.[0] ?? 'No Class'} onChange={onClassChangeHandler} options={classOptions} />
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
