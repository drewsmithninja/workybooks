import React from 'react';
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

  const cards = new Array(50).fill(1);
  const {
    user = {}
  } = useSelector((state) => state);
  const grades = ['prek', 'k', '1', '2', '3', '4', '5'];
  return (
    <MainLayout>
      {user.loggedIn && (
        <div className='w-full max-w-[95%] m-auto'>
          <div className='!mt-[20px] border-1 border-solid border-x-0 border-t-0 pb-2'>
            <Row gutter={[16, 16]}>
              <Col span={1} />
              <Col span={14} className='border-1 border-solid border-l-0 border-y-0'>
                <Typography.Text className='font-bold text-[11px] ml-[40px] !mb-[20px]'>Browse by Subject</Typography.Text>
                <Row gutter={[16, 16]}>
                  {Array(6).fill(1).map(() => (
                    <Col span={4} key={`subject_${Math.random()}`}>
                      <SubjectComponent subjectImage={dummyVector} subjectName='BA' />
                    </Col>
                  ))}
                </Row>
              </Col>
              <Col span={0} />
              <Col span={4}>
                <Typography.Text className='font-bold text-[11px] ml-[10px]'>Browse by Common core standards</Typography.Text>
                <Row gutter={[16, 16]}>
                  {Array(2).fill(1).map(() => (
                    <Col span={12} key={`subject_${Math.random()}`}>
                      <SubjectComponent subjectImage={dummyVector} subjectName='BA' />
                    </Col>
                  ))}
                </Row>
              </Col>
              <Col span={2} />
            </Row>
          </div>

          <div className='flex items-center justify-center pt-[20px]'>
            <span className='font-normal text-sm pr-[20px]'>Grade</span>
            <Radio.Group defaultValue='1' size='small' buttonStyle='solid'>
              {grades.map((item, index) => (
                <Radio.Button value={`${item}`} key={`${item}`} className='mr-[10px] w-[58px] h-[25px] bg-[#D9D9D9] !rounded-[60px] text-xs text-center border-0'>{item}</Radio.Button>
              ))}
            </Radio.Group>
          </div>

          <Row gutter={[16, 16]} className='mt-[15px]'>
            <Col span={16} className='max-h-[253px]'>
              <img src={dummyImage1} alt='test' width='100%' height='100%' />
            </Col>
            <Col span={8} className='max-h-[253px]'>
              <img src={dummyImage1} alt='test' width='100%' height='100%' />
            </Col>
          </Row>

          <h3 className='uppercase pl-[15px] mt-[15px]'>New in workybooks</h3>
          <div className='flex flex-row scrollVertical width-full'>
            {cards.length > 0 && cards.map(() => <CardComponent key={Math.random()} cardImage={dummyImage} />)}
          </div>

          <h3 className='uppercase pl-[15px] mt-[15px]'>New in workybooks</h3>
          <div className='flex flex-row scrollVertical width-full'>
            {cards.length > 0 && cards.map(() => <CardComponent key={Math.random()} cardImage={dummyImage} />)}
          </div>
        </div>
      )}
    </MainLayout>
  );
}

export default Home;
