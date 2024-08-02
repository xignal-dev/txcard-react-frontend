import styled from 'styled-components';
import React, { useState, useEffect } from 'react';

import { useTranslation } from 'react-i18next'
import c from "../common/commonStyle";
import DropdownMenu from "./dropdownMenu";


const HeaderContainer = styled.header`
	background-color: #fff;
  height: 117px;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  
  text-align: center;
  font-size: 16px;
  font-weight: normal;
  color: #000;
`;

const Title = styled.div`
  font-size: 18px;
  font-weight: 900;
`;

const Menu = styled.div`
  font-weight: bold;
`;

const MenuBox = styled.div`
  width: 33%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

const Logo = styled.img`
  width: 359.11px;
  height: 32.14px;
`;

const LogoBox = styled.div`
  width: 33%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const RightMenuBox = styled.div`
  width: 34%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding-left: 5%;
`;

// const UsdtDeposit = styled(c.Button)`
const UsdtDeposit = styled.a`
  border-radius: 50px;
  padding: 7px 20px;  
  color: #fff;
  background-color: #0139CC;
  font-weight: bold;
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

const Profile = styled.img`
  width: 44px;
  height: 44px;
`;

const LangBox = styled.div`

`;

const Language = styled.img`
  width: 38.86px;
  height: 38.67px;
`;

const Header = () => {

  const { t } = useTranslation();

  const [txCardVisible, setTxCardVisible] = useState(false);
  const [txPointVisible, setTxPointVisible] = useState(false);
  const [langVisible, setLangVisible] = useState(false);

  const txCardMenuList = [{ name: 'TX CARD?', link: '/txcard', state: 1 }, { name: '발급하기', link: '/txcard', state: 2 }, { name: '등록하기', link: '/txcard', state: 3 }, { name: '분실신고', link: '/txcard', state: 4 }];
  
  const txPointMenuList = [{ name: 'TX POINT?', link: '/txpoint', state: 1 }, { name: '교환하기', link: '/txpoint', state: 2 }, { name: '선물하기', link: '/txpoint', state: 3 }, { name: '포인트 내역', link: '/txpoint', state: 4 }];

  const languageList = [{ name: '한국', image: '/images/lang/kor.png' }, { name: '日本', image: '/images/lang/jpn.png' }, { name: 'Việt Nam', image: '/images/lang/vie.png' }, { name: 'USA', image: '/images/lang/usa.png' }];

  const cardPos = { top: '70px', left: '12.8vw' };
  const pointPos = { top: '70px', left: '20.7vw' };
  const langPos = { top: '80px', left: 'calc(100vw - 200px)' };


  const handleMouseEnter = (menu) => {
    switch (menu) {
      case 'txcard':
        setTxCardVisible(true);
        break;
      case 'txpoint':
        setTxPointVisible(true);
        break;
      case 'lang':
        setLangVisible(true);
        break;
      default:
        break;
    }
  };

  const handleMouseLeave = (menu) => {
    switch (menu) {
      case 'txcard':
        setTxCardVisible(false);
        break;
      case 'txpoint':
        setTxPointVisible(false);
        break;
      case 'lang':
        setLangVisible(false);
        break;
      default:
        break;
    }
  };

  return (
    <HeaderContainer>
      <MenuBox>
        <Title>{'TRAVEL EXPRESS?'}</Title>
        <Menu onMouseEnter={() => handleMouseEnter('txcard')} onMouseLeave={() => handleMouseLeave('txcard')}>{'TX CARD'}
          {/* <DropdownMenu menuList={txCardMenuList} position={cardPos}/> */}
          {txCardVisible && <DropdownMenu menuList={txCardMenuList} />}
        </Menu>
        <Menu onMouseEnter={() => handleMouseEnter('txpoint')} onMouseLeave={() => handleMouseLeave('txpoint')}>{'TX POINT'}
          {/* <DropdownMenu menuList={txPointMenuList} position={pointPos} /> */}
          {txPointVisible && <DropdownMenu menuList={txPointMenuList} />}
        </Menu>
      </MenuBox>
      <LogoBox>
        <a href={'/'}>
          <Logo src={'/images/tx_text_logo_black.png'}></Logo>
        </a>
      </LogoBox>
      <RightMenuBox>
        <UsdtDeposit href={'/deposit?state=1'}>{'USDT Deposit'}</UsdtDeposit>
        <Profile src={'/images/Profile_01.png'}></Profile>
        <LangBox onMouseEnter={() => handleMouseEnter('lang')} onMouseLeave={() => handleMouseLeave('lang')}>
          <Language src={'/images/language_01.png'}>
          </Language>
          <Menu>
            {/* <DropdownMenu menuList={languageList} position={langPos} bgColor={'#aaa'}/> */}
            {langVisible && <DropdownMenu menuList={languageList} position={langPos} bgColor={'#aaa'} />}
          </Menu>
        </LangBox>
      </RightMenuBox>
    </HeaderContainer>
  );
};

export default Header;
