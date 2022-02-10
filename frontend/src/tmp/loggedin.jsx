import React from 'react';
import axios from 'axios'
import { Link, Outlet } from 'react-router-dom';
import { withCookies } from 'react-cookie';

const LoggedIn = (props) => {

  if (props.cookies.get('accses-token')) {

    let form_data = new FormData();
    form_data.append('token', props.cookies.get('accses-token'));

    axios.post(`http://localhost:8000/api/token/verify/`, form_data,{
      headers: {
        'content-type': 'multipart/form-data'
      },
    })
    .catch( error => {
      alert('再度ログインを行なってください');
      props.cookies.remove('accses-token')
      window.location.href = "/login";
    });

    return (
        <>
        {props.children}
        <Outlet/>
        </>
    );

  } else {
    return (
        <> 
        <Link to={'/login'} >戻る</Link>
        <Outlet/>
        </>
    )
  }
}  

export default withCookies(LoggedIn);