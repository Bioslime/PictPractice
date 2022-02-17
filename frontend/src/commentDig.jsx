import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import CommentsPost from "./comment_post";
import PictuerDisplayAxios from "./picture_display";
import QuestionGeter from "./question_get";
import { loginCheck } from "./loginCheck";


const CommentDig = (props) => {
    const {comment_id} = useParams();
    const {image_id} = useParams();
    const uribase = 'http://localhost:8000/api/'
    const [length, setLength] = useState(0);
    const [parentComment, setParentComment] = useState('');
    const [image, setImage] = useState([]);
    const [childComments, setChildComments] = useState([]);

    const getComment = async (id) => {
        const geturi = uribase + 'comment/' + id;
        await axios.get(geturi,{headers:{
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': 'Bearer ' + props.cookie['access-token'] ,
        }})
        .then(res => {
            console.log(res.data);
            setParentComment(res.data.comment);
            setChildComments(res.data.child_comments);
        })
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

    useEffect(()=>{
        loginCheck(props.cookie);
        getComment(comment_id);
        getImage(image_id);
    },[length])

    return(<>
        <Link to={'/home/' + image_id}>{image}</Link>
        <h3>{parentComment}</h3>
        <div>コメント詳細</div><hr/>
        <ul>
            {childComments.map(item => 
            <li key={item.id}>{item.comment}</li>
            )}
        </ul>
        <QuestionGeter cookie={props.cookie}/>
        <CommentsPost id={image_id} parentid={comment_id} length={length} setLength={setLength} cookie={props.cookie}/>
    </>);
}


export default CommentDig;