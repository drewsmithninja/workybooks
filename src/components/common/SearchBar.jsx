import { Input } from 'antd';
import React from 'react';

function SearchBar() {
  return (
    <div className='w-full h-16 flex items-center bg-gray-300'>
      <Input.Search className='w-1/2 mx-auto block h-10 searchInput' placeholder='Search by common core standard, topic or keyword' />
    </div>
  );
}
export default SearchBar;
