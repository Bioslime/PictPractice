import { Button } from "@material-ui/core";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react"


const QuestionGeter = (props) => {
    const uri = 'http://localhost:8000/api/questions';
    const [questions, setQuestions] = useState([]);
    const [choiceQuestion, setChoiceQuestion] = useState('test');

    const questionGet = async () => {
        await axios.get(uri, { headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': 'Bearer ' + props.cookie['access-token'] ,
        }})
        .then(res => {
            setQuestions(res.data);
        })
    }

    const randomChoiceQuestions = () =>{
        console.log(questions);
        const tmp = questions.map(item=>(item.question));
        setChoiceQuestion(tmp[Math.floor(Math.random()*tmp.length)]);
    }

    useEffect(()=>{
        questionGet();
        randomChoiceQuestions();
    },[])

    return(<>
     <hr/>
        <div>
            <Button onClick={()=>randomChoiceQuestions()} variant="contained">質問</Button>
        </div>
        <div>
            <h4>{choiceQuestion}</h4>
        </div>
    </>);
}

export default QuestionGeter;