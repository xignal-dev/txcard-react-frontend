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

const MainContainer = styled.div`	
  width: 100%;
  // height: 1080px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-top: 24px;
`;

const CardImageBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  width: 452px;
  height: 596px;
  margin: 0 35px;
  padding: 0 78px 0 78px;
  border-radius: 25px;
  background-color: #646464;
  
  &:hover{
    cursor: pointer;
    border: 3px solid #0139CC;
    background-color: rgba(0,0,0,0);
    // text-decoration: none;
  }
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CheckWrapper = styled.div`
  position: relative;
  width: 4vw;
  color: #0139CC;
  
  &:hover{
    cursor: pointer;
    color: #ABABAB;
  }
`;

const CardReqBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-item: flex-start;
  width: 1330px;
`;

const LeftBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  max-width: 475px;
  margin-right: 141px;
`;

const RightBox = styled.div`
  max-width: 787px;
`;

const ProfileBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 671px;
`;

const InputBox = styled.div`
  font-size: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  // width: 671px;
  height: 58px;
  margin-top: 14px;
  // border: 1px solid #CECECE;
  padding-left: 17px;
  padding-Right: 17px;
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
  // margin: 11px;
  &:focus{
    outline: none;
  }
  ::-webkit-inner-spin-button{
    -webkit-appearance: none; 
    // margin: 0; 
  }
`;

const InputContent = styled.textarea`
  display: flex;
  flex: 1;
  border: none;
  background-color: rgba(0, 0, 0, 0);
  color: #919191;
  text-align: left;
  height: 100%;
  resize: none;
  &:focus{
    outline: none;
  }
  ::-webkit-inner-spin-button{
    -webkit-appearance: none; 
    margin: 0; 
  }
`;

const Submit = styled(c.Button)`
  margin-top: 34px;
  width: 75%;
  height: 58px;
  font-size: 20px;
  font-weight: 600;
`;


const LostForm = ({ setState }) => {

  const stores = useStore(Stores);

  const inputEl = useRef(null);

  const [cardNum1, setCardNum1] = useState('');
  const [cardNum2, setCardNum2] = useState('');
  const [cardNum3, setCardNum3] = useState('');
  const [cardNum4, setCardNum4] = useState('');
  
  const [reason, setReason] = useState('');
  
  const [selectedType, setSelectedType] = useState('');
  
  const submitTypes = [
    { value: 0, label: '재발급' },
    { value: 1, label: '발급취소' },
    { value: 2, label: '기타' },
  ];



  useEffect(() => {

  }, []);



  const onChangeCardNum1 = (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
    setCardNum1(e.target.value);
  }

  const onChangeCardNum2 = (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
    setCardNum2(e.target.value);
  }

  const onChangeCardNum3 = (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
    setCardNum3(e.target.value);
  }

  const onChangeCardNum4 = (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
    setCardNum4(e.target.value);
  }
  
  const onChangeReason = (e) => {
    setReason(e.target.value);
  }
  
  const onChangeSelect = (e) => {
    setSelectedType(e);
  }


  return (
    <HomeContainer>

      <TopContainer>
        <c.BigText>{'카드 분실 신고'}</c.BigText>
        <c.LargeText style={{ color: '#0139CC' }}>{`STEP 1/3`}</c.LargeText>
      </TopContainer>

      <MainContainer style={{ marginBottom: '243px' }}>

        <CheckWrapper onClick={() => setState(1)}>
          <FontAwesomeIcon icon={faCircleArrowLeft} size={'2xl'} />
        </CheckWrapper>

        <CardReqBox>
          <LeftBox>
            <c.LargeText>{'분실 카드'}</c.LargeText>
            <c.Image src='/images/card_req_02.png' style={{ width: '294px', marginTop: '40px' }}></c.Image>
            <TextBox style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'flex-start', alignItems: 'flex-end', marginTop: '40px' }}>
              <c.TinyText>{'TRAVEL EXPRESS'}</c.TinyText>
              <p style={{ fontSize: '28px', fontWeight: 'bold' }}>{'PLATINUM'}</p>
            </TextBox>
          </LeftBox>

          <RightBox>

            <TextBox style={{ display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: '40px' }}>
              <c.LargeText style={{ fontSize: '28px' }}>{'카드 분실 신청인'}</c.LargeText>
              <c.NormalText style={{ fontSize: '24px' }}>{'ema***@gmail.com'}</c.NormalText>
            </TextBox>

            <TextBox style={{ display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', marginTop: '40px' }}>

              <c.LargeText style={{ fontSize: '28px' }}>{'카드번호'}</c.LargeText>
              <ProfileBox style={{ marginTop: '7px' }}>
                <InputBox style={{ width: '24%' }}>
                  <InputText
                    type={'input'}
                    value={cardNum1}
                    placeholder={'카드번호'}
                    style={{ minWidth: '121px' }}
                    onChange={onChangeCardNum1} >
                  </InputText>
                </InputBox>

                <InputBox style={{ width: '24%' }}>
                  <InputText
                    type={'password'}
                    value={cardNum2}
                    style={{ minWidth: '121px' }}
                    onChange={onChangeCardNum2} >
                  </InputText>
                </InputBox>

                <InputBox style={{ width: '24%' }}>
                  <InputText
                    type={'password'}
                    value={cardNum3}
                    style={{ minWidth: '121px' }}
                    onChange={onChangeCardNum3} >
                  </InputText>
                </InputBox>

                <InputBox style={{ width: '24%' }}>
                  <InputText
                    type={'password'}
                    value={cardNum4}
                    style={{ minWidth: '121px' }}
                    onChange={onChangeCardNum4} >
                  </InputText>
                </InputBox>
              </ProfileBox>

              <ProfileBox style={{ marginTop: '7px' }}>
                <c.LargeText style={{ fontSize: '28px' }}>{'분실사유'}</c.LargeText>
                <InputBox style={{ width: '75%', height: '150px' }}>
                  <InputContent
                    value={reason}
                    onChange={onChangeReason}
                    placeholder={'분실 사유 작성'}>
                  </InputContent>
                </InputBox>
              </ProfileBox>
              
              <ProfileBox style={{ marginTop: '7px' }}>
                <c.LargeText style={{ fontSize: '28px' }}>{'신청하기'}</c.LargeText>
                <InputBox style={{ width: '75%' }}>
                    <Select onChange={onChangeSelect}
                      styles={c.selectorStyle}
                      options={submitTypes}
                      placeholder={'선택'}
                      value={selectedType}
                    />
                  </InputBox>
              </ProfileBox>

              <Submit style={{ marginLeft: '25%' }}>{'신청완료'}</Submit>
            </TextBox>



          </RightBox>
        </CardReqBox>

        <CheckWrapper>
          <FontAwesomeIcon icon={faCircleArrowRight} size={'2xl'} visibility={'hidden'} />
        </CheckWrapper>

      </MainContainer>



      {/* <c.Image src="/images/main_companies.png" style={{ margin: '40px 0 1095.95px 0' }}></c.Image> */}


    </HomeContainer>
  );
};

export default LostForm;
