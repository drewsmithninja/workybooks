import React, { useEffect } from 'react';
import { Avatar, Col, Form, Input, Row, Space } from 'antd';
import { FaPencilAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'antd/es/form/Form';
import ADModal from '../antd/ADModal';
import ADTitle from '../antd/ADTitle';
import ADButton from '../antd/ADButton';
import { deleteStudent, editStudent, getStudents } from '../../app/features/students/studentsSlice';

export default function EditStudentModal({ onShow, onOk, onCancel, ...props }) {
  const { currentClass } = useSelector((state) => state.classroom);
  const { currentStudent } = useSelector((state) => state.students);

  const dispatch = useDispatch();
  const [form] = useForm();

  useEffect(() => {
    form.setFieldsValue({
      nickName: currentStudent?.nickName,
      firstName: currentStudent?.firstName,
      lastName: currentStudent?.lastName,
      userName: currentStudent?.userName,
      password: currentStudent?.password,
      parentEmail: currentStudent?.parentEmail
    });
  }, [currentStudent]);

  const onDeleteHandler = async () => {
    await dispatch(deleteStudent(currentStudent?._id));
    await dispatch(getStudents(currentClass?._id));
  };

  const onFinish = async (values) => {
    const data = {
      id: currentStudent?._id,
      ...values
    };
    await dispatch(editStudent(data));
    await dispatch(getStudents(currentClass?._id));
    onOk();
  };

  return (
    <ADModal forceRender centered width={670} footer={false} onCancel={onCancel} {...props}>
      <ADTitle level={2} className='text-center'>
        Edit Student
      </ADTitle>
      <div className='py-4 text-dark text-lg text-center mb-6'>Update student details</div>
      <Form name='edit-student' form={form} onFinish={onFinish}>
        <Row gutter={[16, 0]} className='mb-2'>
          <Col xs={24} sm={12}>
            <Space className='flex items-end pb-6'>
              <Avatar size={80} />
              <FaPencilAlt className='text-gray-400 text-lg' />
            </Space>
          </Col>
          <Col xs={24} sm={12} className='flex items-end'>
            <Form.Item name='nickName' className='w-full'>
              <Input size='large' placeholder='Nickname' />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16} className='pb-0 mb-2'>
          <Col xs={24} sm={12}>
            <Form.Item
              name='firstName'
              className='w-full'
              rules={[
                {
                  required: true,
                  message: 'Please input your first name'
                }
              ]}
            >
              <Input size='large' placeholder='First Name' />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} className='flex items-center'>
            <Form.Item
              name='lastName'
              className='w-full'
              rules={[
                {
                  required: true,
                  message: 'Please input your last name'
                }
              ]}
            >
              <Input size='large' placeholder='Last Name' />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16} className='pb-0 mb-2'>
          <Col xs={24} sm={12} className='flex items-center'>
            <Form.Item
              name='userName'
              className='w-full'
              rules={[
                {
                  required: true,
                  message: 'Please input your username'
                }
              ]}
            >
              <Input size='large' placeholder='Username' />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} className='flex items-center'>
            <Form.Item name='password' className='w-full'>
              <Input size='large' type='password' placeholder='Password' />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name='parentEmail' className='mb-8'>
          <Input size='large' className='mb-2' placeholder='Parent Email' />
        </Form.Item>
        <Row gutter={16} className='pb-0'>
          <Col xs={24} sm={12}>
            <ADButton danger block onClick={onDeleteHandler}>
              DELETE
            </ADButton>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item>
              <ADButton block htmlType='submit' type='primary'>
                SAVE
              </ADButton>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </ADModal>
  );
}
