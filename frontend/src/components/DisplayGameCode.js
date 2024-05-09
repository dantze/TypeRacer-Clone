import React, {useRef, useState} from 'react';


const DisplayGameCode = ({gameID}) => {
    const [copySuccess, setCopySuccess] = useState(false);
    const textInputRef = useRef(null);

    const copyToClipboard = e => {
        textInputRef.current.select();
        document.execCommand('copy');
        setCopySuccess(true);
    }

    return (
        <div className="flex flex-col items-center my-3">
  <div className="flex flex-row justify-between w-full sm:w-8/12">
    <div className="flex-none"></div>
    <div className="flex-grow">
      <h4 className="text-center">Trimite codul prietenilor pentru a intra în joc</h4>
      <div className="flex flex-row items-center justify-center">
        <input ref={textInputRef} type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg mr-2" value={gameID} readOnly/>
        <button className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-100" onClick={copyToClipboard} type="button">Copiază codul jocului</button>
      </div>
      {copySuccess ? <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mt-2" role="alert">Copiat cu succes!</div> : null}
    </div>
    <div className="flex-none"></div>
  </div>
</div>
    )
}

export default DisplayGameCode;
