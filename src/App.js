import React from "react";
import "./App.css";
function App() {
  const splitter = (expression) => {
    return expression.split(" ");
  };
  const emptyValueCleaner = (array) => {
    let cpyArray = [];
    array.forEach((value, index) => {
      if (value !== "") {
        cpyArray.push(value);
      }
    });
    return cpyArray;
  };
  const signDetector = (addendArray) => {
    let arrayWithSignsInside = [];
    addendArray.forEach((exp, index, array) => {
      if (array[index - 1] === "-") arrayWithSignsInside.push("-" + exp);
      else if (array[index - 1] === "+" || array[index - 1] === undefined)
        arrayWithSignsInside.push(exp);
    });
    return arrayWithSignsInside;
  };
  const fractionStrToDecimal = (str) => str.split("/").reduce((p, c) => p / c);

  const coefficientFixer = (expArray) => {
    expArray = expArray.map((value) => {
      if (value.includes("/")) value = fractionStrToDecimal(value);
      value = parseFloat(value);
      if (isNaN(value)) {
        value = 1;
      }
      return value;
    });
    return expArray;
  };
  const coefficientGetter = (addendArray) => {
    let coefficientArray = [];
    addendArray.forEach((exp) => {
      let expArray = exp.split("x");
      expArray = coefficientFixer(expArray);
      if (expArray[1] === undefined) expArray[1] = 0;
      coefficientArray.push({
        exp: expArray[1],
        coef: expArray[0],
      });
    });
    return coefficientArray;
  };
  const fillWithMissingAugendCoefArr = (augendCoefArr, result) => {
    augendCoefArr.forEach((algExp) => {
      let finded = false;
      result.forEach((algExp2, index, array) => {
        if (algExp.exp === algExp2.exp) {
          finded = true;
        } else if (!finded && index + 1 === array.length) result.push(algExp);
      });
    });
    console.log(result);
  };
  const adddingCoef = (augendCoefArr, addendCoefArr) => {
    let result = [];
    addendCoefArr.forEach((algExp) => {
      let finded = false;
      augendCoefArr.forEach((algExp2, index, array) => {
        if (algExp.exp === algExp2.exp) {
          finded = true;
          result.push({
            exp: algExp.exp,
            coef: algExp.coef + algExp2.coef,
          });
        } else if (index === array.length - 1 && !finded) result.push(algExp);
      });
    });
    fillWithMissingAugendCoefArr(augendCoefArr, result);
    return result;
  };
  const sortResultArray = (result) => {
    result.sort(function (a, b) {
      return b.exp - a.exp;
    });
    return result;
  };
  const printResult = (result) => {
    let resultString = "";
    result.forEach((algExp) => {
      if (algExp.coef > 0 && resultString !== "")
        resultString = resultString + " + ";
      else if (algExp.coef < 0) resultString = resultString + " - ";
      if (algExp.exp !== 0)
        resultString = resultString + `${Math.abs(algExp.coef)}x${algExp.exp}`;
      else resultString = resultString + Math.abs(algExp.coef);
    });
    console.log(resultString);
  };
  const addingExpressions = (augend, addend) => {
    let coefficientsAddend;
    let coefficientsAugend;
    let result;
    let augendArray = splitter(augend);
    augendArray = emptyValueCleaner(augendArray);
    augendArray = signDetector(augendArray);
    coefficientsAugend = coefficientGetter(augendArray);
    let addendArray = splitter(addend);
    addendArray = emptyValueCleaner(addendArray);
    addendArray = signDetector(addendArray);
    coefficientsAddend = coefficientGetter(addendArray);
    result = adddingCoef(coefficientsAugend, coefficientsAddend);
    result = sortResultArray(result);
    console.log(coefficientsAddend);
    console.log(coefficientsAugend);
    console.log(result);
    printResult(result);
  };
  addingExpressions("3x1/4 + 2x3 + 10x - 4", "12x1/4 + 7x3 + 5x - 12");
  /// 15x4 + 9x3 + 15x - 16
  return <div className="App"></div>;
}

export default App;
///// 3x^2 - 12x + 10 //// -12x
