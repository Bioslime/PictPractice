import { useState } from "react"



const PictPostTest = () => {
    const [image, setImage] = useState('');
    const submitPict = (event) => {
        event.preventDefalut();
    }

    const getImage = (event) => {
        const imageFile = event.target.files[0];
        const imageURL = URL.createObjectURL(imageFile);
        setImage(imageURL)
    }

    return(<>
        <form onSubmit={submitPict}>
            <input type='file' accept = 'image/*' onChange={getImage}/>
            <input type='submit' value='提出'/>
        </form>
        <img  src = {image} height={500}/>
    </>);
}


export default PictPostTest