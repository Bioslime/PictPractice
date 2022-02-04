import React, { useEffect, useState } from 'react';
import {BrowserRouter, Route, Link, Routes, useHistory, Router, useLocation} from 'react-router-dom';
import axios from 'axios';
import PictuerDisplayAxios from './picture_display';
import TokenVerify from './tokenverify';

const PictCatch = (props) => {
    const [data, setData] = useState([]);

    const getPict = async () => {
        const response = await axios.get('http://localhost:8000/api/picture/')
        console.log(response.data)
        setData(response.data)
    }


    useEffect(() => {
        getPict();
    },[])

    return (
        <>
        <ul>
            { data.map(post => (
                <li key={post.id}>
                    <div>{post.title}</div>
                        <Link to={ post.id }>
                            <PictuerDisplayAxios imageURL={post.picture}/>
                        </Link>
                </li>
            ))}
        </ul>
        </>
    )
}

export default PictCatch
