import React, { useState, useEffect } from 'react';
import { Button, Col, Row, Form, Upload } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { UploadOutlined } from '@ant-design/icons';
import MainLayout from '../../components/layout/MainLayout';
import ADButton from '../../components/antd/ADButton';
import ADInput from '../../components/antd/ADInput';
import ADTitle from '../../components/antd/ADTitle';
import { getProfile, updateProfile } from '../../features/user/userSlice';

function UserProfile() {
  const [userPassword, setUserPassword] = useState('abcdefghijkl');
  const { user } = useSelector((state) => state.auth);
  const { userData } = useSelector((state) => state.user);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  console.log(userData);
  useEffect(() => {
    dispatch(getProfile({
      id: user?.data?.user?._id
    }));
  }, [user?.data?.user]);

  useEffect(() => {
    form.setFieldsValue({
      salutation: userData?.data?.salutation || '',
      firstname: userData?.data?.firstName || '',
      lastname: userData?.data?.lastName || '',
      email: userData?.data?.email || '',
      password: userData?.data?.password || '',
      schoolname: userData?.data?.schoolName || '',
      state: userData?.data?.state || '',
      city: userData?.data?.city || ''
    });
  }, [userData?.data]);

  const onFinish = (values) => {
    console.log('val', values);
    const userInfo = {
      id: user?.data?.user?._id,
      userDetail: {
        salutation: values.salutation,
        firstName: values.firstname,
        lastName: values.lastname,
        schoolName: values.schoolname,
        city: values.city,
        state: values.state,
        newPassword: values.password
      }
    };
    if (userInfo) dispatch(updateProfile(userInfo));
  };
  const onFinishFailed = () => {
    toast.error('Something Wrong!, Not able to login!');
  };

  const getFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <MainLayout>
      <div className='overflow-hidden bg-white shadow sm:rounded-lg'>
        <div className='px-4 py-5 sm:px-6'>
          <h3 className='text-3xl font-bold leading-6'>Edit Profile</h3>
          <ADTitle>Hello</ADTitle>
        </div>
        <Form onFinish={onFinish} form={form} onFinishFailed={onFinishFailed}>
          <div className='px-6'>
            <Row
              gutter={{
                xs: 8,
                sm: 16,
                md: 24,
                lg: 32,
                xl: 40,
                xxl: 48
              }}
            >
              <Col span={12}>
                <Row
                  gutter={{
                    xs: 8,
                    sm: 16,
                    md: 24,
                    lg: 32,
                    xl: 40,
                    xxl: 48
                  }}
                  className='pb-10'
                >
                  <Col span={8}>
                    <div className='text-lg text-gray-500'>Profile Picture</div>
                  </Col>
                  <Col span={16}>
                    <div className='flex items-center'>
                      <span className='inline-block h-[115px] w-[115px] overflow-hidden rounded-full bg-gray-100'>
                        <svg className='h-full w-full text-gray-300' fill='currentColor' viewBox='0 0 24 24'>
                          <path d='M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z' />
                        </svg>
                      </span>
                      {/* <ADButton className='ml-5' size='small'>
                        Change
                      </ADButton> */}
                      <Form.Item name='image' getValueFromEvent={getFile}>
                        <Upload>
                          <Button icon={<UploadOutlined />}>Upload</Button>
                        </Upload>
                      </Form.Item>
                    </div>
                  </Col>
                </Row>
                <Row
                  gutter={{
                    xs: 8,
                    sm: 16,
                    md: 24,
                    lg: 32,
                    xl: 40,
                    xxl: 48
                  }}
                  className='pb-8'
                >
                  <Col span={8}>
                    <div className='text-lg font-medium text-gray-500'>Contact Information</div>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      label={false}
                      name='salutation'
                    >
                      <ADInput placeholder='Salutation' value={userData?.data?.salutation} />
                    </Form.Item>
                  </Col>
                </Row>
                <Row
                  gutter={{
                    xs: 8,
                    sm: 16,
                    md: 24,
                    lg: 32,
                    xl: 40,
                    xxl: 48
                  }}
                  className='pb-8'
                >
                  <Col offset={8} span={16}>
                    <Row
                      gutter={{
                        xs: 8,
                        sm: 16,
                        md: 24,
                        lg: 32,
                        xl: 40,
                        xxl: 48
                      }}
                    >
                      <Col span={12}>
                        <Form.Item
                          label={false}
                          name='firstname'
                        >
                          <ADInput placeholder='First Name' />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          label={false}
                          name='lastname'
                        >
                          <ADInput placeholder='Last Name' />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row
                  gutter={{
                    xs: 8,
                    sm: 16,
                    md: 24,
                    lg: 32,
                    xl: 40,
                    xxl: 48
                  }}
                  className='pb-8'
                >
                  <Col offset={8} span={16}>
                    <Form.Item
                      label={false}
                      name='email'
                    >
                      <ADInput placeholder='Email' value={userData?.data?.email} />
                    </Form.Item>
                  </Col>
                </Row>
                <Row
                  gutter={{
                    xs: 8,
                    sm: 16,
                    md: 24,
                    lg: 32,
                    xl: 40,
                    xxl: 48
                  }}
                  className='pb-8'
                >
                  <Col span={8} className='text-lg font-medium text-gray-500'>
                    Password
                  </Col>
                  <Col span={16}>
                    <Row
                      gutter={{
                        xs: 8,
                        sm: 16,
                        md: 24,
                        lg: 32,
                        xl: 40,
                        xxl: 48
                      }}
                    >
                      <Col span={12}>
                        <Form.Item
                          label={false}
                          name='password'
                        >
                          <ADInput bordered={false} value={userPassword} type='password' onChange={(e) => setUserPassword(e.target.value)} />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <ADButton className='w-full'>CHANGE PASSWORD</ADButton>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row
                  gutter={{
                    xs: 8,
                    sm: 16,
                    md: 24,
                    lg: 32,
                    xl: 40,
                    xxl: 48
                  }}
                  className='pb-8'
                >
                  <Col span={8} className='text-lg font-medium text-gray-500'>
                    Your School
                  </Col>
                  <Col span={16}>
                    <Form.Item
                      label={false}
                      name='schoolname'
                    >
                      <ADInput placeholder='School Name' value={userData?.data?.schoolName} />
                    </Form.Item>
                  </Col>
                </Row>
                <Row
                  gutter={{
                    xs: 8,
                    sm: 16,
                    md: 24,
                    lg: 32,
                    xl: 40,
                    xxl: 48
                  }}
                  className='pb-16'
                >
                  <Col offset={8} span={16}>
                    <Row
                      gutter={{
                        xs: 8,
                        sm: 16,
                        md: 24,
                        lg: 32,
                        xl: 40,
                        xxl: 48
                      }}
                    >
                      <Col span={12}>
                        <Form.Item
                          label={false}
                          name='state'
                        >
                          <ADInput placeholder='State' value={userData?.data?.state} />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          label={false}
                          name='city'
                        >
                          <ADInput placeholder='City' value={userData?.data?.city} />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row
                  gutter={{
                    xs: 8,
                    sm: 16,
                    md: 24,
                    lg: 32,
                    xl: 40,
                    xxl: 48
                  }}
                  className='pb-8'
                >
                  <Col offset={8} span={16}>
                    <Row
                      gutter={{
                        xs: 8,
                        sm: 16,
                        md: 24,
                        lg: 32,
                        xl: 40,
                        xxl: 48
                      }}
                      className='pb-8'
                    >
                      <Col span={12}>
                        <Form.Item>
                          <ADButton type='primary' htmlType='submit' className='w-full'>
                            Submit
                          </ADButton>
                        </Form.Item>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </Form>
      </div>
    </MainLayout>
  );
}

export default UserProfile;
