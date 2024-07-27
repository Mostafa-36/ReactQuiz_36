import { useEffect } from "react";
import { useQuestions } from "../contexts/QuizContext";

function Timer() {
  const { dispatch, secondeRemaining } = useQuestions();
  const min = Math.floor(secondeRemaining / 60);
  const seconds = secondeRemaining % 60;
  useEffect(
    function () {
      const id = setInterval(() => {
        // dispatch({ type: Number(secondeRemaining) ? "tick" : "restart" });
        dispatch({ type: "tick" });
      }, 1000);
      return () => clearInterval(id);
    },
    [dispatch]
  );
  return (
    <div className="timer">
      {min < 10 && "0"}
      {min}:{seconds < 10 && "0"}
      {seconds}
    </div>
  );
}

export default Timer;
