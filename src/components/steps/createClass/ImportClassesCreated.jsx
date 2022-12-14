import React from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import ADButton from '../../antd/ADButton';
import ADTitle from '../../antd/ADTitle';

export default function ImportClassesCreated({ prev, onClose }) {
  const { currentClass } = useSelector((state) => state.classroom);
  const { students } = useSelector((state) => state.students);

  return (
    <div className='flex flex-col items-center'>
      <ADTitle level={2}>Classroom(s) created</ADTitle>
      <div className='py-4 text-dark text-lg my-16 text-center'>2 Classrooms and 40 students have been imported to Workybooks</div>
      <ADButton size='large' type='primary' className='w-1/3' onClick={onClose}>
        Close
      </ADButton>
    </div>
  );
}
