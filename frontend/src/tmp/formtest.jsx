import { useState } from "react"



const TestForm = () => {
    const [text, setText] = useState('');
    const [text2, setText2] = useState('');
    const [text3, setText3] = useState('');

    const post = (event) => {
        event.preventDefault();
        let formdata = new FormData();
        formdata.append('text', text);
        setText3(text+text2)
        return formdata
    }

    return(<>
        <div>{text3}</div>
        <div>TestForm</div>
        <div className="form central-placement">
        <form onSubmit={post}>
            <div className="test1">
                <input type='text' className="test1" name='test1' value={text} onChange={(e) => setText(e.target.value)}/>
            </div>

            <div className="test">
                <input type='text' className="test" name='test' value={text2} onChange={(e) => setText2(e.target.value)}/>
            </div>

            <div className="test1">
                <input type='submit' value='提出'/>
            </div>
        </form>
        </div>
    </>);
}

export default TestForm