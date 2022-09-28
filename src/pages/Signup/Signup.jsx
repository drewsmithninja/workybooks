import {
  Button,
  Col,
  Form,
  Input,
  Layout,
  Row,
  Typography
} from 'antd';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import setUserLoggedIn from '../../redux/actions/userAction';

import logo from '../../assets/images/logo.png';
import googleIcon from '../../assets/images/google-icon.png';
import cleverIcon from '../../assets/images/clever-icon.png';

function SignUp() {
  window.document.title = 'Workybook - Sign Up';
  const { Header } = Layout;
  const { Paragraph } = Typography;
  const [emailSignup, setEmailSignup] = useState(false);
  const dispatch = useDispatch();

  const login = () => {
    dispatch(setUserLoggedIn(true));
  };
  return (
    <>
      <Header className='h-20 relative container mx-auto'>
        <div className='flex items-center justify-between pt-2'>
          <div>
            <Link to='/'>
              <img
                src={logo}
                alt="logo"
                style={{
                  width: 100
                }}
              />
            </Link>
          </div>
        </div>
      </Header>
      <div className='w-[85%] max-w-[554px] min-h-[522px] bg-white-100 rounded-[20px] m-auto shadow flex flex-col text-center'>
        <Typography.Title level={2} className="!text-base md:!text-2xl mt-[56px]">
          Create your teacher account
        </Typography.Title>
        <Typography.Title level={5} className="!font-normal !mt-[0px] !mb-[65px] !text-[14px]">
          Signup for Workybooks
        </Typography.Title>

        <div className='flex flex-col gap-[14px] pb-[37px]'>
          <Link to="/signup-google">
            <Button className='w-[85%] max-w-[358px] h-[60px] m-auto rounded-[6px]'>
              <img src={googleIcon} width="24" alt="googleIcon" className='mr-[8px]' />
              Sign up with Google Classroom
            </Button>
          </Link>
          <Button className='w-[85%] max-w-[358px] h-[60px] m-auto rounded-[6px]'>
            <img src={cleverIcon} width="24" alt="cleverIcon" className='mr-[8px]' />
            Sign up with Clever
          </Button>
          <Button className='w-[85%] max-w-[358px] h-[60px] m-auto rounded-[6px]' onClick={() => setEmailSignup(true)}>
            Sign up with Email
          </Button>
        </div>

        {emailSignup && (
          <Form>
            <Row gutter={[16, 16]} className='w-[85%] max-w-[358px] !m-auto'>
              <Col span={12} className="!pl-[0px]">
                <Form.Item label={false}>
                  <Input placeholder='First Name' className='w-full h-[46px] m-auto rounded-[6px]' />
                </Form.Item>
              </Col>
              <Col span={12} className="!pr-0">
                <Form.Item label={false}>
                  <Input placeholder='Last Name' className='w-full h-[46px] m-auto rounded-[6px]' />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 16]} className='w-[85%] max-w-[358px] !m-auto'>
              <Col span={24} className="!pr-0 !pl-0">
                <Form.Item label={false}>
                  <Input placeholder='Email' className='w-full h-[46px] m-auto rounded-[6px]' />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 16]} className='w-[85%] max-w-[358px] !m-auto'>
              <Col span={12} className="!pl-[0px]">
                <Form.Item label={false}>
                  <Input.Password placeholder='Password' className='w-full h-[46px] m-auto rounded-[6px]' />
                </Form.Item>
              </Col>
              <Col span={12} className="!pr-0">
                <Form.Item label={false}>
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
              <Col span={24} className="!pr-0 !pl-0">
                <Form.Item label={false}>
                  <Input placeholder='School Name' className='w-full h-[46px] m-auto rounded-[6px]' />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 16]} className='w-[85%] max-w-[358px] !m-auto'>
              <Col span={12} className="!pl-[0px]">
                <Form.Item label={false}>
                  <Input placeholder='State' className='w-full h-[46px] m-auto rounded-[6px]' />
                </Form.Item>
              </Col>
              <Col span={12} className="!pr-0">
                <Form.Item label={false}>
                  <Input placeholder='City' className='w-full h-[46px] m-auto rounded-[6px]' />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 16]} className='w-[85%] max-w-[358px] !m-auto'>
              <Link to='/create-classroom' className='w-full'>
                <Button type='primary' className='w-full' onClick={() => login()}>Sign Up</Button>
              </Link>
              <Paragraph className='m-auto block max-w-[554px] text-center mt-[0px] !mb-[40px] text-xs'>
                By signing up I agree to Workybooks
                <Link to="/" className='ml-[5px]'>Terms of Service</Link>
              </Paragraph>
            </Row>
          </Form>
        )}
      </div>
      <Paragraph className='m-auto block w-[85%] max-w-[554px] text-center mt-[20px] !pb-[40px]'>
        Already have an account?
        <Link to="/signin" className='ml-[5px]'>Sign In</Link>
      </Paragraph>
    </>
  );
}
export default SignUp;
