export default function Progress({
  index,
  questionLength,
  points,
  totalPoints,
  answer,
}) {
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
