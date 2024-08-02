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

const LoginBox = styled.div`
  background-color: #fff; 
  padding: 20px; 
  border-radius: 20px; 
  // min-width: 40%;
  display: flex; 
  width: 617px;
  height: 724px;
  flex-direction: column; 
  align-items: center;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 535px;
  height: 89px;
  margin-top: 14px;
  // border: 1px solid #CECECE;
  padding: 15px 42.35px;
  border-radius: 10px;
  background-color: #F1F2F4;
  color: #0139CC;
`;

const InputText = styled.input`
  // font-size: 24px;
  display: flex;
  flex: 1;
  border: none;
  background-color: #F1F2F4;
  color: #ABABAB;
  text-align: left;
  height: 50px;
  IME-MODE: disabled;
  margin: 11px;
  &:focus{
    outline: none;
  }
  ::-webkit-inner-spin-button{
    -webkit-appearance: none; 
    margin: 0; 
  }
`;

const LoginButton = styled(c.Button)`
  font-size: 22px;
  width: 535px;
  height: 89px;
  margin-top: 17px;
`;



const LoginForm = ({setMemberShipState}) => {

  const stores = useStore(Stores);
  
  

  const [memberId, setMemberId] = useState('');
  const [memberPw, setMemberPw] = useState('');

  useEffect(() => {
    const preLogin = async () => {
      console.log('accessToken', window.localStorage.getItem('accessToken'));
    };

    preLogin();
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
    <HomeContainer>

      <TopContainer>
        <c.BigText>{'여행의 자유로움으로 \n로그인하기'}</c.BigText>

        <LoginBox style={{ marginTop: '40px' }}>
          <c.Image src="/images/login_logo.png" style={{ marginTop: '40px', width: '312px' }}></c.Image>
          <p style={{ fontSize: '20px', color: '#000', lineHeight: '72px' }}>{"계정이 없으시다면?"} &nbsp; <a onClick={() => setMemberShipState(2)} style={{ color: '#0139CC' }}>{'가입하기'}</a></p>
          <InputBox>
            <p style={{ width: '100px', textAlign: 'start' }}>
              {'이메일'}
            </p>
            <InputText
              type={'input'}
              value={memberId}
              placeholder={'이메일 주소를 입력하세요.'}
              onChange={onChangeId} >
            </InputText>
          </InputBox>
          <InputBox>
            <p style={{ width: '100px', textAlign: 'start' }}>
              {'비밀번호'}
            </p>
            <InputText
              type={'password'}
              value={memberPw}
              placeholder={'비밀번호를 입력하세요.'}
              onChange={onChangePw} >
            </InputText>
          </InputBox>
          <LoginButton>{'로그인 하기'}</LoginButton>
        </LoginBox>

        <c.Image src="/images/main_companies.png" style={{ margin: '40px 0 1095.95px 0' }}></c.Image>
      </TopContainer>

    </HomeContainer>
  );
};

export default LoginForm;
