import {
  Button,
  Col,
  Form,
  Input,
  Layout,
  Row,
  Typography
} from 'antd';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin, GoogleLogout, useGoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import { setUserLoggedIn, normalSignup } from '../../redux/actions/userAction';
import { setSessionUserAndToken } from '../../utils/helperAuthentication';
import { refreshTokenSetup } from '../../utils/refreshToken';

import logo from '../../assets/images/logo.png';
import googleIcon from '../../assets/images/google-icon.png';
import cleverIcon from '../../assets/images/clever-icon.png';

function SignUp() {
  window.document.title = 'Workybook - Sign Up';
  const { Header } = Layout;
  const { Paragraph } = Typography;
  const [emailSignup, setEmailSignup] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const cleverClientId = process.env.REACT_APP_CLEVER_CLIENT_ID;
  const {
    user = {}
  } = useSelector((state) => state);
  // useEffect(() => {
  //   const initClient = () => {
  //     gapi.client.init({
  //       clientId: googleClientId,
  //       scope: 'https://www.googleapis.com/auth/classroom.courses.readonly'
  //     });
  //   };
  //   gapi.load('client:auth2', initClient);
  // });

  console.log('user', user);

  const login = () => {
    dispatch(setUserLoggedIn(true));
  };

  const onSuccess = (res) => {
    console.log('Login Success: currentUser:', JSON.stringify(res));
    if (res) {
      setSessionUserAndToken(res.profileObj, res.tokenId);
      dispatch(setUserLoggedIn(true));
      navigate('/signup-google');
    }
    refreshTokenSetup(res);
  };

  useEffect(() => {
    if (user.userData.data !== undefined) {
      dispatch(setUserLoggedIn(true));
      navigate('/');
    }
  }, [user.userData.data]);

  const onFailure = (res) => {
    console.log('Login failed: res:', res);
    alert(
      'Failed to login. 😢 Please ping this'
    );
  };

  const onFinish = (values) => {
    console.log(values);
    dispatch(normalSignup(values));
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId: googleClientId,
    isSignedIn: true,
    accessType: 'offline',
    scope: 'https://www.googleapis.com/auth/classroom.courses.readonly'
    // responseType: 'code',
    // prompt: 'consent',
  });

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
          Signup for Workybooks
        </Typography.Title>

        <div className='flex flex-col gap-[14px] pb-[37px]'>
          {/* <GoogleLogin
            clientId={googleClientId}
            className='w-[85%] max-w-[358px] h-[60px] m-auto rounded-[6px]'
            buttonText='Sign up with Google Classroom'
            onSuccess={responseGoogle}
            onFailure={errorGoogle}
            cookiePolicy='single_host_origin'
            isSignedIn={true}
          /> */}
          <Button onClick={signIn} className='w-[85%] max-w-[358px] h-[60px] m-auto rounded-[6px]'>
            <img src={googleIcon} width='24' alt='googleIcon' className='mr-[8px]' />
            Sign up with Google Classroom
          </Button>
          <a href='https://clever.com/oauth/authorize?response_type=code&redirect_uri=http://localhost/3000&client_id=480d04a0aef0fd0fe7b6'>
            <Button className='w-[85%] max-w-[358px] h-[60px] m-auto rounded-[6px]'>
              <img src={cleverIcon} width='24' alt='cleverIcon' className='mr-[8px]' />
              Sign up with Clever
            </Button>
          </a>
          <Button className='w-[85%] max-w-[358px] h-[60px] m-auto rounded-[6px]' onClick={() => setEmailSignup(true)}>
            Sign up with Email
          </Button>
        </div>

        {emailSignup && (
          <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Row gutter={[16, 16]} className='w-[85%] max-w-[358px] !m-auto'>
              <Col span={12} className='!pl-[0px]'>
                <Form.Item
                  label={false}
                  name='firstname'
                  rules={[
                    {
                      required: true,
                      message: 'Please input your firstname!'
                    }
                  ]}
                >
                  <Input placeholder='First Name' className='w-full h-[46px] m-auto rounded-[6px]' />
                </Form.Item>
              </Col>
              <Col span={12} className='!pr-0'>
                <Form.Item
                  label={false}
                  name='lastname'
                  rules={[
                    {
                      required: true,
                      message: 'Please input your lastname!'
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
                      required: true,
                      message: 'Please input your email!'
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
                >
                  <Input.Password placeholder='Password' className='w-full h-[46px] m-auto rounded-[6px]' />
                </Form.Item>
              </Col>
              <Col span={12} className='!pr-0'>
                <Form.Item
                  label={false}
                  name='confirmpassword'
                  rules={[
                    {
                      required: true,
                      message: 'Please input your confirmpassword!'
                    }
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
                  label={false}
                  name='schoolname'
                  rules={[
                    {
                      required: true,
                      message: 'Please input your School Name'
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
                      required: true,
                      message: 'Please input your State'
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
                      message: 'Please input your City'
                    }
                  ]}
                >
                  <Input placeholder='City' className='w-full h-[46px] m-auto rounded-[6px]' />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 16]} className='w-[85%] max-w-[358px] !m-auto'>

              <Button type='primary' className='w-full' htmlType='submit'>Sign Up</Button>

              <Paragraph className='m-auto block max-w-[554px] text-center mt-[0px] !mb-[40px] text-xs'>
                By signing up I agree to Workybooks
                <Link to='/' className='ml-[5px]'>Terms of Service</Link>
              </Paragraph>
            </Row>
          </Form>
        )}
      </div>
      <Paragraph className='m-auto block w-[85%] max-w-[554px] text-center mt-[20px] !pb-[40px]'>
        Already have an account?
        <Link to='/signin' className='ml-[5px]'>Sign In</Link>
      </Paragraph>
    </>
  );
}
export default SignUp;
