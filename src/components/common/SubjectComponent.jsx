import { Col, Row, Typography } from 'antd';
import React from 'react';
import { browseBySubject, browseByCommonCoreSubject } from '../../utils/appData';
import SubjectComponent from '../Home/subjectComponent';

import dummyVector from '../../assets/images/dummyVector.png';

function TopSubjectComponent() {
  return (
    <div className='text-center sm:text-left !mt-[20px] sm:border-1 sm:border-solid border-x-0 border-t-0'>
      <Row gutter={[16, 16]}>
        <Col md={1} sm={0} />
        <Col md={11} sm={24} className='sm:border-1 sm:border-solid border-l-0 border-y-0'>
          <Typography.Text className='font-bold text-[11px] sm:ml-[40px] sm:mb-0 !mb-[20px] block'>Browse by Subject</Typography.Text>
          <Row gutter={[16, 16]}>
            {browseBySubject.map((item) => (
              <Col md={4} xs={8} key={`subject_${Math.random()}`}>
                <SubjectComponent subjectImage={dummyVector} subjectName={item.subjectName} subjectId={item.subjectId} />
              </Col>
            ))}
          </Row>
        </Col>
        <Col span={0} />
        <Col md={4} sm={24} xs={24} className='!p-0 text-center sm:text-left'>
          <Typography.Text className='font-bold text-[11px] md:ml-[10px] w-full  mb-[20px] block'>Browse by Common core standards</Typography.Text>
          <Row gutter={[16, 16]}>
            {browseByCommonCoreSubject.map((item) => (
              <Col md={12} sm={12} xs={12} key={`subject_${Math.random()}`}>
                <SubjectComponent subjectImage={dummyVector} subjectName={item.subjectName} subjectId={item.subjectId} />
              </Col>
            ))}
          </Row>
        </Col>
        <Col md={2} sm={0} />
      </Row>
    </div>
  );
}

export default TopSubjectComponent;
