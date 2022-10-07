import { Button, Typography } from 'antd';
import React from 'react';

import googleIcon from '../../assets/images/google-icon.png';
import cleverIcon from '../../assets/images/clever-icon.png';

function MainContent({ setIsImport, setIsManual, setManualStep }) {
  return (
    <>
      <Typography.Title level={1} className='!text-2xl md:!text-2xl mt-[30px] text-center'>
        Create Classroom
      </Typography.Title>
      <Typography.Title level={5} className='!font-normal !mt-[16px] !mb-[76px] !text-[14px] text-center'>
        How would you like to create your
        <br />
        classroom
      </Typography.Title>
      <div className='flex flex-col gap-[14px] pb-[37px]'>
        <Button className='w-[85%] max-w-[358px] h-[60px] m-auto rounded-[6px]' onClick={() => setIsImport(true)}>
          <img src={googleIcon} width='24' alt='googleIcon' className='mr-[8px]' />
          Import from Google Classroom
        </Button>
        <Button className='w-[85%] max-w-[358px] h-[60px] m-auto rounded-[6px]' onClick={() => setIsImport(true)}>
          <img src={cleverIcon} width='24' alt='cleverIcon' className='mr-[8px]' />
          Import from Clever
        </Button>
        <Button className='w-[85%] max-w-[358px] h-[60px] m-auto rounded-[6px]' onClick={() => setIsImport(true)}>
          Import an excel file
        </Button>
        <Button
          className='w-[85%] max-w-[358px] h-[60px] m-auto rounded-[6px]'
          onClick={() => {
            setManualStep(1);
            setIsManual(true);
          }}
        >
          Create Manually
        </Button>
      </div>
    </>
  );
}

export default MainContent;
