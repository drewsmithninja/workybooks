import {
  Button,
  Layout,
  Typography
} from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../assets/images/logo.png';
import googleIcon from '../assets/images/google-icon.png';
import cleverIcon from '../assets/images/clever-icon.png';

function SignUp() {
  window.document.title = 'Workybook - Sign Up';
  const { Header } = Layout;
  const { Paragraph } = Typography;
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
      <div className='w-[85%] max-w-[554px] h-[522px] bg-white-100 rounded-[20px] m-auto shadow flex flex-col text-center'>
        <Typography.Title level={2} className="!text-base md:!text-2xl mt-[56px]">
          Create your teacher account
        </Typography.Title>
        <Typography.Title level={5} className="!font-normal !mt-[0px] !mb-[65px] !text-[14px]">
          Signup for Workybooks
        </Typography.Title>

        <div className='flex flex-col gap-[14px] pb-[37px]'>
          <Button className='w-[85%] max-w-[358px] h-[60px] m-auto rounded-[6px]'>
            <img src={googleIcon} width="24" alt="googleIcon" className='mr-[8px]' />
            Sign in with Google Classroom
          </Button>
          <Button className='w-[85%] max-w-[358px] h-[60px] m-auto rounded-[6px]'>
            <img src={cleverIcon} width="24" alt="cleverIcon" className='mr-[8px]' />
            Sign in with Clever
          </Button>
          <Button className='w-[85%] max-w-[358px] h-[60px] m-auto rounded-[6px]'>
            Sign in with Email
          </Button>
        </div>
      </div>
      <Paragraph className='m-auto block w-[85%] max-w-[554px] text-center mt-[20px] mb-[40px]'>
        Already have an account?
        <Link to="/signin" className='ml-[5px]'>Sign In</Link>
      </Paragraph>
    </>
  );
}
export default SignUp;
