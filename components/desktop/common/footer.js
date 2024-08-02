import styled from 'styled-components';
import React, { useState, useEffect } from 'react';

import { useTranslation } from 'react-i18next'
import c from "./commonStyle";


const FooterContainer = styled.div`
	background-color: #0139CC;
  min-height: 449px;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: flex-start;
  padding: 103px 0 77px 0;
  
  text-align: center;
  font-size: 16px;
  font-weight: normal;
  color: #fff;
`;

const FooterBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  // padding: 0 38px;
`;


const Footer = () => {

  const { t } = useTranslation();

  return (
    <FooterContainer>

      <FooterBox style={{ width: '38%', padding: '0 9.5%', height: '100%', justifyContent: 'space-between' }}>
        <c.Image src="images/footer_tx_logo.png" />
        <c.TinyText style={{ textAlign: 'start' }}>{'©2024 TRAVEL EXPRESS All rights reserved.'}</c.TinyText>
      </FooterBox>

      <FooterBox style={{ width: '22.8%', padding: '0 4% 0 0' }}>
        <c.LargeText style={{ fontSize: '26ox', textAlign: 'start' }}>{'Head'}</c.LargeText>
        <c.SmallText style={{ textAlign: 'start' }}>{'CDF Switzerland GmbH - Konnect 21 Banhhofstrasse 6300 Zug, Switzerland contact@konnect.finance'}</c.SmallText>
      </FooterBox>

      <FooterBox style={{ width: '39.2%', padding: '0 19.5% 0 0' }}>
        <c.LargeText style={{ fontSize: '26ox', textAlign: 'start' }}>{'Korea Branch'}</c.LargeText>
        <c.SmallText style={{ textAlign: 'start' }}>{'씨디에프 스위치랜드 유한책임회사 (CDF Switzerland GmbH) 대표자 김주영 / 사업자등록번호 518-84-00025'}</c.SmallText>
      </FooterBox>

    </FooterContainer>
  );
};

export default Footer;
