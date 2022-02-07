import { useEffect } from "react";

const RoutePage = (props) => {
    const token = props.cookie['access-token'];

    const routeHome = () =>{
        window.location.href = '/home';
    }
    const routeLogin = () => {
        window.location.href = '/login';
    }
    useEffect(() => {
        if (token === '' || typeof token === 'undefined'){
            routeLogin();
        }
        else{
            routeHome();
        }
    });
    return(<></>);
}


export default RoutePage;