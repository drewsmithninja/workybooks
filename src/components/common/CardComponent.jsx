import {
  EditOutlined,
  EllipsisOutlined,
  HeartFilled,
  HeartOutlined
} from '@ant-design/icons';
import {
  Button,
  Checkbox,
  Dropdown,
  Menu
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCollection, unselectCollection } from '../../redux/actions/selectedCollectionAction';

import printIcon from '../../assets/images/icons/print_gray.png';
import assignIcon from '../../assets/images/icons/assign_gray.png';
import folderIcon from '../../assets/images/icons/folder_gray.png';
import shareIcon from '../../assets/images/icons/share_gray.png';

function CardComponent({
  cardImage = 'https://via.placeholder.com/400x200',
  cardTitle = 'Short passage - find the meaning of the word - Ruth Bader',
  cardAuthor = 'By Workybooks',
  isLiked = true,
  isChecked = false,
  extraDetails = ['3.W.3.1.B', '3.W.3.1.B', '3.W.3.1.B'],
  cardWidth = 215,
  cardData = {}
}) {
  const dispatch = useDispatch();
  const { collections } = useSelector((state) => state);
  const [c, setc] = useState(false);
  const menu = (
    <Menu
      items={[
        {
          label: 'PRINT',
          key: '1',
          icon: <img src={printIcon} alt='print' />
        },
        {
          label: 'ASSIGN',
          key: '2',
          icon: <img src={assignIcon} alt='assign' />
        },
        {
          label: 'ADD TO COLLECTION',
          key: '3',
          icon: <img src={folderIcon} alt='add to collection' />
        },
        {
          label: 'SHARE',
          key: '4',
          icon: <img src={shareIcon} alt='share' />
        }
      ]}
    />
  );
  useEffect(() => {
    if (collections.selectedCollections.length > 0) {
      if (collections.selectedCollections.findIndex((x) => x.id === cardData.id) > -1) {
        setc(true);
      } else {
        setc(false);
      }
    }
  }, [collections]);
  return (
    <div className='cardComponent m-3 flex max-w-auto flex-col gap-[10px]' style={{ width: cardWidth }}>
      {/* Card Image */}
      <div className='topImage bg-gray-300 rounded-2xl'>
        <img src={cardImage} alt='cardImage' className='rounded-2xl w-full' />
      </div>

      {/* Card action buttons */}
      <div className='cardActionButtons flex items-center'>
        <div className='flex flex-1 items-center'>
          <Checkbox
            className='w-[25px] scale-125 cardCheckbox'
            onChange={(e) => {
              if (e.target.checked) {
                dispatch(selectCollection(cardData));
              } else {
                dispatch(unselectCollection(cardData));
              }
            }}
            id={`collection_id_${cardData.id}`}
            name={`collection_id_${cardData.id}`}
            checked={c}
          />
        </div>
        <div className='flex flex-1 items-center justify-center'>
          {isLiked ? (
            <HeartFilled className='text-[25px] text-red-500 cursor-pointer' />
          ) : (
            <HeartOutlined className='text-[25px] text-gray-300 cursor-pointer' />
          )}
        </div>
        <div className='flex flex-1 items-center justify-end'>
          <Dropdown overlay={menu} placement='topLeft' arrow>
            <Button icon={<EllipsisOutlined className='text-[18px] text-gray-400' />} shape='circle' className='bg-transparent min-w-[25px] w-[25px] h-[25px] border-[2px]' />
          </Dropdown>
        </div>
      </div>

      {/* Card Title */}
      <p className='leading-4 text-[12px] mb-0'>{cardTitle}</p>

      {/* Card author */}
      <p className='leading-4 text-[10px] text-gray-400'>{cardAuthor}</p>

      {/* Extra content */}
      <div className='flex flex-row gap-[10px]'>
        {extraDetails.length > 0 && extraDetails.map((item, index) => <p key={`extraDetails-${index + 1}`} className='leading-4 text-[10px] bg-gray-300 text-black px-[3px] rounded-[3px]'>{item}</p>)}
      </div>
    </div>
  );
}

export default CardComponent;
