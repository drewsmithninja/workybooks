import { BellFilled, DownOutlined, EditOutlined, LogoutOutlined, QuestionCircleFilled } from '@ant-design/icons';
import { Dropdown, Layout, Menu, Space, Button } from 'antd';
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import setUserLoggedIn from '../../redux/actions/userAction';

import logo from '../../assets/images/logo.png';

const { Header } = Layout;
/* eslint-disable */

function Headers() {
  const navbarRef = useRef(null);
  const hamburgerRef = useRef(null);
  const dispatch = useDispatch();
  const { user = {} } = useSelector((state) => state);
  const handleToggleNavbar = () => {
    navbarRef.current.classList.toggle('flex');
    navbarRef.current.classList.toggle('hidden');
    hamburgerRef.current.classList.toggle('open');
  };

  const menu = (
    <Menu
      items={[
        {
          label: 'Edit Profile',
          key: '1',
          icon: <EditOutlined className='text-base text-gray-400' />
        },
        {
          label: 'Logout',
          key: '2',
          icon: <LogoutOutlined className='text-base text-gray-400' />,
          onClick: () => {
            logout();
          }
        }
      ]}
    />
  );

  const login = () => {
    dispatch(setUserLoggedIn(true));
  };

  const logout = () => {
    dispatch(setUserLoggedIn(false));
  };
  return (
    <Header className='h-20 relative container mx-auto'>
      {/* flex container */}
      <div className='flex items-center justify-between pt-2'>
        {/* header logo */}
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

        {/* navbar menu */}
        {user.loggedIn && (
          <div className='hidden space-x-4 md:flex'>
            <Link to='/' className='hover:text-[#243E8F]'>
              {window.location.pathname === '/' ? <span className='navbar-menu-item active-menu'>Explore</span> : <span className='navbar-menu-item'>Explore</span>}
            </Link>
            <Link to='/my-library'>{window.location.pathname === '/my-library' ? <span className='navbar-menu-item active-menu'>My Library</span> : <span className='navbar-menu-item'>My Library</span>}</Link>
            <Link to='/services'>
              <span className='navbar-menu-item'>My Classrooms</span>
            </Link>
          </div>
        )}

        {/* login/register button */}
        {!user.loggedIn ? (
          <Space>
            <Link to='/sign-in'>
              <Button className='font-bold' type='primary'>
                Sign In
              </Button>
            </Link>
            <Link to='/sign-up'>
              <Button className='font-bold' type='primary'>
                Sign Up
              </Button>
            </Link>
          </Space>
        ) : (
          <Space>
            <BellFilled className='text-2xl text-gray-400 mr-5 mt-6' />
            <Dropdown overlay={menu}>
              <Space>
                <img
                  src={
                    'data:image/png;base64,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'
                  }
                  className={'w-8'}
                />
                <DownOutlined className='mr-5' />
              </Space>
            </Dropdown>
            <QuestionCircleFilled className='text-2xl text-gray-400 mt-6' />
          </Space>
        )}

        {/* hamburger icon */}
        {user.isLoggedIn && (
          <button className='block hamburger md:hidden focus:outline-none' onClick={handleToggleNavbar} ref={hamburgerRef} id='menu-btn' type='button'>
            <span className='hamburger-top' />
            <span className='hamburger-middle' />
            <span className='hamburger-bottom' />
          </button>
        )}
      </div>

      {/* mobile menu */}
      <div className='md:hidden'>
        <div id='menu' ref={navbarRef} className='bg-backgroundColorBlack absolute flex-col items-center hidden self-end font-bold mt-6 left-6 right-6 sm:w-auto sm:self-center'>
          <Link to='/'>
            <span className='navbar-menu-item'>Explore</span>
          </Link>
          <Link to='/dashboard'>
            <span className='navbar-menu-item'>My Library </span>
          </Link>
          <Link to='/services'>
            <span className='navbar-menu-item'>My Classrooms</span>
          </Link>
        </div>
      </div>
    </Header>
  );
}

export default Headers;
