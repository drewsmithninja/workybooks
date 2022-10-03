import { Typography } from 'antd';
import React from 'react';

import printIcon from '../../assets/images/icons/print.png';
import folderIcon from '../../assets/images/icons/folder.png';
import assignIcon from '../../assets/images/icons/assign.png';
import shareIcon from '../../assets/images/icons/share.png';

function FileUtils({
  show = false
}) {
  return (
    <div className={`w-full fixed ${show ? 'show-print-box' : 'hide-print-box'} h-[54px] text-center block flex items-center justify-center bottom-print`}>
      <div className='w-full max-w-[536px] flex h-[54px] bg-blue-800 rounded-[27px] items-center justify-center px-[30px]'>
        <div className='w-full h-full flex flex-row justify-between'>
          <div className='border-white flex items-center justify-center gap-[10px]'>
            <img src={printIcon} alt='print' />
            <Typography.Text className='font-normal text-white'>
              PRINT
            </Typography.Text>
          </div>
          <div className='border-white flex items-center justify-center gap-[10px]'>
            <img src={assignIcon} alt='print' />
            <Typography.Text className='font-normal text-white'>
              ASSIGN
            </Typography.Text>
          </div>
          <div className='border-white flex items-center justify-center gap-[10px]'>
            <img src={folderIcon} alt='print' />
            <Typography.Text className='font-normal text-white'>
              ADD TO COLLECTION
            </Typography.Text>
          </div>
          <div className='border-white flex items-center justify-center gap-[10px]'>
            <img src={shareIcon} alt='print' />
            <Typography.Text className='font-normal text-white'>
              SHARE
            </Typography.Text>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FileUtils;
