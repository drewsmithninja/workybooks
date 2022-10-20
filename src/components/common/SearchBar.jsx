import { Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { search } from '../../features/search/searchpageSlice';

function SearchBar() {
  const { Search } = Input;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState();
  const onSearchtext = (value) => {
    if (value !== '' && value !== undefined) {
      setSearchText(value);
    }
  };
  useEffect(() => {
    if (searchText !== undefined) {
      dispatch(search({
        search: searchText
      }));
      navigate('/search-result');
    }
  }, [searchText]);
  return (
    <div className='w-full h-16 flex items-center bg-[#243E8F]'>
      <Input.Search className='w-1/2 mx-auto block h-10 searchInput' placeholder='Search by common core standard, topic or keyword' onSearch={onSearchtext} />
    </div>
  );
}
export default SearchBar;
