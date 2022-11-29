import React, { useEffect, useState } from 'react';
import { Avatar, Col, Image, List, Row, Space } from 'antd';
import { FaChartLine, FaPencilAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ADButton from '../../antd/ADButton';
import { getStudents } from '../../../app/features/students/studentsSlice';

function StudentsPage({ classId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedStudents, setSelectedStudents] = useState([]);
  const students = useSelector((state) => state.students);

  useEffect(() => {
    dispatch(getStudents(classId));
    setSelectedStudents(students?.students?.list);
  }, [classId]);

  const header = (
    <Row>
      <Col xl={6} md={6} sm={8} xs={10}>
        <div className='inter-font font-medium text-xs'>NAME</div>
      </Col>
      <Col xl={12} md={10} sm={10} xs={8}>
        <div className='text-center inter-font font-medium text-xs'>ACTIVITY</div>
      </Col>
      <Col xl={3} md={4} sm={3} xs={3}>
        <div className='text-center inter-font font-medium text-xs'>VIEW WORK</div>
      </Col>
      <Col xl={3} md={4} sm={3} xs={3}>
        <div className='text-center inter-font font-medium text-xs'>EDIT</div>
      </Col>
    </Row>
  );

  const onStudentClickHandler = (e) => {
    navigate(`student-dashboard/${e._id}`);
  };

  return (
    <div className='xl:px-20 lg:px-16 md:px-10 px-0'>
      <Space direction='vertical' size='large' className='flex'>
        <div className='flex ant-row-end'>
          <ADButton type='primary'>ADD STUDENTS</ADButton>
        </div>
        <List
          className='rounded-t-lg with-header'
          header={header}
          itemLayout='horizontal'
          dataSource={selectedStudents}
          bordered
          renderItem={(item) => (
            <List.Item>
              <Row gutter={[0, 16]} className='w-full'>
                <Col xl={6} md={6} sm={8} xs={10} className='flex items-center'>
                  <Space>
                    <Avatar icon={<Image src={item.avatar} alt='img' />} />
                    <div className='inter-font text-sm ml-5'>
                      <ADButton type='text' className='font-medium !p-0' onClick={() => onStudentClickHandler(item)}>{`${item.firstName} ${item.lastName}`}</ADButton>
                      <div className='font-normal text-gray-400'>{item.userName}</div>
                    </div>
                  </Space>
                </Col>
                <Col xl={12} md={10} sm={10} xs={8} className='flex justify-center'>
                  <Row className='rounded-2xl md:px-4 px-2 py-2 border border-solid border-slate-300'>
                    <Col sm={12} xs={24}>
                      <div className='flex items-center flex-col mx-2 lg:mx-4'>
                        <div>ACTIVITIES</div>
                        <div className='font-bold'>32</div>
                      </div>
                    </Col>
                    <Col sm={12} xs={24}>
                      <div className='flex items-center flex-col mx-2 lg:mx-4'>
                        <div className='whitespace-nowrap'>TIME PLAYED</div>
                        <div className='font-bold'>03:01</div>
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col xl={3} md={4} sm={3} xs={3} className='flex justify-center items-center'>
                  <FaChartLine className='text-gray-400 text-lg' />
                </Col>
                <Col xl={3} md={4} sm={3} xs={3} className='flex justify-center items-center'>
                  <FaPencilAlt className='text-gray-400 text-lg' />
                </Col>
              </Row>
            </List.Item>
          )}
        />
      </Space>
    </div>
  );
}

export default StudentsPage;
