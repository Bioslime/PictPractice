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
        const response = await axios(uri,);
        setTitle(response.data.title);
        setUser(response.data.user);
        setDate(response.data.date);
        setPict(<PictuerDisplayAxios imageURL={response.data.picture} />);
        setComments(response.data.comments);
    }

    const deletePict = () => {
        axios.delete(uri)
        .then(() =>{
            window.location.href = "/";
        })
    }

    useEffect( () => {
        getPict()} , 
        [length]);

    return(
        <>
        <div>{title}</div>
        <div>{pict}</div>
        <CommentsPost id={id} length={length} setLength={setLength}/>
        <Button onClick={deletePict} color="primary" variant="contained">削除</Button>
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