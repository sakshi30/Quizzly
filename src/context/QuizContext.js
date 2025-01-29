import { createContext, useContext, useEffect, useReducer } from "react";

const QuizContext = createContext();
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
function QuizProvider({ children }) {
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

  function handleStartQuiz() {
    dispatch({ type: "startQuiz" });
  }

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        totalPoints,
        highscore,
        secondsRemaining,
        handleStartQuiz,
        dispatch,
        questionLength,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("QuizContext used outside the provider");
  return context;
}

export { useQuiz, QuizProvider };
