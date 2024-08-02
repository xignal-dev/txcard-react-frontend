import React, { useState, useEffect, useMemo } from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import { useStore } from "mobx-store-provider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";

import CommonLogo from '../../common/commonLogo';
import c from "../../common/commonStyle";
import { selectorStyle } from '../../common/commonStyle';
import config from '../../../../config';
import api from '../../../../utils/api';
import Stores from '../../../../stores';



const HomeContainer = styled.div`	
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  color: #fff;
  text-align: center;
  letter-spacing: -1px;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 535px;
  height: 89px;
  margin-top: 14px;
  font-size: 20px;
  font-weight: 600;
  // border: 1px solid #CECECE;
  padding: 15px 42.35px;
  border-radius: 10px;
  background-color: #F1F2F4;
  color: #0139CC;
`;

const InputText = styled.input`
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

const Submit = styled(c.Button)`
  font-size: 22px;
  width: 535px;
  height: 89px;
  margin-top: 17px;
  border-radius: 15px;
`;



const UsdtCtrl = () => {

  const stores = useStore(Stores);



  const [memberId, setMemberId] = useState('');
  const [memberPw, setMemberPw] = useState('');

  useEffect(() => {

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

      <c.Image src="/images/usdt_intro_01.png" style={{ marginTop: '40px', width: '312px' }}></c.Image>
      <p style={{ fontSize: '20px', color: '#000', lineHeight: '72px' }}>{"0xcaf7df1e76c775d12c9727663675283720eeced1"} &nbsp; <FontAwesomeIcon icon={faCopy} /></p>
      
      <InputBox>
        <p style={{ width: '100px', textAlign: 'start' }}>
          {'보낸 주소'}
        </p>
        <InputText
          type={'input'}
          value={memberId}
          placeholder={'보낸 주소를 입력하세요'}
          onChange={onChangeId} >
        </InputText>
      </InputBox>
      <InputBox>
        <p style={{ width: '100px', textAlign: 'start' }}>
          {'입금 수량'}
        </p>
        <InputText
          type={'input'}
          value={memberId}
          placeholder={'0'}
          onChange={onChangeId} >
        </InputText>
      </InputBox>
      <InputBox>
        <p style={{ width: '100px', textAlign: 'start' }}>
          {'TX ID'}
        </p>
        <InputText
          type={'input'}
          value={memberPw}
          placeholder={'TX ID를 입력하세요'}
          onChange={onChangePw} >
        </InputText>
      </InputBox>
      <Submit>{'입금 신청하기'}</Submit>

    </HomeContainer>
  );
};

export default UsdtCtrl;
