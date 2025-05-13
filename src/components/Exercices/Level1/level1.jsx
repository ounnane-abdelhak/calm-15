import "./level1.css";

import React, { useEffect, useReducer } from "react";

import { NavBar } from "../..";

import Main from "../Main";
import Loader from "../Loader";
import Error from "../Error";
import StartScreen from "../StartScreen";

import Question from "../Question";
import NextButton from "../NextButton";

import FinishScreen from "../FinishScreen";
const initialState = {
  questions: [],
  //loading , error, ready , active , finished
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
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finished":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return { ...initialState, questions: state.questions, status: "ready" };

    default:
      throw new Error("Unknown action");
  }
}

export default function Level1() {
  const [{ questions, status, index, answer, points, highscore }, dispatch] =
    useReducer(reducer, initialState);
  const numQuestions = questions.length;
  console.log(numQuestions);
  useEffect(function () {
    fetch("https://calm-back-1.onrender.com/api/v1/learn/adressing-modes/level/1", {credentials: "include",})
      .then((res) => res.json())
      .then((data) =>
        dispatch({ type: "dataReceived", payload: data.data.data })
      )
      .catch((err) => {
        console.error("Fetch failed", err);
        dispatch({ type: "dataFailed" });
      });
  }, []);
  return (
    <>
      <NavBar />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
              index={index}
              numQuestions={numQuestions}
              points={points}
            />
            <NextButton
              dispatch={dispatch}
              answer={answer}
              numQuestions={numQuestions}
              index={index}
            />
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </>
  );
}
