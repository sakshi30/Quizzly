import { useQuiz } from "../context/QuizContext";
import Options from "./Options";

function Question() {
  const { questions, index, dispatch, answer } = useQuiz();
  const question = questions[index];
  return (
    <div>
      <h4>{question.question}</h4>
      <div className="options">
        <Options question={question} dispatch={dispatch} answer={answer} />
      </div>
    </div>
  );
}

export default Question;
