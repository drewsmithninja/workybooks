import { Col, Row, Typography } from 'antd';
import React from 'react';
import SubjectComponent from '../Home/subjectComponent';
import CcsComponent from '../Home/CcsComponent';

function TopSubjectComponent({ subjectList = [], ccsList = [] }) {
  return (
    <div className='text-center md:text-left !mt-[20px] md:mx-16 mx-2'>
      <Row gutter={[16, 16]}>
        <Col md={16} sm={24} xs={24} className='border-b md:border-solid border-x-0 border-t-0 pb-3'>
          <Typography.Text className='font-bold text-[11px] sm:mb-0 !mb-[20px] block'>Browse by Subject</Typography.Text>
          <Row gutter={[16, 16]} className='border-r border-y-0 border-l-0 md:border-solid'>
            {subjectList?.map((item) => (
              <Col md={4} xs={8} key={`subject_${Math.random()}`}>
                <SubjectComponent subjectImage={item.image} subjectName={item.title} subjectId={item._id} />
              </Col>
            ))}
          </Row>
        </Col>
        <Col md={8} sm={12} xs={24} className='text-center md:text-left !p-0 border-b md:border-solid border-x-0 border-t-0 pb-3'>
          <Typography.Text className='font-bold text-[11px] md:ml-[10px] w-full  mb-[20px] block'>Browse by Common core standards</Typography.Text>
          <Row gutter={[16, 16]}>
            {ccsList?.map((item) => (
              <Col md={12} sm={12} xs={12} key={`subject_${Math.random()}`}>
                <CcsComponent ccsImage={item.image} ccsName={item.title} ccsId={item._id} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default TopSubjectComponent;
