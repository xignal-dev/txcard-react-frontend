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

const ImageBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TopContainer = styled.div`	
  width: 100%;
  height: 1080px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 128px;
`;

const Login = styled.a`
  color: #fff;
  background-color: #0139CC;
  font-size: 20px;
  font-weight: bold;
  padding: 0 45px;
  border-radius: 30px;
  line-height: 56px;
  margin-bottom: 64.26px;
  border: 0px solid #D9D9D9;
  
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

const MidContainer = styled.div`	
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 377px;
`;


const HomeForm = () => {

  const stores = useStore(Stores);

  useEffect(() => {
    const preLogin = async () => {
      console.log('accessToken', window.localStorage.getItem('accessToken'));
    };

    preLogin();
  }, []);

  return (
    <HomeContainer>

      <TopContainer>
        <c.BigText>{'세계 어디서나 간편한 \n여행을 위한 새로운 금융자유'}</c.BigText>
        <ImageBox style={{ maxHeight: '439px', margin: '51px 0 39px 0' }}>
          <c.Image src='/images/login_logo.png' style={{ zIndex: '98' }}></c.Image>
          <c.Image src='/images/tx_text_logo.png' style={{ top: '-10px', zIndex: '1' }}></c.Image>
          <c.Image src='/images/Finger_01.png' style={{ top: '-150px', left: '70px', zIndex: '99' }}></c.Image>
        </ImageBox>
        <Login href={'/member'}>{'가입 / 로그인하기'}</Login>
        <c.Image src="/images/main_companies.png"></c.Image>
      </TopContainer>

      <MidContainer style={{ height: '2557px' }}>
        <c.BigText>{'전통 금융과 웹3.0을 잇-는 \n새로운 시대의 프라이빗 카드'}</c.BigText>

        <ImageBox style={{ maxHeight: '979px', margin: '155px 0 0 0' }}>
          <c.Image src='/images/ether_01.png' style={{ top: '-10px', left: '-230px', zIndex: '98' }}></c.Image>
          <c.Image src='/images/dollar_01.png' style={{ top: '-220px', left: '180px', zIndex: '99' }}></c.Image>
          <c.Image src='/images/main_card_01.png' style={{ top: '-310px', left: '90px', zIndex: '1' }}></c.Image>
        </ImageBox>

        <ImageBox style={{ maxHeight: '296px', margin: '0 0 0 0' }}>
          <c.Image src='/images/main_3_02.png' style={{ top: '20px', left: '-400px', zIndex: '98' }}></c.Image>
          <c.Image src='/images/Store.png' style={{ top: '-210px', left: '300px', zIndex: '99' }}></c.Image>
        </ImageBox>

        <c.NormalText style={{ textAlign: 'start', color: '#00BEFF', position: 'relative', top: '-280px', left: '-280px' }}>{'압도적으로 저렴한 \n현금 환전수수료'}</c.NormalText>
        <c.SmallText style={{ color: '#ABABAB', position: 'relative', top: '-100px', left: '-400px' }}>{'타사 카드 환전수수료ㅣ'}<font style={{ color: "#00BEFF" }}>{'17% ~25%'}</font></c.SmallText>

        <ImageBox style={{ maxHeight: '112px', margin: '0 0 0 0' }}>
          <c.Image src='/images/image 239.png' style={{ top: '30px', left: '-420px', zIndex: '1' }}></c.Image>
          <c.Image src='/images/main_visa_01.png' style={{ top: '-10px', left: '250px', zIndex: '1' }}></c.Image>
        </ImageBox>

        <c.SmallText style={{ textAlign: 'start', position: 'relative', top: '16px', left: '-380px' }}>{'베트남 1위 민간은행과의 협업을 통한 \n새로운 금융서비스 제공'}</c.SmallText>
        <c.SmallText style={{ textAlign: 'start', position: 'relative', top: '-40px', left: '330px' }}>{'세계 어디서나 편리한 결제와 \nATM기 이용으로 편하게 현금화'}</c.SmallText>
      </MidContainer>

      {/* <MidContainer style={{height: '2557px'}}>
        
      </MidContainer> */}


    </HomeContainer>
  );
};

export default HomeForm;
