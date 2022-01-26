import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { withCookies } from "react-cookie";


const TokenVerify = (props) => {
    const [token, setToken] = useState(props.cookies.get('access-token'));
    const [errorMassage, setError] = useState('');
    const posturi = 'http://localhost:8000/api/token/verify/'

    const verify = () =>{
        axios.post(posturi, {'token':token},{
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then( res => {
            props.cookies.set('access-token', res.data.token);
            console.log(res.data)
        })
        .catch( error => {
          setError(error.response.data)
        });
    }

    const tokenLog = () => {
            console.log(props.cookies.get('access-token'));
    }
    
    useEffect(() => {
        tokenLog();
        verify();
    },[])


    return(
        <>
        {errorMassage}
        {props.cookies.get('access-token')}
        </>
    )
}

export default withCookies(TokenVerify)