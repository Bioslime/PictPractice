import React, { useEffect, useState } from 'react';
import {BrowserRouter, Route, Link, Routes, useHistory, Router, useLocation} from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { useCookies, withCookies } from 'react-cookie';
import { Typography, Button } from '@material-ui/core';
import {TokenVerify} from './tokenverify';
import TokenTest from './tmp/tokentest';


const Header = (props) => {
    const token = props.cookie['access-token'];
    
    const verify = () => {
      if(token){
        TokenVerify(token);
      }
    }

    useEffect(() => {
      // verify();
      },[])

    return(
        <>
        <Link to={token ? "/" : "/login"}>
          <Typography variant="h3" type="title" color="inherit" >
            サイトタイトル
          </Typography>
        </Link>
        <div>
          <Link to={'/pictpost/'}> イラスト登録 </Link>
        </div>
        {token? 
          <div>
            <Link to={'/logout/'}>ログアウト</Link>
          </div>:
          <div>
            <Link to={'/login/'}>ログイン</Link>
          </div>}
        <hr/>
        <TokenTest cookie={props.cookie}/>
        <Outlet/>
        </>
    )
   }
  
  export default withCookies(Header)