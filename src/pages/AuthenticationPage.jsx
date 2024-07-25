import { Form, Link, useSearchParams, useActionData } from 'react-router-dom'
import Button from '../UI/Button'
import Card from '../UI/Card'
import Input from '../UI/Input'
import classes from './AuthenticationPage.module.css'

function AuthPage() {
  const data = useActionData()
  const [searchParams] = useSearchParams()
  const isLogin = searchParams.get('mode') === 'login'

  return (
    <Card> 
      <h1>{isLogin ? 'Log in' : 'Create a new user'}</h1>
      { data && <span>{ data }</span>}
      <Form className={classes.form} method='post' action={`/auth?mode=${isLogin ? 'login' : 'register'}`}>
        <div className={classes.center}>
          <Input type='email' id='email' name='email' label='E-mail' placeholder='Enter email...' />
        </div>
        <div className={classes.center}>
          <Input type='password' id='password' name='password' label='Password' placeholder='Enter Password...' />
        </div>
        <div className={classes.between}>
          <Link className={classes.link} to={`?mode=${isLogin ? 'register' : 'login'}`} >{isLogin ? 'Create User' : 'Login'}</Link>
          <Button type='submit' text={isLogin ? 'LogIn' : 'Register'} cssClass='navy' />
        </div>
      </Form>
    </Card>
  );
}

export default AuthPage;

export async function action({ request }) {
  try {
    const searchParams = new URL(request.url).searchParams
    const mode = searchParams.get('mode') || 'register'

    const data = await request.formData()
    const authData = {
      email: data.get('email'),
      password: data.get('password')
    }
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
    }
    if (rpjson && rpjson.json && rpjson.json.message) {
      return rpjson.json.message
    }
    return

  } catch (error) {
    console.log(error.message);
  }
}