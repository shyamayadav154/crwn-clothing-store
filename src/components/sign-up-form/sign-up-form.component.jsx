import { useState, useContext } from 'react'
import { UserContext } from '../../context/user.context'
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils'
import Button from '../button/button.component'
import FormInput from '../form-input/form-input-componet'
import './sign-up-form.style.scss'

const defaultFormFields = {
  displayName: '', //
  email: '',
  password: '',
  confirmPassword: '',
}

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)

  const { displayName, email, password, confirmPassword } = formFields

  const { setCurrentUser } = useContext(UserContext)
  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (password !== confirmPassword) {
      alert('passwords do not match')
      return
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password)

      await createUserDocumentFromAuth(user, { displayName })

      resetFormFields()
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert(' cannot create user,email already exists')
      } else {
        console.log('%c user creation encounter an error', 'color:red', error)
      }
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormFields({ ...formFields, [name]: value })
  }
  return (
    <div className='sign-up-container'>
      <h2>Dont't have an account</h2>
      <span>Sign up with your email and password</span>
      <form action='' onSubmit={handleSubmit}>
        <FormInput
          label='Display Name'
          onChange={handleChange}
          value={displayName}
          name='displayName'
          type='text'
          required
        />
        <FormInput
          label='Email'
          onChange={handleChange}
          value={email}
          name='email'
          type='email'
          required
        />

        <FormInput
          label='Password'
          onChange={handleChange}
          value={password}
          name='password'
          type='password'
          required
        />

        <FormInput
          label='Confirm Password'
          onChange={handleChange}
          value={confirmPassword}
          name='confirmPassword'
          type='password'
          required
        />

        <Button type='submit'>Sign Up</Button>
      </form>
    </div>
  )
}

export default SignUpForm
