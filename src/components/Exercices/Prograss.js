// import { useQuiz } from "./contexts/QuizContext";

function Progress({ index, numQuestions, points, answer }) {
  //   const { index, numQuestions, points, maxPossiblePoints, answer } = useQuiz();

  return (
    <header className="progress">
      <progress
        max={numQuestions}
        value={index + Number(answer !== null)}
      ></progress>
      <p>
        Question{" "}
        <strong>
          {index + 1}/{numQuestions}
        </strong>
      </p>
      <p>
        <strong>{points}</strong>/100
      </p>
    </header>
  );
}

export default Progress;
