import React, { Component } from 'react';
import axios from 'axios';
import { useParams,Link } from 'react-router-dom';
import { useEffect,useState,toJson } from 'react';
import PictuerDisplayAxios from './picture_display';
import CommentsPost from './comment_post';
import { Button } from "@material-ui/core";

const PictDetail = (props) => {
    const{id} = useParams();
    const [title, setTitle] = useState([]);
    const [user, setUser] = useState([]);
    const [date, setDate] = useState([]);
    const [pict, setPict] = useState([]);
    const [comments, setComments] = useState([]);
    const [length, setLength] = useState(0);

    const uri = 'http://localhost:8000/api/picture/' + id;

    const getPict = async () => {
        await axios.get(uri, {headers:{
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': 'Bearer ' + props.cookie['access-token'] ,
        }})
        .then(res => {
            setTitle(res.data.title);
            setUser(res.data.user);
            setDate(res.data.date);
            setPict(<PictuerDisplayAxios imageURL={res.data.picture} cookie={props.cookie}/>);
            setComments(res.data.comments);
            console.log(length);
        })
    }

    const deletePict = () => {
        axios.delete(uri,{
            headers:{
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': 'Bearer ' + props.cookie['access-token'] ,
            }
        })
        .then(() =>{
            window.location.href = "/home";
        })
    }

    useEffect( () => {
        getPict();} , 
        [length]);

    return(
        <>
        <div>{title}</div>
        <div>{pict}</div>
        <Button onClick={deletePict} color="primary" variant="contained">削除</Button>
        <CommentsPost id={id} length={length} setLength={setLength} cookie={props.cookie}/>
        <ul>
            {comments.map(item => (
                <li key={item.id}>{item.comment}</li>
            ))}
        </ul>
        <Link to="../">戻る</Link>
        </>
    )
}

export default PictDetail