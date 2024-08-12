import React, { useState, useEffect,  } from 'react';
import { inject, observer } from "mobx-react";
import Container from '../components/common/container';

// desktop
import Footer from '../components/desktop/common/footer';
import Header from '../components/desktop/common/header';

import IntroForm from '../components/desktop/form/mypage/introForm';

import Stores from '../stores';


const MyPage = () => {
  const [state, setState] = useState(0);
  
  useEffect(() => {
		const init = async () => {
      // console.log("location.search >>> ", window.location.search);
      const params = new URLSearchParams(window.location.search);
      const stateVal = params.get("state");
      setState(parseInt(stateVal));
      
      console.log(stateVal);
		};

		init();
	}, []);

  const renderMyPage = () => {

    return (
      <>
        <Header />
        <IntroForm />
        <Footer />
      </>
    )
  }

  return (
    <Container>
      {renderMyPage()}
    </Container>
  );
};

export default observer(MyPage);
