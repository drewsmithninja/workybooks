import React, { useEffect } from 'react';
import { Col, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { newWorksheet, listSubject, listCCL, listGrade } from '../../features/home/homepageSlice';
import CardComponent from '../../components/common/CardComponent';
import MainLayout from '../../components/layout/MainLayout';
import dummyImage from '../../assets/images/dummyImage.png';
import dummyImage1 from '../../assets/images/dummyImage1.png';
import TopSubjectComponent from '../../components/common/SubjectComponent';
import GradeComponent from '../../components/common/GradeComponent';

function Home() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { worksheetData, subjectData, cclData, gradeData, isError, isSucess, message } = useSelector((state) => state.home);

  // console.log(worksheetData.data, subjectData.data, cclData.data, gradeData?.data);
  window.document.title = 'Workybooks App — Home';
  const cards = worksheetData?.data?.list;

  // Call API for Fetch home page data
  useEffect(() => {
    dispatch(newWorksheet());
    dispatch(listSubject());
    dispatch(listCCL());
    dispatch(listGrade());
  }, ['']);

  return (
    <MainLayout>
      {user && (
        <div className='w-full max-w-[95%] m-auto'>
          <TopSubjectComponent subjectList={subjectData?.data?.list} cclList={cclData?.data?.list} />
          <GradeComponent activeGrade='3' gradeList={gradeData?.data} />

          <Row gutter={[16, 16]} className='mt-[15px] border rounded-md'>
            <Col span={16} className='max-h-[253px] pr-0'>
              <img src={dummyImage1} alt='test' width='100%' height='100%' />
            </Col>
            <Col span={8} className='max-h-[253px] pl-0'>
              <img src={dummyImage1} alt='test' width='100%' height='100%' />
            </Col>
          </Row>

          <h3 className='uppercase pl-[15px] mt-[15px]'>New in workybooks</h3>
          <div className='flex flex-row scrollVertical width-full'>{cards?.length > 0 && cards.map((item) => <CardComponent key={item.workyId} cardData={item} cardImage={item.image} />)}</div>

          <h3 className='uppercase pl-[15px] mt-[15px]'>Popular</h3>
          <div className='flex flex-row scrollVertical width-full'>{cards?.length > 0 && cards.map((item) => <CardComponent key={item.workyId} cardData={item} cardImage={item.image} />)}</div>
        </div>
      )}
    </MainLayout>
  );
}

export default Home;
