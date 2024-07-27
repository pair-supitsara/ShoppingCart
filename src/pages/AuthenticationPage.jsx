import { Form, Link, useSearchParams, useActionData } from 'react-router-dom'
import Button from '../UI/Button'
import Card from '../UI/Card'
import Input from '../UI/Input'
import classes from './AuthenticationPage.module.css'
import { useRef, useState } from 'react';
import Modal from '../UI/Modal'

function AuthPage() {
  const email = useRef()
  const password = useRef()
  const data = useActionData()
  const [searchParams] = useSearchParams()
  const isLogin = searchParams.get('mode') === 'login'
  const mode = searchParams.get('mode') || 'register'
  const [errorMsg, setErrorMsg] = useState(null)

  async function authenHandler() {
    try {
      const authData = {
        email: email.current.value,
        password: password.current.value
      }
      console.log(authData)
      const response = await fetch(`http://localhost:8080/api/authen/${mode}`, {
        method: 'post',
        body: JSON.stringify(authData),
        headers: {
          "Content-Type": "application/json",
        }
      })
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const rpjson = await response.json();
      if (rpjson && rpjson.json && rpjson.json.token) {
        localStorage.setItem('token', rpjson.json.token)
      } else {
        setErrorMsg(rpjson.json.message)
      }

      if (rpjson && rpjson.json && rpjson.json.message) {
        setErrorMsg(rpjson.json.message)
      }
    } catch (error) {
      setErrorMsg(error.message)
    }
  }
  return (<>
      {errorMsg && <Modal>
        <p>{ errorMsg }</p>
        <Button text='Ok' onClick={() => setErrorMsg('')} cssClass='red' />
      </Modal>}
      <Card> 
        <h1>{isLogin ? 'Log in' : 'Create a new user'}</h1>
        { data && <span>{ data }</span>}
        <Form onSubmit={authenHandler} className={classes.form}>
          <div className={classes.center}>
            <Input type='email' id='email' name='email' label='E-mail' ref={email} />
          </div>
          <div className={classes.center}>
            <Input type='password' id='password' name='password' label='Password' ref={password} />
          </div>
          <div className={classes.between}>
            <Link className={classes.link} to={`?mode=${isLogin ? 'register' : 'login'}`} >{isLogin ? 'Create User' : 'Login'}</Link>
            <Button type='submit' text={isLogin ? 'LogIn' : 'Register'} cssClass='navy' />
          </div>
        </Form>
      </Card>
    </>
  );
}

export default AuthPage;