import { Button } from "@material-ui/core";
import axios from "axios";
import React from "react"
import { useEffect } from "react";
import { loginCheck } from "./loginCheck";

const LogOut = (props) => {

    const logoutPost = (event) => {
        const postUri = 'http://localhost:8000/api/rest-auth/logout/';
        axios.post(postUri)
        .then(res=>{
            props.deleteCookie('access-token');
            props.deleteCookie('user_uid');
            console.log(res.data);
            window.location.href='/login';
        })
    }

    useEffect(()=>{
        loginCheck(props.cookie);
    })

    return(<>
        <Button onClick={logoutPost} color="primary" variant="contained">ログアウト</Button>
    </>)
}


export default LogOut