import "./level1.css";

import React, { useEffect, useState } from "react";
import Select from "react-select";
import { NavBar, Title } from "../..";
import { Footer } from "../../../containers";

const questions = [
  {
    num: "1",
    qst: "How many units are connected to the data bus: ",
    R1: "4 units",
    R2: "5 units",
    R3: "6 units",
  },
  {
    num: "2",
    qst: "Addressing modes that doesn't exist in the calM: ",
    R1: "1- Based",
    R2: "2- indexed indirect",
    R3: "3- Based indexed",
  },
  {
    num: "3",
    qst: "Instruction formats: ",
    R1: "1- Reduced Format",
    R2: "2- General Format ",
    R3: "3- Neither of the two",
  },
  {
    num: "4",
    qst: "How many bits are there in the flag register: ",
    R1: "1- 6 bits",
    R2: "2- 7 bits",
    R3: "3- 8 bits",
  },
  {
    num: "5",
    qst: "How many bytes ares there in the general purpose registers:",
    R1: "1- One byte",
    R2: "2- Two Bytes",
    R3: "3- Three Bytes",
  },
  {
    num: "6",
    qst: "What are the component that doesn't belong to the memory unit:",
    R1: "1-IP",
    R2: "2-CM",
    R3: "3-MDR/MAR",
  },
  {
    num: "7",
    qst: "All of the instructions are on 8 bits: ",
    R1: "Yes",
    R2: "No, all of them are on 16 bits ",
    R3: "Neither of the two",
  },
  {
    num: "8",
    qst: "How many bits are there in the flag register: ",
    R1: "1- 6 bits",
    R2: "2- 7 bits",
    R3: "3- 8 bits",
  },
  {
    num: "9",
    qst: "The cache memory is bigger than the central memory :",
    R1: "1- Yes, it's bigger",
    R2: "2- No, it's smaller",
    R3: "3- They're equal",
  },
  {
    num: "10",
    qst: "What are pointers in assembly?",
    R1: "1- Variable type that stores integers",
    R2: "2- Memory address that stores another memory address",
    R3: "3- An I/O peripheral",
  },
];
const options = [
  { value: 1, label: "Answer N°:1" },
  { value: 2, label: "Answer N°:2" },
  { value: 3, label: "Answer N°:3" },
];

export default function Level1() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <>
      <NavBar />
      <div className="level1">
        {submitted ? (
          <ResultPage />
        ) : (
          <>
            <Questionsswiper />

            <button className="submit-btn" onClick={() => setSubmitted(true)}>
              Submit
            </button>
          </>
        )}
      </div>
      <Footer></Footer>
    </>
  );
}
const Questionsswiper = () => {
  const datacamp = questions.map((data) => {
    return (
      <Question
        num={data.num}
        r1={data.R1}
        r2={data.R2}
        r3={data.R3}
        qst={data.qst}
      />
    );
  });

  return <div>{datacamp}</div>;
};
function Question({ num, qst, r1, r2, r3 }) {
  return (
    <div className="container">
      <h1 className="question"> Question {num}</h1>

      <div className="ABC1">
        <p className="Q1"> {qst}</p>
        <div className="R1">
          <li className="liexercices">{r1}</li>
          <li className="liexercices">{r2}</li>
          <li className="liexercices">{r3}</li>
        </div>

        <Select options={options} className="ABC" />
      </div>
    </div>
  );
}
const ResultPage = () => {
  return (
    <div className="result-box">
      <h2 className="result-title">Quiz Results</h2>
      <p className="result-text">Thanks for completing the quiz! 🎉</p>
    </div>
  );
};
