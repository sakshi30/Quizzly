import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Loader from "./Loader";
import Error from "./components/Error";
import Main from "./components/Main";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import Progress from "./components/Progress";
import Finish from "./components/Finish";
import Timer from "./components/Timer";

const initialState = {
  questions: [],
  //loading, error, ready, active, finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  totalPoints: 0,
  highscore: 0,
  secondsRemaining: null,
};

const SECONDS_PER_QUESTION = 30;
function reducer(state, action) {
  switch (action.type) {
    case "dataRecieved":
      let totalPoints = 0;
      action.payload.map((question) => (totalPoints += question.points));
      return {
        ...state,
        questions: action.payload,
        status: "ready",
        totalPoints,
      };
    case "error":
      return { ...state, questions: [], status: "error" };
    case "startQuiz":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECONDS_PER_QUESTION,
      };
    case "answered":
      const currentQuestion = state.questions[state.index];
      const correctAnswer = currentQuestion.correctOption;
      return {
        ...state,
        answer: action.payload,
        points:
          correctAnswer === action.payload
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
    case "reset":
      return {
        ...state,
        points: 0,
        totalPoints: 0,
        //loading, error, ready, active, finished
        status: "ready",
        index: 0,
        answer: null,
        highscore: 0,
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
      };
    default:
      throw new Error("Invalid Response");
  }
}
export default function App() {
  const [
    {
      questions,
      status,
      index,
      answer,
      points,
      totalPoints,
      highscore,
      secondsRemaining,
    },
    dispatch,
  ] = useReducer(reducer, initialState);
  const questionLength = questions.length;
  useEffect(function () {
    async function fetchData() {
      const response = await fetch("http://localhost:8000/questions");
      if (response.ok) {
        const data = await response.json();
        dispatch({ type: "dataRecieved", payload: data });
      } else {
        dispatch({ type: "error" });
      }
    }
    fetchData();
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "finished" && (
          <Finish
            points={points}
            totalPoints={totalPoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
        {status === "ready" && (
          <StartScreen
            questionLength={questionLength}
            handleStartQuiz={dispatch}
          />
        )}
        {status === "active" && (
          <>
            <Progress
              questionLength={questionLength}
              index={index}
              points={points}
              totalPoints={totalPoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              {answer !== null && index < questionLength - 1 && (
                <button
                  className="btn btn-ui"
                  onClick={() => dispatch({ type: "nextQuestion" })}
                >
                  Next
                </button>
              )}
              {answer !== null && index === questionLength - 1 && (
                <button
                  className="btn btn-ui"
                  onClick={() => dispatch({ type: "finish" })}
                >
                  Finish
                </button>
              )}
            </footer>
          </>
        )}
      </Main>
    </div>
  );
}
