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
  height: calc(100vh - 566px);
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
  font-size: 18px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 671px;
  height: 89px;
  margin-top: 14px;
  // border: 1px solid #CECECE;
  padding-left: 25px;
  padding-Right: 25px;
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
  margin: 11px;
  &:focus{
    outline: none;
  }
  ::-webkit-inner-spin-button{
    -webkit-appearance: none; 
    // margin: 0; 
  }
`;

const PassportImageBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  width: 380px;
  height: 559px;
  margin: 0 35px;
  border-radius: 25px;
  backgroundColor: #000;
`;

const InputFile = styled.input`
  display: none;
`;

const FileUploadBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  border-radius: 30px;
  color: #0139CC;
  background-color: #fff;
  margin-top: 41px;
  width: 80%;
  height: 58px;
  align-items: center;
`;


const FileUploadLabel = styled.label`
  font-size: 18px;
  font-weight: bold;
  border: 3px solid #0139CC;
  border-radius: 30px;
  color: #0139CC;
  background-color: #fff;
  // text-align: left;
  width: 40%;
  height: 100%;
  align-content: center;
  &:focus{
    outline: none;
  }
  ::-webkit-inner-spin-button{
    -webkit-appearance: none; 
    // margin: 0; 
  }
`;

const RegisterButton = styled(c.Button)`
  font-size: 22px;
  width: 90%;
  height: 89px;
  margin: 50px 0 120px 0;
  border-radius: 10px;
`;

const IssueForm = ({ setState }) => {

  const stores = useStore(Stores);

  // const inputEl = useRef(null);

  const [selected, setSelected] = useState(1);
  const [formState, setFormState] = useState(1);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [country, setCountry] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [office, setOffice] = useState({});
  
  const [file1, setFile1] = useState();
  const [file2, setFile2] = useState();

  useEffect(() => {
    const init = async () => {
      setEmail(Stores.authStore.getUserEmail);
      await Stores.userStore.getProfile();
      setOffice(Stores.userStore.cmOffice);
    }

    init();
  }, []);

  // const onChangeId = (e) => {
  //   // e.target.value = e.target.value.replace(/[^0-9]/g, '');
  //   // setMemberId(e.target.value.replace(/[^0-9]/g, ''));
  //   setMemberId(e.target.value);
  // }

  const onChangeFirstName = (e) => {
    setFirstName(e.target.value);
  }
  
  const onChangeLastName = (e) => {
    setLastName(e.target.value);
  }

  const onChangeMiddleName = (e) => {
    setMiddleName(e.target.value);
  }
  
  const onChangeSelect = (e) => {
    setCountry(e);
  }
  
  const onChangeMobile = (e) => {
    setMobile(e.target.value);
  }
  
  const onChangeAddress = (e) => {
    setAddress(e.target.value);
  }

  const onClickBack = () => {
    
    if(formState > 1)
      setFormState(formState - 1);
    else
      setState(1);
  }
  
  const onInputFile1 = (e) => {
    if (e.currentTarget.files?.[0]) {
      const file = e.currentTarget.files[0];
      setFile1(file);
    }
  }
  
  const onInputFile2 = (e) => {
    if (e.currentTarget.files?.[0]) {
      const file = e.currentTarget.files[0];
      setFile2(file);
      // console.log(file);
      // const reader = new FileReader();
      // reader.readAsDataURL(file);      
      // reader.onloadend = (event) => {
      //   setImageList((prev) => [
      //     ...prev,
      //     event.target?.result as string,
      //   ]);
      // };
    }
  }
  
  const onClickRegister = () =>{
    let data = {
      firstName: firstName,
      lastName: lastName,
      middleName: middleName,
      email: email,
      mobile: mobile,
      address: address,
      office: office,
      file1: file1,
      file2: file2,
    };
    
  }

  return (
    <HomeContainer>

      <TopContainer>
        <c.BigText>{formState === 1 ? '발급 받으실 카드를 선택하세요' : formState === 2 ? '기본정보를 기입해주세요' : formState === 3 ? '여권정보를 업데이트하세요' : ''}</c.BigText>
        <c.LargeText style={{ color: '#0139CC' }}>{`STEP ${formState}/3`}</c.LargeText>
      </TopContainer>

      <MainContainer style={{ marginBottom: formState < 3 ? '243px' : '' }}>

        <CheckWrapper onClick={() => onClickBack()}>
          <FontAwesomeIcon style={{ position: 'relative', width: '4vw', color: '#0139CC' }} icon={faCircleArrowLeft} size={'2xl'} />
        </CheckWrapper>

        {formState === 1 ?
          <CardReqBox>
            <CardImageBox onClick={() => setSelected(1)} style={{ backgroundColor: (selected === 1 ? 'rgba(0,0,0,0)' : '#646464'), border: (selected === 1 ? '3px solid #0139CC' : '') }}>
              <FontAwesomeIcon style={{ position: 'relative', left: '-185px', width: '4vw', color: (selected === 1 ? '#0139CC' : '#999') }} icon={faCircleCheck} size={'2xl'} />
              <c.Image src='/images/card_req_01.png' style={{ width: '187px' }}></c.Image>
              <TextBox style={{ margin: '35px 0 53px 0', width: '296px', height: '154px' }}>
                <c.LargeText style={{ fontSize: '40px' }}>{'BLACK'}</c.LargeText>
                <c.TinyText style={{ fontSize: '18px' }}>{'전세계 리셀러 / 여행객을 위한 직불카드 가입비 : 10USDT / 연 회비 : 10USDT'}</c.TinyText>
              </TextBox>
            </CardImageBox>

            <CardImageBox onClick={() => setSelected(2)} style={{ backgroundColor: (selected === 2 ? 'rgba(0,0,0,0)' : '#646464'), border: (selected === 2 ? '3px solid #0139CC' : '') }}>
              <FontAwesomeIcon style={{ position: 'relative', left: '-185px', top: '-65px', width: '4vw', color: (selected === 2 ? '#0139CC' : '#ABABAB') }} icon={faCircleCheck} size={'2xl'} />
              <c.Image src='/images/card_req_02.png' style={{ width: '294px' }}></c.Image>
              <TextBox style={{ margin: '85px 0 53px 0', width: '296px', height: '154px' }}>
                <c.LargeText style={{ fontSize: '40px' }}>{'PLATINUM'}</c.LargeText>
                <c.TinyText style={{ fontSize: '18px' }}>{'전세계 리셀러 / 여행객을 위한 직불카드 120개 브랜드 할인 혜택 가입비 : 100 USDT / 연회비 : 100 USDT'}</c.TinyText>
              </TextBox>
            </CardImageBox>
          </CardReqBox> : formState === 2 ?

          <CardReqBox>
            <LeftBox>
              <c.LargeText>{'신청 카드'}</c.LargeText>
              <c.Image src='/images/card_req_02.png' style={{ width: '294px', marginTop: '40px' }}></c.Image>
              <TextBox style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'flex-start', alignItems: 'flex-end', marginTop: '40px' }}>
                <c.TinyText>{'TRAVEL EXPRESS'}</c.TinyText>
                <p style={{ fontSize: '28px', fontWeight: 'bold', marginLeft: '5px' }}>{selected === 1 ? 'BLACK' : selected === 2 ? 'PLATINUM' : ''}</p>
              </TextBox>
            </LeftBox>

            <RightBox>
              <ProfileBox style={{ marginTop: '7px' }}>
                <InputBox style={{ width: '49%' }}>
                  <p style={{ minWidth: '100px', textAlign: 'start', fontSize: '18px' }}>
                    {'이름'}
                  </p>
                  <InputText
                    type={'input'}
                    value={firstName}
                    placeholder={'이름'}
                    style={{ minWidth: '100px' }}
                    onChange={onChangeFirstName} >
                  </InputText>
                </InputBox>

                <InputBox style={{ width: '49%' }}>
                  <p style={{ width: '100px', textAlign: 'start' }}>
                    {'성'}
                  </p>
                  <InputText
                    type={'input'}
                    value={lastName}
                    placeholder={'성'}
                    style={{ minWidth: '100px' }}
                    onChange={onChangeLastName} >
                  </InputText>
                </InputBox>
              </ProfileBox>

              <ProfileBox>
                <InputBox style={{ width: '49%' }}>
                  <p style={{ width: '100px', textAlign: 'start' }}>
                    {'중간이름'}
                  </p>
                  <InputText
                    type={'input'}
                    value={middleName}
                    placeholder={'중간이름'}
                    style={{ minWidth: '100px' }}
                    onChange={onChangeMiddleName} >
                  </InputText>
                </InputBox>

                <InputBox style={{ width: '49%' }}>
                  <p style={{ width: '100px', textAlign: 'start', marginRight: '25px' }}>
                    {'지사'}
                  </p>
                  <InputText
                    type={'input'}
                    value={office}
                    placeholder={'지사'}
                    style={{ minWidth: '100px' }}
                    readOnly={true}>
                  </InputText>
                  {/* <Select onChange={onChangeSelect}
                    styles={c.selectorStyle}
                    options={country}
                    placeholder={'선택'}
                    value={country}
                  /> */}
                </InputBox>
              </ProfileBox>

              <InputBox>
                <p style={{ width: '100px', textAlign: 'start' }}>
                  {'이메일'}
                </p>
                <InputText
                  type={'input'}
                  value={email}
                  placeholder={'이메일'}
                  readOnly={true}>
                </InputText>
              </InputBox>

              <InputBox>
                <p style={{ width: '100px', textAlign: 'start' }}>
                  {'핸드폰'}
                </p>
                <InputText
                  type={'input'}
                  value={mobile}
                  placeholder={'핸드폰'}
                  onChange={onChangeMobile} >
                </InputText>
              </InputBox>

              <InputBox>
                <p style={{ width: '100px', textAlign: 'start' }}>
                  {'주소'}
                </p>
                <InputText
                  type={'input'}
                  value={address}
                  placeholder={'주소'}
                  onChange={onChangeAddress} >
                </InputText>
              </InputBox>

            </RightBox>
          </CardReqBox> :

          <CardReqBox>
            <PassportImageBox style={{ backgroundColor: '#000', justifyContent: 'space-between', padding: '0' }}>
              <c.LargeText style={{ fontSize: '28px' }}><span style={{ color: '#0139CC' }}>{'01'}</span>{' 여권 이미지 업로드'}</c.LargeText>
              <c.Image src='/images/passport_01.png' style={{ width: '269px' }}></c.Image>
              <FileUploadBox>
                <FileUploadLabel for={'passport-file'}> {'파일 선택'} </FileUploadLabel>
                <div>{file1 ? file1.name : ''}</div>
              </FileUploadBox>
              <InputFile type={'file'} id={'passport-file'} onChange={onInputFile1} />
            </PassportImageBox>

            <PassportImageBox style={{ backgroundColor: '#000', justifyContent: 'space-between', padding: '0' }}>
              <c.LargeText style={{ fontSize: '28px', whiteSpace: 'none' }}><span style={{ color: '#0139CC' }}>{'02'}</span>{' 여권 이미지가 포함 된 셀카'}</c.LargeText>
              <c.Image src='/images/selfee_01.png' style={{ width: '190px' }}></c.Image>
              <FileUploadBox>
                <FileUploadLabel for={'selfee-file'}> {'파일 선택'} </FileUploadLabel>
                <div>{file2 ? file2.name : ''}</div>
              </FileUploadBox>
              <InputFile type={'file'} id={'selfee-file'} onChange={onInputFile2} />
            </PassportImageBox>
          </CardReqBox>
        }
        
        <CheckWrapper onClick={() => setFormState(formState + 1)}>
          {formState < 3 ?
            <FontAwesomeIcon icon={faCircleArrowRight} size={'2xl'} /> : <></>
          }
        </CheckWrapper>
      </MainContainer>
      
      {formState > 2 ? <RegisterButton onClick={() => onClickRegister()}>{'등록하기'}</RegisterButton> : <></>
      }


      {/* <c.Image src="/images/main_companies.png" style={{ margin: '40px 0 1095.95px 0' }}></c.Image> */}


    </HomeContainer>
  );
};

export default IssueForm;
