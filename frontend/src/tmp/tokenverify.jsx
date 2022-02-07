import axios from "axios";
import React from "react";


export function TokenVerify(token) {
    const posturi = 'http://localhost:8000/api/token/verify/'
    
    const tokenLog = () => {
        console.log(token);
    }

    const verify = () =>{
            axios.post(posturi, {'token':token},{
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then( res => {
                token = res.data.token;
                console.log(res.data)
                if(false){

                }
            });
    }
    verify();
    
    return token;

};
