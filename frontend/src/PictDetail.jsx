import React, { Component } from 'react';
import axios from 'axios';
import { useParams,Link } from 'react-router-dom';
import { useEffect,useState,toJson } from 'react';
import PictuerDisplayAxios from './picture_display';


const PictDetail = (props) => {
    const{id} = useParams();
    const [title, setTitle] = useState([]);
    const [user, setUser] = useState([]);
    const [date, setDate] = useState([]);
    const [pict, setPict] = useState([]);

    useEffect(async () => {
        const response = await axios('http://localhost:8000/api/picture/' + id,);
        setTitle(response.data.title);
        setUser(response.data.user);
        setDate(response.data.date);
        setPict(<PictuerDisplayAxios imageURL={response.data.picture} />);
    }, []);

    return(
        <>
        <div>{title}</div>
        <div>{pict}</div>
        <Link to="../">戻る</Link>
        </>
    )
}

export default PictDetail