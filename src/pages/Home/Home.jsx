import React, { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { newWorksheet, listSubject, listCCL, listGrade } from '../../app/features/home/homepageSlice';
import CardComponent from '../../components/common/CardComponent';
import MainLayout from '../../components/layout/MainLayout';
import dummyImage1 from '../../assets/images/dummyImage1.png';
import GradeComponent from '../../components/common/GradeComponent';
import TopSubjectComponent from '../../components/common/TopSubjectComponent';
import ADImage from '../../components/antd/ADImage';

function Home() {
  const user = localStorage.getItem('user');
  const dispatch = useDispatch();
  const [rerender, setRerender] = useState(0);
  const { worksheetData, subjectData, ccsData, gradeData } = useSelector((state) => state.home);
  window.document.title = 'Workybooks App — Home';
  const worksheets = worksheetData?.list;
  useEffect(() => {
    if (user) {
      dispatch(
        newWorksheet({
          limit: 30,
          skip: 0
        })
      );
      dispatch(listSubject());
      dispatch(listCCL());
      dispatch(listGrade());
    }
  }, [user, rerender]);

  const handleGrade = () => {};
  return (
    <MainLayout>
      {user && (
        <div className='w-full max-w-[95%] m-auto'>
          <TopSubjectComponent subjectList={subjectData?.list} ccsList={ccsData?.list} />
          <GradeComponent activeGrade='3' gradeList={gradeData?.list} getGrade={handleGrade} />

          <Row gutter={[16, 16]} className='mt-[15px] border rounded-md'>
            <Col span={16} className='max-h-[253px] pr-0'>
              <ADImage src={dummyImage1} alt='test' height='100%' />
            </Col>
            <Col span={8} className='max-h-[253px] pl-0'>
              <ADImage src={dummyImage1} alt='test' height='100%' />
            </Col>
          </Row>

          <h3 className='uppercase pl-[15px] mt-[15px]'>New in workybooks</h3>
          <div className='flex flex-row scrollVertical width-full'>{worksheets?.length && worksheets.slice(0, 15).map((item) => <CardComponent setRerender={setRerender} key={item._id} cardData={item} cardImage={item.thumbnail} likeStatus={item.likes.isLike} />)}</div>

          <h3 className='uppercase pl-[15px] mt-[15px]'>Popular</h3>
          <div className='flex flex-row scrollVertical width-full'>{worksheets?.length && worksheets.slice(0, 15).map((item) => <CardComponent setRerender={setRerender} key={item._id} cardData={item} cardImage={item.thumbnail} likeStatus={item.likes.isLike} />)}</div>
        </div>
      )}
    </MainLayout>
  );
}

export default Home;
