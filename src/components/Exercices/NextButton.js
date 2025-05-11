// import { useQuiz } from "./contexts/QuizContext";

function NextButton({ dispatch, answer, numQuestions, index }) {
  // const { dispatch, answer, index, numQuestions } = useQuiz();
  if (answer === null) return null;

  if (index < numQuestions - 1)
    return (
      <button
        className="btn next"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );

  if (index === numQuestions - 1)
    return (
      <button
        className="btn next"
        onClick={() => dispatch({ type: "finished" })}
      >
        Finish
      </button>
    );
}

export default NextButton;
