import React, { useState, useEffect,  } from 'react';
import { inject, observer } from "mobx-react";
import Container from '../components/common/container';
import styled from 'styled-components';


import c from "../components/desktop/common/commonStyle";
import Footer from '../components/desktop/common/footer';
import Header from '../components/desktop/common/header';

import IntroForm from '../components/desktop/form/txpoint/introForm';
import ExchangeForm from '../components/desktop/form/txpoint/exchangeForm';
import GiftForm from '../components/desktop/form/txpoint/giftForm';
import HistoryForm from '../components/desktop/form/txpoint/historyForm';

import Stores from '../stores';

const HomeContainer = styled.div`	
  width: 100vw;
  // height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  color: #fff;
  background-color: #000;
  text-align: center;
  letter-spacing: -1px;
`;

const TopContainer = styled.div`	
  width: 100%;
  // height: 1080px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 128px;
`;

const MenuBox = styled.div`
  margin-top: 24px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const MenuItem = styled.a`
  color: #fff;
  background-color: #000;
  font-size: 20px;
  font-weight: bold;
  // padding: 0 45px;
  width: 223px;
  margin: 0 17.5px;
  border-radius: 30px;
  line-height: 56px;
  // border: 1px solid #D9D9D9;
  
  &:hover{
    color: #fff;
    cursor: pointer;
    text-decoration: none;
  }  
  &:active{
    background-color: #5383FF;
    color: #fff;
  }
  &:focus {
    outline: none;
  }
`;



const TxPoint = () => {
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

  const renderTxPoint = () => {
    
    return (
      <>
        <Header />
          <HomeContainer>

            <TopContainer>
              <c.BigText>{'세계 어디서나 간편한 금융자유\n'}<p style={{color: '#5383FF'}}>{'TRAVEL EXPRESS POINT'}</p></c.BigText>
              
              <MenuBox>
                <MenuItem state={state} style={{border: state == 3 ? '0px solid #D9D9D9' : '3px solid #D9D9D9', backgroundColor: state == 3 ? '#0139CC' : '#000' }} onClick={() => setState(3)}>{'선물하기'}</MenuItem>
                <MenuItem state={state} style={{border: state == 2 ? '0px solid #D9D9D9' : '3px solid #D9D9D9', backgroundColor: state == 2 ? '#0139CC' : '#000' }} onClick={() => setState(2)}>{'교환하기'}</MenuItem>
                <MenuItem state={state} style={{border: state == 4 ? '0px solid #D9D9D9' : '3px solid #D9D9D9', backgroundColor: state == 4 ? '#0139CC' : '#000' }} onClick={() => setState(4)}>{'내역보기'}</MenuItem>
              </MenuBox>
              
              {state === 1 ? <IntroForm setState={setState} /> : state === 2 ? <ExchangeForm setState={setState} /> : state === 3 ? <GiftForm setState={setState} /> : state === 4 ? <HistoryForm setState={setState} /> : <></>}


            </TopContainer>

          </HomeContainer>
        <Footer />
      </>
    )
  }

  return (
    <Container>
      {renderTxPoint()}
    </Container>
  );
};

export default observer(TxPoint);
