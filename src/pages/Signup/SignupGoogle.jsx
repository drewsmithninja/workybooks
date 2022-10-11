import {
  Button,
  Col,
  Form,
  Input,
  Layout,
  Row,
  Typography
} from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setUserLoggedIn, googleSignup } from '../../redux/actions/userAction';
import { getSessionToken, getSessionUser } from '../../utils/helperAuthentication';

import logo from '../../assets/images/logo.png';

function SignUpGoogle() {
  window.document.title = 'Workybook - Sign Up';
  const { Header } = Layout;
  const dispatch = useDispatch();
  const userDetails = getSessionUser();
  const userToken = getSessionToken();
  const navigate = useNavigate();
  const {
    user = {}
  } = useSelector((state) => state);
  console.log(user.userData.data);

  const login = () => {
    dispatch(googleSignup(userToken));
    // dispatch(setUserLoggedIn(true));
  };

  const onFinish = (values) => {
    dispatch(googleSignup(userToken, values));
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    if (user.userData.data !== undefined) {
      dispatch(setUserLoggedIn(true));
      navigate('/');
    }
  }, [user.userData.data]);

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
      <div className='w-[85%] max-w-[554px] min-h-[622px] bg-white-100 rounded-[20px] m-auto shadow flex flex-col text-center'>
        <Typography.Title level={2} className='!text-base md:!text-2xl mt-[56px]'>
          Welcome
          {' '}
          {userDetails?.name}
        </Typography.Title>
        <Typography.Title level={5} className='!font-normal !mt-[0px] !mb-[65px] !text-[14px]'>
          Please confirm your details
        </Typography.Title>
        <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <Row gutter={[16, 16]} className='w-[85%] max-w-[358px] !m-auto'>
            <Col span={12} className='!pl-[0px]'>
              <Form.Item label={false}>
                <Input placeholder='First Name' className='w-full h-[46px] m-auto rounded-[6px]' value={userDetails?.givenName ? userDetails?.givenName : ''} />
              </Form.Item>
            </Col>
            <Col span={12} className='!pr-0'>
              <Form.Item label={false}>
                <Input placeholder='Last Name' className='w-full h-[46px] m-auto rounded-[6px]' value={userDetails?.familyName ? userDetails?.familyName : ''} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]} className='w-[85%] max-w-[358px] !m-auto'>
            <Col span={24} className='!pr-0 !pl-0'>
              <Form.Item label={false}>
                <Input placeholder='Email' className='w-full h-[46px] m-auto rounded-[6px]' value={userDetails?.email ? userDetails?.email : ''} />
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
                    message: 'Please input your school name!'
                  }
                ]}
              >
                <Input
                  placeholder='School Name'
                  className='w-full h-[46px] m-auto rounded-[6px]'
                />
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
                    message: 'Please input your city!'
                  }
                ]}
              >
                <Input placeholder='City' className='w-full h-[46px] m-auto rounded-[6px]' />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]} className='w-[85%] max-w-[358px] !m-auto'>

            <Button type='primary' className='w-full' htmlType='submit'>CONFIRM</Button>

          </Row>
        </Form>
      </div>
    </>
  );
}
export default SignUpGoogle;
