// react-testing-library renders your components to document.body,
// this adds jest-dom's custom assertions
import "@testing-library/jest-dom/extend-expect";
const App = require("./App");

let exp1 = Array.from(
  { length: Math.floor(Math.random() * 20) + 1 },
  () => Math.floor(Math.random() * 100) - 50
);

let exp2 = Array.from(
  { length: Math.floor(Math.random() * 10) + 1 },
  () => Math.floor(Math.random() * 100) - 50
);

const addingArrayExp = (exp1Arr, exp2Arr) => {
  let resultArray = [];
  let shorterArray = exp1Arr.length < exp2Arr.length ? exp1Arr : exp2Arr;
  let longerArray = exp1Arr.length > exp2Arr.length ? exp1Arr : exp2Arr;
  shorterArray.forEach((value, index) => {
    resultArray.push(value + longerArray[index]);
  });
  longerArray.splice(0, shorterArray.length);
  resultArray = [...resultArray, ...longerArray];
  return resultArray.reverse();
};

const arrayToStringConverter = (array) => {
  let stringExp = "";
  array.forEach((value, index) => {
    if (value < 0)
      stringExp = `${stringExp} - ${Math.abs(value)}${
        array.length - 1 - index !== 0 ? "x" : ""
      }${array.length - 1 - index !== 0 ? array.length - 1 - index : ""}`;
    else if (value > 0)
      stringExp = `${stringExp}${index !== 0 ? " + " : ""}${value}${
        array.length - 1 - index !== 0 ? "x" : ""
      }${array.length - 1 - index !== 0 ? array.length - 1 - index : ""}`;
  });
  if (stringExp === "") return "0";
  else return stringExp;
};

it("adding expressions with integer coefficients generated randomly", () => {
  expect(
    App.addingExpressions(
      arrayToStringConverter(exp1),
      arrayToStringConverter(exp2)
    )
  ).toEqual(
    arrayToStringConverter(addingArrayExp(exp1.reverse(), exp2.reverse()))
  );
});

it("adding expressions with real coefficients ", () => {
  expect(App.addingExpressions("-25x + 0.3", "55x + 3/10")).toEqual(
    "30x1 + 0.6"
  );
});

it("adding expressions with real exponent ", () => {
  expect(App.addingExpressions("-25x0.5 + 0.3", "55x + 3/10 + 10x0.5")).toEqual(
    "55x1 - 15x0.5 + 0.6"
  );
});
