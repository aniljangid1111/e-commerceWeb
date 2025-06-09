import React, { useContext, useEffect, useState } from 'react'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import app from './configFiles/FireBase';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { commonContex } from './contex Api/Contex';
import { getDatabase, onValue, ref, set } from "firebase/database";


export default function LoginRegister() {
    var navigate = useNavigate();

    const [registerLoading, setRegisterLoading] = useState('Register')
    const [loginLoading, setLoginLoading] = useState('Login')

    const { isLogin, setIsLogin, cardItem, setCardItem } = useContext(commonContex);
    useEffect(() => {
        if (isLogin) {
            navigate('/')
        }
    }, [])

    //  Register Login
    const register = (event) => {
        event.preventDefault();
        setRegisterLoading('Loading...')
        var email = event.target.email.value
        var password = event.target.password.value

        const auth = getAuth(app);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                // console.log(user);
                localStorage.setItem('user_uid', user.uid)
                setIsLogin(user.uid)


                // Write Data FireBase

                const db = getDatabase(app);
                set(ref(db, 'users_cart/' + user.uid), cardItem)


                toast.success('Register Successfully')
                setRegisterLoading('Register')
                navigate('/')

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                toast.error(errorMessage)
                setRegisterLoading('Register')
                // ..
            });
    }

    //  Login
    const loginUser = (event) => {
        event.preventDefault();
        setLoginLoading('Loading...')
        var email = event.target.email.value;
        var password = event.target.password.value;
        const auth = getAuth(app);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                localStorage.setItem('user_uid', user.uid)
                setIsLogin(user.uid)

                // READ Data from Firebase Realtime Database
                const db = getDatabase(app);
                const userCartRef = ref(db, 'users_cart/' + user.uid);

                // Use onValue to get the current data for the user's cart
                onValue(userCartRef, (snapshot) => {
                    const firebaseCartData = snapshot.val(); // Get the data at this reference

                    if (firebaseCartData) {
                        // If there's data in Firebase, use it
                        setCardItem(firebaseCartData);
                        localStorage.setItem('cardItem', JSON.stringify(firebaseCartData));
                    } else {
                        setCardItem([]); // Or set initial empty cart
                        localStorage.setItem('cardItem', JSON.stringify([]));
                    }
                    toast.success('Login Successfully');
                    setLoginLoading('Login');
                    navigate('/');
                }, {
                    onlyOnce: true // Use onlyOnce if you only want to read the data once on login
                });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                toast.error(errorMessage)
                setLoginLoading('Login')
            });

    }

    // Google Login
    const googleLogin = (event) => {
        // var email = event.target.email.value;
        // var password = event.target.password.value;

        const provider = new GoogleAuthProvider();


        const auth = getAuth(app);
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // IdP data available using getAdditionalUserInfo(result)
                // ...

                localStorage.setItem('user_uid', user.uid)
                setIsLogin(user.uid)

                const db = getDatabase(app);
                const userCartRef = ref(db, 'users_cart/' + user.uid);

                // Use onValue to get the current data for the user's cart
                onValue(userCartRef, (snapshot) => {
                    const firebaseCartData = snapshot.val(); // Get the data at this reference

                    if (firebaseCartData) {
                        // If there's data in Firebase, use it
                        setCardItem(firebaseCartData);
                        localStorage.setItem('cardItem', JSON.stringify(firebaseCartData));
                    } else {
                        setCardItem([]); // Or set initial empty cart
                        localStorage.setItem('cardItem', JSON.stringify([]));
                    }
                    toast.success('Login Successfully');
                    setLoginLoading('Login');
                    navigate('/');
                }, {
                    onlyOnce: true // Use onlyOnce if you only want to read the data once on login
                });


                toast.success('Login Successfully');
                navigate('/')

            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);

                toast.error(errorMessage)
                // ...
            });
    }


    return (
        <>
            <div className="min-vh-100 d-flex justify-content-center align-items-center bg-light">
                <div className="card shadow p-4" style={{ width: '100%', maxWidth: '400px' }}>
                    <ul className="nav nav-tabs mb-4" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button className="nav-link active" id="login-tab" data-bs-toggle="tab" data-bs-target="#login">
                                Login
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="register-tab" data-bs-toggle="tab" data-bs-target="#register">
                                Register
                            </button>
                        </li>
                    </ul>

                    <div className="tab-content">
                        {/* Login Form */}
                        <div className="tab-pane fade show active" id="login">
                            <form onSubmit={loginUser}>
                                <div className="mb-3">
                                    <label className="form-label">Email address</label>
                                    <input name='email' type="email" className="form-control" placeholder="Enter email" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Password</label>
                                    <input name='password' type="password" className="form-control" placeholder="Enter password" />
                                </div>
                                <button type="submit" className="btn btn-primary w-100">{loginLoading}</button>
                                <button type="button" onClick={googleLogin} className=" mt-3 btn btn-outline-dark w-100 d-flex align-items-center justify-content-center gap-2">
                                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" style={{ width: '20px' }} />
                                    Sign in with Google
                                </button>

                            </form>
                        </div>

                        {/* Register Form */}
                        <div className="tab-pane fade" id="register">
                            <form onSubmit={register}>
                                <div className="mb-3">
                                    <label className="form-label">Email address</label>
                                    <input name='email' type="email" className="form-control" placeholder="Enter email" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Password</label>
                                    <input name='password' type="password" className="form-control" placeholder="Enter password" />
                                </div>
                                <button type="submit" className="btn btn-success w-100">{registerLoading}</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
