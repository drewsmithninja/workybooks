import React, { useState } from 'react';
import { Col, Input, Row } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import ADButton from '../antd/ADButton';
import ADTitle from '../antd/ADTitle';
import { updateCollection } from '../../features/collection/collectionSlice';

function NewAssignmentOrCollection({ assign, onCreateClick, selectedWorksheet }) {
  // const inputRef = useRef(null);
  const [inputVal, setInputVal] = useState();
  const { favoriteList, myCollectionData, recentData } = useSelector((state) => state.library);
  const myCollectionList = myCollectionData?.data?.list;
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputVal(e.target.value);
  };

  const onCreateCollection = (e) => {
    onCreateClick(inputVal);
  };

  const addCollectionHandler = (e) => {
    const data = {
      collectionId: e,
      worksheetId: selectedWorksheet?._id,
      favorite: false
    };
    dispatch(updateCollection(data));
  };

  return (
    <>
      <ADTitle level={3} className='text-center pb-8'>
        {assign ? 'Assign' : 'Add to Collection'}
      </ADTitle>
      <Row className='pb-8'>
        <Col xs={24} sm={8}>
          <div className='bg-slate-300 h-auto w-[200px] aspect-[3/4] rounded-lg' />
        </Col>
        <Col xs={24} sm={16}>
          <div className='sm:pl-4'>
            <ADTitle level={5}>{assign ? 'Create new Assignment' : 'Add to Collection'}</ADTitle>
            <Row gutter={16} className='py-4' wrap={false}>
              <Col xs={24} flex='auto'>
                <Input type='text' className='w-full flex min-w-full' onChange={handleChange} name='collectionName' />
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
            {myCollectionList?.length &&
              myCollectionList.map((item) => (
                <Row key={item._id} gutter={16} className='mt-4 cursor-pointer' onClick={() => addCollectionHandler(item._id)}>
                  <Col flex='none'>
                    <div className='bg-slate-300 h-auto w-[75px] aspect-[4/3] rounded-lg' />
                  </Col>
                  <Col xs={24} flex='auto' className='flex items-center'>
                    {item.title}
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
