import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

const SignIn = () => {
    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user)
    }
	return (
		<div>
			<h1>
                Sign In Page
                <button onClick={logGoogleUser}>Sign in with Google Popup</button>
            </h1>
		</div>
	)
}

export default SignIn;