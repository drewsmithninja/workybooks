import React, { useState, useEffect } from 'react';
import { Button, Col, Row, Form, Upload, message, Avatar } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import MainLayout from '../../components/layout/MainLayout';
import ADButton from '../../components/antd/ADButton';
import ADInput from '../../components/antd/ADInput';
import ADTitle from '../../components/antd/ADTitle';
import { getProfile, updateProfile } from '../../app/features/user/userSlice';

function UserProfile() {
  const { user } = useSelector((state) => state.auth);
  const [userPassword, setUserPassword] = useState('abcdefghijkl');
  const { userData } = useSelector((state) => state.user);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getProfile({
        id: user?.payload?._id
      })
    );
  }, [user?.user]);

  const onChange = (info) => {
    if (info.file.status !== 'uploading') {
      // console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  useEffect(() => {
    form.setFieldsValue({
      salutation: userData?.user?.salutation || '',
      firstname: userData?.user?.firstName || '',
      lastname: userData?.user?.lastName || '',
      email: userData?.user?.email || '',
      password: userData?.user?.password || '',
      schoolname: userData?.user?.schoolName || '',
      state: userData?.user?.state || '',
      city: userData?.user?.city || ''
    });
  }, [userData]);

  const onFinish = (values) => {
    const userInfo = {
      id: user?.payload?._id,
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
      <div className="overflow-hidden bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-3xl font-bold leading-6">Edit Profile</h3>
        </div>
        <Form onFinish={onFinish} form={form} onFinishFailed={onFinishFailed}>
          <div className="px-6">
            <Row
              gutter={{
                xs: 8,
                sm: 16,
                md: 24,
                lg: 32,
                xl: 40,
                xxl: 48
              }}>
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
                  className="pb-10">
                  <Col span={8}>
                    <div className="text-lg text-gray-500">Profile Picture</div>
                  </Col>
                  <Col span={16}>
                    <div className="flex items-center">
                      <Avatar size={64} icon={<UserOutlined />} />
                      <Form.Item name="image" getValueFromEvent={getFile} valuePropName="avatar">
                        <Upload
                          name="file"
                          headers={{
                            authorization: 'authorization-text'
                          }}
                          onChange={onChange}>
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
                  className="pb-8">
                  <Col span={8}>
                    <div className="text-lg font-medium text-gray-500">Contact Information</div>
                  </Col>
                  <Col span={8}>
                    <Form.Item label={false} name="salutation">
                      <ADInput placeholder="Salutation" value={userData?.user?.salutation} />
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
                  className="pb-8">
                  <Col offset={8} span={16}>
                    <Row
                      gutter={{
                        xs: 8,
                        sm: 16,
                        md: 24,
                        lg: 32,
                        xl: 40,
                        xxl: 48
                      }}>
                      <Col span={12}>
                        <Form.Item label={false} name="firstname">
                          <ADInput placeholder="First Name" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label={false} name="lastname">
                          <ADInput placeholder="Last Name" />
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
                  className="pb-8">
                  <Col offset={8} span={16}>
                    <Form.Item label={false} name="email">
                      <ADInput placeholder="Email" value={userData?.user?.email} />
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
                  className="pb-8">
                  <Col span={8} className="text-lg font-medium text-gray-500">
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
                      }}>
                      <Col span={12}>
                        <Form.Item label={false} name="password">
                          <ADInput
                            value={userPassword}
                            type="password"
                            onChange={(e) => setUserPassword(e.target.value)}
                          />
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
                  className="pb-8">
                  <Col span={8} className="text-lg font-medium text-gray-500">
                    Your School
                  </Col>
                  <Col span={16}>
                    <Form.Item label={false} name="schoolname">
                      <ADInput placeholder="School Name" value={userData?.user?.schoolName} />
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
                  className="pb-16">
                  <Col offset={8} span={16}>
                    <Row
                      gutter={{
                        xs: 8,
                        sm: 16,
                        md: 24,
                        lg: 32,
                        xl: 40,
                        xxl: 48
                      }}>
                      <Col span={12}>
                        <Form.Item label={false} name="state">
                          <ADInput placeholder="State" value={userData?.user?.state} />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label={false} name="city">
                          <ADInput placeholder="City" value={userData?.user?.city} />
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
                  className="pb-8">
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
                      className="pb-8">
                      <Col span={12}>
                        <Form.Item>
                          <ADButton type="primary" htmlType="submit" className="w-full">
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
