import React, { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { listSubject, listCCL } from '../../app/features/home/homepageSlice';
import { getPopularWorksheets, getWorksheets } from '../../app/features/worksheet/worksheetSlice';
import CardComponent from '../../components/common/CardComponent';
import MainLayout from '../../components/layout/MainLayout';
import dummyImage1 from '../../assets/images/dummyImage1.png';
import GradeComponent from '../../components/common/GradeComponent';
import TopSubjectComponent from '../../components/common/TopSubjectComponent';
import ADImage from '../../components/antd/ADImage';
import { fetchGrades, setCurrentGrade } from '../../app/features/grade/GradeSlice';
import { getAssignments } from '../../app/features/assignment/assignmentSlice';

function Home() {
  const user = localStorage.getItem('user');
  const authToken = JSON.parse(user)?.payload?.verification?.token;

  const worksheets = useSelector((state) => state.worksheet.worksheets);
  const popularWorksheets = useSelector((state) => state.worksheet.popularWorksheets?.list);
  const { grades, currentGrade } = useSelector((state) => state.grades);
  const { subjectData, ccsData } = useSelector((state) => state.home);

  const [rerender, setRerender] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAssignments());
  }, []);

  useEffect(() => {
    if (authToken) {
      const fetchData = async () => {
        await dispatch(fetchGrades());
        await dispatch(setCurrentGrade(grades?.list?.[0]));
        await dispatch(
          getWorksheets({
            limit: 100,
            gradeId: currentGrade?._id
          })
        );
        await dispatch(
          getPopularWorksheets({
            gradeId: [currentGrade?._id]
          })
        );
        await dispatch(listSubject());
        await dispatch(listCCL());
      };
      fetchData();
    }
  }, [user, rerender]);

  return (
    <MainLayout>
      {user && (
        <div className='w-full max-w-[95%] m-auto'>
          <TopSubjectComponent subjectList={subjectData?.list} ccsList={ccsData?.list} />
          <GradeComponent />
          <Row gutter={16} className='mt-[15px] border rounded-md'>
            <Col span={16} className='max-h-[253px] pr-0'>
              <ADImage src={dummyImage1} alt='test' height='100%' />
            </Col>
            <Col span={8} className='max-h-[253px] pl-0'>
              <ADImage src={dummyImage1} alt='test' height='100%' />
            </Col>
          </Row>
          <h3 className='uppercase pl-[15px] mt-[15px]'>New in workybooks</h3>
          <div className='flex flex-row scrollVertical width-full'>{worksheets?.list?.length ? worksheets?.list?.map((item) => <CardComponent setRerender={setRerender} key={item._id} item={item} />) : <h2 className='px-4 py-24 text-center w-full'>no any worksheet here!</h2>}</div>
          <h3 className='uppercase pl-[15px] mt-[15px]'>Popular</h3>
          <div className='flex flex-row scrollVertical width-full'>{popularWorksheets?.length ? popularWorksheets?.map((item) => <CardComponent setRerender={setRerender} key={item._id} item={item} />) : <h2 className='px-4 py-24 text-center w-full'>no any popular worksheet here!</h2>}</div>
        </div>
      )}
    </MainLayout>
  );
}
export default Home;
