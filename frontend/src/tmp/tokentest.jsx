import { Button } from "@material-ui/core";
import axios from "axios";
import { withCookies } from "react-cookie";


const TokenTest = (props) => {
    const tokenPost = () => {
        const token = props.cookie['access-token']
        console.log(token);
        const uri = 'http://localhost:8000/api/test/';
        const data = {'token': token,};
        const Authorization = 'JWT ' + token ;
        console.log(Authorization)
        axios.get(uri,{
            headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization':Authorization,
        },})
        .then(res => {
            console.log(res.data);
        })
    }
    return(<>
        <Button onClick={tokenPost}>Test</Button>
    </>);
}


export default withCookies(TokenTest);
