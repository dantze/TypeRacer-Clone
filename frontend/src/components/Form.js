import React, {useState, useRef, useEffect, useCallback} from 'react';
import socket from '../socketConfig';

const Form = ({isOpen, isOver, gameID}) => {
    const [userInput, setUserInput] = useState("");
    const textInput = useRef(null);

    useEffect(() => {
        if(!isOpen){
            textInput.current.focus();
        }
    }, [isOpen])

    const resetForm = () => {
        setUserInput("");
    }

    const onChange = useCallback((e) => {
        let value = e.target.value;
        let lastChar = value.charAt(value.length - 1);
        if(lastChar === " "){
            socket.emit('userInput', {userInput, gameID});
            resetForm();
        }
        setUserInput(e.target.value);
    }, [userInput])

    return (
        <div className = "grid-row my-3">
            <div className = "columns-1"></div>
            <div className = "columns-4 flex justify-center items-center">
                    <form className = "">
                        <input type = "text" readOnly = {isOpen || isOver}
                                            onChange = {onChange}
                                            value = {userInput}
                                            className = "form-control bg-slate-200 rounded-md min-w-80 h-8 text-xl pl-1"
                                            ref = {textInput}
                                            />
                    </form>
            </div>
            <div className = "columns-1"></div>
        </div>
    )

}

export default Form;