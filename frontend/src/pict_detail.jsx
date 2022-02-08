import React, { Component } from 'react';
import axios from 'axios';
import { useParams,Link } from 'react-router-dom';
import { useEffect,useState,toJson } from 'react';
import PictuerDisplayAxios from './picture_display';
import CommentsPost from './comment_post';
import { Button } from "@material-ui/core";
import ComparePictPost from './picture_compare_post';

const PictDetail = (props) => {
    const{id} = useParams();
    const [title, setTitle] = useState([]);
    const [pict, setPict] = useState([]);
    const [comments, setComments] = useState([]);
    const [length, setLength] = useState(0);
    const [childPict, setChildPict] = useState([]); 
    const [anotherPict, setAnotherPict] = useState('');

    const uri = 'http://localhost:8000/api/picture/' + id;
    const childbase = 'http://localhost:8000'
    const jumpUriBase = '/home/'

    const getPict = async () => {
        await axios.get(uri, {headers:{
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': 'Bearer ' + props.cookie['access-token'] ,
        }})
        .then(res => {
            console.log(res.data)
            setTitle(res.data.title);
            setPict(<PictuerDisplayAxios imageURL={res.data.picture} cookie={props.cookie} />);
            setComments(res.data.comments);
            setAnotherPict(res.data.anotherPict);
            const childTmp = res.data.childPict.map(item => {
                return {
                    'image':<PictuerDisplayAxios imageURL={childbase + item.picture} cookie={props.cookie} imageSize={200}/>,
                    'id' : item.id,
            }})
            setChildPict(childTmp);
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
        getPict();
    }, [length]);

    return(
        <>
        <div>{title}</div>
        <div>{pict}</div>
        <ul>
            {childPict.map(item => (
                <li key={item['id']}>
                    <a href={jumpUriBase + item['id']}>{item['image']}</a>
                </li>
            ))}
        </ul>
        <ComparePictPost cookie={props.cookie} other_uid={id}/>
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