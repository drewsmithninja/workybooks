import { SearchOutlined } from '@ant-design/icons';
import { Col, Input, Row, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import GradeComponent from '../../components/common/GradeComponent';
import TopSubjectComponent from '../../components/common/TopSubjectComponent';
import MainLayout from '../../components/layout/MainLayout';

let ccsDetail;
export default function CCSDetailsPage() {
  const { id } = useParams();
  const { subjectData, ccsData, gradeData } = useSelector((state) => state.home);
  // eslint-disable-next-line no-console
  console.log('ccsData', ccsData?.data?.list);
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
      console.log(ccsData?.data?.list[i].id);
      console.log(id);
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

  // function renderCCSItem(items, cssItems, level) {
  //   let item = '<></>';

  //   if (cssItems?.topics && cssItems?.topics.length > 0) {
  //     if (level === 0) {
  //       items.push(<div className='w-full h-1' />);
  //     }
  //     if (level === 1) {
  //       // items.push(<div className='w-full p-0.5 bg-gray-600' />);
  //     }
  //     let style = 'self-center p-2';
  //     if (level === 1) style += ' text-3xl font-bold py-2';
  //     else if (level === 2) style += ' text-2xl font-bold py-3';

  //     level += 1;
  //     //  style+=" m-"+level*2;

  //     const parentItem = <div className={style}>{cssItems.title}</div>;

  //     // eslint-disable-next-line no-empty
  //     if ((curSubject === 3 && level === 2) || (curSubject === 4 && level === 3)) {
  //     } else {
  //       const subItems = [];
  //       for (let i = 0; i < cssItems.topics.length; i += 1) {
  //         renderCCSItem(subItems, cssItems.topics[i], level);
  //       }
  //       if (level === 1) {
  //         items.push(
  //           <div className='bg-white w-full'>
  //             {/* {parentItem} */}
  //             <div className='bg-white my-4 w-full'>{subItems}</div>
  //           </div>
  //         );
  //       }
  //       if (level === 2) {
  //         items.push(
  //           <div className='bg-white'>
  //             <div className='flex justify-between items-center'>
  //               <div>{parentItem}</div>
  //               <Input placeholder={`Search ${cssItems.title} Topics`} className='w-full max-w-[487px] h-[40px] rounded-[60px]' suffix={<SearchOutlined className='text-[#A5A5A5]' />} />
  //             </div>
  //             {/* <div className='w-full p-0.5 bg-gray-600' /> */}
  //             <div className='bg-gray-100 my-4 w-full'>{subItems}</div>
  //           </div>
  //         );
  //       }
  //       if (level === 3) {
  //         items.push(
  //           <div className='bg-white my-4'>
  //             {parentItem}
  //             <div className='bg-gray-100 w-full flex flex-wrap'>{subItems}</div>
  //           </div>
  //         );
  //       }
  //     }
  //   } else {
  //     if (level === 2) {
  //       item = (
  //         <div className='flex w-1/2 justify-between md-w-64 p-3  text-left text-sm font-medium text-gray-900'>
  //           <span>{cssItems?.title}</span>
  //         </div>
  //       );
  //     } else {
  //       item = (
  //         <div className='flex w-1/2 justify-between md-w-64 p-3  text-left text-sm font-medium text-gray-900'>
  //           <span>{cssItems?.title}</span>
  //         </div>
  //       );
  //     }

  //     items.push(item);
  //   }
  // }

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
        <div className={style}>
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
            <div key={ccsItem.title} className='px-2 pt-4 pb-2 flex w-full justify-between  text-left text-sm font-bold text-gray-900 '>
              <span className='cursor-pointer hover:text-blue-500'>{ccsItem.title}</span>
            </div>
            <div className='px-2 py-1 text-sm text-gray-500  bg-gray-100'>{subItems}</div>
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
        <div className=' w-full border-b  my-2 px-2 text-left text-sm font-medium text-gray-700 h-auto'>
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

  return (
    <MainLayout>
      <TopSubjectComponent subjectList={subjectData?.data?.list} ccsList={ccsData?.data?.list} />
      <GradeComponent activeGrade='3' gradeList={gradeData?.data} />
      <div className='w-full m-auto flex flex-wrap px-12'>{ccsItems}</div>
    </MainLayout>
  );
}
