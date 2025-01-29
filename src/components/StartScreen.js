import { useQuiz } from "../context/QuizContext";

export default function StartScreen() {
  const { questionLength, handleStartQuiz } = useQuiz();

  return (
    <div className="start">
      <h2>Welcome to Quizzy!</h2>
      <h3>{questionLength} questions to test your mastery in react</h3>
      <button className="btn btn-ui" onClick={handleStartQuiz}>
        Let's Start
      </button>
    </div>
  );
}
