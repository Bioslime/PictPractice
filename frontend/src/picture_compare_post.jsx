import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";


const ComparePictPost = (props) =>{
    const [imageURL, setImageURL] = useState('');
    const [image, setImage] = useState('');
    const [title, setTitle] = useState('');
    const [errorMessage, setError] = useState('');

    const token = props.cookie['access-token'];

    const pictSubmit = (event) => {
        event.preventDefault();
        let formdata = new FormData();

        formdata.append('user_uid', props.cookie['user_uid']);
        formdata.append('title', title);
        formdata.append('picture',image);
        formdata.append('other_uid', props.other_uid);

        const posturi = 'http://localhost:8000/api/picture/compare/'

        axios.post(posturi, formdata, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + token ,
            },
        })
        .then( res => {
            window.location.href = "/";
        })
        .catch( error => {
          setError(error.response.data)
        });
    }

    const getImage = (event) => {
        const imageFile = event.target.files[0];
        const imageURL = URL.createObjectURL(imageFile);
        setImageURL(imageURL);
        setImage(event.target.files[0]);
    }


    useEffect(()=>{
        if (token === '' || typeof token === 'undefined'){
            window.location.href = "/login";
        }
    }, []);

    return(<>
        <form onSubmit={pictSubmit}>
            <div className="form-element">
                <input type='file' accept = 'image/*' onChange={e => getImage(e)}/>
            </div>
            <div className="form-element">
                <input type='text' onChange={(e) => setTitle(e.target.value)} value={title} name="picttitle" placeholder="タイトル"/>
            </div>
            <input type='submit' value='提出'/>
        </form>
        {imageURL == ''? null : <img  src = {imageURL} height={500}/>}
    </>);

}


export default ComparePictPost