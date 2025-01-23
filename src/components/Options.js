function Options({ question, dispatch, answer }) {
  return (
    <>
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            answer !== null &&
            (index === question.correctOption ? "correct" : "wrong")
          }`}
          key={option}
          disabled={answer !== null}
          onClick={() => dispatch({ type: "answered", payload: index })}
        >
          {option}
        </button>
      ))}
    </>
  );
}

export default Options;
