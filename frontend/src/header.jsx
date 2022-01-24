import React, { useEffect, useState } from 'react';
import {BrowserRouter, Route, Link, Routes, useHistory, Router, useLocation} from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { withCookies } from 'react-cookie';
import { Typography, Button } from '@material-ui/core';


const Header = (props) => {
    const token = props.cookies.get('access-token')
    return(
        <>
        <Link to={token ? "/" : "/login"}>
          <Typography variant="h3" type="title" color="inherit" >
            サイトタイトル
          </Typography>
        </Link>
        <hr/>
        <Outlet/>
        </>
    )
   }
  
  export default withCookies(Header)