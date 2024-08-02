import React, {useState, useEffect} from 'react';
import {inject, observer} from "mobx-react";
import Router from 'next/router';

import Stores from '../stores';


const Index = () => {

  useEffect(() => {
		const init = async () => {
      if (process.env.NEXT_PUBLIC_DEVICE === 'tablet')
      Router.back();
		};

    const getQuery = async () => {
      const params = new URLSearchParams(window.location.search);
      let accessToken = params.get("accessToken");
      let email = params.get("email");
      console.log(email, accessToken);
      
      if(email && accessToken) {
        Stores.authStore.setAccessToken(accessToken);
        Stores.authStore.setUserEmail(email);
        Stores.authStore.authenticate();
        Router.push('/main');
      }else{
        Router.back('/');
      }
		};

		init();
		getQuery();

	}, []);
  
	return (
    <></>
	);
};

export default observer(Index);
