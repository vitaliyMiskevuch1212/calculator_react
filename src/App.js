import { useReducer } from "react";
import DigitButton from "./components/DigitButton";
import "./App.css";
import OperationButton from "./components/OperationButton";


export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate",
};

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
    if (state.overwrite) {
      return {
        ...state,
        currentOperand: payload.digit,
        overwrite: false,
      }
    }
      if (payload.digit === "0" && state.currentOperand === "0") {
        return state;
      }
      if (payload.digit === "." && (state.currentOperand || "").includes(".")) {
        return state;
      }
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      };
    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null) {
        return state;
      }
      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation,
        };
      }
      if (state.previousOperand == null) {
        return {
          ...state,
          previousOperand: state.currentOperand,
          currentOperand: null,
          operation: payload.operation,
        };
      }
      return {
        ...state,
        previousOperand: evaluate(state),
        currentOperand: null,
        operation: payload.operation,
      };
    case ACTIONS.CLEAR:
      return {};
    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null
      }}
      if (state.currentOperand == null) {
        return state
      }
      if (state.currentOperand.length === 1 ) {
        return {
          ...state,
          currentOperand: null
        }
      }
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1)
      }
    case ACTIONS.EVALUATE:
      if (
        state.currentOperand == null ||
        state.previousOperand == null ||
        state.operation == null
      ) {
        return state;
      }
      return {
        ...state,
        currentOperand: evaluate(state),
        overwrite: true,
        previousOperand: null,
        operation: null,
      };
    default:
      return state;
  }
}


const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
})

function formatOperand(operand) {
if (operand == null) return
const [integer, decimal] = operand.split('.')
if (decimal == null) {
  return INTEGER_FORMATTER.format(integer)
}
return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}
function evaluate({ currentOperand, previousOperand, operation }) {
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) {
    return "";
  }
  let computation = "";
  switch (operation) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "*":
      computation = prev * current;
      break;
    case "÷":
      computation = prev / current;
      break;
  }

  return computation.toString();
}

function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  );

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">
          {formatOperand(previousOperand)} {operation}
        </div>
        <div className="current-operand">{formatOperand(currentOperand)}</div>
      </div>
      <button
        className="span-two calculator_button"
        onClick={() => dispatch({ type: ACTIONS.CLEAR })}
      >
        AC
      </button>
      <button 
      className="calculator_button"
      onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}>
        DEL
        </button>
      <OperationButton
        className="span-two calculator_button"
        operation="÷"
        dispatch={dispatch}
      />
      <DigitButton
        className="span-two calculator_button"
        digit="1"
        dispatch={dispatch}
      />
      <DigitButton
        className="span-two calculator_button"
        digit="2"
        dispatch={dispatch}
      />
      <DigitButton
        className="span-two calculator_button"
        digit="3"
        dispatch={dispatch}
      />
      <OperationButton
        className="span-two calculator_button"
        operation="*"
        dispatch={dispatch}
      />
      <DigitButton
        className="span-two calculator_button"
        digit="4"
        dispatch={dispatch}
      />
      <DigitButton
        className="span-two calculator_button"
        digit="5"
        dispatch={dispatch}
      />
      <DigitButton
        className="span-two calculator_button"
        digit="6"
        dispatch={dispatch}
      />
      <OperationButton
        className="span-two calculator_button"
        operation="+"
        dispatch={dispatch}
      />
      <DigitButton
        className="span-two calculator_button"
        digit="7"
        dispatch={dispatch}
      />
      <DigitButton
        className="span-two calculator_button"
        digit="8"
        dispatch={dispatch}
      />
      <DigitButton
        className="span-two calculator_button"
        digit="9"
        dispatch={dispatch}
      />
      <OperationButton
        className="span-two calculator_button"
        operation="-"
        dispatch={dispatch}
      />
      <DigitButton
        className="span-two calculator_button"
        digit="."
        dispatch={dispatch}
      />
      <DigitButton
        className="span-two calculator_button"
        digit="0"
        dispatch={dispatch}
      />
      <button
        className="span-two calculator_button"
        onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
      >
        =
      </button>
    </div>
  );
}

export default App;
