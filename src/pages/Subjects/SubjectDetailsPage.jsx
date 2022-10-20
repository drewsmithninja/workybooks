import { SearchOutlined } from '@ant-design/icons';
import { Col, Input, Row, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import GradeComponent from '../../components/common/GradeComponent';
import TopSubjectComponent from '../../components/common/TopSubjectComponent';
import MainLayout from '../../components/layout/MainLayout';

let subjectDetail;
export default function SubjectDetailsPage() {
  const { id } = useParams();
  const { ccsData: ccsData1, subjectData, gradeData } = useSelector((state) => state.home);
  // eslint-disable-next-line react/jsx-no-useless-fragment
  const [ccsItems, setCCSItems] = useState(null);
  const [curSubject, setCurSubject] = useState('');
  useEffect(() => {
    setCurSubject(subjectData?.data?.list?._id);
  }, []);
  useEffect(() => {
    const ccsItemsAr = [];
    const subjTree = subjectData?.data?.list;
    subjectDetail = subjTree.find((item) => parseInt(item._id, 30) === parseInt(id, 30));
    // eslint-disable-next-line no-use-before-define
    renderCCSItem(ccsItemsAr, subjectDetail, 0);
    setCCSItems(ccsItemsAr);
  }, [id]);

  function renderCCSItem(items, ccsData, level) {
    let item = '<></>';

    if (ccsData?.topics && ccsData?.topics.length > 0) {
      if (level === 0) {
        items.push(<div className='w-full h-1' />);
      }
      if (level === 1) {
        // items.push(<div className='w-full p-0.5 bg-gray-600' />);
      }
      let style = 'self-center p-2';
      if (level === 1) style += ' text-3xl font-bold py-2';
      else if (level === 2) style += ' text-2xl font-bold py-3';

      level += 1;
      //  style+=" m-"+level*2;

      const parentItem = <div className={style}>{ccsData.title}</div>;

      // eslint-disable-next-line no-empty
      if ((curSubject === 3 && level === 2) || (curSubject === 4 && level === 3)) {
      } else {
        const subItems = [];
        for (let i = 0; i < ccsData.topics.length; i += 1) {
          renderCCSItem(subItems, ccsData.topics[i], level);
        }
        if (level === 1) {
          items.push(
            <div className='bg-white w-full'>
              {/* {parentItem} */}
              <div className='bg-white my-4 w-full'>{subItems}</div>
            </div>
          );
        }
        if (level === 2) {
          items.push(
            <div className='bg-white'>
              <div className='flex justify-between items-center'>
                <div>{parentItem}</div>
                <Input placeholder={`Search ${subjectData.title} Topics`} className='w-full max-w-[487px] h-[40px] rounded-[60px]' suffix={<SearchOutlined className='text-[#A5A5A5]' />} />
              </div>
              {/* <div className='w-full p-0.5 bg-gray-600' /> */}
              <div className='bg-gray-100 my-4 w-full'>{subItems}</div>
            </div>
          );
        }
        if (level === 3) {
          items.push(
            <div className='bg-white my-4'>
              {parentItem}
              <div className='bg-gray-100 w-full flex flex-wrap'>{subItems}</div>
            </div>
          );
        }
      }
    } else {
      if (level === 2) {
        item = (
          <div className='flex w-1/2 justify-between md-w-64 p-3  text-left text-sm font-medium text-gray-900'>
            <span>{ccsData?.title}</span>
          </div>
        );
      } else {
        item = (
          <div className='flex w-1/2 justify-between md-w-64 p-3  text-left text-sm font-medium text-gray-900'>
            <span>{ccsData?.title}</span>
          </div>
        );
      }

      items.push(item);
    }
  }
  return (
    <MainLayout>
      <TopSubjectComponent subjectList={subjectData?.data?.list} ccsList={ccsData1?.data?.list} />
      <GradeComponent activeGrade='3' gradeList={gradeData?.data} />
      <div className='w-full m-auto flex flex-wrap px-12'>{ccsItems}</div>
    </MainLayout>
  );
}
