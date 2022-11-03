import { Radio } from 'antd';
import React from 'react';
import { grades } from '../../utils/appData';

function GradeComponent({ activeGrade = '3', gradeList = [], getGrade }) {
  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    getGrade(e.target.value);
    e.preventDefault();
  //  setValue(e.target.value);
  };
  return (
    <div className='flex items-center justify-center pt-[20px]'>
      <span className='font-normal text-sm sm:pr-[20px]'>Grade</span>
      <Radio.Group defaultValue={activeGrade} onChange={onChange} size='small' buttonStyle='solid' className='h-[60px] sm:h-auto flex flex-wrap sm:!max-w-full max-w-[320px] items-center justify-center'>
        {gradeList?.map((item, index) => (
          <Radio.Button value={`${item.title}`} key={`${item.title}`} className='mr-[10px] w-[58px] h-[25px] bg-[#D9D9D9] !rounded-[60px] text-xs text-center border-0 mb-[0px] sm:mb-0'>
            {item.title}
          </Radio.Button>
        ))}
      </Radio.Group>
    </div>
  );
}

export default GradeComponent;
