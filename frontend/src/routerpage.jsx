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
import RoutePage from './root';
import CommentDig from './commentDig';

const RouterPage = () => {
    const [cookie, setCookie, deleteCookie] = useCookies(['']);

    return(
        <>
        
        <BrowserRouter>
            <CookiesProvider>
            <Routes>
                <Route path='/' element={<Header cookie={cookie}/>}>  
                    <Route path='/' element={<RoutePage cookie={cookie}/>}/>
                    <Route path='login' element={<LoginForm cookie={cookie} setCookie={setCookie}/>}/>
                    <Route path='signup' element={<SignUp setCookie={setCookie}/>}/>
                    <Route path='/pictpost' element={<PictPost cookie={cookie}/>}/>
                    <Route path='/home' element={<PictCatch cookie={cookie}/>}/>
                    <Route path='/home/:id' element={<PictDetail cookie={cookie}/>}/>
                    <Route path='/question' element={<QuestionPost/>}/>
                    <Route path='/logout' element={<LogOut deleteCookie={deleteCookie} cookie={cookie}/>}/>
                    <Route path='/home/:image_id/comment/:comment_id' element={<CommentDig  cookie={cookie}/>}/>
                </Route>
            </Routes>
            </CookiesProvider>
        </BrowserRouter>
        </>
    );
}


export default RouterPage