import Option from "./components/Option";
import { useQuestions } from "./contexts/QuizContext";

function Question() {
  const { questions, index } = useQuestions();
  const question = questions[index];
  return (
    <div>
      <h4>{question.question}</h4>
      <Option />
    </div>
  );
}

export default Question;
