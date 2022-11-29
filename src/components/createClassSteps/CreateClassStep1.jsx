import React from 'react';
import { Space } from 'antd';
import ADButton from '../antd/ADButton';
import ADTitle from '../antd/ADTitle';

function CreateClassStep1({ next, prev }) {
  return (
    <div className='flex flex-col items-center'>
      <ADTitle level={2}>Create Classroom</ADTitle>
      <div className='py-4 text-dark text-lg'>How would you like to create your classroom</div>
      <Space className='py-8' size='middle' direction='vertical'>
        <ADButton size='large' block>
          Import from Google classRoom
        </ADButton>
        <ADButton size='large' block>
          Import from Clever
        </ADButton>
        <ADButton size='large' block>
          Import an Excel file
        </ADButton>
        <ADButton size='large' block onClick={next}>
          Create manually
        </ADButton>
      </Space>
    </div>
  );
}

export default CreateClassStep1;
