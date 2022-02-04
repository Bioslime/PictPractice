import { Button } from "@material-ui/core";
import React from "react"
import { useState } from "react"
import { withCookies } from "react-cookie"

const LogOut = (props) => {
    const logoutjob = (event) => {
        event.preventDefault();
        props.deleteCookie('access-token');
        window.location.href = "/";
    }

    return(<>
        <Button onClick={logoutjob} color="primary" variant="contained">ログアウト</Button>
    </>)
}


export default withCookies(LogOut)