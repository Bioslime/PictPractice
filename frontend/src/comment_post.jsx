import { Button } from "@material-ui/core";
import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";


const CommentsPost = (props) => {
    const [comment, setComment] = useState('');
    const [errorMessage, setError] = useState('');
    const [goodbad, setGoodbad] = useState(false);

    const submitComment = (event) => {
        event.preventDefault();
        let formdata = new FormData(event.currentTarget);
        const uri = 'http://localhost:8000/api/comment/';
        formdata.append('comment', comment);
        formdata.append('picture_id', props.id);
        formdata.append('user_uid', '9edcb928-e639-4542-9c55-dfbf013f3fe4');
        formdata.append('goodbad', goodbad);

        axios.post(uri, formdata, {
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(
            res =>{
                console.log(res.data);
            },
            props.setLength(props.length+1),
            setComment(''),
        )
        .catch( error => {
          setError(error.response.data)
        });
    }

    return(<>
        <form onSubmit={submitComment}>
            <input type='text' onChange={(e) => setComment(e.target.value) } value={comment} name='comment'/>
            <Button  variant="contained" type="submit" >追加</Button>
            
            <div>
                <input type='radio' id='good' name='comment_type' value={true}  onChange={e => {setGoodbad(true)}}/>
                <label htmlform='good'>良い点</label>
                <input type='radio' id='bad' name='comment_type' value={false}  onChange={e => {setGoodbad(false)}}/>
                <label htmlform='bad'>悪い点</label>
            </div>
            
        </form>
    </>);
}

export default CommentsPost