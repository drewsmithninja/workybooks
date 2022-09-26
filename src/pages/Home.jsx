import React from 'react';
import { useSelector } from 'react-redux';
import CardComponent from '../components/common/CardComponent';
import MainLayout from '../components/layout/MainLayout';

function Home() {
  window.document.title = 'React App — Home';

  const cards = new Array(50).fill(1);
  const {
    user = {}
  } = useSelector((state) => state);
  return (
    <MainLayout>
      {user.loggedIn && (
        <>
          <h3 className='uppercase pl-[15px] mt-[15px]'>New in workybooks</h3>
          <div className='flex flex-row scrollVertical width-full'>
            {cards.length > 0 && cards.map(() => <CardComponent key={Math.random()} />)}
          </div>
        </>
      )}
    </MainLayout>
  );
}

export default Home;
