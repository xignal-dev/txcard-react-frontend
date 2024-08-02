import React, { useState, useEffect } from 'react';
import { inject, observer } from "mobx-react";
import Container from '../components/common/container';

// desktop
import LoginForm from '../components/desktop/form/member/loginForm';
import SignupForm from '../components/desktop/form/member/signupForm';
import Footer from '../components/desktop/common/footer';
import Header from '../components/desktop/common/header';

import Stores from '../stores';


const Member = () => {
  const [memberShipState, setMemberShipState] = useState(1);
  // const [deivceState, setDeivceState] = useState(process.env.NEXT_PUBLIC_DEVICE === 'mobile' ? 0 : 1);

  function renderDesktopHome() {
    return (
      <>
        <Header />
        {memberShipState === 1 ? <LoginForm setMemberShipState={setMemberShipState} /> : <SignupForm setMemberShipState={setMemberShipState} />}
        <Footer />
      </>
    )
  }

  return (
    <Container>
      {renderDesktopHome()}
    </Container>
  );
};

export default observer(Member);
