import React, { useState } from 'react';
import { Checkbox, Col, Dropdown, Image, Row } from 'antd';
import { EllipsisOutlined, HeartFilled, HeartOutlined } from '@ant-design/icons';
import sampleImage from '../../assets/images/no-image.jpg';
import ADCard from '../antd/ADCard';
import ADButton from '../antd/ADButton';

function ThumbnailCard({ className, cardWidth, onCheck, id, cardChecked, thumbnails = [], favorite, onFavChange, likes, dropDownMenu, ...props }) {
  return (
    <ADCard className={`${className ?? ''} ${cardWidth} bg-slate-200 h-full p-2`} hoverable {...props}>
      <div className='w-full h-full aspect-[16/9]'>
        <Row gutter={[8, 8]}>
          {thumbnails && thumbnails.length ? (
            thumbnails.slice(0, 4).map((item) => (
              <Col xs={thumbnails.length === 1 ? 24 : 12}>
                <Image preview={false} src={item} className='rounded-md' />
              </Col>
            ))
          ) : (
            <Image preview={false} src={sampleImage} alt='thumbnail-default-image' />
          )}
        </Row>
      </div>
      <div className='flex justify-between items-center py-2'>
        <Checkbox onChange={onCheck} id={id} name={id} checked={cardChecked} />
        <div className='flex items-center'>
          <ADButton className='!p-1 text-xl' type='text' onClick={onFavChange}>
            {favorite ? <HeartFilled className='text-primary' /> : <HeartOutlined className='text-secondary' />}
          </ADButton>
          <span className='text-sm'>{` ${likes}`}</span>
        </div>
        <Dropdown overlay={dropDownMenu} placement='topLeft' arrow>
          <div className='rounded-full border-solid border-2 border-slate-300 flex'>
            <EllipsisOutlined className='text-[18px] text-medium p-px text-gray-400' />
          </div>
        </Dropdown>
      </div>
      <div>Make Interfaces</div>
      <div className='flex justify-between'>
        <div className='text-xs text-secondary'>By Workybooks</div>
        <div className='text-xs text-secondary'>12 Worksheets</div>
      </div>
    </ADCard>
  );
}

ThumbnailCard.defaultProps = {
  className: '',
  cardWidth: 'w-full',
  cardChecked: false,
  favorite: false,
  likes: 15.3
  //   thumbnails: []
};
export default ThumbnailCard;
