import React, { useState } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import ADButton from '../../components/antd/ADButton';
import ADInput from '../../components/antd/ADInput';

function UserProfile() {
  const [userPassword, setUserPassword] = useState('abcdefghijkl');
  return (
    <MainLayout>
      <div className='overflow-hidden bg-white shadow sm:rounded-lg'>
        <div className='px-4 py-5 sm:px-6'>
          <h3 className='text-3xl font-bold leading-6'>Edit Profile</h3>
        </div>
        <div className='border-t border-gray-200'>
          <dl>
            <div className='px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-lg text-gray-500'>Profile Picture</dt>
              <dd className='sm:col-span-2'>
                <div>
                  <div className='mt-1 flex items-center'>
                    <span className='inline-block h-[115px] w-[115px] overflow-hidden rounded-full bg-gray-100'>
                      <svg className='h-full w-full text-gray-300' fill='currentColor' viewBox='0 0 24 24'>
                        <path d='M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z' />
                      </svg>
                    </span>
                    <ADButton className='ml-5' size='small'>Change</ADButton>
                  </div>
                </div>
              </dd>
            </div>
            <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-lg font-medium text-gray-500'>Contact Information</dt>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <ADInput placeholder='Salutation' />
                </div>
              </div>
            </div>
            <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-lg font-medium text-gray-500'>{' '}</dt>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <ADInput placeholder='First Name' />
                </div>
                <div>
                  <ADInput placeholder='Last Name' />
                </div>
              </div>
            </div>
            <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-lg font-medium text-gray-500'>{' '}</dt>
              <div className='grid grid-cols-1'>
                <div>
                  <ADInput placeholder='Email' />
                </div>
              </div>
            </div>
            <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-lg font-medium text-gray-500'>Password</dt>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <ADInput bordered={false} value={userPassword} type='password' onChange={(e) => setUserPassword(e.target.value)} />
                </div>
                <div>
                  <ADButton className='w-full'>{'change password'.toUpperCase()}</ADButton>
                </div>
              </div>
            </div>
            <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-lg font-medium text-gray-500'>Your School</dt>
              <div className='grid grid-cols-1'>
                <div>
                  <ADInput placeholder='School Name' />
                </div>
              </div>
            </div>
            <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-lg font-medium text-gray-500'>{' '}</dt>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <ADInput placeholder='State' />
                </div>
                <div>
                  <ADInput placeholder='City' />
                </div>
              </div>
            </div>
            <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-lg font-medium text-gray-500'>{' '}</dt>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <ADButton className='w-full' type='primary'>SAVE</ADButton>
                </div>
              </div>
            </div>
          </dl>
        </div>
      </div>
    </MainLayout>
  );
}

export default UserProfile;
