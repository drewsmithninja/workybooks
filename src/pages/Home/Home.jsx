import React, { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { newWorksheet, listSubject, listCCL, listGrade } from '../../app/features/home/homepageSlice';
import CardComponent from '../../components/common/CardComponent';
import MainLayout from '../../components/layout/MainLayout';
import dummyImage1 from '../../assets/images/dummyImage1.png';
import GradeComponent from '../../components/common/GradeComponent';
import TopSubjectComponent from '../../components/common/TopSubjectComponent';

function Home() {
  const user = localStorage.getItem('user');
  // const authToken = user?.payload?.verification?.isVerified ? user.payload.verification.token : null;
  const dispatch = useDispatch();
  const [rerender, setRerender] = useState(0);
  const { worksheetData, subjectData, ccsData, gradeData } = useSelector((state) => state.home);
  window.document.title = 'Workybooks App — Home';
  const worksheets = worksheetData?.data?.list;
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
          <TopSubjectComponent subjectList={subjectData?.data?.list} ccsList={ccsData?.data?.list} />
          <GradeComponent activeGrade='3' gradeList={gradeData?.data?.list} getGrade={handleGrade} />

          <Row gutter={[16, 16]} className='mt-[15px] border rounded-md'>
            <Col span={16} className='max-h-[253px] pr-0'>
              <img src={dummyImage1} alt='test' width='100%' height='100%' />
            </Col>
            <Col span={8} className='max-h-[253px] pl-0'>
              <img src={dummyImage1} alt='test' width='100%' height='100%' />
            </Col>
          </Row>

          <h3 className='uppercase pl-[15px] mt-[15px]'>New in workybooks</h3>
          <div className='flex flex-row scrollVertical width-full'>{worksheets?.length > 0 && worksheets.slice(0, 15).map((item) => <CardComponent setRerender={setRerender} key={item._id} cardData={item} cardImage={item.thumbnail} likeStatus={item.likes.isLike} />)}</div>

          <h3 className='uppercase pl-[15px] mt-[15px]'>Popular</h3>
          <div className='flex flex-row scrollVertical width-full'>{worksheets?.length > 0 && worksheets.slice(0, 15).map((item) => <CardComponent setRerender={setRerender} key={item._id} cardData={item} cardImage={item.thumbnail} likeStatus={item.likes.isLike} />)}</div>
        </div>
      )}
    </MainLayout>
  );
}

export default Home;
