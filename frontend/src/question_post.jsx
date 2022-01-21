import React, { useEffect, useState } from 'react';
import {BrowserRouter, Route, Link, Routes, useHistory, Router, useLocation} from 'react-router-dom';
import axios from 'axios';


const QuestionPost = () => {
    const [questions, setQuestions] = useState([]);

    const QuestionSubmit = async (event) =>{
        event.preventDefault();
        const data = new FormData(event.currentTarget)
        const response = await axios.post('http://localhost:8000/api/questions/', {
            question: data.get('question')
        })
        console.log(response.data)
        getQuestions()
    }

    const getQuestions= async () => {
        const response = await axios.get('http://localhost:8000/api/questions')
        console.log(response.data)
        setQuestions(response.data)
    }

    useEffect(() => {
        getQuestions()
    },[])

    return(
        <>
        <form onSubmit={event => QuestionSubmit(event)}>
            <label htmlFor='question'>Question:</label>
            <br/>
            <input type='text' id='question' name='question'/>
            <input type='submit' defaultValue={'Submit'}/>
        </form>
        <hr/>
        
        <ul>
            <p>質問</p>
            {questions.map(post => (
                <li key={post.id}>
                    <div>{post.question}</div>
                </li>
            ))}
        </ul>
        </>
    )
}


export default QuestionPost