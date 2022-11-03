import { Input, AutoComplete } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { search, searchSuggest, reset } from '../../features/search/searchpageSlice';

function SearchBar() {
  const { Search } = Input;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [optionsVal, setoptionVal] = useState([]);
  const { suggestKeyword } = useSelector((state) => state.search);

  const options = suggestKeyword?.data?.result ? suggestKeyword?.data?.result : [];

  const onSearchtext = (value) => {
    if (value !== '' && value !== undefined) {
      dispatch(search({
        search: value,
        subject: [],
        grade: [],
        commonCoreStandards: [],
        stds_topic: []
      }));
      navigate('/search-result');
    }
  };

  // const onSeach = (value) => {
  //   if (value !== '' && value !== undefined) {
  //     dispatch(search({
  //       search: value,
  //       subject: [],
  //       grade: [],
  //       commonCoreStandards: []
  //     }));
  //     navigate('/search-result');
  //   }
  // };

  const onChangekeyword = (value) => {
    if (value) {
      dispatch(searchSuggest({
        search: value
      }));
    } else {
      dispatch(reset());
    }
  };

  useEffect(() => {
    if (suggestKeyword) {
      const obj5 = {
        ...options
      };
      const obj6 = Object.keys(obj5).map((k) => ({
        value: obj5[k]
      }));
      setoptionVal(obj6);
    }
  }, [suggestKeyword]);

  useEffect(() => {
    dispatch(reset());
  }, ['']);

  return (
    <div className='w-full h-16 flex items-center bg-[#243E8F]'>
      {/* <Input.Search className='w-1/2 mx-auto block h-10 searchInput' placeholder='Search by common core standard, topic or keyword' onSearch={onSearchtext} onChange={onChangekeyword} defaultValue={searchQuery} /> */}
      <AutoComplete allowClear className='w-1/2 mx-auto block h-10 searchInput' placeholder='Search by common core standard, topic or keyword' onSelect={onSearchtext} onChange={onChangekeyword} options={optionsVal || []} />
    </div>
  );
}
export default SearchBar;
