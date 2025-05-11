// import { useQuiz } from "./contexts/QuizContext";

function Options({ question, dispatch, answer }) {
  const hasAnswered = answer !== null;

  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${index + 1 === answer ? "answer" : ""} ${
            hasAnswered && index + 1 === question.correctOption
              ? "correct"
              : hasAnswered &&
                index + 1 !== question.correctOption &&
                index + 1 === answer
              ? "wrong"
              : ""
          }`}
          key={option}
          disabled={hasAnswered}
          onClick={() => dispatch({ type: "newAnswer", payload: index + 1 })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
