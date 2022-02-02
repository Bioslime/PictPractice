import React from "react";
import { useState } from "react";
import { withCookies} from 'react-cookie';
import axios from 'axios';
import { Button } from '@material-ui/core';


const SignUp = (props) => {
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [errorMassage, setError] = useState('');

    const signup = (event) =>{
        event.preventDefault();
        let formdata = new FormData();

        formdata.append('password', password);
        formdata.append('password2', password2);
        formdata.append('username', username);
        formdata.append('email', email);

        const uri = 'http://localhost:8000/api/user/'

        axios.post(uri, formdata, {
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then( res => {
            window.location.href = "/";
            console.log(res.data);
            props.cookies.set('access-token', res.data.token);
        })
        .catch( error => {
          setError(error.response.data)
        });
    }

    return(<>
        <div>
            
        <div className="form central-placement">     
            <form onSubmit={signup}>
                <h3>ユーザー登録</h3>
                <div className="form-element">
                    <input type="text" name="username" value={username}
                    className="form-element--username"
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="ユーザー名" />
                </div>

                <div className="form-element">
                    <input type="password" name="password" value={password}
                    className="form-element--password"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="パスワード" />
                </div>

                <div className="form-element">
                    <input type="password" name="password2" value={password2}
                    className="form-element--password"
                    onChange={(e) => setPassword2(e.target.value)}
                    placeholder="パスワード(再入力)" />
                </div>

                <Button variant="contained" color="primary" type="submit" >
                    ログイン</Button>
            </form>
        </div>
        </div>
    </>);
}


export default withCookies(SignUp)