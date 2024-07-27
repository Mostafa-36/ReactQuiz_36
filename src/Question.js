import Option from "./components/Option";
import { useQuestions } from "./contexts/QuizContext";

function Question() {
  // question={questions[index]}
  // dispatch={dispatch}
  // answer={answer}
  // points={points}
  const { questions, answer, points, index, dispatch } = useQuestions();
  const question = questions[index];
  return (
    <div>
      <h4>{question.question}</h4>
      <Option />
    </div>
  );
}

export default Question;
