import Header from "./components/Header";
import Loader from "./Loader";
import Error from "./components/Error";
import Main from "./components/Main";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import Progress from "./components/Progress";
import Finish from "./components/Finish";
import Timer from "./components/Timer";
import { useQuiz } from "./context/QuizContext";

export default function App() {
  const { questionLength, status, index, answer, dispatch } = useQuiz();
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "finished" && <Finish />}
        {status === "ready" && <StartScreen />}
        {status === "active" && (
          <>
            <Progress />
            <Question />
            <footer>
              <Timer />
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
