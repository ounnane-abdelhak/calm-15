import "./styles.css";

function StartScreen({ numQuestions, dispatch }) {
  return (
    <div>
      <h2>Welcome to CALM Quiz</h2>
      <h3>{numQuestions} questions to test your Understanding</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Let's start
      </button>
    </div>
  );
}

export default StartScreen;
