import { Button } from "@material-ui/core";
import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";


const CommentsPost = (props) => {
    const [comment, setComment] = useState('');
    const [errorMessage, setError] = useState('');
    const [goodbad, setGoodbad] = useState(null);
    const [errorGoodBad, setErrorGoodBad] = useState(''); 

    const submitComment = (event) => {
        event.preventDefault();
        let formdata = new FormData(event.currentTarget);
        const uri = 'http://localhost:8000/api/comment/';

        formdata.append('comment', comment);
        formdata.append('picture_id', props.id);
        formdata.append('user_uid', props.cookie['user_uid']);
        formdata.append('goodbad', goodbad);

        if(goodbad==null){
            setErrorGoodBad('良い点に関するコメントか悪い点に関するコメントかを選択してください');
            return;
        }
        else{
            setErrorGoodBad('');
        }

        axios.post(uri, formdata, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + props.cookie['access-token'] ,
            },
        })
        .then(
            res =>{
                console.log(res.data);
                props.setLength(props.length+1);
                setComment('');
            },
        )
        .catch( error => {
          setError(error.response.data)
        });
    }

    return(<>
        <form onSubmit={submitComment}>
            <input type='text' onChange={(e) => setComment(e.target.value) } value={comment} name='comment'/>
            <Button  variant="contained" type="submit" >追加</Button>
            { errorMessage.comment ? <p className="red">↑ {errorMessage.comment}</p> : null }
            
            <div>
                <input type='radio' id='good' name='comment_type' value={true}  onChange={e => {setGoodbad(true)}}/>
                <label htmlform='good'>ここが良い</label>
                <input type='radio' id='bad' name='comment_type' value={false}  onChange={e => {setGoodbad(false)}}/>
                <label htmlform='bad'>ここがイマイチ</label>
            </div>
            <div>{errorGoodBad}</div>
            
        </form>
    </>);
}

export default CommentsPost