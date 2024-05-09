import React, {useState, useEffect, useMemo, useLayoutEffect} from 'react';
import socket from '../socketConfig';

const CountDown = props => {
    
    return (
        <>
            <h1 className = "text-3xl pt-11">
                {props.countDown}
            </h1>
            <h3 className = "text-3xl">
                {props.msg}
            </h3>
        </>
    )

}

export default CountDown;