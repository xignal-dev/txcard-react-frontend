import React, { useState, useEffect, useMemo, useRef } from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import { useStore } from "mobx-store-provider";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faCheckCircle, faCircleArrowRight, faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";

import CommonLogo from '../../common/commonLogo';
import c from "../../common/commonStyle";
import { selectorStyle } from '../../common/commonStyle';
import config from '../../../../config';
import api from '../../../../utils/api';
import Stores from '../../../../stores';



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

const MidContainer = styled.div`	
  width: 100%;
  // height: 1080px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-top: 24px;
`;

const HistoryBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-item: flex-start;
  width: 1330px;
`;

const HistoryTable = styled.table`
  font-size: 20px;
  width: 100%;
`;

const HistoryTr = styled.tr`
  
`;

const HistoryTh = styled.th`
  border-bottom: 3px solid #ABABAB;
  padding: 10px;
`;

const HistoryTd = styled.td`
  border-bottom: 1px solid #ABABAB;
  padding: 10px;
`;

const HistoryForm = ({ setState }) => {

  const stores = useStore(Stores);

  const inputEl = useRef(null);

  useEffect(() => {
    const init = async () => {
    }
    
    init();
  }, []);

  return (
    <HomeContainer>

      <TopContainer>
        <c.BigText>{'입금 내역을 확인하세요'}</c.BigText>
      </TopContainer>

      <MidContainer style={{ marginBottom: '243px' }}>

        <HistoryBox style={{ marginTop: '0px' }}>
          <HistoryTable>
            <thead>
              <tr>
                <HistoryTh>#</HistoryTh>
                <HistoryTh>TX No.</HistoryTh>
                <HistoryTh>Date</HistoryTh>
                <HistoryTh>Currency</HistoryTh>
                <HistoryTh>Amount</HistoryTh>
                <HistoryTh>Balance</HistoryTh>
              </tr>
            </thead>
            <tbody>
              <HistoryTr>
                <HistoryTd>1</HistoryTd>
                <HistoryTd>2352598734</HistoryTd>
                <HistoryTd>2024/06/23</HistoryTd>
                <HistoryTd>USDT</HistoryTd>
                <HistoryTd>2,300</HistoryTd>
                <HistoryTd>12,000,000</HistoryTd>
              </HistoryTr>
              <HistoryTr>
                <HistoryTd>2</HistoryTd>
                <HistoryTd>2352598734</HistoryTd>
                <HistoryTd>2024/06/23</HistoryTd>
                <HistoryTd>KRW</HistoryTd>
                <HistoryTd>2,300</HistoryTd>
                <HistoryTd>12,000,000</HistoryTd>
              </HistoryTr>
              <HistoryTr>
                <HistoryTd>3</HistoryTd>
                <HistoryTd>2352598734</HistoryTd>
                <HistoryTd>2024/06/23</HistoryTd>
                <HistoryTd>USDT</HistoryTd>
                <HistoryTd>2,300</HistoryTd>
                <HistoryTd>12,000,000</HistoryTd>
              </HistoryTr>
              <HistoryTr>
                <HistoryTd>4</HistoryTd>
                <HistoryTd>2352598734</HistoryTd>
                <HistoryTd>2024/06/23</HistoryTd>
                <HistoryTd>USDT</HistoryTd>
                <HistoryTd>2,300</HistoryTd>
                <HistoryTd>12,000,000</HistoryTd>
              </HistoryTr>
            </tbody>
          </HistoryTable>
        </HistoryBox>

      </MidContainer>



      {/* <c.Image src="/images/main_companies.png" style={{ margin: '40px 0 1095.95px 0' }}></c.Image> */}


    </HomeContainer>
  );
};

export default HistoryForm;
