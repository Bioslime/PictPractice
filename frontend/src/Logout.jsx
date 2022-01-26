import React from "react"
import { useState } from "react"
import { withCookies } from "react-cookie"

const LogOut = (props) => {
    const [token, setToken] = useState(props.cookies.get('access-token'));
    const logoutjob = (event) => {
        event.preventDefault();
        props.cookies.set('access-token', "");
        setToken(props.cookies.set('access-token', ""));
    }

    return(<>
        <button onClick={logoutjob}>ログアウト</button>
        <div>{token}</div>
    </>)
}


export default withCookies(LogOut)