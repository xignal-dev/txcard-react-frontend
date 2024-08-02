import React, { useState, useEffect,  } from 'react';
import { inject, observer } from "mobx-react";
import Container from '../components/common/container';

// desktop
import Footer from '../components/desktop/common/footer';
import Header from '../components/desktop/common/header';

import IntroForm from '../components/desktop/form/txcard/introForm';
import IssueForm from '../components/desktop/form/txcard/issueForm';
import RegisterForm from '../components/desktop/form/txcard/registerForm';
import LostForm from '../components/desktop/form/txcard/lostForm';

import Stores from '../stores';


const TxCard = () => {
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

  const renderTxCard = () => {

    return (
      <>
        <Header />
        {state === 1 ? <IntroForm setState={setState} /> : state === 2 ? <IssueForm setState={setState} /> : state === 3 ? <RegisterForm setState={setState} /> : state === 4 ? <LostForm setState={setState} /> : <></>}
        <Footer />
      </>
    )
  }

  return (
    <Container>
      {renderTxCard()}
    </Container>
  );
};

export default observer(TxCard);
