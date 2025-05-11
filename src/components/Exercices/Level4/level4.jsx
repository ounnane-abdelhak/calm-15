import { Footer } from "../../../containers";
import NavBar from "../../NavBar";
import "./level4.css";
import { useState } from "react";

const questions = [
  {
    num: "1",
    instr1: "MOV  R4 , 256",
    instr2: "MOV  458*, R3",
    instr3: "MOV  R3, R4",
    instr4: "MOV  R4,92",
    instr5: "MOV  92*,452",
    instr6: "MOV  R3 ,458*",
    instr7: "MOV  R3, 92*",
    instr8: "MOV  R2,4095",
  },
  {
    num: "2",
    instr1: "MOV BR,1",
    instr2: "MOV IDR,2",
    instr3: "MOV 18*,5",
    instr4: "MOV R2,2",
    instr5: "MOV 2*,BR*+IDR+15",
    instr6: "MOV R1,2*",
    instr7: "ADD R1,R2",
    instr8: "MOV R1,ACC",
  },
];

export default function Level4() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="level4">
      <NavBar />
      {submitted ? (
        <ResultPage />
      ) : (
        <>
          <Questionsswiper />
          <div className="button">
            <button className="submit-btn" onClick={() => setSubmitted(true)}>
              Submit
            </button>
          </div>
        </>
      )}
      <Footer />
    </div>
  );
}

const Questionsswiper = () => {
  return (
    <div>
      {questions.map((data, index) => (
        <Question
          key={index}
          num={data.num}
          instr1={data.instr1}
          instr2={data.instr2}
          instr3={data.instr3}
          instr4={data.instr4}
          instr5={data.instr5}
          instr6={data.instr6}
          instr7={data.instr7}
          instr8={data.instr8}
        />
      ))}
    </div>
  );
};

function Question({
  num,
  instr1,
  instr2,
  instr3,
  instr4,
  instr5,
  instr6,
  instr7,
  instr8,
}) {
  return (
    <div className="container4">
      <h1 className="question4">Question {num}:</h1>
      <div className="ABC4">
        <div className="questions">
          <h1 className="Q4">{instr1}</h1>
          <h1 className="Q4">{instr2}</h1>
          <h1 className="Q4">{instr3}</h1>
          <h1 className="Q4">{instr4}</h1>
          <h1 className="Q4">{instr5}</h1>
          <h1 className="Q4">{instr6}</h1>
          <h1 className="Q4">{instr7}</h1>
          <h1 className="Q4">{instr8}</h1>
        </div>

        <div className="inputContainer">
          <label className="lab">
            R1
            <input type="text" name="R1" className="input" />
          </label>
          <label className="lab">
            R2
            <input type="text" name="R2" className="input" />
          </label>
          <label className="lab">
            R3
            <input type="text" name="R3" className="input" />
          </label>
          <label className="lab">
            R4
            <input type="text" name="R4" className="input" />
          </label>
          <label className="lab">
            ACC
            <input type="text" name="ACC" className="input" />
          </label>
        </div>
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
