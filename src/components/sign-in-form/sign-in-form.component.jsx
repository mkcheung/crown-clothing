import { useState, useContext } from 'react';

import { UserContext } from '../../contexts/user.context';

import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth, signInWithGooglePopup, signInAuthUserWithEmailAndPassword} from '../../utils/firebase/firebase.utils';

import './sign-in-form.styles.scss';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';


const defaultFormFields = {
    displayName:'',
    email:'',
    password:'',
    confirmPassword:'',
}

const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;

    const { setCurrentUser } = useContext(UserContext);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        const {user} = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const { user } = await signInAuthUserWithEmailAndPassword(email, password);
            
            setCurrentUser(user);
            resetFormFields();
        } catch (error){
            switch(error.code) {
                case 'auth/wrong-password':
                    alert('incorrect password for email')
                    break;
                case 'auth/user-not-found':
                    alert('no user associated with this email')
                    break;
                default:
                    console.log(error);
            }
        }
    }

    const handleChange = (event) =>{
        const {name, value} = event.target;

        setFormFields({...formFields, [name]:value});
    }

	return (
		<div className='sign-up-container'>
            <h2>Aleady have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>

                <label>Email</label>
                <input type='email' required onChange={handleChange} name="email" value={email}/>

                <label>Password</label>
                <input type='text' required onChange={handleChange} name="password" value={password}/>
                
                <div className='buttons-container'>
                    <Button type="submit">Sign In</Button>
                    <Button buttonType='google' onClick={signInWithGoogle}>Google Sign In</Button>
                </div>
            </form>
		</div>
	)
}

export default SignInForm;