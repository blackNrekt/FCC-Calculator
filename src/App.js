import React, { useState } from 'react';
import { evaluate } from 'mathjs';
import './App.css';

function Calculator(){
  const [result, setResult] = useState('0');
  const operators = ["+", "-", "*", "/"];  
  const operatorsPos = ["+", "*", "/"];  

  const handleClick = (e) => {      
    if (result==='0') {
      setResult(e.target.textContent.trim());
    } else if (operators.indexOf(e.target.textContent.trim()) !==-1) {               
      setResult(result.concat(e.target.textContent.trim()));      
    } else {      
      setResult(result.concat(e.target.textContent.trim()));      
    }
    
  }
  const handleDecimal = () => {    
    const lastOperatorsIndices = operators.map(operator => result.lastIndexOf(operator));
    const lastOperatorIndex = Math.max(...lastOperatorsIndices);
    if (result.slice(lastOperatorIndex+1).indexOf(".")===-1) {            
      setResult(result.concat("."));
    }

  }

  const handleResult = () => {          
    let array = result.split('');     
    for (let i = 0; i<array.length-1; i++) {
      if (operators.indexOf(array[i]) !==-1 && operatorsPos.indexOf(array[i+1]) !==-1) {
        array.splice(i,1);    
        i = 0;
      }
    }
    
    array = array.join("");
    setResult(evaluate(array).toString());
  }

  const handleClear = () => {
    setResult("0");
  }


  return (
    <div className='calculator'>
      <div id="display" className='row'>
        {result}
      </div>
      <div id="clear" className='row' onClick={handleClear}>AC</div>
      <div className='buttons'>   
        <div id="seven" onClick={handleClick}>7</div> 
        <div id="eight" onClick={handleClick}>8</div> 
        <div id="nine" onClick={handleClick}>9</div>        
        <div id="add" onClick={handleClick} className='operator'> + </div> 
        <div id="four" onClick={handleClick}>4</div>
        <div id="five" onClick={handleClick}>5</div>        
        <div id="six" onClick={handleClick}>6</div>        
        <div id="subtract" onClick={handleClick} className='operator'> - </div>
        <div id="one" onClick={handleClick}>1</div>
        <div id="two" onClick={handleClick}>2</div>
        <div id="three" onClick={handleClick}>3</div> 
        <div id="multiply" onClick={handleClick} className='operator'> * </div> 
        <div id="zero" onClick={handleClick}>0</div> 
        <div id="decimal" onClick={handleDecimal}>.</div>
        <div id='equals' onClick={handleResult}>=</div>        
        <div id="divide" onClick={handleClick} className='operator'> / </div>
      </div>
      
    </div>

  )

}

export default Calculator;