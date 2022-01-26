import { useState } from "react";
import axios from "axios";


const PictPostTest = (props) =>{
    const [imageURL, setImageURL] = useState('');
    const [image, setImage] = useState('');
    const [title, setTitle] = useState('');
    const [errorMessage, setError] = useState('');

    const pictSubmit = (event) => {
        event.preventDefault();
        let formdata = new FormData();

        formdata.append('user_uid', '9edcb928-e639-4542-9c55-dfbf013f3fe4');
        formdata.append('title', title);
        formdata.append('picture',image);

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

    const getImage = (event) => {
        const imageFile = event.target.files[0];
        const imageURL = URL.createObjectURL(imageFile);
        setImageURL(imageURL);
        setImage(event.target.files[0]);
    }

    return(<>
        <div>テスト</div>
        <form onSubmit={pictSubmit}>
            <div className="form-element">
                <input type='file' accept = 'image/*' onChange={e => getImage(e)}/>
            </div>
            <div className="form-element">
                <input type='text' onChange={(e) => setTitle(e.target.value)} value={title} name="picttitle" placeholder="タイトル"/>
            </div>
            <input type='submit' value='提出'/>
        </form>
        <img  src = {imageURL} height={500}/>
    </>);

}


export default PictPostTest