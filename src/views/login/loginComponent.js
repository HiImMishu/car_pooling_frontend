import { Paper, TextField, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Button } from "@material-ui/core";
import { AlternateEmail, LockOutlined, Visibility, VisibilityOff } from "@material-ui/icons";
import { createRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { showAllert } from "../../application/actions/alertActions";
import { clearLoginResponse, loginUser } from "../../application/actions/userAction";
import { loginResultSelector, tokenSelector } from "../../application/selectors/userSelector";
import "./styles.css";

const LoginComponent = () => {
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const emailRef = createRef()
    const passwordRef = createRef()
    const dispatch = useDispatch()
    const loginStatus = useSelector(loginResultSelector)
    const token = useSelector(tokenSelector)

    useEffect(() => {
        if (loginStatus === 401 || loginStatus === 400) {
            let alertProps = {
                open: true,
                type: "error",
                button: null,
                message: "Błędny email i/lub hasło"
            }
            dispatch(showAllert(alertProps))
        }
        dispatch(clearLoginResponse)
    }, [loginStatus, dispatch])

    if (token) {
        return <Redirect to="/"/>
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(loginUser({email: email, password: password}))
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
        validateForm()
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
        validateForm()
    }

    const validateForm = () => {
        if (emailRef.current.validity.valueMissing) {
            emailRef.current.setCustomValidity("Adres email jest wymagany do zalogownania.")
        } 
        else if (emailRef.current.validity.typeMismatch) {
            emailRef.current.setCustomValidity("Niepoprawny format adresu email.")
        }
        else {
            emailRef.current.setCustomValidity("")
        }

        if (passwordRef.current.validity.valueMissing) {
            passwordRef.current.setCustomValidity("Hasło jest wymagane do zalogownania.")
        }
        else {
            passwordRef.current.setCustomValidity("")
        }
    }

    return <main>
        <section className="search-bar login-banner">
            <Paper component="form" className="login-form" onSubmit={handleSubmit}>
                <div className="form-header text-secondary">
                    <h2 className="login-header">Zaloguj się do serwisu</h2>
                </div>
                <div className="form-element mb-2">
                    <AlternateEmail className="login-icon"/>
                    <TextField 
                        required
                        inputRef={emailRef}
                        value={email}
                        onChange={handleEmailChange}
                        className="form-field" 
                        variant="outlined"
                        name="email" 
                        label="Email"
                        type="email"
                    />
                </div>
                <div className="form-element">
                    <LockOutlined className="login-icon"/>
                    <FormControl variant="outlined" className="form-field" required>
                        <InputLabel htmlFor="outlined-adornment-password">Hasło</InputLabel>
                        <OutlinedInput
                            inputRef={passwordRef}
                            id="outlined-adornment-password"
                            type={passwordVisible ? 'text' : 'password'}
                            value={password}
                            onChange={handlePasswordChange}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setPasswordVisible(prevState => !prevState)}
                                    onMouseDown={e => e.preventDefault()}
                                    edge="end"
                                >
                                {passwordVisible ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                            }
                            labelWidth={70}
                        />
                    </FormControl>
                </div>
                <Button onClick={validateForm} className="login-button mt-1" variant="contained" color="primary" type="submit">Zaloguj</Button>
                <div className="form-element mt-1">
                    Nie masz jeszcze konta?&nbsp; <Link to="/register">Zarejestruj się</Link>
                </div>
            </Paper>
        </section>
    </main>
}

export default LoginComponent