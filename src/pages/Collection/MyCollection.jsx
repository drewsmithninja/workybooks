import React, { useEffect, useState } from 'react';
import { Col, Row, Space } from 'antd';
import { FaPrint } from 'react-icons/fa';
import { MdAssignmentTurnedIn } from 'react-icons/md';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { collectionDetail } from '../../app/features/library/librarypageSlice';
import MainLayout from '../../components/layout/MainLayout';
import CardComponent from '../../components/common/CardComponent';
import shareIcon from '../../assets/images/icons/share_gray.png';
import ADTitle from '../../components/antd/ADTitle';
import ADButton from '../../components/antd/ADButton';

function MyCollection() {
  const user = JSON.parse(localStorage.getItem('user'));
  const authToken = user?.data?.verification?.isVerified ? user.data.verification.token : null;
  const { id } = useParams();
  const [rerender, setRerender] = useState(0);
  const { collectionDetailsList } = useSelector((state) => state.library);
  const collectionInfo = collectionDetailsList?.data;
  const worksheetList = collectionDetailsList?.data?.content || [];
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(
        collectionDetail({
          id
        })
      );
    }
  }, [id, rerender]);

  return (
    <MainLayout>
      <div className='px-8 pb-4 pt-4'>
        <Row gutter={16} className='pb-4 border-1 border-solid border-x-0 border-t-0'>
          <Col xs={24} md={12}>
            <ADButton onClick={() => navigate(-1)} type='link' className='!p-0'>
              <div>{'< MY COLLECTIONS'}</div>
            </ADButton>
            <ADTitle level={3}>{collectionInfo?.title}</ADTitle>
            <div className='py-3 flex text-xs'>
              <div className='pr-16'>By Mrs. Biries</div>
              <div>{`${worksheetList?.length} Worksheets`}</div>
            </div>
            <Space size='large' className='pt-1'>
              <ADTitle level={5}>Standards</ADTitle>
              <div className='w-[80px] text-center bg-gray-200'>3.W.3.1.B</div>
              <div className='w-[80px] text-center bg-gray-200'>3.W.3.1.B</div>
              <div className='w-[80px] text-center bg-gray-200'>3.W.3.1.B</div>
            </Space>
          </Col>
          <Col xs={24} md={12} className='flex justify-end items-end'>
            <Space>
              <Row gutter={16} className='text-gray-400'>
                <Col xs={24} lg={8} className='flex items-center border-y-0 border-l-0 border-solid'>
                  <div className='text-2xl mr-2 flex'>
                    <FaPrint />
                  </div>
                  <div className='text-xs text-gray-500'>PRINT</div>
                </Col>
                <Col xs={24} lg={8} className='flex items-center border-y-0 border-l-0 border-solid'>
                  <div className='text-2xl mr-2 flex'>
                    <MdAssignmentTurnedIn />
                  </div>
                  <div className='text-xs pr-4 text-gray-500'>ASSIGN</div>
                </Col>
                <Col xs={24} lg={8} className='flex items-center'>
                  <div className='text-2xl mr-2 flex'>
                    <img src={shareIcon} alt='share' />
                  </div>
                  <div className='text-xs text-gray-500 leading-snug'>Share</div>
                </Col>
              </Row>
            </Space>
          </Col>
        </Row>
      </div>
      <div className='px-8'>
        <div className='flex flex-row flex-wrap'>{worksheetList.length > 0 && worksheetList.map((item) => <CardComponent setRerender={setRerender} likeStatus={item.likes.isLike} key={Math.random()} cardData={item} cardImage={item.thumbnail} cardWidth={215} />)}</div>
      </div>
    </MainLayout>
  );
}

export default MyCollection;
