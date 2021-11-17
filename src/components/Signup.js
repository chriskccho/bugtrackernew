import { FaBug } from "react-icons/fa";
import {useState} from 'react';
import {useHistory} from 'react-router-dom';


const Signup = ({handleLogin}) => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password_confirm, setConfirm] = useState('')
    const history = useHistory()
    const [alert, setAlert] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();

        const signupdata = {email, username, password, password_confirm};

        fetch('http://localhost:8000/api/signup', {
            method : 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body : JSON.stringify(signupdata)
        })
        .then(response=> {
            if (!response.ok) {
                return response.json().then(res => {throw res})
            } else {
                return response.json()
            }
        })
        .then((data)=> {
            handleLogin(data)
            history.push('/')
        })
        .catch(res => {
            const key = Object.keys(res)
            setAlert(`${res[key]}`)
        })

    }
    return (
        <div className="centerize">
        <div className="loginsignupform">
          <h2>Sign Up</h2>
          <FaBug
            style={{ fontSize: "3em", color: "white", paddingTop: "3px" }}
          />
          <form className="form" onSubmit={handleSubmit}>
            <input required type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/>
            <input required type="text" placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)}/>
            <input required type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
            <input required type="password" placeholder="Confirm Password" value={password_confirm} onChange={e=>setConfirm(e.target.value)}/>
            <input required className="form-btn" type="submit" value="Sign up" />
          </form>
          <p>{alert}</p>
        </div>
      </div>
    )
}

export default Signup
