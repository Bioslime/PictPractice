import {Link} from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import {withCookies } from 'react-cookie';
import { Typography} from '@material-ui/core';
import { useEffect } from 'react';


const Header = (props) => {
    const token = props.cookie['access-token'];

    useEffect(()=>{
    }, []);

    return(
        <>
        <Link to={token ? "/" : "/login"}>
          <Typography variant="h3" type="title" color="inherit" >
            サイトタイトル
          </Typography>
        </Link>
        {token? 
          <div>
            <div>
              <Link to={'/logout'}>ログアウト</Link>
            </div>
            <div>
              <Link to={'/pictpost'}> イラスト登録 </Link>
            </div>
          </div>
          :<div>
            <div>
              <Link to={'/login'}>ログイン</Link>
            </div>
            <div>
              <Link to={'/signup'}>ユーザー登録</Link>
            </div>
          </div>}
        <hr/>
        <Outlet/>
        </>
    )
   }
  
  export default Header