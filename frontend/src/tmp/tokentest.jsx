import { Button } from "@material-ui/core";
import axios from "axios";
import { withCookies } from "react-cookie";


const TokenTest = (props) => {
    const tokenPost = () => {
        const token = props.cookie['access-token']
        const uri = 'http://localhost:8000/api/test/';
        const data = {'token': token,};
        const Authorization = 'Bearer ' + token ;
        const headers = {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization':Authorization,
        }
        console.log(headers);

        axios.get(uri,{
            headers: headers})
        .then(res => {
            console.log(res.data);
        })
    }
    return(<>
        <Button onClick={tokenPost}>Test</Button>
    </>);
}


export default withCookies(TokenTest);
