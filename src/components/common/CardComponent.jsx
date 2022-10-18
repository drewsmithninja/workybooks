import { CloseOutlined, EllipsisOutlined, HeartFilled, HeartOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, Dropdown, Input, Menu, Modal, Row, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ADTitle from '../antd/ADTitle';
import ADButton from '../antd/ADButton';
import { selectCollection, unselectCollection } from '../../redux/actions/selectedCollectionAction';

import printIcon from '../../assets/images/icons/print_gray.png';
import assignIcon from '../../assets/images/icons/assign_gray.png';
import folderIcon from '../../assets/images/icons/folder_gray.png';
import shareIcon from '../../assets/images/icons/share_gray.png';

function CardComponent({
  cardImage = 'https://via.placeholder.com/400x200', cardTitle = 'Short passage - find the meaning of the word - Ruth Bader', cardAuthor = 'By Workybooks', isLiked = true, isChecked = false, extraDetails = ['3.W.3.1.B', '3.W.3.1.B', '3.W.3.1.B'], cardWidth = 215, cardData = {
  }
}) {
  const dispatch = useDispatch();
  const { collections } = useSelector((state) => state);
  const [c, setc] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isStepModalOpen, setIsStepModalOpen] = useState(false);
  const showModal = () => {
    setIsAssignModalOpen(true);
  };
  const onCreateClick = () => {
    setIsAssignModalOpen(false);
    setIsStepModalOpen(true);
  };
  // const
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
          icon: <img src={folderIcon} alt='add to collection' />,
          onClick: showModal
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
    if (collections?.selectedCollections?.length > 0) {
      if (collections?.selectedCollections?.findIndex((x) => x.id === cardData.id) > -1) {
        setc(true);
      } else {
        setc(false);
      }
    }
  }, [collections]);
  return (
    <div
      className='cardComponent m-3 flex max-w-auto flex-col gap-[10px]'
      style={{
        width: cardWidth
      }}
    >
      {/* Card Image */}
      <div className='topImage bg-gray-300 rounded-2xl'>
        <Link to={cardData.workyId ? `/worksheet/${cardData.workyId}` : ''}>
          <img src={cardImage} alt='cardImage' className='rounded-2xl w-full' />
        </Link>
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
            id={`collection_id_${cardData.workyId}`}
            name={`collection_id_${cardData.workyId}`}
            checked={c}
          />
        </div>
        <div className='flex flex-1 items-center justify-center'>{isLiked ? <HeartFilled className='text-[25px] text-red-500 cursor-pointer' /> : <HeartOutlined className='text-[25px] text-gray-300 cursor-pointer' />}</div>
        <div className='flex flex-1 items-center justify-end'>
          <Dropdown overlay={menu} placement='topLeft' arrow>
            <div className='rounded-full border-solid border-2 border-slate-300 flex'>
              <EllipsisOutlined className='text-[18px] text-medium p-px text-gray-400' />
            </div>
          </Dropdown>
          <Modal className='rounded-xl' centered width={670} footer={false} closable={false} visible={isAssignModalOpen}>
            <ADTitle level={3} className='text-center pb-8'>
              Assign
            </ADTitle>
            <Row className='pb-8'>
              <Col xs={24} sm={8}>
                <div className='bg-slate-300 h-auto w-[200px] aspect-[3/4]' />
              </Col>
              <Col xs={24} sm={16}>
                <div className='sm:pl-4'>
                  <ADTitle level={5}>Create new Assignment</ADTitle>
                  <Row gutter={16} className='py-4' wrap={false}>
                    <Col xs={24} flex='auto'>
                      <Input className='w-full flex min-w-full' />
                    </Col>
                    <Col xs={24} flex='none'>
                      <ADButton type='primary' size='small' className='!rounded-full' onClick={onCreateClick}>
                        Create
                      </ADButton>
                    </Col>
                  </Row>
                  <div className='border border-solid border-black border-x-0 border-t-0' />
                  <ADTitle level={5} className='py-4'>
                    Add to existing Assignment
                  </ADTitle>
                  {Array(3)
                    .fill('Fractions')
                    .map((item) => (
                      <Row gutter={16} key={item} className='mt-4'>
                        <Col flex='none'>
                          <div className='bg-slate-300 h-auto w-[75px] aspect-[4/3]' />
                        </Col>
                        <Col xs={24} flex='auto' className='flex items-center'>
                          {item}
                        </Col>
                      </Row>
                    ))}
                </div>
              </Col>
            </Row>
          </Modal>
          <Modal
            className='rounded-xl'
            closeIcon={(
              <CloseOutlined
                // until fix text-danger class need to apply this styles
                style={{
                  color: '#EC1E24'
                }}
                className='!text-danger font-bold'
                onClick={() => setIsStepModalOpen(false)}
              />
            )}
            centered
            width={670}
            footer={false}
            visible={isStepModalOpen}
          >
            <ADTitle level={3} className='text-center text-danger pb-8'>
              Create New Assign Activities
            </ADTitle>
          </Modal>
        </div>
      </div>

      {/* Card Title */}
      <p className='leading-4 text-[12px] mb-0'>
        {cardData.name}
        -
        {cardData.description}
      </p>

      {/* Card author */}
      <p className='leading-4 text-[10px] text-gray-400'>{cardData.writtenBy}</p>

      {/* Extra content */}
      <div className='flex flex-row gap-[10px]'>
        {extraDetails.length > 0 &&
          extraDetails.map((item, index) => (
            <p key={`extraDetails-${index + 1}`} className='leading-4 text-[10px] bg-gray-300 text-black px-[3px] rounded-[3px]'>
              {item}
            </p>
          ))}
      </div>
    </div>
  );
}

export default CardComponent;
