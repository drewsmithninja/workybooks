import React, { useRef } from 'react';
import { BellFilled, DownOutlined, EditOutlined, LogoutOutlined, MenuOutlined, QuestionCircleFilled } from '@ant-design/icons';
import { Dropdown, Layout, Menu, Space, Button } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';
import { logout, reset } from '../../app/features/auth/authSlice';
import logo from '../../assets/images/logo.png';
import ADButton from '../antd/ADButton';

const { Header } = Layout;

function Headers() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const navbarRef = useRef(null);
  const hamburgerRef = useRef(null);
  // const { user } = useSelector((state) => state.auth);
  const user = localStorage.getItem('user');
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
          icon: <EditOutlined className='text-base text-gray-400' />,
          onClick: () => {
            navigate('/user-profile');
          }
        },
        {
          label: 'Logout',
          key: '2',
          icon: <LogoutOutlined className='text-base text-gray-400' />,
          onClick: () => {
            dispatch(logout());
            dispatch(reset());
            navigate('/sign-in');
          }
        }
      ]}
    />
  );

  return (
    <Header className='h-20 flex justify-between items-center bg-white xl:px-10 lg:px-8 md:px-6 px-0'>
      <Link to='/'>
        <img
          src={logo}
          alt='logo'
          style={{
            width: 100
          }}
        />
      </Link>

      {/* navbar menu */}
      {user && (
        <div className='hidden space-x-4 md:flex'>
          <Link to='/' className='hover:text-[#243E8F]'>
            {window.location.pathname === '/' ? <span className='navbar-menu-item active-menu'>Explore</span> : <span className='navbar-menu-item'>Explore</span>}
          </Link>
          <Link to='/my-library'>{window.location.pathname === '/my-library' ? <span className='navbar-menu-item active-menu'>My Library</span> : <span className='navbar-menu-item'>My Library</span>}</Link>
          <Link to='/my-classrooms'>
            <span className='navbar-menu-item'>My Classrooms</span>
          </Link>
        </div>
      )}

      {/* login/register button */}
      {!user ? (
        <Space size='large'>
          <ADButton onClick={() => navigate('/sign-in')} type='primary' className='w-[100px]'>
            Sign In
          </ADButton>
          <ADButton onClick={() => navigate('/sign-up')} type='primary' className='w-[100px]'>
            Sign Up
          </ADButton>
        </Space>
      ) : (
        <Space>
          <BellFilled className='text-2xl text-gray-400 mr-5 mt-6' />
          <div className='flex'>
            <FaUserCircle className='text-4xl text-secondary' />
          </div>
          <Dropdown overlay={menu}>
            <Space>
              <DownOutlined className='mr-5' />
            </Space>
          </Dropdown>
          <QuestionCircleFilled className='text-2xl text-gray-400 mt-6' />
        </Space>
      )}

      {/* hamburger icon */}
      {user && (
        <ADButton className='hamburger md:hidden focus:outline-none bg-white' onClick={handleToggleNavbar} innerRef={hamburgerRef} id='menu-btn'>
          <MenuOutlined />
        </ADButton>
      )}

      {/* mobile menu */}
      <div className='md:hidden z-10'>
        <div id='menu' ref={navbarRef} className='bg-white border border-solid border-primary absolute flex-col items-center hidden self-end font-bold mt-6 left-0 rounded-md border-t-0 right-0 sm:w-auto sm:self-center'>
          <Link to='/' className='hover:bg-primary rounded-md h-10 w-full hover:text-white flex items-center justify-center'>
            <span className='navbar-menu-item'>Explore</span>
          </Link>
          <Link to='/my-library' className='hover:bg-primary rounded-md h-10 w-full hover:text-white flex items-center justify-center'>
            <span className='navbar-menu-item'>My Library </span>
          </Link>
          <Link to='/my-classrooms' className='hover:bg-primary rounded-md h-10 w-full hover:text-white flex items-center justify-center'>
            <span className='navbar-menu-item'>My Classrooms</span>
          </Link>
        </div>
      </div>
    </Header>
  );
}

export default Headers;
