import React, { useEffect } from 'react';
import {
  Col,
  Radio,
  Row,
  Typography
} from 'antd';
import { useSelector } from 'react-redux';
import CardComponent from '../components/common/CardComponent';
import MainLayout from '../components/layout/MainLayout';
import SubjectComponent from '../components/Home/subjectComponent';

import dummyImage from '../assets/images/dummyImage.png';
import dummyImage1 from '../assets/images/dummyImage1.png';
import dummyVector from '../assets/images/dummyVector.png';

function Home() {
  window.document.title = 'React App — Home';

  const cards = [];
  Array(8).fill(1).map((item, index) => cards.push({
    id: index + 1,
    key: index + 1,
    name: 'test_card'
  }));
  const cards1 = [];
  Array(8).fill(1).map((item, index) => cards1.push({
    id: `test_${index + 1}`,
    key: `test_${index + 1}`,
    name: 'test_card'
  }));
  const {
    user = {}
  } = useSelector((state) => state);
  const grades = ['prek', 'k', '1', '2', '3', '4', '5'];
  return (
    <MainLayout>
      {user.loggedIn && (
        <div className='w-full max-w-[95%] m-auto'>
          <div className='text-center sm:text-left !mt-[20px] sm:border-1 sm:border-solid border-x-0 border-t-0 pb-2'>
            <Row gutter={[16, 16]}>
              <Col md={1} sm={0} />
              <Col md={11} sm={24} className='sm:border-1 sm:border-solid border-l-0 border-y-0'>
                <Typography.Text className='font-bold text-[11px] sm:ml-[40px] sm:mb-0 !mb-[20px] block'>Browse by Subject</Typography.Text>
                <Row gutter={[16, 16]}>
                  {Array(6).fill(1).map(() => (
                    <Col md={4} xs={8} key={`subject_${Math.random()}`}>
                      <SubjectComponent subjectImage={dummyVector} subjectName='BA' />
                    </Col>
                  ))}
                </Row>
              </Col>
              <Col span={0} />
              <Col md={4} sm={24} xs={24} className='!p-0 text-center sm:text-left'>
                <Typography.Text className='font-bold text-[11px] md:ml-[10px] w-full  mb-[20px] block'>Browse by Common core standards</Typography.Text>
                <Row gutter={[16, 16]}>
                  {Array(2).fill(1).map(() => (
                    <Col md={12} sm={12} xs={12} key={`subject_${Math.random()}`}>
                      <SubjectComponent subjectImage={dummyVector} subjectName='BA' />
                    </Col>
                  ))}
                </Row>
              </Col>
              <Col md={2} sm={0} />
            </Row>
          </div>

          <div className='flex items-center justify-center pt-[20px]'>
            <span className='font-normal text-sm sm:pr-[20px]'>Grade</span>
            <Radio.Group
              defaultValue='1'
              size='small'
              buttonStyle='solid'
              className='h-[60px] sm:h-auto flex flex-wrap sm:!max-w-full max-w-[320px] items-center justify-center'
            >
              {grades.map((item, index) => (
                <Radio.Button value={`${item}`} key={`${item}`} className='mr-[10px] w-[58px] h-[25px] bg-[#D9D9D9] !rounded-[60px] text-xs text-center border-0 mb-[0px] sm:mb-0'>{item}</Radio.Button>
              ))}
            </Radio.Group>
          </div>

          <Row gutter={[16, 16]} className='mt-[15px]'>
            <Col span={16} className='max-h-[253px] pr-0'>
              <img src={dummyImage1} alt='test' width='100%' height='100%' />
            </Col>
            <Col span={8} className='max-h-[253px] pl-0'>
              <img src={dummyImage1} alt='test' width='100%' height='100%' />
            </Col>
          </Row>

          <h3 className='uppercase pl-[15px] mt-[15px]'>New in workybooks</h3>
          <div className='flex flex-row scrollVertical width-full'>
            {cards.length > 0 && cards.map((item) => <CardComponent key={Math.random()} cardData={item} cardImage={dummyImage} />)}
          </div>

          <h3 className='uppercase pl-[15px] mt-[15px]'>Popular</h3>
          <div className='flex flex-row scrollVertical width-full'>
            {cards1.length > 0 && cards1.map((item) => <CardComponent key={Math.random()} cardData={item} cardImage={dummyImage} />)}
          </div>
        </div>
      )}
    </MainLayout>
  );
}

export default Home;
