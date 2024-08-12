import React, { useState, useEffect, useMemo } from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import { useStore } from "mobx-store-provider";
import Select from "react-select";

import c from "../../common/commonStyle";
import { selectorStyle } from '../../common/commonStyle';
// import config from '../../../../config';
import api from '../../../../utils/api';
import Stores from '../../../../stores';



const IntroContainer = styled.div`	
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
  height: 346px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

const TopBox = styled.div`
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
`;

const Profile = styled.img`
  width: 134px;
  height: 134px;
`;

const Edit = styled.button`
  margin-top: 20px;
  border-radius: 50px;
  font-size: 18px;
  padding: 7px 20px;
  // width: 91px;
  // height: 29px;
  color: #ABABAB;
  background-color: #000;
  font-weight: 600;
  border: 1px solid #ABABAB;
  
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

const TopSubBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  // align-items: space-between;
`;

const TopMiniBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  // justify-content: flex-start;
`;

const MidContainer = styled.div`
  width: 100%;
  background-color: #fff;
  height: 1850px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  color: #000;
  // padding: 377px;
`;

const MidContentBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;

const MidAssetBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 705px;
  height: 157px;
  border-radius: 5px;
  background-color: #F1F2F4;
  margin-right: 32px;
`;

const MidAssetDescBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const HistoryBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-item: flex-start;
  width: 1482px;
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

const MidMeritBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 10px;
  margin-right: 32px;
  background-color: rgba(0, 0, 0, 100);
  color: #fff;
  padding: 18px;
`;

const SmallText = styled(c.SmallText)`	
  font-size: 18px;
  font-weight: 600;
  white-space: pre-line;
  line-height: 28px;
  text-align: start;
`;

const TinyText = styled(c.TinyText)`	
  font-size: 12px;
  font-weight: 400;
  white-space: pre-line;
  line-height: 28px;
`;

const HomeForm = () => {

  const stores = useStore(Stores);

  useEffect(() => {
    const init = async () => {
      console.log('accessToken', window.localStorage.getItem('accessToken'));
    };

    init();
  }, []);

  return (
    <IntroContainer>

      <TopContainer>
        <TopBox>
          <c.Image style={{ width: '134px' }} src={'/images/Profile_01.png'}></c.Image>
          <Edit>{'EDIT'}</Edit>
        </TopBox>
        <TopBox style={{ alignItems: 'flex-start' }}>
          <c.SmallText>{'Nick Name'}</c.SmallText>
          <c.LargeText>{'aaaa***@gmail.com'}</c.LargeText>
          <TopSubBox>
            <TopMiniBox>
              <c.TinyText>{'Email'}</c.TinyText>
              <c.TinyText>{'aaaa***@gmail.com'}</c.TinyText>
              <c.TinyText style={{ marginTop: '10px' }}>{'Country Region'}</c.TinyText>
              <c.TinyText>{'South Korea'}</c.TinyText>
            </TopMiniBox>
            <TopMiniBox>
              <c.TinyText>{'Phone'}</c.TinyText>
              <c.TinyText>{'******345'}</c.TinyText>
              <c.TinyText style={{ marginTop: '10px' }}>{'Grade'}</c.TinyText>
              <c.TinyText>{'Platinum'}</c.TinyText>
            </TopMiniBox>
          </TopSubBox>
        </TopBox>
        <TopBox>
          <c.Image src={'/images/card_req_02.png'}></c.Image>
        </TopBox>
        <TopBox style={{ alignItems: 'flex-start' }}>
          <c.SmallText>{'이용중인 카드'}</c.SmallText>
          <c.LargeText>{'이용중인 카드가 없어요'}</c.LargeText>
          <Edit>{'발급받기'}</Edit>
        </TopBox>
      </TopContainer>

      <MidContainer>
        <c.LargeText style={{ width: '1482px', textAlign: 'start' }}>{'나의 자산'}</c.LargeText>
        <MidContentBox>
          <MidAssetBox style={{ marginRight: '32px' }}>
            <c.Image src='/images/txpoint_vnd_01.png' style={{ width: '126px' }}></c.Image>
            <MidAssetDescBox>
              <c.SmallText>{'VND'}<span style={{ fontSize: '18px', color: '#ABABAB' }}>{' VDN (Vietnam Dong)'}</span></c.SmallText>
              <c.NormalText style={{ fontSize: '28px' }}>{'1,000,000'}<span style={{ fontSize: '18px', color: '#ABABAB' }}>{' VDN'}</span></c.NormalText>
              <c.TinyText style={{ fontSize: '18px', color: '#5383FF' }}>{'≈ 100,000 USDT / 200,000 KRW'}</c.TinyText>
            </MidAssetDescBox>
          </MidAssetBox>

          <MidAssetBox>
            <c.Image src='/images/txpoint_txpoint_01.png' style={{ width: '126px' }}></c.Image>
            <MidAssetDescBox>
              <c.SmallText>{'TX POINT'}</c.SmallText>
              <c.NormalText style={{ fontSize: '28px' }}>{'5,000,000'}<span style={{ fontSize: '18px', color: '#ABABAB' }}>{' TX'}</span></c.NormalText>
              <c.TinyText style={{ fontSize: '18px', color: '#5383FF' }}>{'≈ 100,000 USDT / 200,000 KRW'}</c.TinyText>
            </MidAssetDescBox>
          </MidAssetBox>
        </MidContentBox>

        <c.LargeText style={{ width: '1482px', textAlign: 'start', marginTop: '65px' }}>{'TX POINT 내역'}</c.LargeText>
        <HistoryBox>
          <HistoryTable>
            <thead>
              <tr>
                <HistoryTh>#</HistoryTh>
                <HistoryTh>TX No.</HistoryTh>
                <HistoryTh>Date</HistoryTh>
                <HistoryTh>Amount (VND)</HistoryTh>
                <HistoryTh>Fee+VAT (VND)</HistoryTh>
                <HistoryTh>Balance (VND)</HistoryTh>
              </tr>
            </thead>
            <tbody>
              <HistoryTr>
                <HistoryTd>1</HistoryTd>
                <HistoryTd>2352598734</HistoryTd>
                <HistoryTd>2024/06/23</HistoryTd>
                <HistoryTd>1,200,000</HistoryTd>
                <HistoryTd>2,300</HistoryTd>
                <HistoryTd>12,000,000</HistoryTd>
              </HistoryTr>
              <HistoryTr>
                <HistoryTd>2</HistoryTd>
                <HistoryTd>2352598734</HistoryTd>
                <HistoryTd>2024/06/23</HistoryTd>
                <HistoryTd>1,200,000</HistoryTd>
                <HistoryTd>2,300</HistoryTd>
                <HistoryTd>12,000,000</HistoryTd>
              </HistoryTr>
              <HistoryTr>
                <HistoryTd>3</HistoryTd>
                <HistoryTd>2352598734</HistoryTd>
                <HistoryTd>2024/06/23</HistoryTd>
                <HistoryTd>1,200,000</HistoryTd>
                <HistoryTd>2,300</HistoryTd>
                <HistoryTd>12,000,000</HistoryTd>
              </HistoryTr>
            </tbody>
          </HistoryTable>
        </HistoryBox>

        <c.LargeText style={{ width: '1482px', textAlign: 'start', marginTop: '65px' }}>{'나의 혜택'}</c.LargeText>
        <MidContentBox>
          <MidAssetBox style={{ marginRight: '32px' }}>
            <c.Image src='/images/cards_01.png' style={{ width: '126px' }}></c.Image>
            <MidAssetDescBox>
              <c.SmallText>{'보유중인 혜택 수'}</c.SmallText>
              <c.NormalText style={{ fontSize: '28px' }}>{'120'}<span style={{ fontSize: '18px', color: '#ABABAB' }}>{' 개'}</span></c.NormalText>
            </MidAssetDescBox>
          </MidAssetBox>

          <MidAssetBox style={{ backgroundColor: '#000' }}>
            <c.LargeText style={{ width: '100%', color: '#FFE000' }}>{'이달의 혜택'}</c.LargeText>
          </MidAssetBox>
        </MidContentBox>

        <MidContentBox style={{ marginTop: '60px' }}>
          <MidMeritBox style={{ width: '339.2px', height: '159px', backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.527), rgba(0, 0, 0, 0.5)), url(/images/merit_02.jpg)', backgroundPosition: 'top', backgroundSize: 'cover', }}>
            <TinyText>{'성형외과'}</TinyText>
            <SmallText>{'피부재생 스킨부스터'}</SmallText>
            <TinyText style={{ marginTop: '53px' }}>{'프레쉬 성형외과'}</TinyText>
          </MidMeritBox>
          <MidMeritBox style={{ width: '339.2px', height: '159px', backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.527), rgba(0, 0, 0, 0.5)), url(/images/merit_01.png)', backgroundPosition: 'center', backgroundSize: 'cover' }}>
            <TinyText>{'산부인과'}</TinyText>
            <SmallText>{'우먼 시크릿 \n타이트닝 패키지'}</SmallText>
            <TinyText style={{ marginTop: '23px' }}>{'쉬즈힐의원'}</TinyText>
          </MidMeritBox>
          <MidMeritBox style={{ width: '339.2px', height: '159px', backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.527), rgba(0, 0, 0, 0.5)), url(/images/merit_02.jpg)', backgroundPosition: 'center', backgroundSize: 'cover' }}>
            <TinyText>{'성형외과'}</TinyText>
            <SmallText>{'피부재생 스킨부스터'}</SmallText>
            <TinyText style={{ marginTop: '53px' }}>{'프레쉬 성형외과'}</TinyText></MidMeritBox>
          <MidMeritBox style={{ width: '339.2px', height: '159px', backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.527), rgba(0, 0, 0, 0.5)), url(/images/merit_01.png)', backgroundPosition: 'center', backgroundSize: 'cover' }}>
            <TinyText>{'산부인과'}</TinyText>
            <SmallText>{'우먼 시크릿 \n타이트닝 패키지'}</SmallText>
            <TinyText style={{ marginTop: '23px' }}>{'쉬즈힐의원'}</TinyText></MidMeritBox>
        </MidContentBox>

        <MidContentBox style={{ marginTop: '20px' }}>
          <MidMeritBox style={{ width: '339.2px', height: '159px', backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.527), rgba(0, 0, 0, 0.5)), url(/images/merit_02.jpg)', backgroundPosition: 'center', backgroundSize: 'cover' }}>
            <TinyText>{'성형외과'}</TinyText>
            <SmallText>{'피부재생 스킨부스터'}</SmallText>
            <TinyText style={{ marginTop: '23px' }}>{'프레쉬 성형외과'}</TinyText></MidMeritBox>
          <MidMeritBox style={{ width: '339.2px', height: '159px', backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.527), rgba(0, 0, 0, 0.5)), url(/images/merit_01.png)', backgroundPosition: 'center', backgroundSize: 'cover' }}>
            <TinyText>{'산부인과'}</TinyText>
            <SmallText>{'우먼 시크릿 \n타이트닝 패키지'}</SmallText>
            <TinyText style={{ marginTop: '53px' }}>{'쉬즈힐의원'}</TinyText></MidMeritBox>
          <MidMeritBox style={{ width: '339.2px', height: '159px', backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.527), rgba(0, 0, 0, 0.5)), url(/images/merit_02.jpg)', backgroundPosition: 'center', backgroundSize: 'cover' }}>
            <TinyText>{'성형외과'}</TinyText>
            <SmallText>{'피부재생 스킨부스터'}</SmallText>
            <TinyText style={{ marginTop: '23px' }}>{'프레쉬 성형외과'}</TinyText></MidMeritBox>
          <MidMeritBox style={{ width: '339.2px', height: '159px', backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.527), rgba(0, 0, 0, 0.5)), url(/images/merit_01.png)', backgroundPosition: 'center', backgroundSize: 'cover' }}>
            <TinyText>{'산부인과'}</TinyText>
            <SmallText>{'우먼 시크릿 \n타이트닝 패키지'}</SmallText>
            <TinyText style={{ marginTop: '53px' }}>{'쉬즈힐의원'}</TinyText></MidMeritBox>
        </MidContentBox>

      </MidContainer>

    </IntroContainer>
  );
};

export default HomeForm;
