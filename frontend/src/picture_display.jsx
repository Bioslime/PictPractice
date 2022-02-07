import React, {useState, useEffect} from "react";
import axios from "axios";


const PictuerDisplayAxios = props => {
    const [image, setImage] = useState([])
    const getPictuer = async () => {
        // const response = await axios.get(props.imageURL, {responseType: 'blob',})
        // console.log(response.data)
        // setImage([URL.createObjectURL(response.data)])
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
        <img src = {image} height={500}/>
    )
}

export default PictuerDisplayAxios