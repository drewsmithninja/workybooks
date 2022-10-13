import React, { useState } from 'react';
import { Button, Col, Row } from 'antd';
import MainLayout from '../../components/layout/MainLayout';
import ADButton from '../../components/antd/ADButton';
import ADInput from '../../components/antd/ADInput';
import ADTitle from '../../components/antd/ADTitle';

function UserProfile() {
  const [userPassword, setUserPassword] = useState('abcdefghijkl');
  return (
    <MainLayout>
      <div className='overflow-hidden bg-white shadow sm:rounded-lg'>
        <div className='px-4 py-5 sm:px-6'>
          <h3 className='text-3xl font-bold leading-6'>Edit Profile</h3>
          <ADTitle>Hello</ADTitle>
        </div>
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
                    <ADButton className='ml-5' size='small'>
                      Change
                    </ADButton>
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
                  <ADInput placeholder='Salutation' />
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
                      <ADInput placeholder='First Name' />
                    </Col>
                    <Col span={12}>
                      <ADInput placeholder='Last Name' />
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
                  <ADInput placeholder='Email' />
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
                      <ADInput bordered={false} value={userPassword} type='password' onChange={(e) => setUserPassword(e.target.value)} />
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
                  <ADInput placeholder='School Name' />
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
                      <ADInput placeholder='State' />
                    </Col>
                    <Col span={12}>
                      <ADInput placeholder='City' />
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
                      <ADButton type='primary' className='w-full'>
                        Custom
                      </ADButton>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    </MainLayout>
  );
}

export default UserProfile;
