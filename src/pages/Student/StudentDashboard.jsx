import React, { useEffect } from 'react';
import { Badge, Col, List, Progress, Row, Select, Space } from 'antd';
import { FaChartLine, FaCheck, FaPencilAlt, FaTimes } from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import data from '../../data.json';
import ADButton from '../../components/antd/ADButton';
import dummyImage from '../../assets/images/dummyImage.png';
import ADTitle from '../../components/antd/ADTitle';
import MainLayout from '../../components/layout/MainLayout';
import ADImage from '../../components/antd/ADImage';
import ADSelect from '../../components/antd/ADSelect';
import { getStudent } from '../../app/features/students/studentsSlice';

function StudentDashboard() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const students = useSelector((state) => state.students);
  const header = (
    <Row>
      <Col xl={7} lg={7} md={7} sm={8} xs={10}>
        <div className='text-center inter-font font-medium text-xs'>NAME</div>
      </Col>
      <Col xl={8} lg={8} md={8} sm={10} xs={8}>
        <div className='text-center inter-font font-medium text-xs'>SCORE</div>
      </Col>
      <Col xl={3} lg={3} md={3} sm={3} xs={3}>
        <div className='text-center inter-font font-medium text-xs'>GRADE</div>
      </Col>
      <Col xl={3} lg={3} md={3} sm={3} xs={3}>
        <div className='text-center inter-font font-medium text-xs'>DATE SUBMITTED</div>
      </Col>
      <Col xl={3} lg={3} md={3} sm={3} xs={3}>
        <div className='text-center inter-font font-medium text-xs'>VIEW WORK</div>
      </Col>
    </Row>
  );

  useEffect(() => {
    dispatch(getStudent(id));
  }, []);

  return (
    <MainLayout>
      <div className='px-4 py-8 w-full flex justify-between'>
        <Space size='large'>
          <div className='flex flex-col'>
            <div className='relative'>
              <ADTitle level={5} className='!text-sm absolute h-0 top-[-16px] left-0'>
                Class 3B
              </ADTitle>
              <ADTitle level={2}>Class</ADTitle>
            </div>
          </div>
          <ADSelect
            className='w-34'
            // defaultValue={updatedClassOptions[0]} // initially load with all class students
            // onChange={handleChange}
            // options={updatedClassOptions}
          />
          <div className='flex'>
            <FaPencilAlt className='text-gray-400 text-lg' />
          </div>
        </Space>
        <ADButton type='primary' className='h-fit'>
          Student Reports
        </ADButton>
      </div>
      <div className='mx-4 border border-solid border-t-0' />
      <div className='xl:px-20 lg:px-16 md:px-10 px-0 py-6'>
        <List
          className='rounded-t-lg with-header'
          header={header}
          itemLayout='horizontal'
          dataSource={data}
          bordered
          renderItem={(item) => (
            <List.Item>
              <Row gutter={[0, 16]} className='w-full'>
                <Col xl={7} lg={7} md={7} sm={8} xs={10} className='flex items-center'>
                  <Row gutter={16} className='w-full'>
                    <Col xs={24} md={24} lg={12} xl={10} xxl={8}>
                      <ADImage alt='cover-img' src={dummyImage} className='w-full aspect-[80px/100px] object-cover rounded max-w-[100px]' />
                    </Col>
                    <Col xs={24} md={24} lg={12} xl={14} xxl={16} className='inter-font text-sm'>
                      <div className='flex flex-col justify-center h-full lg:py-0 py-4'>
                        <div className='font-medium'>{item.title}</div>
                        <div className='font-normal text-gray-400'>Description</div>
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col xl={8} lg={8} md={8} sm={10} xs={8} className='flex justify-center items-center'>
                  <Row className='rounded-2xl md:px-4 px-2 py-4 border border-solid border-slate-300 w-full'>
                    <Col
                      xs={12}
                      sm={12}
                      md={{
                        span: 8,
                        order: 1
                      }}
                      xl={{
                        span: 4,
                        order: 1
                      }}
                      className='flex flex-col justify-center items-center'
                    >
                      <div>TIME</div>
                      <div>03:21</div>
                    </Col>
                    <Col
                      xs={12}
                      sm={12}
                      md={{
                        span: 8,
                        order: 4
                      }}
                      xl={{
                        span: 4,
                        order: 2
                      }}
                      className='flex flex-col justify-center items-center'
                    >
                      <div className='flex pb-1'>
                        <FaCheck className='text-slate-400' />
                      </div>
                      <div className='font-bold'>8</div>
                    </Col>
                    <Col
                      xs={12}
                      sm={12}
                      md={{
                        span: 8,
                        order: 5
                      }}
                      xl={{
                        span: 4,
                        order: 3
                      }}
                      className='flex flex-col justify-center items-center'
                    >
                      <div className='flex pb-1'>
                        <FaTimes className='text-slate-400' />
                      </div>
                      <div className='font-bold'>8</div>
                    </Col>
                    <Col
                      xs={12}
                      sm={12}
                      md={{
                        span: 8,
                        order: 6
                      }}
                      xl={{
                        span: 4,
                        order: 4
                      }}
                      className='flex flex-col justify-center items-center'
                    >
                      <div className='flex pb-1'>
                        <BsThreeDots className='text-slate-400' />
                      </div>
                      <div className='font-bold'>8</div>
                    </Col>
                    <Col
                      xs={12}
                      sm={12}
                      md={{
                        span: 8,
                        order: 2
                      }}
                      xl={{
                        span: 4,
                        order: 5
                      }}
                      className='flex flex-col justify-center items-center'
                    >
                      <div className=''>SCORE</div>
                      <div className='font-bold'>75%</div>
                    </Col>
                    <Col
                      xs={12}
                      sm={12}
                      md={{
                        span: 8,
                        order: 3
                      }}
                      xl={{
                        span: 4,
                        order: 6
                      }}
                      className='flex flex-col justify-center items-center'
                    >
                      <Progress type='circle' width={50} percent={30} status='none' />
                    </Col>
                  </Row>
                </Col>
                <Col xl={3} lg={3} md={3} sm={3} xs={3} className='flex justify-center items-center'>
                  <Badge
                    count={4}
                    style={{
                      backgroundColor: '#52c41a',
                      padding: '0 10px'
                    }}
                  />
                </Col>
                <Col xl={3} lg={3} md={3} sm={3} xs={3} className='flex justify-center items-center'>
                  <div>
                    <div>08/27/2022</div>
                    <div>06:00 pm</div>
                  </div>
                </Col>
                <Col xl={3} lg={3} md={3} sm={3} xs={3} className='flex justify-center items-center'>
                  <div className='flex'>
                    <FaChartLine className='text-gray-400 text-2xl' />
                  </div>
                </Col>
              </Row>
            </List.Item>
          )}
        />
      </div>
    </MainLayout>
  );
}

export default StudentDashboard;
