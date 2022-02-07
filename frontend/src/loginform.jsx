import React, {useState, useEffect}  from 'react';
import { withCookies} from 'react-cookie';
import axios from 'axios';
import { Button } from '@material-ui/core';


const LoginForm = (props) =>{
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [errorMessage, setError ] = useState("");

    const token = props.cookie['access-token'];

    const loginauth = (event) =>{
        event.preventDefault();
        let formdata = new FormData();

        formdata.append('username', username);
        formdata.append('password', password);
        formdata.append('email', email);

        const postUri = 'http://localhost:8000/api/rest-auth/login/'

        axios.post(postUri, formdata, {
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then( res => {
            props.setCookie('access-token', res.data.token);
            props.setCookie('user_uid', res.data.user.pk);
            window.location.href = "/";
        })
        .catch( error => {
          setError(error.response.data)
        });
    }

    useEffect(() =>{
        console.log(token)
        if(token != '' && typeof token != 'undefined'){
            window.location.href='/logout';
        }
    });

    return(<>
        <div className="form central-placement">
            <form onSubmit={loginauth}>
            <h3>ログイン</h3>
            { errorMessage.non_field_errors ? <p className="red">{errorMessage.non_field_errors}</p> : null }

            <div className="form-element">
            <input type="text" name="username" value={username}
                className="form-element--username"
                onChange={(e) => setUsername(e.target.value)}
                placeholder="ユーザー名" />
            { errorMessage.username ? <p className="red">{errorMessage.username}</p> : null }
            </div>

            <div className="form-element">
            <input type="password" name="password" value={password}
                className="form-element--password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="パスワード" />
            { errorMessage.password ? <p className="red">{errorMessage.password}</p> : null }
            </div>

            <div className='form-element'>
                <input type='text' name='email' value={email} className='form-elemnt-email' onChange={(e) => setEmail(e.target.value)} placeholder='メールアドレス(任意)'/>
                {errorMessage.email ? <p className='red'>{errorMessage.email}</p>:null}
            </div>

            <div className="form-element right-placement">
            <Button variant="contained" color="primary" type="submit" >ログイン</Button>
            </div>
        </form>
        </div>
    </>);
}


export default LoginForm