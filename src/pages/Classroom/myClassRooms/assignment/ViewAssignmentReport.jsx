import React from 'react';
import { Avatar, Badge, Col, List, Progress, Row, Form, Input, Modal } from 'antd';
import { FaChartLine, FaCheck, FaPencilAlt, FaTimes } from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs';
import ADTitle from '../../../../components/antd/ADTitle';
import ADSelect from '../../../../components/antd/ADSelect';

function ViewAssignmentReport({ onShow, onOk, onCancel, ...props }) {
  const studentsOptions = [
    {
      value: '',
      label: 'No Student'
    }
  ];
  console.log(window.innerWidth);

  return (
    <Modal forceRender centered width={window.innerWidth - 300} footer={false} onCancel={onCancel} {...props} className='layout'>
      <Row gutter={[16, 0]}>
        <Col>
          <ADTitle level={5}>Class 3B</ADTitle>
        </Col>
      </Row>
      <Row gutter={[16, 0]}>
        <Col xl={4} md={4} sm={4} xs={6}>
          <ADTitle level={3}>Student work</ADTitle>
        </Col>
        <Col xl={8} md={8} sm={8} xs={6}>
          <ADSelect className='w-40' defaultValue='Jane Cooper' options={studentsOptions} />
        </Col>
      </Row>
      <Row gutter={[16, 0]} className='center items-center'>
        <Col xl={4} md={4} sm={8} xs={10}>
          <ADTitle level={4}>Assignment</ADTitle>
        </Col>
        <Col xl={5} md={5} sm={8} xs={10}>
          <ADSelect className='w-60' defaultValue='Jane Cooper' options={studentsOptions} />
        </Col>
        <Col xl={7} md={7} sm={8} xs={10}>
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
        <Col xl={3} md={3} sm={6} xs={10}>
          <div className='flex items-center'>
            <span
              style={{
                marginRight: 20
              }}
            >
              GRADE
            </span>
            <Input size='small' placeholder='Grade' />
            <FaCheck className='text-slate-400' />
          </div>
        </Col>
      </Row>
    </Modal>
  );
}

export default ViewAssignmentReport;
