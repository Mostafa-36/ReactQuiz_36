import { useQuestions } from "../contexts/QuizContext";

function Option() {
  const { questions, dispatch, answer, index } = useQuestions();
  const question = questions[index];

  const hasAnswered = answer !== null;
  console.log(question);
  return (
    <div className="options ">
      {question?.options.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            hasAnswered
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={option}
          disabled={hasAnswered}
          onClick={() => {
            dispatch({
              type: "newAnswer",
              payload: index,
            });
          }}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Option;
