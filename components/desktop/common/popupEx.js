
import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import styled from 'styled-components';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";

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
  background-color: #F07B3E;
  align-items: center;
  justify-content: space-between;
  color: #ffffff;
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
  overflow: overlay;
  width: 100%;
  font-size: 2.2vw;
  max-height: 720px;
  
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
  width: 50%;
  height: 50px;
  margin: 0 5px;
  padding-right: 16px;
  border-bottom-width: initial;
  border-bottom-style: groove;
  border-bottom-color: initial;  
  // border: 1px solid #CECECE;
  // border-radius: 5px;
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

const Input = styled.input`
 display: none;
`;

const Button = styled.button`
  // margin: 5px 5px 5px 5px;
  // padding: 10px 90px;
  border-radius: 10px;
  background-color: #FFFFFF;
  display: flex;
  align-items: center;
  color: #000000;
  font-style: normal;
  font-weight: 600;
  font-size: 2.4vw;
  flex-direction: column;
  justify-content: center;
  border: 1px solid #D9D9D9;
  outline: none;
  &:hover{
    background-color: #FFF9F1;
    color: #F07B3E;
  }
  &:focus-visible {
    outline: none;
  }
`;

const Upload = styled.label`
  border-radius: 10px;
  background-color: #FFFFFF;
  display: flex;
  align-items: center;
  color: #000000;
  font-style: normal;
  font-weight: 600;
  font-size: 2.4vw;
  flex-direction: column;
  justify-content: center;
  border: 1px solid #D9D9D9;
  outline: none;
  &:hover{
    background-color: #FFF9F1;
    color: #F07B3E;
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

const Popup = ({popupState, setPopupState, setPopupResult, popupInfo, setPopupInfo}) => {
  
  const [inputValue1, setInputValue1] = useState('');
  const [inputValue2, setInputValue2] = useState('');
  const [uploadFile, setUploadFile] = useState({});
  
  useEffect(() => {
		const init = async () => {
      setInputValue1('');
      setInputValue2('');
      setUploadFile({});
		};

		init();
	}, [popupState]);
  
  const onPressInputValue = (e) => {
    // if(e.key === 'Enter') {
    //   this.buttonRef.waitResponse();
    // }
  }
  
  const onChangeInputValue1 = (e) => {
    // e.target.value = e.target.value.replace(/[^0-9]/g, '');
    setInputValue1(e.target.value);
  }
  
  const onChangeInputValue2 = (e) => {
    // e.target.value = e.target.value.replace(/[^0-9]/g, '');
    setInputValue2(e.target.value);
  }
  
  const closePopup = () => {
    setPopupState(false);
  }
  
  const confirmPopup = () => {
    
    let data = {
      type: popupInfo.type,
      kind: popupInfo.kind,
      id: popupInfo.id,
      result1: inputValue1,
      result2: inputValue2,
    }
    
    if(popupInfo.kind === 'product' && popupInfo.type === 0) {
      data.file = uploadFile.selectedFileA;
    } 
    
    setPopupResult(data).then(() => {
      setPopupState(false); 
    }).catch((err) => {
      setPopupState(false); 
    });
  }
  
  const fileChangedHandler = (e) => {
    const id = e.target.id;
    if (id === 'input-file-1') {
      let file = e.target.files[0];
      let filename = file.name;
      setUploadFile({
        selectedFileA: file,
        selectedFileNameA: filename
      });
      console.log(filename);
    } 
  };
  
  return(
    <PopupContainer isShow={popupState}>
      {popupInfo.type === 0 ? // 추가
      <Box>
        {popupInfo.title !== undefined ? 
          <TitleContainer>
            <Title>{popupInfo.title}</Title>
            <FontAwesomeIcon style={{ width: '2vw'}} icon={faXmark} size={'2xl'} color={'#ffffff'} onClick={closePopup} />
          </TitleContainer>
          : <></>}
          <Wrapper>
            <ContentContainer>
              <Content>{popupInfo.content}</Content>
            </ContentContainer>
            <OptionBox>
              <div style={{ display: 'flex', flexDirection: 'row', width: '70%'}}>
                <InputContainer>
                  <InputText
                    type={'input'}
                    value={inputValue1}
                    placeholder={`${popupInfo.title}`}
                    onKeyPress={onPressInputValue}
                    onChange={onChangeInputValue1}
                  />
                </InputContainer>
                {popupInfo.kind === 'product' || popupInfo.kind === 'option_check' || popupInfo.kind === 'option_radio_item' ? 
                <>
                  <InputContainer>
                    <InputText
                      type={'input'}
                      value={inputValue2}
                      placeholder={`${popupInfo.title} 가격`}
                      onKeyPress={onPressInputValue}
                      onChange={onChangeInputValue2}
                    />
                  </InputContainer>
                </>
                : <></>}
              </div>
              <Button onClick={() => confirmPopup()}>{popupInfo.buttonText}</Button>
              <Button onClick={() => setPopupState(false)}>{'취소'}</Button>
            </OptionBox>
            {popupInfo.kind === 'product' ? 
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end'}}>
              <Content style={{ fontSize: '18px', width: '70%', borderBottomWidth: 'initial', borderBottomStyle: 'groove', borderBottomColor: 'initial' }}>{uploadFile ? uploadFile.selectedFileNameA : ''}</Content>
              <Input type="file" onChange={fileChangedHandler} id="input-file-1" />
              <Upload htmlFor="input-file-1">{'업로드'}</Upload>
            </div> : <></>}
          </Wrapper>
        </Box> : popupInfo.type === 1 ? // 삭제
        <Box>
          {popupInfo.title !== undefined ? 
            <TitleContainer>
              <Title>{popupInfo.title}</Title>
              <FontAwesomeIcon style={{ width: '2vw'}} icon={faXmark} size={'2xl'} color={'#ffffff'} onClick={closePopup} />
            </TitleContainer>
            : <></>}
          <Wrapper>
            <ContentContainer>
              <Content>{popupInfo.content}</Content>
            </ContentContainer>
            <OptionBox>
              <Button onClick={() => confirmPopup()}>{popupInfo.buttonText}</Button>
              <Button onClick={() => setPopupState(false)}>{'취소'}</Button>
            </OptionBox>
          </Wrapper>
        </Box> : popupInfo.type === 2 || popupInfo.type === 3 ? // 수정
        <Box>
          {popupInfo.title !== undefined ? 
            <TitleContainer>
              <Title>{popupInfo.title}</Title>
              <FontAwesomeIcon style={{ width: '2vw'}} icon={faXmark} size={'2xl'} color={'#ffffff'} onClick={closePopup} />
            </TitleContainer>
            : <></>}
          <Wrapper>
            <ContentContainer>
              <Content>{popupInfo.content}</Content>
            </ContentContainer>
            <OptionBox>
              {popupInfo.kind === 'product' || popupInfo.kind === 'profile' ? <></> :
                <>
                  <InputContainer>
                    <InputText
                      type={'input'}
                      value={inputValue1}
                      onKeyPress={onPressInputValue}
                      onChange={onChangeInputValue1}
                    />
                  </InputContainer>
                  <InputContainer>
                    <InputText
                      type={'input'}
                      value={inputValue2}
                      onKeyPress={onPressInputValue}
                      onChange={onChangeInputValue2}
                    />
                  </InputContainer>
                </>
              }
              <Button onClick={() => confirmPopup()}>{popupInfo.buttonText}</Button>
              <Button onClick={() => setPopupState(false)}>{'취소'}</Button>
            </OptionBox>
          </Wrapper>
          </Box> :
        <></>}
    </PopupContainer>
  );
};

export default Popup;