import React, { useEffect, useState, useRef } from 'react';
import { Checkbox, Form, Input, Layout, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { login, reset, googleLogin } from '../../app/features/auth/authSlice';
import logo from '../../assets/images/logo.png';
import googleIcon from '../../assets/images/google-icon.png';
import cleverIcon from '../../assets/images/clever-icon.png';
import Spinner from '../../components/spinner/Spinner';
import ADButton from '../../components/antd/ADButton';
import ADImage from '../../components/antd/ADImage';

function NewSignIn() {
  const user = JSON.parse(localStorage.getItem('user'));
  window.document.title = 'Workybook - Sign In';
  const { Header } = Layout;
  const [form] = Form.useForm();
  const { Paragraph } = Typography;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [googleData, setGoogleData] = useState({
  });
  const { isLoading, isError, message, isGoogle } = useSelector((state) => state.auth);
  useEffect(() => {
    if (isError) {
      if (isGoogle) {
        navigate('/sign-up-google', {
          state: googleData
        });
      } else {
        toast.error(message);
      }
    } else if (user) {
      navigate('/', {
        replace: true
      });
    }

    dispatch(reset());
  }, [user, isError]);

  if (isLoading) {
    <Spinner />;
  }

  const onFinish = (values) => {
    dispatch(login(values));
  };

  const onFinishFailed = () => {
    toast.error('Something Wrong!, Not able to login!');
  };

  const googleLoginEv = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      try {
        const res = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            Authorization: `Bearer ${codeResponse.access_token}`
          }
        });
        if (res) {
          localStorage.setItem('gToken', JSON.stringify({
            accessToken: codeResponse?.access_token
          }));
          setGoogleData({
            email: res?.data?.email, firstName: res?.data?.given_name, lastName: res?.data?.family_name, accessToken: codeResponse?.access_token
          });
          dispatch(googleLogin({
            email: res?.data?.email
          }));
          // nevigate('/sign-up-google', {
          //   state: {
          //     email: res?.data?.email, firstName: res?.data?.given_name, lastName: res?.data?.family_name, accessToken: codeResponse?.access_token
          //   }
          // });
        }
      } catch (err) {
        console.error(err);
      }
    },
    onError: () => {
      toast.error('Login Failed');
    },
    prompt: 'consent'
  });

  return (
    <>
      <Header className='h-20 relative container mx-auto'>
        <div className='flex items-center justify-between pt-2'>
          <div>
            <Link to='/'>
              <ADImage
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
      <div className='w-[85%] max-w-[554px] h-[688px] bg-white-100 rounded-[20px] m-auto shadow flex flex-col text-center'>
        <Typography.Title level={2} className='mt-[56px] !mb-[65px]'>
          Sign in
        </Typography.Title>

        <div className='flex flex-col gap-[14px] pb-[37px]'>
          <ADButton onClick={() => { googleLoginEv(); }} className='w-[85%] max-w-[358px] h-[60px] m-auto rounded-[6px]'>
            <ADImage src={googleIcon} alt='googleIcon' className='w-[24px] mr-[8px]' />
            Sign in with Google Classroom
          </ADButton>
          <a href='https://clever.com/oauth/authorize?response_type=code&redirect_uri=http://localhost/3000&client_id=480d04a0aef0fd0fe7b6'>
            <ADButton className='w-[85%] max-w-[358px] h-[60px] m-auto rounded-[6px]'>
              <ADImage src={cleverIcon} alt='cleverIcon' className='w-[24px] mr-[8px]' />
              Sign in with Clever
            </ADButton>
          </a>
          <ADButton className='w-[85%] max-w-[358px] h-[60px] m-auto rounded-[6px]'>Sign in with Email</ADButton>
        </div>

        <Form onFinish={onFinish} form={form} onFinishFailed={onFinishFailed}>
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
            <Input placeholder='Email' className='w-[85%] max-w-[358px] h-[46px] m-auto rounded-[6px]' />
          </Form.Item>
          <Form.Item
            label={false}
            name='password'
            rules={[
              {
                required: true,
                message: 'Please input your password!'
              }
            ]}
          >
            <Input.Password placeholder='Password' className='w-[85%] max-w-[358px] h-[46px] m-auto rounded-[6px]' />
          </Form.Item>
          <div className='w-[85%] max-w-[358px] m-auto flex items-baseline justify-between'>
            <Form.Item label={false}>
              <Checkbox className='mr-[10px]'>Remember me</Checkbox>
            </Form.Item>
            <Link to='/forgot-password'>Forgot your password?</Link>
          </div>
          <Form.Item shouldUpdate>
            {() => (
              <ADButton type='primary' htmlType='submit' className='w-[85%] max-w-[358px] m-auto' disabled={!form.isFieldsTouched(true) || form.getFieldsError().filter(({ errors }) => errors.length).length > 0}>
                Log in
              </ADButton>
            )}
          </Form.Item>
        </Form>
      </div>
      <Paragraph className='m-auto block w-[85%] max-w-[554px] text-center mt-[20px] mb-[40px]'>
        Don’t have an account?
        <Link to='/sign-up' className='ml-[5px]'>
          Sign up
        </Link>
      </Paragraph>
      <Typography.Title level={5} className='mx-auto my-[20px] text-center font-medium'>
        <span className='font-medium'>Student?&nbsp;</span>
        <Link to='/' className='ml-[5px]'>
          Go here
        </Link>
      </Typography.Title>
      <br />
    </>
  );
}
export default NewSignIn;
