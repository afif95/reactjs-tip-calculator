import "./styles.css";
import { useState } from "react";

export default function App() {
  const [bill, setBill] = useState("");
  const [me, setMe] = useState(0);
  const [friend, setFriend] = useState(0);
  const average = Math.round(((bill * me) / 100 + (bill * friend) / 100) / 2);
  return (
    <div className="App">
      <Bill bill={bill} onChangeBill={setBill} />
      <MyService me={me} onChangeMe={setMe} />
      <FriendService friend={friend} onChangeFriend={setFriend} />
      {bill > 0 && (
        <>
          <Result bill={bill} avg={average} />
          <Reset
            bill={bill}
            onChangeBill={setBill}
            onChangeMe={setMe}
            onChangeFriend={setFriend}
          />
        </>
      )}
    </div>
  );
}

function Bill({ bill, onChangeBill }) {
  return (
    <div>
      <TextField>
        <span>How much was the bill?</span>
        <input
          type="text"
          placeholder="Bill value"
          value={bill}
          onChange={(e) => onChangeBill(Number(e.target.value))}
        />
      </TextField>
    </div>
  );
}

function MyService({ me, onChangeMe }) {
  return (
    <div>
      <TextField>
        <span>How did you like the service?</span>
        <Option val={me} onChanged={onChangeMe} />
      </TextField>
    </div>
  );
}

function FriendService({ friend, onChangeFriend }) {
  return (
    <div>
      <TextField>
        <span>How did your friend like the service?</span>
        <Option val={friend} onChanged={onChangeFriend} />
      </TextField>
    </div>
  );
}

function Result({ bill, avg }) {
  return (
    <div>
      <h3>
        You pay ${bill + avg} (${bill} + ${avg} tip)
      </h3>
    </div>
  );
}

function Reset({ bill, onChangeBill, onChangeMe, onChangeFriend }) {
  function handleClick() {
    onChangeBill("");
    onChangeMe(0);
    onChangeFriend(0);
  }

  return <button onClick={handleClick}>Reset</button>;
}

function TextField({ children }) {
  return <div>{children}</div>;
}

function Option({ val, onChanged }) {
  return (
    <select value={val} onChange={(e) => onChanged(Number(e.target.value))}>
      <option value={0}>Dissatisfied (0%)</option>
      <option value={5}>It was ok (5%)</option>
      <option value={10}>It was good (10%)</option>
      <option value={20}>Absolutely amazing! (20%)</option>
    </select>
  );
}
