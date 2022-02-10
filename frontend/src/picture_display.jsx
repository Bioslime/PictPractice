import React, {useState, useEffect} from "react";
import axios from "axios";


const PictuerDisplayAxios = props => {
    const [image, setImage] = useState([])
    const sizeGet = () => {
        let imageSize;
        if (typeof props.imageSize == 'undefined'){
            imageSize = 500;
        }
        else{
            imageSize = props.imageSize;
        }
        return imageSize
    }

    const getPictuer = async () => {
        await axios.get(props.imageURL,{responseType: 'blob',},{
            headers:{
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': 'Bearer ' + props.cookie['access-token'] ,
            }
        })
        .then(res =>{
            setImage([URL.createObjectURL(res.data)])
        })
    }

    useEffect(() =>{
        getPictuer();
    }, [])
    return(
        <img src = {image} height={sizeGet()}/>
    )
}

export default PictuerDisplayAxios