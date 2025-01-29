import { useQuiz } from "../context/QuizContext";

export default function Progress() {
  const { index, questionLength, points, totalPoints, answer } = useQuiz();
  return (
    <header className="progress">
      <progress max={questionLength} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index + 1}</strong>/{questionLength}
      </p>
      <p>
        <strong>{points}</strong>/{totalPoints}
      </p>
    </header>
  );
}
