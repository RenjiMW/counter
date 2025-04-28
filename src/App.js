import { useState, useEffect } from "react";

function App() {
  return (
    <div>
      <Counter />
    </div>
  );
}

////////////////////////////////////////////
//////// ===== Counter component ====== //////////
function Counter() {
  // Variables
  const dayDuration = 86400000; // 1 day in milliseconds
  const dateObj = new Date(); // Date object
  const dateString = dateObj.toString(); // Tue Mar 25 2025 12:54:58 GMT+0100 (czas środkowoeuropejski standardowy)
  const dateStringShort = dateString.slice(0, 15); // Tue Mar 25 2025

  // State variables
  const [date, setDate] = useState(dateStringShort);
  const [step, setStep] = useState(1);
  const [count, setCount] = useState(0);

  ////////////////////////////////////////////
  ///////  ===== Step changing ====== ///////
  function handleAddStep() {
    setStep((s) => s + 1);
  }

  function handleSubtractStep() {
    if (step === 0) {
      alert("Step should not be less than 0");
      return;
    } else {
      setStep((s) => s - 1);
    }
  }

  ////////////////////////////////////////////
  ///////  ===== Count changing ====== ///////

  function handleAddCount() {
    if (step === 0) {
      alert("Please set the step first");
      return;
    }
    setCount((c) => c + step);
  }

  function handleSubtractCount() {
    if (step === 0) {
      alert("Please set the step first");
      return;
    }
    setCount((c) => c - step);
  }

  ////////////////////////////////////////////
  //////// ===== Date changing ====== ////////
  useEffect(() => {
    const now = new Date();
    const newDate = new Date(now.getTime() + dayDuration * count)
      .toString()
      .slice(0, 15);
    setDate(newDate);
  }, [count]);

  ////////////////////////////////////////////
  //////// ===== Counter JSX ====== //////////
  return (
    <div className="container">
      <h1>Counter</h1>
      <div className="counterControls">
        <Step
          step={step}
          addStep={handleAddStep}
          subtractStep={handleSubtractStep}
        />

        <Count
          count={count}
          addCount={handleAddCount}
          subtractCount={handleSubtractCount}
        />
      </div>

      <Result date={date} count={count} />
    </div>
  );
}

////////////////////////////////////////////
//////// ===== Step component ====== ////////
function Step({ step, addStep, subtractStep }) {
  return (
    <div className="controls stepControlsContainer">
      <button className="controls__btn" onClick={subtractStep}>
        ➖
      </button>
      <div className="controls__info">
        <span className="controls__info__name">Step: </span>
        <span className="controls__info__number">{step}</span>
      </div>
      <button className="controls__btn" onClick={addStep}>
        ➕
      </button>
    </div>
  );
}

////////////////////////////////////////////
//////// ===== Count component ====== ////////
function Count({ count, addCount, subtractCount }) {
  return (
    <div className="controls countControlsContainer">
      <button className="controls__btn" onClick={subtractCount}>
        ➖
      </button>
      <div className="controls__info">
        <span className="controls__info__name">Count: </span>
        <span className="controls__info__number">{count}</span>
      </div>
      <button className="controls__btn" onClick={addCount}>
        ➕
      </button>
    </div>
  );
}

function Result({ date, count }) {
  return (
    <>
      {count > 0 && (
        <p className="result">
          {count} days from today will be {date}
        </p>
      )}
      {count < 0 && (
        <p className="result">
          {Math.abs(count)} days ago was {date}
        </p>
      )}
      {count === 0 && <p className="result">Today is {date}</p>}
    </>
  );
}

export default App;
