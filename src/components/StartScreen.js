export default function StartScreen({ questionLength, handleStartQuiz }) {
  return (
    <div className="start">
      <h2>Welcome to Quizzy!</h2>
      <h3>{questionLength} questions to test your mastery in react</h3>
      <button
        className="btn btn-ui"
        onClick={() => handleStartQuiz({ type: "startQuiz" })}
      >
        Let's Start
      </button>
    </div>
  );
}
