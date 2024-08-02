import React, { useState, useEffect } from 'react';
import { inject, observer } from "mobx-react";
import Container from '../components/common/container';

// desktop
import HomeForm from '../components/desktop/form/home/homeForm';
import Footer from '../components/desktop/common/footer';
import Header from '../components/desktop/common/header';

import Stores from '../stores';


const Index = () => {
  const [isOpen, setIsOpen] = useState(true);
  // const [deivceState, setDeivceState] = useState(process.env.NEXT_PUBLIC_DEVICE === 'mobile' ? 0 : 1);

  function renderDesktopHome() {
    return (
      <>
        <Header />
        <HomeForm />
        <Footer>
          <br />
          <p>Powered by Travel Express</p>
        </Footer>
      </>
    )
  }

  return (
    <Container>
      {renderDesktopHome()}
    </Container>
  );
};

export default observer(Index);
