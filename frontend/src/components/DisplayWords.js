import React from 'react';

const typedCorrectlyStyle = {
    "backgroundColor" : "#34eb77",
}
const currentStyle = {
    "textDecoration" : "underline",
}

 const getTypedWords = (words, player) => {
    let typedWords = words.slice(0, player.currentWordIndex);
    typedWords = typedWords.join(" ");
    return <span style = {typedCorrectlyStyle}>{typedWords} </span>
 }
 const getCurrentWord = (words, player) => {
    console.log(words[player.currentWordIndex])
    return <span style = {currentStyle}>{words[player.currentWordIndex]}</span>

 }
 const getWordsToBeTyped = (words, player) => {
    let wordsToBeTyped = words.slice(player.currentWordIndex + 1, words.length);
    wordsToBeTyped = wordsToBeTyped.join(" ");
    return <span> {wordsToBeTyped}</span>
 }

const DisplayWords = ({words, player}) => {
    return (
        <div className = "pt-14">
            {getTypedWords(words, player)}
            {getCurrentWord(words, player)}
            {getWordsToBeTyped(words, player)}
        </div>
    )
}

export default DisplayWords;