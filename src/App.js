let augend = " - 10x2 + 6x - 0.75";
let addend = " 3/2x + 12x0";
const splitter = (expression) => {
  return expression.split(" ");
};
const emptyValueCleaner = (array) => {
  // CLEANING VALUE IN CASE OF UNWANTED SPACES
  let cpyArray = [];
  array.forEach((value, index) => {
    if (value !== "") {
      cpyArray.push(value);
    }
  });
  return cpyArray;
};
const signDetector = (addendArray) => {
  //  DETECTING SIGNS AND SAVING THEM TO ARRAY
  let arrayWithSignsInside = [];
  addendArray.forEach((exp, index, array) => {
    if (array[index - 1] === "-") arrayWithSignsInside.push("-" + exp);
    else if (
      array[index - 1] === "+" ||
      (array[index - 1] === undefined && exp !== "-")
    ) {
      arrayWithSignsInside.push(exp);
    }
  });
  return arrayWithSignsInside;
};
const fractionStrToDecimal = (str) => str.split("/").reduce((p, c) => p / c);

const coefficientFixer = (expArray) => {
  // FIXING EXPONENT IN CASE THAT WASNT WRITTEN EXAMPLE: "x" INSTEAD OF "x1"
  expArray = expArray.map((value) => {
    if (value.includes("/")) value = fractionStrToDecimal(value);
    if (value === "-") value = -1;
    value = parseFloat(value);
    if (isNaN(value)) {
      value = 1;
    }
    return value;
  });
  return expArray;
};
const coefficientGetter = (addendArray) => {
  // GETTING COEFFICIENTS FROM STRING AND PUSHING IT TO AN ARRAY
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
  // ADDING COEFFICIENTS THAT WEREN'T INCLUDED IN addingCoef FUNCTION
  augendCoefArr.forEach((algExp) => {
    let finded = false;
    result.forEach((algExp2, index, array) => {
      if (algExp.exp === algExp2.exp) {
        finded = true;
      } else if (!finded && index + 1 === array.length) result.push(algExp);
    });
  });
};
const adddingCoef = (augendCoefArr, addendCoefArr) => {
  // ADDING COEFFICIENTS WITH THE SAME EXPONENT
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
  return resultString;
};
const removeEmptyAlgExp = (arrayOfCoeffs) => {
  // REMOVING VALUE FROM ARRAY IN CASE COEFFICIENT IS EQUAL TO ZERO
  arrayOfCoeffs.forEach((algExp, index) => {
    if (algExp.coef === 0) arrayOfCoeffs.splice(index, 1);
  });
  return arrayOfCoeffs;
};
const expressionSimplifier = (arrayOfCoeffs) => {
  // SIMPLIFYING SINGLE EXPRESSION EXAMPLE : "2 + 5 + 7 + x" => "7 + x"
  let auxiliaryArr = arrayOfCoeffs.map((obj) => ({ ...obj }));
  auxiliaryArr.forEach((algExp, index, array) => {
    for (let i = index; i < array.length; i++) {
      if (i !== index && algExp.exp === array[i].exp) {
        algExp.coef = algExp.coef + array[i].coef;
        array.splice(i, 1);
        i--;
      }
    }
  });
  return auxiliaryArr;
};

const processExpression = (expression) => {
  // FUNCTION FOR PRCESSING ALL OPERATIONS ON EXPRESSION
  let expArray = splitter(expression);
  expArray = emptyValueCleaner(expArray);
  expArray = signDetector(expArray);
  let coeffArray = coefficientGetter(expArray);
  coeffArray = expressionSimplifier(coeffArray);
  return coeffArray;
};

const addingExpressions = (augend, addend) => {
  // MAIN FUNCTION, GETTING 2 EXPRESSSIONS AS STRINGS
  let result = adddingCoef(
    processExpression(augend),
    processExpression(addend)
  );
  result = removeEmptyAlgExp(result);
  result = sortResultArray(result);
  console.log(printResult(result));
  return printResult(result);
};

addingExpressions(augend, addend);
module.exports = {
  addingExpressions,
};
