import React, { useState } from "react";
import { elements } from "./_data";

function Element({ showInfo, num, setSelectedSymbol, onClick }) {
  const [hover, setHover] = useState(false);
  const [inputText, setInputText] = useState('');
  const [cursorPosition, setCursorPosition] = useState(0);
  const [subscriptMode, setSubscriptMode] = useState(false);
  const [superscriptMode, setSuperscriptMode] = useState(false);



  const openInfo = () => {
    showInfo(num);
    setSelectedSymbol((prevSelectedSymbol) => prevSelectedSymbol + " " + elements[num].symbol);
    // handleKeyPress(elements[num].symbol); // Trigger the action here

  };

  

  

  const onMouseEnter = () => {
    setHover(true);
  };

  const onMouseLeave = () => {
    setHover(false);
  };

  const element = elements[num];
  const handleKeyPress = (key) => {
    let newText;

    if (subscriptMode) {
      newText =
        inputText.slice(0, cursorPosition) +
        `<sub>${key}</sub>` +
        inputText.slice(cursorPosition);
    } else if (superscriptMode) {
      newText =
        inputText.slice(0, cursorPosition) +
        `<sup>${key}</sup>` +
        inputText.slice(cursorPosition);
    } else {
      newText =
        inputText.slice(0, cursorPosition) +
        key +
        inputText.slice(cursorPosition);
    }

    setInputText(newText);
    setCursorPosition(cursorPosition + key.length + (subscriptMode ? 11 : 0) + (superscriptMode ? 13 : 0));
  };




  const handleSubscript = () => {
    setSubscriptMode(!subscriptMode);
    setSuperscriptMode(false);
  };




  const handleSuperscript = () => {
    setSuperscriptMode(!superscriptMode);
    setSubscriptMode(false);
  };

  const handleArrow = (direction) => {
    let newPosition;

    if (direction === 'left') {
      newPosition = Math.max(0, cursorPosition - 1);
    } else if (direction === 'right') {
      newPosition = Math.min(inputText.length, cursorPosition + 1);
    }

    setCursorPosition(newPosition);
  };

  return (
    <div
      title={element.name}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={openInfo}
      className={`element element-${num} ${element.category} ${
        hover ? "active" : ""
      }`}
    >
       {/*  
       <div className="symbol">{element.symbol}</div> 
       */}

      <div className="element-box" onClick={onClick}>
      <div className="symbol" onClick={onClick}>{element.symbol}</div>
      <div className="element-name" onClick={onClick}>{element.name}</div> 
      <div className="number" onClick={onClick}>{element.number}</div>
      </div>
      {/* {divContent} */}
    </div>
  );
}

export default Element;
