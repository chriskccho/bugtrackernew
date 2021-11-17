import { FaBug } from "react-icons/fa";
import { useState } from "react";
import {useHistory} from 'react-router-dom'
const Login = ({handleLogin}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState('');
  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault();

    const logindata = { username, password };

    fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(logindata),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((res) => {
            throw res;
          });
        } else {
          return response.json();
        }
      })
      .then((data) => {
        handleLogin(data);
        history.push("/");
      })
      .catch((res) => {
        const key = Object.keys(res);
        setAlert(`${res[key]}`);
      });
  };

  return (
    <div className="centerize">
      <div className="loginsignupform">
        <h2>Log In</h2>
        <FaBug
          style={{ fontSize: "3em", color: "white", paddingTop: "3px" }}
        />
        <form className="form" onSubmit={handleSubmit}>
          <input
            required
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <input
            required
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <input className="form-btn" type="submit" value="Log in" />
        </form>
        <p>{alert}</p>
      </div>
    </div>
  );
};

export default Login;
