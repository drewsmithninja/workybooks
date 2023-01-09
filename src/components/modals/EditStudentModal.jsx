import React, { useEffect, useState } from 'react';
import { Avatar, Col, Form, Input, Modal, Row, Space, Upload } from 'antd';
import { FaPencilAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import { useForm } from 'antd/es/form/Form';
import ADModal from '../antd/ADModal';
import ADTitle from '../antd/ADTitle';
import ADButton from '../antd/ADButton';
import { deleteStudent, editStudent, getStudents } from '../../app/features/students/studentsSlice';
import getBase64 from '../../utils/getBase64';

export default function EditStudentModal({ onShow, onOk, onCancel, ...props }) {
  const { currentClass } = useSelector((state) => state.classroom);
  const { currentStudent } = useSelector((state) => state.students);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

  const dispatch = useDispatch();
  const [form] = useForm();

  const [fileList, setFileList] = useState([]);

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

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

  const getFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const handleCancel = () => setPreviewOpen(false);

  const onFinish = async (values) => {
    const data = {
      id: currentStudent?._id,
      ...values
    };
    await dispatch(editStudent(data));
    await dispatch(getStudents(currentClass?._id));
    onOk();
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  return (
    <ADModal forceRender centered footer={false} onCancel={onCancel} {...props}>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img
          alt="example"
          style={{
            width: '100%'
          }}
          src={previewImage}
        />
      </Modal>
      <ADTitle level={2} className='text-center'>
        Edit Student
      </ADTitle>
      <div className='py-4 text-dark text-lg text-center mb-6'>Update student details</div>
      <Form name='edit-student' form={form} onFinish={onFinish}>
        <Row gutter={[16, 0]} className='mb-2'>
          <Col xs={24} sm={12}>
            <Form.Item name='image' getValueFromEvent={getFile} valuePropName='avatar'>
              <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType='picture-card'
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
              >
                {fileList.length >= 1 ? null : <Avatar size={64} icon={<UserOutlined />} />}
              </Upload>
            </Form.Item>
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
