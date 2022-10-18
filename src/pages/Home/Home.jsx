import React, { useEffect, useState } from 'react';
import { Button, Col, Modal, Row } from 'antd';
import { useSelector } from 'react-redux';
import CardComponent from '../../components/common/CardComponent';
import MainLayout from '../../components/layout/MainLayout';
import dummyImage from '../../assets/images/dummyImage.png';
import dummyImage1 from '../../assets/images/dummyImage1.png';
import TopSubjectComponent from '../../components/common/SubjectComponent';
import GradeComponent from '../../components/common/GradeComponent';

function Home() {
  const { user } = useSelector((state) => state.auth);
  window.document.title = 'React App — Home';
  const cards = [];
  Array(8)
    .fill(1)
    .map((item, index) => cards.push({
      id: index + 1,
      key: index + 1,
      name: 'test_card'
    }));
  const cards1 = [];
  Array(8)
    .fill(1)
    .map((item, index) => cards1.push({
      id: `test_${index + 1}`,
      key: `test_${index + 1}`,
      name: 'test_card'
    }));

  return (
    <MainLayout>
      {user && (
        <div className='w-full max-w-[95%] m-auto'>
          <TopSubjectComponent />
          <GradeComponent activeGrade='1' />
          <Row gutter={[16, 16]} className='mt-[15px] border rounded-md'>
            <Col span={16} className='max-h-[253px] pr-0'>
              <img src={dummyImage1} alt='test' width='100%' height='100%' />
            </Col>
            <Col span={8} className='max-h-[253px] pl-0'>
              <img src={dummyImage1} alt='test' width='100%' height='100%' />
            </Col>
          </Row>

          <h3 className='uppercase pl-[15px] mt-[15px]'>New in workybooks</h3>
          <div className='flex flex-row scrollVertical width-full'>{cards.length > 0 && cards.map((item) => <CardComponent key={Math.random()} cardData={item} cardImage={dummyImage} />)}</div>

          <h3 className='uppercase pl-[15px] mt-[15px]'>Popular</h3>
          <div className='flex flex-row scrollVertical width-full'>{cards1.length > 0 && cards1.map((item) => <CardComponent key={Math.random()} cardData={item} cardImage={dummyImage} />)}</div>
        </div>
      )}
    </MainLayout>
  );
}

export default Home;
