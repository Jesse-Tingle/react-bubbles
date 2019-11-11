import React, {useState} from "react";
import api from '../utils/api';

function Login(props) {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const [err, setErr] = useState('')

  const [data, setData] = useState({
      username: '',
      password: ''
  })

  const handleChange = (event) => {
      setData({
          ...data,
          [event.target.name]: event.target.value,
      })
  }

  const handleSubmit = (e) => {
      e.preventDefault()

      api()
          .post('/api/login', data)
          .then(result => {
              console.log('token', result.data)
              localStorage.setItem('token', result.data.payload)
              props.history.push('/bubblepage')
          })
          .catch(err => {
              setErr(err.response.data.error)
          })
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
            <h1>React Bubbles - Sprint Challenge</h1>
            <h2>Log In</h2>
            {err && <div className="err">{err}</div>}

            <input type="text" name="username" placeholder="username" value={data.username} onChange={handleChange} />
            <input type="password" name="password" placeholder="password" value={data.password} onChange={handleChange} />
            <button type="submit">Sign In</button>
        </form>
  );
};

export default Login;