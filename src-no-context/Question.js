import Option from "./components/Option";

function Question({ question, dispatch, answer, points }) {
  console.log(question);
  return (
    <div>
      <h4>{question.question}</h4>
      <Option question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
}

export default Question;
