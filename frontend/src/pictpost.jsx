import { useState } from "react";
import axios from "axios";
import { Button } from '@material-ui/core';
import { withCookies } from "react-cookie";
import TokenVerify from "./tokenverify";


const PictPost = (props) =>{
    const token = props.cookies.get('access-token');
    const [image, setImage] = useState('');
    const [title, setTitle] = useState('');
    const [errorMessage, setError] = useState('');

    const pictSubmit = (event) => {
        event.preventDefault();
        let formdata = new FormData();

        formdata.append('id', '9edcb928-e639-4542-9c55-dfbf013f3fe4')
        formdata.append('picture',image);
        formdata.append('title', title);

        const posturi = 'http://localhost:8000/api/picture/'

        axios.post(posturi, formdata, {
            header:{
                'Content-Type': 'multipart/form-data',
            },
        })
        .then( res => {
            window.location.href = "/";
            console.log(res.data)
        })
        .catch( error => {
          setError(error.response.data)
        });
    }

    return(
        <>
        <div className="form central-placement">
        <form onSubmit={pictSubmit}>
            <h3>イラスト投稿</h3>
            { errorMessage.non_field_errors ? <p className="red">{errorMessage.non_field_errors}</p> : null }

            <div className="form-element">
            <input type="text" name="picttitle" value={title}
                className="form-element--title"
                onChange={(e) => setTitle(e.target.value)}
                placeholder="タイトル" />
            { errorMessage.title ? <p className="red">{errorMessage.title}</p> : null }
            </div>

            <div className="form-element">
            <input type="file" name="image" value={image}
                accept="image/*"
                multiple
                className="form-element--image"
                onChange={(e) => setImage(e.target.value)}
                placeholder="イラスト"/>
            { errorMessage.image ? <p className="red">{errorMessage.image}</p> : null }
            </div>

            <div className="form-element right-placement">
            <Button variant="contained" color="primary" type="submit" >投稿</Button>
            </div>
        </form>
        </div>
        </>
    );
}


export default withCookies(PictPost)