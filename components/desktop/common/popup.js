
import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import styled from 'styled-components';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";

import Stores from '../../../stores';
import c from "./commonStyle";

const PopupContainer = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;  
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 100000000000;
  flex-flow: '';
  // overflow: scroll;
  visibility: ${props => props.isShow ? 'visible' : 'hidden'};
  opacity: ${props => props.isShow ? '1' : '0'};
  transition: all 0.3s linear 0.3s;
`;

const Box = styled.div`
  background-color: white;
  border: none;
  max-width: 500px;
  width: 100%;
  height: auto;
  border-radius: 5px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 24px 16px;
`;


const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #000;
  align-items: center;
  justify-content: space-between;
  color: #FFFFFF;
  padding: 16px;
`;

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
`;

const ContentContainer = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

const Content = styled.div`
  color: #000;
  overflow: overlay;
  width: 100%;
  font-size: 1.2rem;
  max-height: 720px;
  white-space: pre-line;
  &::-webkit-scrollbar { 
    width: 10px;
  }
  
  &::-webkit-scrollbar-thumb { 
    background-color: #2f3542;
    border-radius: 10px;
    background-clip: padding-box;
    border: 2px solid transparent;
  }
  
  &::-webkit-scrollbar-track { 
    background-color: grey;
    border-radius: 10px;
    box-shadow: inset 0px 0px 5px white;
  }
`;

const OptionBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 24px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  // width: 50%;
  height: 50px;
  margin: 15px;
  padding: 0 10px; 
  // margin-bottom: 5px;
  border: 1px solid #CECECE;
  border-radius: 5px;
`;

const InputText = styled.input`
  font-size: 16px;
  display: flex;
  border: none;
  background-color: rgba(0, 0, 0, 0);
  color: #919191;
  text-align: left;
  height: 50px;
  // padding: 0 10px 0 10px;
  &:focus{
    outline: none;
  }
  ::-webkit-inner-spin-button{
    -webkit-appearance: none; 
    margin: 0; 
  }
`;

const ErrorText = styled.label`
  font-size: 16px;
  font-weight: 400;
  color: #db3737;
  // margin-top: 12px;
  visibility: ${props => props.isEnabled ? 'visible' : 'hidden'};
`;

const Input = styled.input`
 display: none;
`;

const Button = styled(c.Button)`
  width: 30vw;
  font-weight: 600;
  font-size: 1.2rem;
  margin-top: 17px;
  padding: 10px 0 10px 0;
  border-radius: 5px;
`;

const Upload = styled.label`
  border-radius: 10px;
  background-color: #F1F2F4;
  display: flex;
  align-items: center;
  color: #FFFFFF;
  font-style: normal;
  font-weight: 600;
  font-size: 2.4vw;
  flex-direction: column;
  justify-content: center;
  border: 1px solid #D9D9D9;
  outline: none;
  &:hover{
    background-color: #4FC0E8;
    color: #FFFFFF;
  }
  &:focus-visible {
    outline: none;
  }
`;

const CloseButton = styled.img`
    width: 24px;
    height: 24px;
    margin-left: 10px;
    margin-right: 10px;
`;


const Popup = ({popupState, setPopupState, setPopupResult, popupInfo}) => {

  const [valueOne, setValueOne] = useState('');
  const [errorState, setErrorState] = useState(0);
  
  useEffect(() => {
		const init = async () => {
		};

		init();
	}, [popupState]);
  
  
  const closePopup = () => {
    setValueOne('');
    setErrorState(0);
    setPopupResult(false, popupInfo);
    setPopupState(false);
  }
  
  const onClickOK = async () => {
    setPopupResult(true, popupInfo);
    setPopupState(false);
  }
  
  const confirmPopup = async () => {
    let res = await Stores.accountStore.verifyCardNumber({ cardNumber: valueOne});
    if(res.success == true) {
      popupInfo.valueOne = valueOne;
      setPopupResult(true, popupInfo).then((result) => {
        setPopupState(false);  
      });
    } else {
      setErrorState(1);
    }
  };

  const onChangeCardNumber = (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
    setValueOne(e.target.value);
  }
  
  return(
    <PopupContainer isShow={popupState}>
      <Box>
      {popupInfo.title !== undefined ? 
        <TitleContainer>
          <Title>{popupInfo.title}</Title>
          <FontAwesomeIcon style={{ width: '4vw'}} icon={faXmark} size={'2xl'} color={'#FFFFFF'} onClick={closePopup} />
        </TitleContainer>
        : <></>}
        <Wrapper>
          <ContentContainer>
            <Content>{popupInfo.content}</Content>
          </ContentContainer>
          <OptionBox>
            
            {popupInfo.type === 1 ?
              <Button onClick={() => onClickOK()}>{'확인'}</Button> :
              popupInfo.type === 2 ?
              <>
                <Button onClick={() => confirmPopup()}>{'확인'}</Button>
                <Button onClick={() => closePopup()}>{'취소'}</Button> 
              </> : 
              popupInfo.type === 3 ?
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%'}}>
                <InputContainer>
                  <InputText
                    type={'input'}
                    value={valueOne}
                    placeholder={'카드번호 입력'}
                    onChange={onChangeCardNumber}
                    maxLength={16}
                  />
                  <ErrorText isEnabled={errorState >= 1 ? true : false}>
                    {'소속된 카드가 아닙니다.'}
                  </ErrorText>
                </InputContainer>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
                  <Button onClick={() => confirmPopup()}>{'카드 등록'}</Button>
                  <Button onClick={() => closePopup()}>{'신규 발행'}</Button>
                </div>
              </div> : <></>
            }
          </OptionBox>
        </Wrapper>
      </Box>
    </PopupContainer>
  );
};

export default Popup;