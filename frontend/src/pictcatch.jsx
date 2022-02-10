import React, { useEffect, useState } from 'react';
import {BrowserRouter, Route, Link, Routes, useHistory, Router, useLocation} from 'react-router-dom';
import axios from 'axios';
import PictuerDisplayAxios from './picture_display';

const PictCatch = (props) => {

    const [data, setData] = useState([]);

    const getPict = async () => {
        const uri = 'http://localhost:8000/api/picture/';
        await axios.get(uri,{
            headers:{
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + props.cookie['access-token'] ,
            },
        })
        .then(res => {
            setData(res.data);
            console.log(res.data);
        })
    }

    useEffect(() => {
        if(props.cookie['access-token'] == '' || typeof props.cookie['access-token'] == 'undefined'){
            window.location.href = "/login";
            return
        }
        getPict();
    },[])

    return (
        <>
        {data.length == '0' ? 
            <div>
                <p>イラストがまだ投稿されていません</p>
                <Link to={'/pictpost'}>
                    イラスト登録はこちら
                </Link>
            </div>:
            <ul>
                { data.map(post => 
                    <li key={post.id}>
                        <div>{post.title}</div>
                        <Link to={post.id }>
                            <PictuerDisplayAxios imageURL={post.picture} cookie={props.cookie}/>
                        </Link>
                    </li>
                )}
            </ul>
        }
            
        </>
    )
}

export default PictCatch
