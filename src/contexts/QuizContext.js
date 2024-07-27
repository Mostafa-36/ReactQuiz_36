import { createContext, useContext, useEffect, useReducer } from "react";

const QuestionsContext = createContext();

const SEC_PER_QUESTION = 30;

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondeRemaining: null,
};
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondeRemaining: state.questions.length * SEC_PER_QUESTION,
      };
    case "newAnswer":
      const currentQuestion = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === currentQuestion.correctOption
            ? state.points + currentQuestion.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return { ...initialState, questions: state.questions, status: "ready" };
    case "tick":
      return {
        ...state,
        secondeRemaining: state.secondeRemaining - 1,
        status: state.secondeRemaining ? state.status : "finished",
      };
    default:
      throw new Error("action unkown");
  }
}

export default function QuestionsProvider({ children }) {
  const [
    { questions, status, index, answer, points, highscore, secondeRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const maxPossiblePoints = questions.reduce(
    (prev, current) => prev + current.points,
    0
  );

  const numberQuestions = questions.length;

  useEffect(() => {
    async function getQuestion() {
      try {
        const res = await fetch(
          "https://api.jsonbin.io/v3/b/66a4be59ad19ca34f88d7f17",
          {
            method: "GET",
            headers: {
              "X-ACCESS-KEY": process.env.XACCESSKEY,
            },
          }
        );

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        console.log(data);
        dispatch({ type: "dataReceived", payload: data.record.questions });
      } catch (err) {
        console.error("Error:", err);
        dispatch({ type: "dataFailed" });
      }
    }

    getQuestion();
  }, []);

  return (
    <QuestionsContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        secondeRemaining,
        maxPossiblePoints,
        numberQuestions,
        dispatch,
      }}
    >
      {children}
    </QuestionsContext.Provider>
  );
}

export function useQuestions() {
  const context = useContext(QuestionsContext);
  if (context === undefined)
    throw new Error("QuizContext was used outside of the QuizProvider");
  return context;
}
