import { RightOutlined, SearchOutlined } from '@ant-design/icons';
import { Card, Col, Input, Row, Typography, Divider } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import GradeComponent from '../../components/common/GradeComponent';
import TopSubjectComponent from '../../components/common/SubjectComponent';
import MainLayout from '../../components/layout/MainLayout';
import Spinner from '../../components/spinner/Spinner';

let subjectDetail;
function DetailPage() {
  const [subjectRec, setSubjectRec] = useState();
  const [subjectTopic, setSubjectTopic] = useState([]);
  const [ccsRec, setCcsRec] = useState();
  const [ccsTopic, setCcsTopic] = useState([]);
  const [currectTopics, setCurrentTopics] = useState('');
  const { id } = useParams();
  const { subjectData, cclData, gradeData, isError, isSucess, message } = useSelector((state) => state.home);
  // console.log(subjectData?.data?.list, cclData?.data?.list);

  useEffect(() => {
    if (id) {
      subjectDetail = subjectData?.data?.list.find((item) => parseInt(item._id, 30) === parseInt(id, 30));
      if (subjectDetail) {
        setSubjectRec(subjectDetail);
        setSubjectTopic(subjectDetail?.topics);
        setCurrentTopics('Subject');
      } else {
        subjectDetail = cclData?.data?.list.find((item) => parseInt(item._id, 30) === parseInt(id, 30));
        if (subjectDetail) {
          setCcsRec(subjectDetail);
          setCcsTopic(subjectDetail?.tree);
          setCurrentTopics('CCL');
        }
      }
    }
  }, [id]);

  return (
    <MainLayout>
      <TopSubjectComponent subjectList={subjectData?.data?.list} cclList={cclData?.data?.list} />
      <GradeComponent activeGrade='3' gradeList={gradeData?.data} />
      <Row gutter={[16, 16]} className='container !mx-auto mt-[30px]'>
        <Col lg={12} xs={24}>
          <Typography.Title level={3} className='md:text-left text-center'>
            {subjectRec && (currectTopics === 'Subject') &&
             subjectRec.title}
            {ccsRec && (currectTopics === 'CCL') &&
             ccsRec.title}
          </Typography.Title>
        </Col>
        <Col lg={12} xs={24} className='text-center md:text-right'>
          <Input placeholder={`Search ${subjectRec && subjectRec.title} Topics`} className='w-full max-w-[487px] h-[40px] rounded-[60px]' suffix={<SearchOutlined className='text-[#A5A5A5]' />} />
        </Col>
      </Row>

      <Row gutter={[16, 16]} className='container !mx-auto mt-[30px]'>
        { currectTopics === 'Subject' &&
        subjectTopic?.map((item, index) => (
          <Col span={24} key={Math.random()}>
            <Typography.Text className='font-bold text-2xl'>{item.title}</Typography.Text>
            {item?.topics?.length > 0 &&
                    item?.topics.map((item1, index1) => (
                      <div key={Math.random()}>
                        {(item1?.topics.length > 0) ? (
                          <>
                            <Typography.Text className='font-bold text-xl'>{item1.title}</Typography.Text>
                            <Card title={false} className='mt-[10px] bg-gray-100 mb-[65px]'>
                              <Row gutter={[16, 16]}>
                                {item1?.topics.length > 0 &&
                                 item1?.topics.map((item2, index2) => (
                                   <Col xs={24} md={12} lg={8} key={Math.random()}>
                                     {item2.title}
                                   </Col>
                                 ))}
                              </Row>
                            </Card>
                          </>
                        ) : (
                          <Card title={false} className='mt-[10px] bg-gray-100 mb-[65px]'>
                            <Row gutter={[16, 16]}>
                              <Col xs={24} md={12} lg={8} key={Math.random()}>
                                {item1.title}
                                test
                              </Col>
                            </Row>
                          </Card>
                        )}
                      </div>
                    ))}
            <div className='w-full p-0.5 bg-gray-600' />
          </Col>
        ))}
        { currectTopics === 'CCL' &&
        ccsTopic?.map((item, index) => (
          <Col span={24} key={Math.random()}>
            <Typography.Text className='font-bold'>{item.title}</Typography.Text>
            <Card title={false} className='mt-[10px] bg-gray-100 mb-[65px]'>
              <Row gutter={[16, 16]}>
                {item?.topics.length > 0 &&
                    item?.topics.map((item1, index1) => (
                      <Col span={24} key={Math.random()}>
                        <div className='flex-row items-center justify-between border-b-1 border-solid border-x-0 border-t-0 pb-[10px] hidden md:flex'>
                          <Typography.Text className='font-bold flex min-w-[300px]'>{item1.title}</Typography.Text>
                          <Typography.Text className='font-normal flex flex-1 min-w-[300px] max-w-[700px]'>{item1.description && item1.description.substr(0, item1.description.indexOf('.'))}</Typography.Text>
                          <Link to='/' className='flex w-[30px] text-black font-bold'>
                            <RightOutlined />
                          </Link>
                        </div>

                        <div className='flex-col items-center justify-between border-b-1 border-solid border-x-0 border-t-0 pb-[10px] md:hidden flex'>
                          <Link to='/' className='flex flex-col items-center text-center'>
                            <Typography.Text className='font-bold flex'>{item1.title}</Typography.Text>
                            <Typography.Text className='font-normal flex flex-1 min-w-[300px] max-w-[700px]'>{item1.description && item1.description.substr(0, item1.description.indexOf('.'))}</Typography.Text>
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
