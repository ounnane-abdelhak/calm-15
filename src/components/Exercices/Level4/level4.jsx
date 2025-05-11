import NavBar from "../../NavBar";
import "./level4.css";
import { useReducer, useState, useEffect } from "react";
import Loader from "../Loader";
import Error from "../Error";
import StartScreen from "../StartScreen";
import FinishScreen from "../FinishScreen";

const initialState = {
  questions: [
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
      correctValues: { R1: "", R2: "4095", R3: "452", R4: "92", ACC: "" },
      points: 10,
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
      correctValues: { R1: "22", R2: "2", R3: "", R4: "", ACC: "22" },
      points: 10,
    },
  ],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };
    case "submitAnswers":
      const totalPoints = state.questions.reduce((acc, question, idx) => {
        const userAns = action.payload[idx];
        const correctAns = question.correctValues;
        const isCorrect = Object.entries(correctAns).every(
          ([reg, val]) => (userAns[reg] || "").trim() === val
        );
        return isCorrect ? acc + question.points : acc;
      }, 0);
      return {
        ...state,
        status: "finished",
        points: totalPoints,
        highscore: Math.max(totalPoints, state.highscore),
      };
    case "restart":
      return { ...initialState, questions: state.questions, status: "ready" };
    default:
      throw new Error("Unknown action");
  }
}

export default function Level4() {
  const [{ questions, status, points, highscore }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const [userAnswers, setUserAnswers] = useState(
    questions.map(() => ({
      R1: "",
      R2: "",
      R3: "",
      R4: "",
      ACC: "",
    }))
  );

  useEffect(() => {
    if (status === "loading") {
      const timer = setTimeout(() => {
        dispatch({ type: "dataReceived", payload: initialState.questions });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleInputChange = (qIndex, reg, value) => {
    const updated = [...userAnswers];
    updated[qIndex][reg] = value;
    setUserAnswers(updated);
  };

  const handleSubmit = () => {
    dispatch({ type: "submitAnswers", payload: userAnswers });
  };

  return (
    <div className="level4">
      <NavBar />
      {status === "loading" && <Loader />}
      {status === "error" && <Error />}
      {status === "ready" && (
        <StartScreen numQuestions={questions.length} dispatch={dispatch} />
      )}
      {status === "active" && (
        <>
          <Questionsswiper
            questions={questions}
            userAnswers={userAnswers}
            handleInputChange={handleInputChange}
          />
          <div className="button">
            <button className="submit-btn" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </>
      )}
      {status === "finished" && (
        <FinishScreen
          points={points}
          highscore={highscore}
          dispatch={dispatch}
        />
      )}
    </div>
  );
}

function Questionsswiper({ questions, userAnswers, handleInputChange }) {
  return (
    <div>
      {questions.map((q, idx) => (
        <Question
          key={idx}
          num={q.num}
          instructions={[
            q.instr1,
            q.instr2,
            q.instr3,
            q.instr4,
            q.instr5,
            q.instr6,
            q.instr7,
            q.instr8,
          ]}
          values={userAnswers[idx]}
          onChange={(reg, val) => handleInputChange(idx, reg, val)}
        />
      ))}
    </div>
  );
}

function Question({ num, instructions, values, onChange }) {
  return (
    <div className="container4">
      <h1 className="question4">Question {num}:</h1>
      <div className="ABC4">
        <div className="questions">
          {instructions.map((inst, i) => (
            <h1 className="Q4" key={i}>
              {inst}
            </h1>
          ))}
        </div>
        <div className="inputContainer">
          {["R1", "R2", "R3", "R4", "ACC"].map((reg) => (
            <label className="lab" key={reg}>
              {reg}
              <input
                type="text"
                value={values[reg]}
                onChange={(e) => onChange(reg, e.target.value)}
                className="input"
              />
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
