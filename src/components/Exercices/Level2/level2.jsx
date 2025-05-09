import { useState } from "react";
import { Footer } from "../../../containers";
import NavBar from "../../NavBar";
import "./level2.css";

import Select from "react-select";
const questions = [
  {
    num: "1",
    qst: "MOV BR ,5",
  },
  {
    num: "2",
    qst: "ADD R3,*R4 ",
  },
  {
    num: "3",
    qst: "XOR SR ",
  },
  {
    num: "4",
    qst: "NOR IR",
  },
  {
    num: "5",
    qst: "NAND BR, SR",
  },
  {
    num: "6",
    qst: "SUB RI ,20",
  },
  {
    num: "7",
    qst: "MOV R2,BR*+10",
  },
  {
    num: "8",
    qst: "NAND BR",
  },
  {
    num: "9",
    qst: "WRITE *20,40",
  },
];

export default function Level2() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="level2">
      <NavBar />
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
      <Footer></Footer>
    </div>
  );
}
const Questionsswiper = () => {
  const datacamp = questions.map((data) => {
    return <Question num={data.num} qst={data.qst} />;
  });

  return <div>{datacamp}</div>;
};

function Question({ num, qst }) {
  return (
    <>
      <div className="container2">
        <p className="question2"> Question {num}</p>

        <div className="ABC2">
          <h1 className="Q2">{qst}</h1>

          <div className="textInputWrapper">
            <input placeholder="Type Here" type="text" className="textInput" />
          </div>
        </div>
      </div>
    </>
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
