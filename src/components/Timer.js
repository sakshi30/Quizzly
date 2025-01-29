import { useEffect } from "react";
import { useQuiz } from "../context/QuizContext";

function Timer() {
  const { dispatch, secondsRemaining } = useQuiz();
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  useEffect(() => {
    const interval = setInterval(() => {
      if (secondsRemaining > 0) {
        dispatch({ type: "tick" });
      } else {
        dispatch({ type: "finish" });
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [dispatch, secondsRemaining]);
  return (
    <div className="timer">
      {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
    </div>
  );
}

export default Timer;
