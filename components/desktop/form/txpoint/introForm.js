import React, { useState, useEffect, useMemo } from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import { useStore } from "mobx-store-provider";
import Select from "react-select";

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

const ImageBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
  background-color: #0139CC;
  font-size: 20px;
  font-weight: bold;
  // padding: 0 45px;
  width: 223px;
  margin: 0 17.5px;
  border-radius: 30px;
  line-height: 56px;
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


const IntroForm = ({ setState }) => {

  const stores = useStore(Stores);



  useEffect(() => {
    const init = async () => {
    }
    
    init();
  }, []);



  const onChangeId = (e) => {
    // e.target.value = e.target.value.replace(/[^0-9]/g, '');
    // setMemberId(e.target.value.replace(/[^0-9]/g, ''));
    setMemberId(e.target.value);
  }

  const onChangePw = (e) => {
    setMemberPw(e.target.value);
  }

  return (
    <>
      <ImageBox style={{ maxHeight: '439px', margin: '51px 0 39px 0' }}>
        <c.Image src='/images/login_logo.png' style={{ zIndex: '98' }}></c.Image>
        <c.Image src='/images/tx_text_logo.png' style={{ top: '-10px', zIndex: '1' }}></c.Image>
        <c.Image src='/images/Finger_01.png' style={{ top: '-150px', left: '70px', zIndex: '99' }}></c.Image>
      </ImageBox>

      <c.Image src="/images/main_companies.png" style={{ margin: '40px 0 1095.95px 0' }}></c.Image>
    </>
  );
};

export default IntroForm;
