import React, { useEffect, useState } from 'react';
import axios from 'axios';


const PictCatch = () => {
    const [data, setData] = useState([])

    const getPict = async () => {
        const response = await axios.get('http://localhost:8000/api/pictdata')
        console.log(response.data)
        setData(response.data)
    }

    useEffect(() => {
        getPict()
    },[])

    return (
        <div>
            <ul>
                {
                    data.map(post => <li key={post.id}>{post.title} {post.date}</li>)
                }
            </ul>
        </div>
    )
}

export default PictCatch
