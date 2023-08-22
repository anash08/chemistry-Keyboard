import React, { useState, useRef, useEffect, Fragment } from 'react';
import './App.css';
import { elements } from "./_data";
import Element from "./Element";
import katex from 'katex';
import 'katex/dist/katex.min.css';
import logoimg from "/home/netobjex/Keyboard/periodic-table/src/components/UnifyGPT-logo-300x55.png"
import MathKeyCan from './chemistryEditorMain';

const CustomInput = ({ value, onChange }) => {
  const renderEquation = (equation) => {
    try {
      return katex.renderToString(equation, { throwOnError: false });
    } catch (error) {
      return equation; // If there's an error, return the original text
    }
  };

  const [latexValue, setLatexValue] = useState(renderEquation(value));

  const handleInput = (event) => {
    const inputValue = event.target.innerHTML;
    onChange(inputValue);
    setLatexValue(renderEquation(inputValue));
  };

  useEffect(() => {
    const latexElement = document.getElementById("Latex-Value");
    const renderedValue = latexElement.querySelector(".katex-html").innerText;
    console.log("Rendered Latex Value:", renderedValue);
  }, [value]);
  

  return (
    <div>
      <div className="input-display">
        <div
          className="content-editable"
          contentEditable
          onInput={handleInput}
          dangerouslySetInnerHTML={{ __html: value }}
        />
      </div>
      <div className="latex-display" id = "Latex-Value">
        Latex:
        <div
          className="content-editable"
          contentEditable
          onInput={handleInput}
          dangerouslySetInnerHTML={{ __html: renderEquation(value) }}
          onClick = {handleInput}
        />
      </div>
    </div>
  );
};



const App = () => {
  const [inputText, setInputText] = useState('');
  const [cursorPosition, setCursorPosition] = useState(0);
  const [subscriptMode, setSubscriptMode] = useState(false);
  const [superscriptMode, setSuperscriptMode] = useState(false);


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

  

  const [showInfo, setShowInfo] = useState(false);
  const [element, setElement] = useState({});
  const [selectedSymbol, setSelectedSymbol] = useState(""); // State for selected symbol

  const handleShowInfo = (num) => {
    setShowInfo(true);
    setElement(elements[num]);
  };




  const handleCloseInfo = () => {
    setShowInfo(false);
  };





  const handleInputChange = (html) => {
    setInputText(html);
  };





  const populateElements = (start, end) => {
    const items = [];
    for (let i = start; i <= end; i++) {
      items.push(
        <Element
          showInfo={handleShowInfo}
          num={i}
          key={i}
          setSelectedSymbol={setSelectedSymbol}
        />
      );
    }
    return items;
  };


  const {
    name,
    summary,
    symbol,
    category,
    number,
    source,
    appearance,
    atomic_mass,
    molar_heat,
    density,
    melt,
    boil,
  } = element;




  //............................||..............................................//

  const renderKeyboardKeys = () => {
    const elementSymbols = elements.map((element) => element.symbol);

    const populateElements = (start, end) => {
      const items = [];
      for (let i = start; i <= end; i++) {
        items.push(
          <Element
            showInfo={handleShowInfo}
            num={i}
            key={i}
            setSelectedSymbol={setSelectedSymbol}
            onClick={() => handleKeyPress(elementSymbols[i - 0])}
          />
        );
      }
      return items;
    };

    return (
      <div className="wrapper">
        <div id="table">
          {populateElements(1, 4)}
          <Element
            showInfo={handleShowInfo}
            num={0}
            key={0}
            setSelectedSymbol={setSelectedSymbol}
            onClick={() => handleKeyPress(elementSymbols[0])}
          />
          {showInfo && (
            <Fragment>


              <div id="element-box" className={`${category}`}>
                <div className="number" onClick={<CustomInput value={inputText} onChange={handleInputChange} />}>{number}</div>
                <div className="symbol" onClick={handleKeyPress}>{symbol}</div>

                <div className="element-name">{name}</div>
              </div>
              <div id="information">
                <div
                  onClick={handleCloseInfo}
                  className="close-button"
                  title="Close Info"
                >
                  Close [&times;]
                </div>
                <div>
                  <h1 className="big_title">{name}</h1>
                  <span className={`cat_name ${category}`}>{category}</span>
                  {appearance && (
                    <div className="appearance">
                      <strong>Appearance:</strong> {appearance}
                    </div>
                  )}
                  <div className="atom_info">
                    <span>Atomic Mass: {atomic_mass} | </span>
                    <span>Density: {density}</span>
                    {molar_heat && <span> | Molar Heat: {molar_heat}</span>}
                    {melt && <span> | Melt: {melt}K</span>}
                    {boil && <span> | Boil: {boil}K</span>}
                  </div>
                  <div>
                    {summary} ...{" "}
                    <a target="_blank" rel="noopener noreferrer" href={source}>
                      Source
                    </a>
                  </div>
                </div>
              </div>
            </Fragment>
          )}
          {populateElements(5, 57)}
          {populateElements(72, 89)}
          {populateElements(104, 118)}
          {populateElements(58, 71)}
          {populateElements(90, 103)}
        </div>
      </div>
    );
  };









  return (
    <div className="app">
      <div className='Header-img'>
        <a href="https://www.webtiga.com/unify-gpt/">
          <img className="logo-img" src={logoimg} alt="Logo" />
        </a>
      </div>
      <div className="heading">
        <h2 style={{ alignItems: 'center' }}>Chemistry keyboard</h2>
      </div>
      <CustomInput value={inputText} onChange={handleInputChange} />
      <div className="keyboard">
        {renderKeyboardKeys()}
      </div>
      <div className="controls">
        <button onClick={handleSubscript}>X₂</button>
        <button onClick={handleSuperscript}>X²</button>
        <button onClick={() => handleArrow('left')}>←</button>
        <button onClick={() => handleArrow('right')}>→</button>
      </div>


    <MathKeyCan/>
    </div>
  );
};

export default App;
