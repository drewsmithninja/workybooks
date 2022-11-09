import React, { useState } from 'react';
import { Col, Input, Row } from 'antd';
import ADButton from '../antd/ADButton';
import ADTitle from '../antd/ADTitle';

function NewAssignmentOrCollection({ assign, onCreateClick, itemData }) {
  // const inputRef = useRef(null);
  const [inputVal, setInputval] = useState();

  const handlechange = (e) => {
    // console.log(e.target.value);
    setInputval(e.target.value);
  };

  const onCreateCollection = (e) => {
    //   console.log(inputVal);
    onCreateClick(inputVal);
  };

  return (
    <>
      <ADTitle level={3} className='text-center pb-8'>
        {assign ? 'Assign' : 'Add to Collection'}
      </ADTitle>
      <Row className='pb-8'>
        <Col xs={24} sm={8}>
          <div className='bg-slate-300 h-auto w-[200px] aspect-[3/4]' />
        </Col>
        <Col xs={24} sm={16}>
          <div className='sm:pl-4'>
            <ADTitle level={5}>{assign ? 'Create new Assignment' : 'Add to Collection'}</ADTitle>
            <Row gutter={16} className='py-4' wrap={false}>
              <Col xs={24} flex='auto'>
                <Input type='text' className='w-full flex min-w-full' onChange={handlechange} name='collectionName' />
              </Col>
              <Col xs={24} flex='none'>
                <ADButton type='primary' size='small' className='!rounded-full' onClick={onCreateCollection}>
                  Create
                </ADButton>
              </Col>
            </Row>
            <div className='border border-solid border-black border-x-0 border-t-0' />
            <ADTitle level={5} className='py-4'>
              {`Add to existing ${assign ? 'Assignment' : 'Collection'}`}
            </ADTitle>
            {Array(3)
              .fill('Fractions')
              .map((item, index) => (
                <Row gutter={16} key={index} className='mt-4'>
                  <Col flex='none'>
                    <div className='bg-slate-300 h-auto w-[75px] aspect-[4/3]' />
                  </Col>
                  <Col xs={24} flex='auto' className='flex items-center'>
                    {item}
                  </Col>
                </Row>
              ))}
          </div>
        </Col>
      </Row>
    </>
  );
}

export default NewAssignmentOrCollection;
