import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Col, Form, Input, Layout, Row, Typography } from 'antd';
import { toast } from 'react-toastify';
import Spinner from '../../components/spinner/Spinner';
import { register, reset } from '../../features/auth/authSlice';
import logo from '../../assets/images/logo.png';
import googleIcon from '../../assets/images/google-icon.png';
import cleverIcon from '../../assets/images/clever-icon.png';
import ADButton from '../../components/antd/ADButton';

function SignUp() {
  window.document.title = 'Workybook - Sign Up';
  const { Header } = Layout;
  const { Paragraph } = Typography;
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate('/');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  if (isLoading) {
    <Spinner />;
  }

  const onFinish = (values) => {
    if (values.password !== values.confirmPassword) {
      toast.error("Password doesn't match");
    }
    dispatch(register(values));
    toast.success('Successfully signed up.');
  };

  const onFinishFailed = () => {
    toast.error('Something Wrong!, Not able to Register your account!');
  };

  return (
    <>
      <Header className='h-20 relative container mx-auto'>
        <div className='flex items-center justify-between pt-2'>
          <div>
            <Link to='/'>
              <img
                src={logo}
                alt='logo'
                style={{
                  width: 100
                }}
              />
            </Link>
          </div>
        </div>
      </Header>
      <div className='w-[85%] max-w-[554px] min-h-[522px] bg-white-100 rounded-[20px] m-auto shadow flex flex-col text-center'>
        <Typography.Title level={2} className='!text-base md:!text-2xl mt-[56px]'>
          Create your teacher account
        </Typography.Title>
        <Typography.Title level={5} className='!font-normal !mt-[0px] !mb-[65px] !text-[14px]'>
          Sign-up for Workybooks
        </Typography.Title>

        <div className='flex flex-col gap-[14px] pb-[37px]'>
          <Link to='/sign-up-google'>
            <ADButton className='w-[85%] max-w-[358px] h-[60px] m-auto rounded-[6px]'>
              <img src={googleIcon} width='24' alt='googleIcon' className='mr-[8px]' />
              Sign up with Google Classroom
            </ADButton>
          </Link>
          <ADButton className='w-[85%] max-w-[358px] h-[60px] m-auto rounded-[6px]'>
            <img src={cleverIcon} width='24' alt='cleverIcon' className='mr-[8px]' />
            Sign up with Clever
          </ADButton>
          <ADButton className='w-[85%] max-w-[358px] h-[60px] m-auto rounded-[6px]' onClick={() => setFormData(true)}>
            Sign up with Email
          </ADButton>
        </div>

        <Form onFinish={onFinish} form={form} onFinishFailed={onFinishFailed}>
          <Row gutter={[16, 16]} className='w-[85%] max-w-[358px] !m-auto'>
            <Col span={12} className='!pl-[0px]'>
              <Form.Item
                label={false}
                name='firstName'
                rules={[
                  {
                    type: 'text'
                  },
                  {
                    required: true,
                    message: 'Please input your first name!'
                  }
                ]}
              >
                <Input placeholder='First Name' className='w-full h-[46px] m-auto rounded-[6px]' />
              </Form.Item>
            </Col>
            <Col span={12} className='!pr-0'>
              <Form.Item
                label={false}
                name='lastName'
                rules={[
                  {
                    type: 'text'
                  },
                  {
                    required: true,
                    message: 'Please input your last name!'
                  }
                ]}
              >
                <Input placeholder='Last Name' className='w-full h-[46px] m-auto rounded-[6px]' />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]} className='w-[85%] max-w-[358px] !m-auto'>
            <Col span={24} className='!pr-0 !pl-0'>
              <Form.Item
                label={false}
                name='email'
                rules={[
                  {
                    type: 'email',
                    message: 'The input is not valid E-mail!'
                  },
                  {
                    required: true,
                    message: 'Please input your E-mail!'
                  }
                ]}
              >
                <Input placeholder='Email' className='w-full h-[46px] m-auto rounded-[6px]' />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]} className='w-[85%] max-w-[358px] !m-auto'>
            <Col span={12} className='!pl-[0px]'>
              <Form.Item
                label={false}
                name='password'
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!'
                  }
                ]}
                hasFeedback
              >
                <Input.Password placeholder='Password' className='w-full h-[46px] m-auto rounded-[6px]' />
              </Form.Item>
            </Col>
            <Col span={12} className='!pr-0'>
              <Form.Item
                label={false}
                name='confirmPassword'
                dependencies={['password']}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: 'Please confirm your password!'
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }

                      return Promise.reject(new Error('The two passwords that you entered do not match!'));
                    }
                  })
                ]}
              >
                <Input.Password placeholder='Confirm' className='w-full h-[46px] m-auto rounded-[6px]' />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]} className='w-[85%] max-w-[358px] !m-auto'>
            <Typography.Title level={5} className='!font-medium'>
              Your School
            </Typography.Title>
          </Row>
          <Row gutter={[16, 16]} className='w-[85%] max-w-[358px] !m-auto'>
            <Col span={24} className='!pr-0 !pl-0'>
              <Form.Item
                name='schoolName'
                label={false}
                rules={[
                  {
                    required: true,
                    message: 'Please input your school name!',
                    whitespace: true
                  }
                ]}
              >
                <Input placeholder='School Name' className='w-full h-[46px] m-auto rounded-[6px]' />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]} className='w-[85%] max-w-[358px] !m-auto'>
            <Col span={12} className='!pl-[0px]'>
              <Form.Item
                label={false}
                name='state'
                rules={[
                  {
                    type: 'text'
                  },
                  {
                    required: true,
                    message: 'Please input your state!'
                  }
                ]}
              >
                <Input placeholder='State' className='w-full h-[46px] m-auto rounded-[6px]' />
              </Form.Item>
            </Col>
            <Col span={12} className='!pr-0'>
              <Form.Item
                label={false}
                name='city'
                rules={[
                  {
                    required: true,
                    message: 'Please input your city!',
                    whitespace: true
                  }
                ]}
              >
                <Input placeholder='City' className='w-full h-[46px] m-auto rounded-[6px]' />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]} className='w-[85%] max-w-[358px] !m-auto'>
            <ADButton type='primary' htmlType='submit' className='w-full'>
              Sign Up
            </ADButton>
            <Paragraph className='m-auto block max-w-[554px] text-center mt-[0px] !mb-[40px] text-xs'>
              By signing up I agree to Workybooks
              <Link to='/' className='ml-[5px]'>
                Terms of Service
              </Link>
            </Paragraph>
          </Row>
        </Form>
      </div>
      <Paragraph className='m-auto block w-[85%] max-w-[554px] text-center mt-[20px] !pb-[40px]'>
        Already have an account?
        <Link to='/sign-in' className='ml-[5px]'>
          Sign In
        </Link>
      </Paragraph>
    </>
  );
}
export default SignUp;
