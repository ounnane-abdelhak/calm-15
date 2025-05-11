import Options from "./Options";
import Progress from "./Prograss";

export default function Question({
  question,
  dispatch,
  answer,
  index,
  numQuestions,
  points,
}) {
  return (
    <div>
      <h4>{question.question}</h4>

      <Progress
        index={index}
        numQuestions={numQuestions}
        points={points}
        anwer={answer}
      />

      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
}
