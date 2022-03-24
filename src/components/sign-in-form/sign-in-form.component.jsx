import { useState } from 'react'
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils'
import Button,{BUTTON_TYPE_CLASSES} from '../button/button.component'
import FormInput from '../form-input/form-input-componet'
import './sign-in-form.style.scss'

const defaultFormFields = {
  email: '',
  password: '',
}

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)

  const { email, password } = formFields




  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  }
   const signInWithGoogle = async () => {
     await signInWithGooglePopup()
      
   }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const {user} = await signInAuthUserWithEmailAndPassword(email, password)
 
      resetFormFields()
    
    } catch (error) {
      switch (error.code) {
        case 'auth/wrong-password':
          alert('incorrect password for email')
          break

        case 'auth/user-not-found':
          alert('user not found')
          break

         default:
         console.log(error); 
      }
    
   
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormFields({ ...formFields, [name]: value })
  }

 
  return (
    <div className='sign-up-container'>
      <h2>Already, have an account</h2>
      <span>Sign in with your email and password</span>
      <form action='' onSubmit={handleSubmit}>
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
        <div className='buttons-container'>
          <Button type='submit'>Sign In</Button>

          <Button type='button' buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle} >
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  )
}

export default SignInForm
