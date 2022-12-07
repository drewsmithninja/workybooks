import React from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import ADButton from '../../antd/ADButton';
import ADTitle from '../../antd/ADTitle';
import { resetNewStudents } from '../../../app/features/students/studentsSlice';

export default function ManualClassCreated({ prev, onOk }) {
  const { currentClass } = useSelector((state) => state.classroom);
  const { newStudents } = useSelector((state) => state.students);
  const dispatch = useDispatch();

  const onCloseHandler = async () => {
    await onOk();
    dispatch(resetNewStudents());
  };

  return (
    <div className='flex flex-col items-center'>
      <ADTitle level={2}>Classroom created</ADTitle>
      <div className='py-4 text-dark text-lg my-16 text-center'>
        {`Classroom ( ${currentClass?.classroom?.name} ) with ${newStudents?.student?.students} ${newStudents?.student?.students === 1 ? ' student' : 'students'}`}
        <br />
        has been created
      </div>
      <ADButton size='large' type='primary' className='w-1/3' onClick={onCloseHandler}>
        Close
      </ADButton>
    </div>
  );
}
