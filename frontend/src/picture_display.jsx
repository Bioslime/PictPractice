import React, {useState, useEffect} from "react";
import axios from "axios";


const PictuerDisplayAxios = props => {
    const [image, setImage] = useState([])
    const getPictuer = async () => {
        const response = await axios.get(props.imageURL, {responseType: 'blob',})
        console.log(response.data)
        setImage([URL.createObjectURL(response.data)])
    }
    useEffect(() =>{
        getPictuer();
    }, [])
    return(
        <img src = {image} height={500}/>
    )
}

export default PictuerDisplayAxios