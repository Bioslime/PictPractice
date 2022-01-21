import React, { useEffect, useState } from 'react';
import {BrowserRouter, Route, Link, Routes, useHistory, Router, useLocation} from 'react-router-dom';
import axios from 'axios';


const Header = () => {
    return(
        <>
        <header>
            <h1>ページ名</h1>
            <hr/>
        </header>
        </>
    )
}

export default Header