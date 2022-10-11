import React, { useEffect } from 'react';
import { Button, Checkbox, Form, Input, Layout, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { login, reset } from '../../features/auth/authSlice';
import logo from '../../assets/images/logo.png';
import googleIcon from '../../assets/images/google-icon.png';
import cleverIcon from '../../assets/images/clever-icon.png';
import Spinner from '../../components/spinner/Spinner';
import ADButton from '../../components/antd/ADButton';

function SignIn() {
  window.document.title = 'Workybook - Sign In';
  const { Header } = Layout;
  const [form] = Form.useForm();
  const { Paragraph } = Typography;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess || user) {
      navigate('/', {
        replace: true
      });
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  if (isLoading) {
    <Spinner />;
  }

  const onFinish = (values) => {
    dispatch(login(values));
    toast.success('Successfully logged in.');
  };

  const onFinishFailed = () => {
    toast.error('Something Wrong!, Not able to login!');
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
      <div className='w-[85%] max-w-[554px] h-[688px] bg-white-100 rounded-[20px] m-auto shadow flex flex-col text-center'>
        <Typography.Title level={2} className='mt-[56px] !mb-[65px]'>
          Sign in
        </Typography.Title>

        <div className='flex flex-col gap-[14px] pb-[37px]'>
          <ADButton className='w-[85%] max-w-[358px] h-[60px] m-auto rounded-[6px]'>
            <img src={googleIcon} width='24' alt='googleIcon' className='mr-[8px]' />
            Sign in with Google Classroom
          </ADButton>
          <ADButton className='w-[85%] max-w-[358px] h-[60px] m-auto rounded-[6px]'>
            <img src={cleverIcon} width='24' alt='cleverIcon' className='mr-[8px]' />
            Sign in with Clever
          </ADButton>
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
            <Link to='/'>Forgot your password?</Link>
          </div>
          <Form.Item>
            <ADButton type='primary' htmlType='submit' className='w-[85%] max-w-[358px] m-auto'>
              Sign In
            </ADButton>
          </Form.Item>
        </Form>
      </div>
      <Paragraph className='m-auto block w-[85%] max-w-[554px] text-center mt-[20px] mb-[40px]'>
        Don’t have an account?
        <Link to='/sign-up' className='ml-[5px]'>
          Sign up
        </Link>
      </Paragraph>
      <Typography.Title level={5} className='m-auto block w-[85%] max-w-[554px] !pb-[107px] text-center font-medium'>
        <span className='font-medium'>Student?&nbsp;</span>
        <Link to='/' className='ml-[5px]'>
          Go here
        </Link>
      </Typography.Title>
    </>
  );
}
export default SignIn;
