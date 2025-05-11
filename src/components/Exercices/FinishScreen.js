// import { useQuiz } from "./contexts/QuizContext";

function FinishScreen({ points, highscore, dispatch }) {
  // const { points, maxPossiblePoints, highscore, dispatch } = useQuiz();

  const percentage = (points / 100) * 100;

  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🎉";
  if (percentage >= 50 && percentage < 80) emoji = "🙃";
  if (percentage >= 0 && percentage < 50) emoji = "🤨";
  if (percentage === 0) emoji = "🤦‍♂️";

  return (
    <div className="result-container">
      <p className="result">
        <span>{emoji}</span> You scored <strong>{points}</strong> out of 100 (
        {Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>
      <button className="btn" onClick={() => dispatch({ type: "restart" })}>
        Restart quiz
      </button>
    </div>
  );
}

export default FinishScreen;
