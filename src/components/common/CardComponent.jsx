import { EllipsisOutlined, HeartFilled, HeartOutlined } from '@ant-design/icons';
import { Button, Checkbox } from 'antd';
import React from 'react';

function CardComponent({
  cardImage = 'https://via.placeholder.com/400x200',
  cardTitle = 'Short passage - find the meaning of the word - Ruth Bader',
  cardAuthor = 'By Workybooks',
  isLiked = true,
  isChecked = false,
  extraDetails = ['3.W.3.1.B', '3.W.3.1.B', '3.W.3.1.B'],
  cardWidth = 215,
  cardHeight = 274
}) {
  return (
    <div className='cardComponent m-3 flex max-w-auto flex-col gap-[10px]'>
      {/* Card Image */}
      <div className='topImage bg-gray-300 rounded-2xl'>
        <img src={cardImage} alt='cardImage' className='rounded-2xl' width={cardWidth} height={cardHeight} />
      </div>

      {/* Card action buttons */}
      <div className='cardActionButtons flex items-center'>
        <div className='flex flex-1 items-center'>
          <Checkbox className='w-[25px] scale-125 cardCheckbox' />
        </div>
        <div className='flex flex-1 items-center justify-center'>
          {isLiked ? (
            <HeartFilled className='text-[25px] text-red-500 cursor-pointer' />
          ) : (
            <HeartOutlined className='text-[25px] text-gray-300 cursor-pointer' />
          )}
        </div>
        <div className='flex flex-1 items-center justify-end'>
          <Button icon={<EllipsisOutlined className='text-[18px] text-gray-400' />} shape='circle' className='bg-transparent min-w-[25px] w-[25px] h-[25px] border-[2px]' />
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
