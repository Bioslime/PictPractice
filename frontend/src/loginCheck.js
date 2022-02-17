const loginCheck = (cookie) => {
    if(cookie['access-token'] == '' || typeof cookie['access-token'] == 'undefined'){
        window.location.href = "/login";
        return
    }
}

export {loginCheck}