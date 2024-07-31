import { Form, useActionData, redirect, useSubmit} from 'react-router-dom'
import Button from '../UI/Button'
import Card from '../UI/Card'
import Input from '../UI/Input'
import classes from './AuthenticationPage.module.css'
import { useEffect, useRef, useState, useCallback } from 'react';
import Modal from '../UI/Modal'
import { fetchdata } from '../util/api';

function AuthPage() {
  const [forceRender, setForcedRender] = useState(false)
  const email = useRef()
  const password = useRef()
  const actionData = useActionData()
  const [mode, setMode] = useState('login')
  const [message, setMessage] = useState(null)
  let submit = useSubmit();
  
  useEffect(() => {
    if (actionData) {
      setMessage(actionData);
    }
  }, [actionData, forceRender]);

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault()
    const formData = {
      mode,
      email: email.current.value,
      password: password.current.value
    }
    const isValid = fnValidateAuthen(formData)
    if (isValid) {
      submit(formData, {
        method: "post",
        action: "/auth",
      });
      setForcedRender((prev) => !prev)
    } else {
      setMessage('Fill out the form')
    }
  }, [mode, email, password, submit])

  function fnValidateAuthen(formData) {
    const array = Object.values(formData)
    return array.filter((item) => item === "").length === 0
  }

  return (<>
      {message && <Modal onCancel={() => setMessage('')}>
        <p>{ message }</p>
      </Modal>}
      <Card> 
        <h1>{mode === 'login' ? 'Log in' : 'Create a new user'}</h1>
        <Form onSubmit={handleSubmit} className={classes.form} >
          <div className={classes.center}>
            <Input type='email' id='email' name='email' label='E-mail' ref={email} required={true} />
          </div>
          <div className={classes.center}>
            <Input type='password' id='password' name='password' label='Password' ref={password} required={true} />
          </div>
          <div className={classes.between}>
            {/*<Link className={classes.link} to={`?mode=${isLogin ? 'register' : 'login'}`} >{isLogin ? 'Create User' : 'Login'}</Link>*/}
            <Button type='button' 
                text={mode === 'login' ? 'Create User' : 'Login'} 
                cssClass='navy' 
                onClick={() => { setMode((mode) => mode === 'login' ? 'register' : 'login') }} />
            <Button type='submit' text={mode === 'login' ? 'LogIn' : 'Register'} cssClass='navy' />
          </div>
        </Form>
      </Card>
    </>
  );
}

export default AuthPage;

export async function action({ request }) {
  try {
    const data = await request.formData()
    const mode = data.get('mode') || 'register'
    const authData = {
      email: data.get('email'),
      password: data.get('password')
    }
    const result = await fetchdata(`http://localhost:8080/api/authen/${mode}`, authData)
    if (result && result.token) {
      localStorage.setItem('token', result.token)
      localStorage.setItem('permission', result.permission)
      localStorage.setItem('user_id', result.user_id)
      return redirect('/')
    }
    if (result && result.message) {
      return result.message
    }
  } catch (error) {
    return error.message
  }
}