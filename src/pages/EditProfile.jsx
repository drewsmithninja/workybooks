import React from 'react';
import MainLayout from '../components/layout/MainLayout';

function EditProfile() {
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
                    <button type='button' className='ml-5 rounded-md border-1 border-solid border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>
                      Change
                    </button>
                  </div>
                </div>
              </dd>
            </div>
            <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-lg font-medium text-gray-500'>Contact Information</dt>
              <dd className='sm:col-span-2'>
                <input type='text' name='firstName' id='firstName' className='w-full flex-1 py-2 px-3 rounded-md border-gray-300 border-1 border-solid border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm' placeholder='www.example.com' />
              </dd>
            </div>
            <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-lg font-medium text-gray-500'>Password</dt>
              {/* <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>Backend Developer</dd> */}
            </div>
            <div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
              <dt className='text-lg font-medium text-gray-500'>Your School</dt>
              {/* <dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>Backend Developer</dd> */}
            </div>
          </dl>
        </div>
      </div>
    </MainLayout>
  );
}

export default EditProfile;
