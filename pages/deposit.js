import React, { useState, useEffect,  } from 'react';
import { inject, observer } from "mobx-react";
import Container from '../components/common/container';

// desktop
import Footer from '../components/desktop/common/footer';
import Header from '../components/desktop/common/header';

import IntroForm from '../components/desktop/form/deposit/introForm';
import HistoryForm from '../components/desktop/form/deposit/historyForm';

import Stores from '../stores';


const Usdt = () => {
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

  const renderUsdt = () => {
    
    // const params = new URLSearchParams(window.location.search);
    // const s = params.get("state");
    // console.log(s);
    
    return (
      <>
        <Header />
        {state === 1 ? <IntroForm setState={setState} /> : state === 2 ? <HistoryForm setState={setState} /> : <></>}
        <Footer />
      </>
    )
  }

  return (
    <Container>
      {renderUsdt()}
    </Container>
  );
};

export default observer(Usdt);
