import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import CommentsPost from "./comment_post";
import PictuerDisplayAxios from "./picture_display";


const CommentDig = (props) => {
    const {comment_id} = useParams();
    const {image_id} = useParams();
    const uribase = 'http://localhost:8000/api/'
    const [length, setLength] = useState(0);
    const [parenComment, setParentComment] = useState('');
    const [image, setImage] = useState([]);
    const [childIds, setChildIds] = useState([]);

    const getComment = async (id) => {
        const geturi = uribase + 'comment/' + id;
        let tmp = '';
        await axios.get(geturi,{headers:{
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': 'Bearer ' + props.cookie['access-token'] ,
        }})
        .then(res => {
            console.log(res.data);
            setParentComment(res.data.comment);
        })
        console.log(tmp);
    } 

    const getImage = async (id) => {
        const geturi = uribase + 'picture/' + id; 
        await axios.get(geturi,{headers:{
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': 'Bearer ' + props.cookie['access-token'] ,
        }})
        .then(res => {
            setImage(<PictuerDisplayAxios imageURL={res.data.picture} cookie={props.cookie} />);
        })
    }

    const getanyComment = (ids) => {
        ids.map(item => {
            return([
                getComment(item)
            ])
        })
    }

    useEffect(()=>{
        getComment(comment_id);
        getImage(image_id);
    },[length])

    return(<>
        <Link to={'/home/' + image_id}>{image}</Link>
        <h3>{parenComment}</h3>
        <CommentsPost id={image_id} parentid={comment_id} length={length} setLength={setLength} cookie={props.cookie}/>
    </>);
}


export default CommentDig;