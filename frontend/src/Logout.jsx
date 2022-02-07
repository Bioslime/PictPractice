import { Button } from "@material-ui/core";
import axios from "axios";
import React from "react"
import { withCookies } from "react-cookie"

const LogOut = (props) => {
    const logoutjob = (event) => {
        event.preventDefault();
        props.deleteCookie('access-token');
        window.location.href = "/";
    }

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

    return(<>
        <Button onClick={logoutPost} color="primary" variant="contained">ログアウト</Button>
    </>)
}


export default LogOut