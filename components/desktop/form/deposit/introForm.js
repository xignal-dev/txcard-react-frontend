import React, { useState, useEffect, useMemo } from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import { useStore } from "mobx-store-provider";
import Select from "react-select";

import c from "../../common/commonStyle";
import config from '../../../../config';
import api from '../../../../utils/api';
import Stores from '../../../../stores';
import UsdtCtrl from '../../control/deposit/usdtCtrl';
import FiatCtrl from '../../control/deposit/fiatCtrl';



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

const DepositBox = styled.div`
  background-color: #fff; 
  padding: 20px; 
  border-radius: 20px; 
  // min-width: 40%;
  display: flex; 
  width: 617px;
  // height: 724px;
  flex-direction: column; 
  align-items: center;
`;

const TabBox = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: -webkit-fill-available;  
  padding: 0 24px 0 24px;
`;

const TabMenu = styled.div`
  padding: 15px 0 0 0;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  display: flex;
  width: 100%;
  justify-content: space-around;
`;

const TabMenuItem = styled.button`
  border: none;  
  height: 50px;
  width: 50%;
  font-style: normal;
  font-weight: 600;
  font-size: 28px;
  padding-bottom: 60px;
  background-color: #fff;
  color: ${props => props.isSelected ? '#0139CC': '#ABABAB'};
  border-bottom: ${props => props.isSelected ? '5px solid #0139CC': '3px solid #ABABAB'};

  &:active{
    // background-color: #FFF9F1;
    // color: #289BD7;
  }
  &:focus{
    outline: none;
  }
`;


const IntroForm = ({ setMemberShipState }) => {

  const stores = useStore(Stores);

  const [selectedMenu, setSelectedMenu] = useState(1);

  const [memberId, setMemberId] = useState('');
  const [memberPw, setMemberPw] = useState('');

  useEffect(() => {

  }, []);



  const onChangeId = (e) => {
    setMemberId(e.target.value);
  }

  const onChangePw = (e) => {
    setMemberPw(e.target.value);
  }

  return (
    <HomeContainer>

      <TopContainer>
        <c.BigText>{'세계 어디서나 간편하게 \n새시대의 금융서비스'}</c.BigText>

        <DepositBox style={{ marginTop: '40px' }}>

          <TabBox>
            <TabMenu>
              <TabMenuItem isSelected={selectedMenu === 0 ? true : false} onClick={() => setSelectedMenu(0)}>{'계좌 입금'}</TabMenuItem>
              <TabMenuItem isSelected={selectedMenu === 1 ? true : false} onClick={() => setSelectedMenu(1)}>{'USDT 입금'}</TabMenuItem>
            </TabMenu>
            {
              selectedMenu === 0 ?
                <FiatCtrl/>
                :
                <UsdtCtrl/>
            }
          </TabBox>
        </DepositBox>

        <c.Image src="/images/main_companies.png" style={{ margin: '40px 0 1095.95px 0' }}></c.Image>
      </TopContainer>

    </HomeContainer>
  );
};

export default IntroForm;
