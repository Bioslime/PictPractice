import {BrowserRouter, Route, Routes} from 'react-router-dom';
import PictCatch from './pictcatch';
import PictDetail from './PictDetail';
import QuestionPost from './question_post';
import Header from './header';
import LoginForm from './loginform';
import { CookiesProvider, useCookies } from 'react-cookie';
import PictPost from './pictpost';
import PictPostTest from './tmp/posttestpict';



const RouterPage = () => {

    return(
        <>
        <BrowserRouter>
            <CookiesProvider>
            <Routes>
                <Route path='/' element={<Header/>}>  
                    <Route path='/' element={<PictCatch/>}/>
                    <Route path='/pictpost' element={<PictPost/>}/>
                    <Route path='/login' element={<LoginForm/>}/>
                    <Route path='/:id' element={<PictDetail/>}/>
                    <Route path='/question' element={<QuestionPost/>}/>
                    <Route path='/login' element={<LoginForm/>}/>
                    <Route path='/testpict' element={<PictPostTest/>}/>
                </Route>
            </Routes>
            </CookiesProvider>
        </BrowserRouter>
        </>
    );
}


export default RouterPage