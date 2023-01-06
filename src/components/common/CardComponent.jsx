/* eslint-disable no-return-assign */
import React, { useCallback, useState } from 'react';
import { Checkbox, Dropdown } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { EllipsisOutlined, HeartFilled, HeartOutlined } from '@ant-design/icons';
import ADButton from '../antd/ADButton';
import ADImage from '../antd/ADImage';
import { getCollections } from '../../app/features/collection/collectionSlice';
import { likeWorksheet } from '../../app/features/home/homepageSlice';
import printIcon from '../../assets/images/icons/print_gray.png';
import assignIcon from '../../assets/images/icons/assign_gray.png';
import folderIcon from '../../assets/images/icons/folder_gray.png';
import shareIcon from '../../assets/images/icons/share_gray.png';
import { selectWorksheet, setCurrentWorksheet, unSelectWorksheet } from '../../app/features/worksheet/worksheetSlice';
import AddToCollectionModal from '../modals/AddToCollectionModal';
import AssignModal from '../modals/AssignModal';
import { getAssignments, setCurrentStep } from '../../app/features/assignment/assignmentSlice';
import dummyImage from '../../assets/images/dummyImage.png';

function CardComponent({ cardWidth = 215, item, setRerender }) {
  const selectedWorksheets = useSelector((state) => state.worksheet.selectedWorksheets);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isCollectionModalOpen, setIsCollectionModalOpen] = useState(false);

  const dispatch = useDispatch();

  const showAssignModal = () => {
    setIsAssignModalOpen(true);
    dispatch(getAssignments());
  };
  const handleAssignModalOk = () => {
    setIsAssignModalOpen(false);
    dispatch(setCurrentStep(0));
  };
  const handleAssignModalCancel = () => {
    setIsAssignModalOpen(false);
  };
  const showCollectionModal = () => {
    dispatch(getCollections());
    dispatch(setCurrentWorksheet(item));
    setIsCollectionModalOpen(true);
  };
  const handleCollectionModalOk = () => {
    setIsCollectionModalOpen(false);
  };
  const handleCollectionModalCancel = () => {
    setIsCollectionModalOpen(false);
  };

  const setLike = async () => {
    const data = {
      id: await item._id,
      status: {
        like: (await item?.likes?.isLike) !== undefined ? !item?.likes?.isLike : true
      }
    };
    await dispatch(likeWorksheet(data)).then(setRerender(Math.random()));
  };

  const items = [
    {
      label: <span className='ml-2'>PRINT</span>,
      key: '1',
      icon: <ADImage width={25} src={printIcon} alt='print' />
    },
    {
      label: <span className='ml-2'>ASSIGN</span>,
      key: '2',
      icon: <ADImage width={25} src={assignIcon} alt='assign' />,
      onClick: showAssignModal
    },
    {
      label: <span className='ml-2'>ADD TO COLLECTION</span>,
      key: '3',
      icon: <ADImage width={25} src={folderIcon} alt='add to collection' />,
      onClick: showCollectionModal
    },
    {
      label: <span className='ml-2'>SHARE</span>,
      key: '4',
      icon: <ADImage width={25} src={shareIcon} alt='share' />
    }
  ];

  const addToCollectionModal = <AddToCollectionModal closable={false} open={isCollectionModalOpen} onOk={handleCollectionModalOk} onCancel={handleCollectionModalCancel} />;
  const assignModal = <AssignModal closable={false} open={isAssignModalOpen} onOk={handleAssignModalOk} onCancel={handleAssignModalCancel} />;

  return (
    <>
      {addToCollectionModal}
      {assignModal}
      <div
        className='cardComponent m-3 flex max-w-auto flex-col gap-[10px]'
        style={{
          width: cardWidth
        }}
      >
        {/* Card Image */}
        <div
          className='topImage rounded-2xl'
          style={{
            width: cardWidth
          }}
        >
          <Link to={item._id ? `/worksheet/${item._id}` : ''}>
            <ADImage src={item?.thumbnail} onError={(e) => (e.target.src = dummyImage)} alt='cardImage' className='rounded-2xl w-full object-cover' />
          </Link>
        </div>

        {/* Card action buttons */}
        <div className='cardActionButtons flex items-center'>
          <div className='flex flex-1 items-center'>
            <Checkbox
              checked={selectedWorksheets?.includes(item?._id)}
              className='w-[25px] scale-125 cardCheckbox'
              onChange={useCallback(
                (e) => {
                  if (e.target.checked) {
                    dispatch(selectWorksheet(item?._id));
                  } else {
                    dispatch(unSelectWorksheet(item?._id));
                  }
                },
                [item?._id]
              )}
              // onChange={(e) => {
              //   if (e.target.checked) {
              //     dispatch(selectWorksheet(item?._id));
              //   } else {
              //     dispatch(unSelectWorksheet(item?._id));
              //   }
              // }}
              id={`collection_id_${item.worky_id}`}
              name={`collection_id_${item.worky_id}`}
            />
          </div>
          <ADButton className='flex flex-1 items-center justify-center' onClick={setLike} type='text'>
            {item.likes.isLike ? <HeartFilled className='text-[25px] text-red-500 cursor-pointer' /> : <HeartOutlined className='text-[25px] text-gray-300 cursor-pointer' />}
          </ADButton>
          <div className='flex flex-1 items-center justify-end'>
            <Dropdown
              onClick={() => dispatch(setCurrentWorksheet(item))}
              menu={{
                items
              }}
              trigger={['click']}
              placement='topLeft'
              arrow
              className='cursor-pointer'
            >
              <div className='rounded-full border-solid border-2 border-slate-300 flex'>
                <EllipsisOutlined className='text-[18px] text-medium p-px text-gray-400' />
              </div>
            </Dropdown>
          </div>
        </div>

        {/* Card Title */}
        <p className='leading-4 text-[12px] mb-0'>{`${item.title}-${item?.descrpt?.substring(0, 50)}`}</p>

        {/* Card author */}
        <p className='leading-4 text-[10px] text-gray-400'>{item.author}</p>

        {/* Extra content */}
        <div className='flex flex-row gap-[10px]'>
          {item?.stds_topic?.length > 0 &&
            item?.stds_topic?.slice(0, 3).map((t, index) => (
              <span key={index} className='leading-4 text-[10px] bg-gray-300 text-black px-[3px] rounded-[3px]'>
                {t}
              </span>
            ))}
        </div>
      </div>
    </>
  );
}

export default CardComponent;
