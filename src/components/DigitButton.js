import { ACTIONS } from "../App";

export default function DigitButton({ dispatch, digit }) {
  return (
    <button
      onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: {digit} })}
      className="calculator_button"
    >
      {digit}
    </button>
  );
}
