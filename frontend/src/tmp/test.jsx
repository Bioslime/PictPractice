import React from 'react';
import { useEffect,useState,toJson } from 'react';

const TestData = () => {
    const [data, setData] = useState(0);

    return (
        <>
            <p> yuo clicked {data} times </p>
            <button onClick={ () => setData(prevState => prevState + 1) }>
                +1
            </button>
        </>
    );
};

export default TestData