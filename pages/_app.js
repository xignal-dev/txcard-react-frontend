import App from 'next/app';
import Head from 'next/head';
// import { Provider } from "mobx-react";
import { useProvider, useCreateStore } from "mobx-store-provider";
import Stores, { RootStore } from "../stores";

import React from 'react';
import {createGlobalStyle} from 'styled-components';
import fetch from 'node-fetch';
import MobileDetect from 'mobile-detect';
import { isMobile } from 'react-device-detect';

import UserStore from "../stores/smbUserStore";
import MarketStore from "../stores/smbMarketStore";
import AuthStore from "../stores/smbAuthStore";
import AlertStore from "../stores/smbAlertStore";
import SettingsStore from "../stores/smbSettingsStore";

import MontserratWoff from '../public/fonts/montserrat-v12-latin-ext-regular.woff';
import MontserratWoff2 from '../public/fonts/montserrat-v12-latin-ext-regular.woff2';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import '@blueprintjs/core/lib/css/blueprint.css';

if (!process.browser) {
	global.fetch = fetch;
}


const GlobalStyle = createGlobalStyle`
  :root {
    --fs-300: 0.6875rem;
    --fs-400: 0.8125rem;
    --fs-500: 1.25rem;

    --bg-dark: #424242;
    --bg-primary: #fff;
    --bg-accent: #ab47bc;
    --bg-datk-light: #707070;

    --border-primary-400: 2px solid #a775f1;
  }

  /* Box sizing 규칙 */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  /* margin 기본값 제거 */
  body,
  h1,
  h2,
  h3,
  h4,
  p {
    margin: 0;
  }

  /* 기본 스타일 제거 */
  ul,
  ol {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  /* 핵심 root 기본값 설정 */
  html:focus-within {
    scroll-behavior: smooth;
  }

  /* 핵심 body 기본값 설정 */
  body {
    min-height: 100vh;
    text-rendering: optimizeSpeed;
    line-height: 1.5;
    font-family: Pretendard;
    touch-action: manipulation;
    // overflow: hidden;
  }

  /* 클래스가 없는 a 요소는 기본 스타일을 가져옴, 문자의 가독성을 위함 */
  a:not([class]) {
    text-decoration-skip-ink: auto;
  }

  /* 이미지 작업을 좀 더 쉽게 해준다 */
  img,
  picture {
    max-width: 100%;
    display: block;
  }

  /* 폰트 상속(Inherit) */
  input,
  button,
  textarea,
  select {
    font: inherit;
  }

  /* 모든 애니메이션 제거, transitions과 smooth scroll을 보고싶지 않은 사용자를 위함 */
  @media (prefers-reduced-motion: reduce) {
    html:focus-within {
      scroll-behavior: auto;
    }

    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`;

// export default function MyApp({ Component, pageProps }) {
//   const store = useStore(pageProps.initialState)

//   return (
//     <Provider store={store}>
//       <Head>
//         <title>PizzaQL</title>
//       </Head>
//       <Component {...pageProps}/>
//       <GlobalStyle/>
//     </Provider>
//   )
// }

class MyApp extends App {
  
  constructor(props) {
    super(props);
  }
  
	render() {
		const {Component, pageProps} = this.props;    
    const Provider = useProvider(RootStore);    
    // console.log(isMobile);

		return (
      <Provider value={Stores} isMobile={isMobile}>
        <Head>
          <title>TRAVEL EXPRESS</title>
        </Head>
          <Component {...pageProps}/>
        <GlobalStyle/>
      </Provider>
		);
	}
}

export default MyApp;
