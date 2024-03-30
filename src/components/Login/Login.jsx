import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import app from "../../firebase/firebase.init";
import { useState } from "react";


const Login = () => {
    const [user, setUser] = useState(null);
    const auth = getAuth(app);
    // console.log(auth)
    const provider = new GoogleAuthProvider()

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, provider)
            .then(result => {
                const logedInUser = result.user;
                // console.log(logedInUser);
                setUser(logedInUser);
            })
            .catch(error => {
                console.log('error', error.message)
            })
    }
    const handleSignOut = () => {
        signOut(auth)
            .then(result => {
                // console.log(result)
                setUser(null)
            })
            .catch(error => {
                console.log(error)
            })
    }
    return (
        <div>
            {
                user ?
                    <button onClick={handleSignOut}>Sign Out</button> :
                    <button onClick={handleGoogleSignIn}>Google Login</button>
            }
            {
                user && <div>
                    <h3>Name: {user.displayName}</h3>
                    <h3>Email: {user.email}</h3>
                    <img src={user.photoURL} alt=" image" />
                </div>
            }
        </div>
    );
};

export default Login;