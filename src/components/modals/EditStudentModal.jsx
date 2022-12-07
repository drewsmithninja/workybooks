import React from 'react';
import { Avatar, Col, Input, Row, Space } from 'antd';
import { FaPencilAlt } from 'react-icons/fa';
import ADModal from '../antd/ADModal';
import ADTitle from '../antd/ADTitle';
import ADButton from '../antd/ADButton';

export default function EditStudentModal({ onShow, onCancel, ...props }) {
  return (
    <ADModal centered width={670} footer={false} onCancel={onCancel} {...props}>
      <ADTitle level={2} className='text-center'>
        Edit Student
      </ADTitle>
      <div className='py-4 text-dark text-lg text-center mb-6'>Update student details</div>
      <Row gutter={[16, 0]} className='pb-10'>
        <Col xs={24} sm={12}>
          <Space size='large' className='flex items-center'>
            <Avatar size={80} />
            <FaPencilAlt className='text-gray-400 text-lg' />
          </Space>
        </Col>
        <Col xs={24} sm={12} className='flex items-center'>
          <Input size='large' placeholder='Nickname' />
        </Col>
      </Row>
      <Row gutter={16} className='pb-10'>
        <Col xs={24} sm={12} className='flex items-center'>
          <Input size='large' placeholder='First Name' />
        </Col>
        <Col xs={24} sm={12} className='flex items-center'>
          <Input size='large' placeholder='Last Name' />
        </Col>
      </Row>
      <Row gutter={16} className='pb-10'>
        <Col xs={24} sm={12} className='flex items-center'>
          <Input size='large' placeholder='Username' />
        </Col>
        <Col xs={24} sm={12} className='flex items-center'>
          <Input type='password' size='large' placeholder='Password' />
        </Col>
      </Row>
      <Input className='mb-10' size='large' placeholder='Parent Email' />
      <Row gutter={16} className='pb-10'>
        <Col xs={24} sm={12}>
          <ADButton danger block>
            DELETE
          </ADButton>
        </Col>
        <Col xs={24} sm={12}>
          <ADButton block type='primary'>
            SAVE
          </ADButton>
        </Col>
      </Row>
    </ADModal>
  );
}
