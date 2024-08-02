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
  width: 1442px;
  // height: 1080px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding-top: 128px;
`;

const TopContentBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;

const TopAssetBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 705px;
  height: 157px;
  border-radius: 5px;
  background-color: #282828;
  margin-right: 32px;
`;

const TopAssetDescBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
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

const TxExchangeBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-item: flex-start;
  width: 1452px;
`;

const LeftBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 504px;
  // margin-right: 141px;
`;

const RightBox = styled.div`
  width: 907px;
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ExchangeInfoBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const InputBox = styled.div`
  font-size: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  // width: 671px;
  width: 75%;
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

const Submit = styled(c.Button)`
  margin-top: 34px;
  width: 75%;
  height: 58px;
  font-size: 20px;
  font-weight: 600;
  border-radius: 15px;
`;


const ExchangeForm = ({ setState }) => {

  const stores = useStore(Stores);

  const [exAmount, setExAmount] = useState('');
  const [exDeduction, setExDeduction] = useState('');
  const [exBalance, setExBalance] = useState('');


  useEffect(() => {
    const init = async () => {
    }
    
    init();
  }, []);


  const onChangeExAmount = (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
    setExAmount(e.target.value);
  }

  const onChangeExDeduction = (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
    setExDeduction(e.target.value);
  }

  const onChangeExBalance = (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
    setExBalance(e.target.value);
  }

  const onChangeCardNum4 = (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
    setCardNum4(e.target.value);
  }


  return (
    <HomeContainer>

      <TopContainer>
        <c.LargeText>{'나의 자산'}</c.LargeText>
        <TopContentBox>
          <TopAssetBox style={{ marginRight: '32px' }}>
            <c.Image src='/images/txpoint_vnd_01.png' style={{ width: '126px' }}></c.Image>
            <TopAssetDescBox>
              <c.SmallText>{'VND'}<span style={{ fontSize: '18px', color: '#ABABAB' }}>{' VDN (Vietnam Dong)'}</span></c.SmallText>
              <c.NormalText style={{ fontSize: '28px' }}>{'1,000,000'}<span style={{ fontSize: '18px', color: '#ABABAB' }}>{' VDN'}</span></c.NormalText>
              <c.TinyText style={{ fontSize: '18px', color: '#5383FF' }}>{'≈ 100,000 USDT / 200,000 KRW'}</c.TinyText>
            </TopAssetDescBox>
          </TopAssetBox>

          <TopAssetBox>
            <c.Image src='/images/txpoint_txpoint_01.png' style={{ width: '126px' }}></c.Image>
            <TopAssetDescBox>
              <c.SmallText>{'TX POINT'}</c.SmallText>
              <c.NormalText style={{ fontSize: '28px' }}>{'5,000,000'}<span style={{ fontSize: '18px', color: '#ABABAB' }}>{' TX'}</span></c.NormalText>
              <c.TinyText style={{ fontSize: '18px', color: '#5383FF' }}>{'≈ 100,000 USDT / 200,000 KRW'}</c.TinyText>
            </TopAssetDescBox>
          </TopAssetBox>
        </TopContentBox>
      </TopContainer>

      <MainContainer style={{ marginBottom: '243px' }}>

        <TxExchangeBox>
          <LeftBox style={{ marginTop: '99px' }}>
            <c.LargeText>{'TX POINT 교환 시 주의사항'}</c.LargeText>
            <c.SmallText style={{ color: '#ABABAB', lineHeight: '42px' }}>{'금액은 실시간 환율에 따른 금액으로 환산됩니다'}</c.SmallText>
            <c.SmallText style={{ color: '#ABABAB', lineHeight: '42px' }}>{'귀하의 카드는 사용 가능한 VND로 전환됩니다'}</c.SmallText>
            <c.SmallText style={{ color: '#ABABAB', lineHeight: '42px' }}>{'TX CARD 발급 / 등록 후에 사용이 가능합니다'}</c.SmallText>
          </LeftBox>

          <RightBox style={{ marginTop: '99px' }}>

            <ContentBox style={{ display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', }}>

              <ExchangeInfoBox>
                <c.LargeText style={{ fontSize: '28px' }}>{'오늘의 환율'}</c.LargeText>
                <c.NormalText style={{ fontSize: '20px', color: '#5383FF' }}>{'18.00 VND ≈ 10 USDT / 100 KRW'}</c.NormalText>
              </ExchangeInfoBox>

              <ExchangeInfoBox style={{ marginTop: '7px' }}>
                <c.LargeText style={{ fontSize: '28px' }}>{'환전 금액'}</c.LargeText>
                <InputBox>
                  <InputText
                    type={'input'}
                    value={exAmount}
                    placeholder={'0'}
                    style={{ minWidth: '121px' }}
                    onChange={onChangeExAmount} >
                  </InputText>
                </InputBox>
              </ExchangeInfoBox>

              <ExchangeInfoBox style={{ marginTop: '7px' }}>
                <c.LargeText style={{ fontSize: '28px' }}>{'TX PONT 차감'}</c.LargeText>
                <InputBox>
                  <InputText
                    type={'password'}
                    value={exDeduction}
                    placeholder={'0'}
                    style={{ minWidth: '121px' }}
                    onChange={onChangeExDeduction} >
                  </InputText>
                </InputBox>
              </ExchangeInfoBox>

              <ExchangeInfoBox style={{ marginTop: '7px' }}>
                <c.LargeText style={{ fontSize: '28px' }}>{'TX PONT 잔액'}</c.LargeText>
                <InputBox>
                  <InputText
                    type={'password'}
                    value={exBalance}
                    placeholder={'0'}
                    style={{ minWidth: '121px' }}
                    onChange={onChangeExBalance} >
                  </InputText>
                </InputBox>
              </ExchangeInfoBox>

              <Submit style={{ marginLeft: '25%' }}>{'등록신청'}</Submit>
            </ContentBox>

          </RightBox>
        </TxExchangeBox>

      </MainContainer>



      {/* <c.Image src="/images/main_companies.png" style={{ margin: '40px 0 1095.95px 0' }}></c.Image> */}


    </HomeContainer>
  );
};

export default ExchangeForm;
