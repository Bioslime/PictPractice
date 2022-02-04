import {BrowserRouter, Route, Routes} from 'react-router-dom';
import PictCatch from './pictcatch';
import PictDetail from './pict_detail';
import QuestionPost from './question_post';
import Header from './header';
import LoginForm from './loginform';
import { CookiesProvider, useCookies } from 'react-cookie';
import PictPost from './pictpost';
import SignUp from './sign_up';
import LogOut from './logout';


const RouterPage = () => {
    const [cookie, setCookie, deleteCookie] = useCookies(['']);
    console.log(cookie);

    return(
        <>
        <BrowserRouter>
            <CookiesProvider>
            <Routes>
                <Route path='/' element={<Header cookie={cookie}/>}>  
                    <Route path='/' element={<PictCatch/>}/>
                    <Route path='/pictpost' element={<PictPost/>}/>
                    <Route path='/:id' element={<PictDetail/>}/>
                    <Route path='/question' element={<QuestionPost/>}/>
                    <Route path='/login' element={<LoginForm cookie={cookie} setCookie={setCookie}/>}/>
                    <Route path='/signup' element={<SignUp/>}/>
                    <Route path='/logout' element={<LogOut deleteCookie={deleteCookie}/>}/>
                </Route>
            </Routes>
            </CookiesProvider>
        </BrowserRouter>
        </>
    );
}


export default RouterPage