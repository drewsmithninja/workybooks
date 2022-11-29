import { ArrowLeftOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import React from 'react';
import ADButton from '../antd/ADButton';
import ADTitle from '../antd/ADTitle';

function CreateClassStep3({ next, prev, onCancel }) {
  return (
    <div className='flex flex-col items-center'>
      {prev && <ArrowLeftOutlined onClick={prev} />}
      <ADTitle level={2}>Classroom(s) created</ADTitle>
      <div className='py-4 text-dark text-lg my-16 text-center'>
        2 Classrooms and 40 students have
        <br />
        been imported to Workybooks
      </div>
      <ADButton size='large' type='primary' className='w-1/3' onClick={onCancel}>
        Close
      </ADButton>
    </div>
  );
}

export default CreateClassStep3;
