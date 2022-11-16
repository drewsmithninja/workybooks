/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { SearchOutlined } from '@ant-design/icons';
import { Col, Input, Row, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import GradeComponent from '../../components/common/GradeComponent';
import TopSubjectComponent from '../../components/common/TopSubjectComponent';
import MainLayout from '../../components/layout/MainLayout';
import { ccsTopic } from '../../app/features/search/searchpageSlice';

let ccsDetail; let ccsNewDetail;
export default function CCSDetailsPage() {
  const { id } = useParams();
  const { Search } = Input;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { subjectData, ccsData, gradeData } = useSelector((state) => state.home);
  // eslint-disable-next-line no-console
  // eslint-disable-next-line react/jsx-no-useless-fragment
  const [ccsItems, setCCSItems] = useState(null);
  const [curSubject, setCurSubject] = useState('');
  // useEffect(() => {
  //   setCurSubject(ccsData?.data?.list?._id);
  // }, []);
  useEffect(() => {
    const ccsItemsAr = [];
    const ccsTree = ccsData?.data?.list;
    ccsDetail = ccsTree?.find((item) => parseInt(item._id, 30) === parseInt(id, 30));
    for (let i = 0; i < ccsData?.data?.list?.length; i += 1) {
      if (ccsData?.data?.list[i]._id === id) {
        for (let j = 0; j < ccsData?.data?.list[i].tree.length; j += 1) {
          const ccs = ccsData?.data?.list[i]?.tree[j];

          // eslint-disable-next-line no-use-before-define
          renderCCSItem(ccsItemsAr, ccs, 0);
        }
        setCCSItems(ccsItemsAr);
      }
    }
  }, [id]);

  const handleGrade = (gselect) => {};

  const topicSelectHandler = (topicName) => {
    if (topicName) {
      dispatch(ccsTopic({
        id,
        topic: topicName
      }));
      navigate('/search-result');
    }
  };

  // const searchData = (dataArray, searchTerm) => dataArray?.flatMap((obj) => {
  //   const objHasSearchTerm = Object.entries(obj)
  //     .some(([key, value]) => key !== 'topics' && String(value).toLowerCase().includes(searchTerm.toLowerCase()));
  //   if (objHasSearchTerm && !obj) return [obj];
  //   const matchedTopics = searchData(obj?.topics ?? [], searchTerm);
  //   const searchedData = objHasSearchTerm || matchedTopics.length > 0 ?
  //     [{
  //       ...obj,
  //       topics: matchedTopics
  //     }] :
  //     [];
  //   return searchedData;
  // });

  const searchData = (array, searchTerm) => array.reduce((prev, curr) => {
    const children = curr.topics ? searchData(curr.topics, searchTerm) : undefined;
    return curr.id === searchTerm || children?.length > 0 ? [...prev, {
      ...curr, topics: children
    }] : prev;
    // return curr.title === searchTerm || children?.length > 0 ? [...prev, { ...curr, topics: children }] : prev;
  }, []);

  function renderCCSItem(items, ccsItem, level) {
    let item = '<></>;';

    if (ccsItem.topics && ccsItem.topics.length > 0) {
      // eslint-disable-next-line no-plusplus
      level++;
      if (level === 1) {
        items.push(<div className='w-full p-0.5 bg-gray-600' />);
      }
      let style = 'flex w-full justify-between p-2 text-left text-gray-900';
      if (level <= 1) style += ' text-2xl font-bold mt-12 text-black';
      else if (level === 2) style += ' text-xl font-bold mt-12';
      else if (level === 3) style += ' text-md font-bold mt-4';
      else style += ' text-sm ';
      let parentItem = (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div className={style} onClick={() => topicSelectHandler(ccsItem.id)}>
          <span className='cursor-pointer hover:text-blue-500'>{ccsItem.title}</span>
        </div>
      );

      if (level === 2 || level === 3) {
        const subItems = [];
        for (let i = 0; i < ccsItem.topics.length; i += 1) {
          renderCCSItem(subItems, ccsItem.topics[i], level);
        }

        parentItem = (
          <>
            <div key={ccsItem.title} onClick={() => topicSelectHandler(ccsItem.id)} className='px-2 pt-4 pb-2 flex w-full justify-between  text-left text-sm font-bold text-gray-900 '>
              <span className='cursor-pointer hover:text-blue-500'>{ccsItem.title}</span>
            </div>
            <div className='px-2 py-1 text-sm text-gray-500  w-full bg-gray-100'>{subItems}</div>
          </>
        );

        items.push(parentItem);
      } else {
        items.push(parentItem);
        for (let i = 0; i < ccsItem.topics.length; i += 1) {
          renderCCSItem(items, ccsItem.topics[i], level);
        }
      }
    } else {
      item = (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div onClick={() => topicSelectHandler(ccsItem.id)} className=' w-full border-b  my-2 px-2 text-left text-sm font-medium text-gray-700 h-auto'>
          <div className='flex flex-wrap w-full py-2 my-2 rounded-xl cursor-pointer  hover:bg-blue-100'>
            <div className='w-32  m-2 rounded-xl'>
              <span className='font-bold'>{ccsItem.id}</span>
            </div>
            <div className='flex flex-1 flex-wrap'>{ccsItem.description}</div>
            <div className='w-16 text-center'>&gt;</div>
          </div>
        </div>
      );
      items.push(item);
    }
  }

  const onSearch = (value) => {
    const ab = [];
    const ccsItemsArr = [];
    const ccsTree = ccsData?.data?.list;
    ccsNewDetail = ccsTree?.find((item) => parseInt(item._id, 30) === parseInt(id, 30));
    ab.push(ccsNewDetail?.tree);
    const newData = searchData(ccsNewDetail?.tree, '3.RL.3.2');
    for (let i = 0; i < newData?.data?.list?.length; i += 1) {
      if (newData?.data?.list[i]._id === id) {
        for (let j = 0; j < newData?.data?.list[i].tree.length; j += 1) {
          const ccs = newData?.data?.list[i]?.tree[j];

          // eslint-disable-next-line no-use-before-define
          renderCCSItem(ccsItemsArr, ccs, 0);
        }
        setCCSItems(ccsItemsArr);
      }
    }
  };

  return (
    <MainLayout>
      <TopSubjectComponent subjectList={subjectData?.data?.list} ccsList={ccsData?.data?.list} />
      <GradeComponent activeGrade='3' gradeList={gradeData?.data?.list} getGrade={handleGrade} />
      <Row gutter={[16, 16]} className='container !mx-auto mt-[30px]'>
        <Col lg={12} xs={24}>
          <Typography.Title level={3} className='md:text-left text-center'>
            {ccsDetail?.title}
            - Grade 3
          </Typography.Title>
        </Col>
        <Col lg={12} xs={24} className='text-center md:text-right'>
          <Search
            placeholder={`Search ${ccsDetail?.title} Topics`}
            className='w-full max-w-[487px] h-[40px] rounded-[60px]'
            suffix={<SearchOutlined className='text-[#A5A5A5]' />}
            onSearch={onSearch}
          />
        </Col>
      </Row>
      <div className='w-full m-auto flex flex-wrap px-12'>{ccsItems}</div>
    </MainLayout>
  );
}
