import React, { useEffect, useState } from 'react';
import {BrowserRouter, Route, Link, Routes, useHistory,useLocation, useParams, Outlet} from 'react-router-dom';
import PictCatch from './pictcatch';
import PictDetail from './PictDetail';
import QuestionPost from './question_post';
import UserForm from './userform';



const RouterPage = () => {
    return(
        <>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <PictCatch/> }/>
                <Route path='/:id' element={<PictDetail/>}/>
                <Route path='/question' element={<QuestionPost/>}/>
                <Route path='/login' element={<UserForm/>}/>
            </Routes>
        </BrowserRouter>
        </>
    );
}


export default RouterPage