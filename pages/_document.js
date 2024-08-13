import React from 'react';
import Document, {Head, Html, Main, NextScript} from 'next/document';
import {ServerStyleSheet} from 'styled-components';

export default class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const sheet = new ServerStyleSheet();
		const originalRenderPage = ctx.renderPage;
    


		try {
			ctx.renderPage = () =>
				originalRenderPage({
					enhanceApp: App => props => sheet.collectStyles(<App {...props}/>)
				});

			const initialProps = await Document.getInitialProps(ctx);
      
      // document.documentElement.addEventListener('touchend', function (event) {
      //   var now = (new Date()).getTime();
      //   if (now - lastTouchEnd <= 300) {
      //        event.preventDefault(); 
      //      } lastTouchEnd = now; 
      //  }, false);
      
			return {
				...initialProps,
				styles: (
					<>
						{initialProps.styles}
						{sheet.getStyleElement()}
					</>
				)
			};
		} finally {
			sheet.seal();
		}
	}

	render() {
		return (
			<Html lang="en">
				<Head>
					<meta charSet="utf-8"/>
					{/* <meta name="viewport" content="width=device-width, initial-scale=1.0"/> */}
					<meta httpEquiv="X-UA-Compatible" content="ie=edge"/>
					<meta name="description" content="Travel Express Card Service"/>
					<meta name="image" content="https://i.imgur.com/wTAVqy5.jpg"/>
					<meta name="theme-color" content="#212121"/>
					<meta name="msapplication-TileColor" content="#212121"/>
					<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"/>
					<link rel="manifest" href="/manifest.json"/>
					<link rel="icon" href="/favicon.png"/>
					<meta name="twitter:card" content="summary"/>
					<meta name="twitter:title" content="TRAVEL EXPRESS"/>
					<meta name="twitter:description" content="Travel Express Card Service"/>
					<meta name="twitter:image:src" content="https://i.imgur.com/wTAVqy5.jpg"/>
					<meta name="og:title" content="TRAVEL EXPRESS"/>
					<meta name="og:description" content="Travel Express Card Service"/>
					<meta name="og:image" content="https://i.imgur.com/wTAVqy5.jpg"/>
					<meta name="og:url" content=""/>
					<meta name="og:site_name" content="TRAVEL EXPRESS"/>
					<meta name="og:type" content="website"/>
          {/* <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/> */}
					<link rel="icon" href="/favicon.png"/>
          <link rel='stylesheet' type='text/css' href={'/CSS/style.css'}/>
          
          <script
            type="text/javascript"
            src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${'dd318b72964a6d09e1bb6417c1e8e0b6'}&libraries=services`}
          />
          <script type="text/javascript" src="https://code.jquery.com/jquery-1.12.4.min.js"></script>
				</Head>
				<body>
					<Main/>
					<NextScript/>
				</body>
			</Html>
		);
	}
}
