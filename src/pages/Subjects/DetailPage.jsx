import { RightOutlined, SearchOutlined } from '@ant-design/icons';
import {
  Card,
  Col,
  Input,
  Row,
  Typography
} from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import GradeComponent from '../../components/common/GradeComponent';
import TopSubjectComponent from '../../components/common/SubjectComponent';
import MainLayout from '../../components/layout/MainLayout';
import {
  browseByCommonCoreSubject,
  browseBySubject,
  subjectData,
  subjectCommonData
} from '../../utils/appData';

var subjectDetail;
function DetailPage() {
  const [subjectRec, setSubjectRec] = useState();
  const [subjectDetails, setSubjectDetails] = useState();
  const { id } = useParams();
  useEffect(() => {
    subjectDetail = browseBySubject.findIndex((x) => parseInt(x.subjectId, 10) === parseInt(id, 10));
    if (id) {
      if (subjectDetail > -1) {
        setSubjectRec(browseBySubject[subjectDetail]);
      } else {
        subjectDetail = browseByCommonCoreSubject.findIndex((x) => parseInt(x.subjectId, 10) === parseInt(id, 10));
        if (subjectDetail > -1) {
          setSubjectRec(browseByCommonCoreSubject[subjectDetail]);
        }
      }
    }
  }, [id]);
  useEffect(() => {
    if (subjectRec && subjectRec.subjectType === 'common') {
      setSubjectDetails(subjectCommonData[0]);
    } else {
      setSubjectDetails(subjectData[0]);
    }
  }, [subjectRec]);
  return (
    <MainLayout>
      <TopSubjectComponent />
      <GradeComponent activeGrade='3' />
      <Row gutter={[16, 16]} className='container !mx-auto mt-[30px]'>
        <Col lg={12} xs={24}>
          <Typography.Title level={3} className='md:text-left text-center'>
            {subjectRec && subjectRec.subjectType === 'common' ? (
              `Common Core Standards - Grade 3 - ${subjectRec.subjectName}`
            ) : (
              `${subjectRec && subjectRec.subjectFullName} - Grade 3`
            )}
          </Typography.Title>
        </Col>
        <Col lg={12} xs={24} className='text-center md:text-right'>
          <Input
            placeholder={`Search ${subjectRec && subjectRec.subjectName} Topics`}
            className='w-full max-w-[487px] h-[40px] rounded-[60px]'
            suffix={<SearchOutlined className='text-[#A5A5A5]' />}
          />
        </Col>
      </Row>

      <Row gutter={[16, 16]} className='container !mx-auto mt-[30px]'>
        {subjectRec && subjectRec.subjectType === 'subject' && subjectDetails.subjectTopic.map((item, index) => (
          <Col span={24} key={Math.random()}>
            <Typography.Text className='font-bold'>
              {item.title}
            </Typography.Text>
            <Card title={false} className='mt-[10px] bg-gray-100 mb-[65px]'>
              <Row gutter={[16, 16]}>
                {subjectDetails.subjectTopic[index].subTopics.length > 0 && subjectDetails.subjectTopic[index].subTopics.map((item1, index1) => (
                  <Col xs={24} md={12} lg={8} key={Math.random()}>
                    {item1.listDetail}
                    {'. '}
                    {item1.title}
                  </Col>
                ))}
              </Row>
            </Card>
          </Col>
        ))}
        {subjectRec && subjectRec.subjectType === 'common' && subjectDetails.subjectTopic.map((item, index) => (
          <Col span={24} key={Math.random()}>
            <Typography.Text className='font-bold'>
              {item.title}
            </Typography.Text>
            <Card title={false} className='mt-[10px] bg-gray-100 mb-[65px]'>
              <Row gutter={[16, 16]}>
                {subjectDetails.subjectTopic[index].subTopics.length > 0 && subjectDetails.subjectTopic[index].subTopics.map((item1, index1) => (
                  <Col span={24} key={Math.random()}>
                    <div
                      className='flex-row items-center justify-between border-b-1 border-solid border-x-0 border-t-0 pb-[10px] hidden md:flex'
                    >
                      <Typography.Text className='font-bold flex min-w-[300px]'>
                        {item1.title}
                      </Typography.Text>
                      <Typography.Text className='font-normal flex flex-1 min-w-[300px] max-w-[700px]'>
                        {item1.description && item1.description.substr(0, item1.description.indexOf('.'))}
                      </Typography.Text>
                      <Link to='/' className='flex w-[30px] text-black font-bold'>
                        <RightOutlined />
                      </Link>
                    </div>

                    <div
                      className='flex-col items-center justify-between border-b-1 border-solid border-x-0 border-t-0 pb-[10px] md:hidden flex'
                    >
                      <Link to='/' className='flex flex-col items-center text-center'>
                        <Typography.Text className='font-bold flex'>
                          {item1.title}
                        </Typography.Text>
                        <Typography.Text className='font-normal flex flex-1 min-w-[300px] max-w-[700px]'>
                          {item1.description && item1.description.substr(0, item1.description.indexOf('.'))}
                        </Typography.Text>
                      </Link>
                    </div>
                  </Col>
                ))}
              </Row>
            </Card>
          </Col>
        ))}
      </Row>
    </MainLayout>
  );
}

export default DetailPage;
