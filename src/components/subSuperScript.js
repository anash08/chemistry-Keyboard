import React, { useState } from 'react';
// import './App.css';



const SubscriptSuperscript = () => {
  const [inputText, setInputText] = useState('');
  const [cursorPosition, setCursorPosition] = useState(0);
  const [subscriptMode, setSubscriptMode] = useState(false);
  const [superscriptMode, setSuperscriptMode] = useState(false);

  const handleKeyPress = (key) => {
    if (subscriptMode) {
      setInputText(
        inputText.slice(0, cursorPosition) +
        `<sub>${key}</sub>` +
        inputText.slice(cursorPosition)
      );
    } else if (superscriptMode) {
      setInputText(
        inputText.slice(0, cursorPosition) +
        `<sup>${key}</sup>` +
        inputText.slice(cursorPosition)
      );
    } else {
      setInputText(
        inputText.slice(0, cursorPosition) +
        key +
        inputText.slice(cursorPosition)
      );
    }

    setCursorPosition(cursorPosition + 1);
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
    if (direction === 'left') {
      setCursorPosition(Math.max(0, cursorPosition - 1));
    } else if (direction === 'right') {
      setCursorPosition(Math.min(inputText.length, cursorPosition + 1));
    }
  };

  const renderKeyboardKeys = () => {
    return Object.keys(elementMap).map((key) => (
      <button key={key} onClick={() => handleKeyPress(key)}>
        {key}
      </button>
    ));
  };

  return (
    <div className="app">
      <div className="input-display" dangerouslySetInnerHTML={{ __html: inputText }} />
      <div className="keyboard">
        {renderKeyboardKeys()}
      </div>
      <div className="controls">
        <button onClick={handleSubscript}>Subscript</button>
        <button onClick={handleSuperscript}>Superscript</button>
        <button onClick={() => handleArrow('left')}>←</button>
        <button onClick={() => handleArrow('right')}>→</button>
      </div>
    </div>
  );
};

export default SubscriptSuperscript;
