import React, { useState } from 'react';
import { Space } from 'antd';
import ADButton from '../antd/ADButton';
import ADTitle from '../antd/ADTitle';

export default function CreateClassStep1({ onGoogleClick, onCleverClick, onExcelClick, onManualClick }) {
  return (
    <div className='flex flex-col items-center'>
      <ADTitle level={2}>Create Classroom</ADTitle>
      <div className='py-4 text-dark text-lg text-center'>How would you like to create your classroom</div>
      <Space className='py-8' size='middle' direction='vertical'>
        <ADButton size='large' block onClick={onGoogleClick}>
          Import from Google classroom
        </ADButton>
        <ADButton size='large' block onClick={onCleverClick}>
          Import from Clever
        </ADButton>
        <ADButton size='large' block onClick={onExcelClick}>
          Import an Excel file
        </ADButton>
        <ADButton size='large' block onClick={onManualClick}>
          Create manually
        </ADButton>
      </Space>
    </div>
  );
}
