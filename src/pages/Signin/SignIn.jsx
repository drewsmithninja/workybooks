import React, { useState, useEffect, useRef } from 'react';
import { Button, Checkbox, Form, Input, Layout, Typography } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import setUserLoggedIn from '../../redux/actions/userAction';
import { setCredentials } from '../../redux/auth/authSlice';
import { useLoginMutation } from '../../redux/auth/authApiSlice';
import logo from '../../assets/images/logo.png';
import googleIcon from '../../assets/images/google-icon.png';
import cleverIcon from '../../assets/images/clever-icon.png';

function SignIn() {
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');

  window.document.title = 'Workybook - Sign In';
  const { Header } = Layout;
  const { Paragraph } = Typography;

  const userRef = useRef();
  const errorRef = useRef();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation;

  const dispatch = useDispatch();

  // const login = () => {
  //   dispatch(setUserLoggedIn(true));
  // };

  useEffect(() => {
    useRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = await login({
        user,
        pwd
      }).unwrap();
      dispatch(
        setCredentials({
          ...userData,
          user
        })
      );
      setUser('');
      setPwd('');
      navigate('/');
    } catch (error) {
      if (!error?.response) {
        setErrMsg('No Server Response');
      } else if (error?.response?.status === 400) {
        setErrMsg('Missing username and Password');
      } else if (error?.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed');
      }
      errorRef.current.focus();
    }
  };

  const handleUserInput = (e) => setUser(e.target.value);
  const handlePwdInput = (e) => setPwd(e.target.value);

  const content = isLoading ? (
    <h1>Loading</h1>
  ) : (
    <section>
      <p ref={errorRef}>Hello World</p>
      <h1>Employee Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor='username'>
          UserName:
          <input type='text' id='username' ref={userRef} value={user} onChange={handleUserInput} autoComplete='off' required />
        </label>
        <label htmlFor='password'>
          Password:
          <input type='text' id='password' ref={userRef} value={user} onChange={handleUserInput} autoComplete='off' required />
        </label>
        <button type='button'>Sign In</button>
      </form>
    </section>
  );

  return content;
  // <>
  //   <Header className='h-20 relative container mx-auto'>
  //     <div className='flex items-center justify-between pt-2'>
  //       <div>
  //         <Link to='/'>
  //           <img
  //             src={logo}
  //             alt='logo'
  //             style={{
  //               width: 100
  //             }}
  //           />
  //         </Link>
  //       </div>
  //     </div>
  //   </Header>
  //   <div className='w-[85%] max-w-[554px] h-[688px] bg-white-100 rounded-[20px] m-auto shadow flex flex-col text-center'>
  //     <Typography.Title level={2} className='mt-[56px] !mb-[65px]'>
  //       Sign in
  //     </Typography.Title>

  //     <div className='flex flex-col gap-[14px] pb-[37px]'>
  //       <Button className='w-[85%] max-w-[358px] h-[60px] m-auto rounded-[6px]'>
  //         <img src={googleIcon} width='24' alt='googleIcon' className='mr-[8px]' />
  //         Sign in with Google Classroom
  //       </Button>
  //       <Button className='w-[85%] max-w-[358px] h-[60px] m-auto rounded-[6px]'>
  //         <img src={cleverIcon} width='24' alt='cleverIcon' className='mr-[8px]' />
  //         Sign in with Clever
  //       </Button>
  //       <Button className='w-[85%] max-w-[358px] h-[60px] m-auto rounded-[6px]'>Sign in with Email</Button>
  //     </div>

  //     <Form>
  //       <Form.Item label={false}>
  //         <Input placeholder='Email' className='w-[85%] max-w-[358px] h-[46px] m-auto rounded-[6px]' />
  //       </Form.Item>
  //       <Form.Item label={false}>
  //         <Input.Password placeholder='Password' className='w-[85%] max-w-[358px] h-[46px] m-auto rounded-[6px]' />
  //       </Form.Item>
  //       <div className='w-[85%] max-w-[358px] m-auto flex items-baseline justify-between'>
  //         <Form.Item label={false}>
  //           <Checkbox className='mr-[10px]' />
  //           Remember me
  //         </Form.Item>
  //         <Link to='/'>Forgot your password?</Link>
  //       </div>
  //       <Link to='/select-classroom'>
  //         <Button type='primary' className='w-[85%] max-w-[358px] m-auto' onClick={() => login()}>
  //           Sign In
  //         </Button>
  //       </Link>
  //     </Form>
  //   </div>
  //   <Paragraph className='m-auto block w-[85%] max-w-[554px] text-center mt-[20px] mb-[40px]'>
  //     Don’t have an account?
  //     <Link to='/sign-up' className='ml-[5px]'>
  //       Sign up
  //     </Link>
  //   </Paragraph>
  //   <Typography.Title level={5} className='m-auto block w-[85%] max-w-[554px] !pb-[107px] text-center font-medium'>
  //     <span className='font-medium'>Student?&nbsp;</span>
  //     <Link to='/' className='ml-[5px]'>
  //       Go here
  //     </Link>
  //   </Typography.Title>
  // </>
}
export default SignIn;
