import { type } from "@testing-library/user-event/dist/type";
import { useQuestions } from "../contexts/QuizContext";

function NextButton() {
  // dispatch={dispatch}
  // answer={answer}
  // numberQuestions={questions.length}
  // index={index}

  const { dispatch, answer, index, questions } = useQuestions();
  const numberQuestions = questions.length;

  if (answer === null) return null;
  if (index < numberQuestions - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    );
  }

  if (index === numberQuestions - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish" })}
      >
        Finish
      </button>
    );
  }
}

export default NextButton;
