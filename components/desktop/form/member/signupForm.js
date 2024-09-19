import React, { useState, useEffect, useMemo } from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import { useStore } from "mobx-store-provider";
import Select from "react-select";

import CommonLogo from '../../common/commonLogo';
import c from "../../common/commonStyle";
import config from '../../../../config';
import api from '../../../../utils/api';
import Stores from '../../../../stores';
import Popup from '../../common/popup';



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
  padding: 7px 20px 20px 20px;
  border-radius: 20px; 
  // min-width: 40%;
  display: flex; 
  width: 617px;
  height: 724px;
  flex-direction: column; 
  align-items: center;
`;

const InputBox = styled.div`
  font-size: 18px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 535px;
  height: 89px;
  margin-top: 14px;
  // border: 1px solid #CECECE;
  padding-left: 42.35px;
  padding-Right: 42.35px;
  border-radius: 10px;
  background-color: #F1F2F4;
  color: #0139CC;
`;

const InputText = styled.input`
  // font-size: 18px;
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
    // margin: 0; 
  }
`;

const SignupErrorText = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: #db3737;
  // margin-top: 12px;
  visibility: ${props => props.isEnabled ? 'visible' : 'hidden'};
`;


const SignupButton = styled(c.Button)`
  font-size: 22px;
  width: 535px;
  height: 89px;
  margin-top: 17px;
  border-radius: 10px;
`;


const SignupForm = ({ setMemberShipState }) => {

  const stores = useStore(Stores);

  const [memberId, setMemberId] = useState('test');
  const [memberEmail, setMemberEmail] = useState('email@mail.com');
  const [memberPw, setMemberPw] = useState('1234qwer!');
  const [memberPw2, setMemberPw2] = useState('1234qwer!');

  const [office, setOffice] = useState('');
  const [officeList, setOfficeList] = useState([]);
  
  const [errState, setErrState] = useState(0);
  const [errMessage, setErrMessage] = useState('');
  
  const [country, setCountry] = useState('');
  
  const [popupState, setPopupState] = useState(false);
  const [popupInfo, setPopupInfo] = useState({});

  const countries = [
    { value: 0, label: '한국' },
    { value: 1, label: '미국' },
    { value: 2, label: '일본' },
    { value: 3, label: '베트남' },
  ];

  useEffect(() => {
    const init = async () => {
      await Stores.officeStore.getOffices();
      const list = [];
      Stores.officeStore.officeList.forEach(element => {
        console.log(element);
        list.push({ value: element.coNo, label: element.coName})
      });
      console.log(list);
      setOfficeList(list);
    };

    init();
  }, []);



  const onChangeId = (e) => {
    // e.target.value = e.target.value.replace(/[^0-9]/g, '');
    // setMemberId(e.target.value.replace(/[^0-9]/g, ''));
    setMemberId(e.target.value);
  }
  
  const onChangeEmail = (e) => {
    setMemberEmail(e.target.value);
  }

  const onChangePw = (e) => {
    setMemberPw(e.target.value);
  }
  
  const onChangePw2 = (e) => {
    setMemberPw2(e.target.value);
  }

  const onChangeSelect = (e) => {
    // console.log(e);
    setOffice(e);
  }
  
  const setPopupResult = async (res, popupData) => {
    if(res)
      setMemberShipState(1);
    // setIsNewCard(res);
  }
  
  const onClickSignup = () => {
    
      if(memberPw != memberPw2) {
        // setErrMessage('잘못된 패스워드를 입력하였습니다');
        return;
      }

      if(memberPw.length < 8)
        return;
      
      if(memberId.length === 0 || memberEmail.length === 0)
        return;

      let data = {
        email: memberEmail,
        office: office.label,
        password: memberPw,
      }
    
    api.signup(data).then((response) => {
      
      console.log(response);
      
      if(response.status >= 200 && response.status <= 300) {
        let data = response.data;
        console.log(data);
        setPopupInfo({
          title: "알림",
          content: "회원 가입을 완료하였습니다.",
          type: 1,
        });
        setPopupState(true);
        // setMemberShipState(1)
        // Stores.authStore.setUserEmail(data.email);
        // Stores.authStore.setAccessToken(data.token.accessToken);
        // Stores.authStore.setRefreshTokenn(data.token.refreshToken);
        // Stores.authStore.authenticate();
        // Router.push({ pathname: '/', });
        // handleSubmit();
      }
    }).catch((err) => {
      console.log(err);
      // if(err.response.data.message === 'email already used') {
        
      // }
      setErrMessage(err.response.data.message);
      setErrState(2);
      setMemberPw('');
      setMemberPw2('');
      setMemberId('');
      setMemberEmail('');
      setOffice('');
    });
  }

  return (
    <HomeContainer>
      <Popup popupState={popupState} setPopupState={setPopupState} setPopupResult={setPopupResult} popupInfo={popupInfo} />
      <TopContainer>
        <c.BigText>{'여행의 자유로움에 \n가입하기'}</c.BigText>

        <LoginBox style={{ marginTop: '40px' }}>
          <p style={{ fontSize: '20px', color: '#000', lineHeight: '72px' }}>{"계정이 있으시다면?"} &nbsp; <a onClick={() => setMemberShipState(1)} style={{ color: '#0139CC' }}>{'로그인'}</a></p>
          <InputBox style={{ marginTop: '7px'}}>
            <p style={{ width: '100px', textAlign: 'start' }}>
              {'이름'}
            </p>
            <InputText
              type={'input'}
              value={memberId}
              placeholder={'영문 기입'}
              onChange={onChangeId} >
            </InputText>
          </InputBox>

          <InputBox>
            <p style={{ width: '100px', textAlign: 'start' }}>
              {'이메일'}
            </p>
            <InputText
              type={'input'}
              value={memberEmail}
              placeholder={'이메일 주소를 입력하세요.'}
              onChange={onChangeEmail} >
            </InputText>
          </InputBox>

          <InputBox>
            <p style={{ width: '100px', textAlign: 'start', marginRight: '25px' }}>
              {'지사'}
            </p>
            <Select onChange={onChangeSelect}
              styles={c.selectorStyle}
              options={officeList}
              placeholder={'선택'}
              value={office}
            />
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

          <InputBox>
            <p style={{ width: '100px', textAlign: 'start' }}>
              {'비밀번호'}
            </p>
            <InputText
              type={'password'}
              value={memberPw2}
              placeholder={'비밀번호를 확인해주세요.'}
              onChange={onChangePw2} >
            </InputText>
          </InputBox>
          
          <SignupErrorText isEnabled={memberPw != memberPw2 ? true : false}>
            {'잘못된 패스워드를 입력하였습니다'}
          </SignupErrorText>
          <SignupErrorText isEnabled={errMessage && errMessage.length > 0 ? true : false}>
            {errMessage}
          </SignupErrorText>

          <SignupButton onClick={() => onClickSignup()}>{'가입하기'}</SignupButton>
        </LoginBox>

        <c.Image src="/images/main_companies.png" style={{ margin: '40px 0 1095.95px 0' }}></c.Image>
      </TopContainer>

    </HomeContainer>
  );
};

export default SignupForm;
