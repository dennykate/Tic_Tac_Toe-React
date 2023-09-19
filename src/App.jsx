import React, { useState } from "react";
import "./App.css";

const winnerCodes = [
  "0,1,2",
  "3,4,5",
  "6,7,8",
  "0,3,6",
  "1,4,7",
  "2,5,8",
  "0,4,8",
  "2,4,6",
];

const App = () => {
  const [values, setValues] = useState(Array(9).fill(null));
  const [sign, setSign] = useState("X");
  const [winnerCode, setWinnerCode] = useState("");

  const checkWinner = (data) => {
    winnerCodes.forEach((code) => {
      const codeArr = code.split(",");

      if (checkTrueInCodeArr(codeArr, data)) {
        setWinnerCode(code);
        console.log("winner - ", data);
      }
    });
  };

  const checkTrueInCodeArr = (code, data) => {
    const codeArr = code.map((code) => values[code] == data);

    if (codeArr[0] && codeArr[1] && codeArr[2]) return true;
    else return false;
  };

  const handleClick = (index, data) => {
    if (values[index] === null) {
      values[index] = data;
      checkWinner(data);
    }

    setValues(values);
  };

  return (
    <div className="w-full h-screen bg-slate-500 flex justify-center items-center">
      <div className="flex flex-wrap w-[213px] h-[213px] ">
        {values.map((data, index) => (
          <Square
            key={index}
            index={index}
            sign={sign}
            setSign={setSign}
            handleClick={handleClick}
            values={values}
            winnerCode={winnerCode}
          />
        ))}
      </div>
    </div>
  );
};

export default App;

const Square = ({ sign, setSign, index, handleClick, values, winnerCode }) => {
  const [value, setValue] = useState(null);

  const checkIsWinnerCode = () => {
    const winnerCodeArr = winnerCode.split(",");

    if (winnerCodeArr.length < 3) return false;

    const isExist = winnerCodeArr.find((code) => code == index);

    if (isExist == 0) return true;

    return isExist ? true : false;
  };

  return (
    <button
      onClick={() => {
        if (values[index] == null) {
          setValue(sign);
        }

        handleClick(index, sign);

        if (sign == "X") {
          setSign("O");
        } else {
          setSign("X");
        }
      }}
      className={`w-[70px] h-[70px] border-[1px] border-black  flex justify-center items-center
     text-2xl font-bold text-black ${
       checkIsWinnerCode() ? "bg-fuchsia-400 text-white" : "text-black bg-white"
     }`}
    >
      {value}
    </button>
  );
};
