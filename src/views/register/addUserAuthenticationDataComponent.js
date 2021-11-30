import { TextField, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from "@material-ui/core";
import { AlternateEmail, LockOutlined, VisibilityOff, Visibility } from "@material-ui/icons";
import { useEffect, useState } from "react";

const AddUserAuthenticationDataComponent = ({setValid, state, setFormState}) => {
    const [passwordVisible, setPasswordVisible] = useState(false)

    useEffect(() => {
        let isValid = state.email !== "" &&
            state.password !== "" &&
            state.password.length > 7 &&
            state.password === state.repeatedPassword &&
            isEmailValid(state.email)
        setValid(isValid)
    })

    const handleChange = (event) => {
        setFormState(prevState => ({
            ...prevState,
            [event.target.name]: event.target.value
        }))
        if (event.target.name === 'email') {
            setFormState(prevState => ({
                ...prevState,
                emailTaken: false
            }))
        }
    }

    const isEmailValid = (email) => {
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i)
        return pattern.test(email)
    }

    return <form className="register-form">
        <div>
            <h3>Dane do logowania <span className="text-secondary">(wymagane)</span></h3>
        </div>
        <div className="form-element">
            <AlternateEmail className="login-icon" fontSize="large"/>
            <TextField 
                required
                value={state.email}
                onChange={handleChange}
                className="form-field" 
                variant="outlined"
                name="email" 
                label="Email"
                type="email"
            />
        </div>
        {state.emailTaken && <p className="email-taken">Podany adres email jest już zarejestrowany w systemie.</p>}
        <div className="form-element mt-1 mb-1">
            <LockOutlined className="login-icon" fontSize="large"/>
            <FormControl variant="outlined" className="form-field" required>
                <InputLabel htmlFor="outlined-adornment-password">Hasło (min 8 znaków)</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type={passwordVisible ? 'text' : 'password'}
                    value={state.password}
                    onChange={handleChange}
                    name="password"
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
        <div className="form-element">
            <LockOutlined className="login-icon" fontSize="large"/>
            <FormControl variant="outlined" className="form-field" required>
                <InputLabel htmlFor="outlined-adornment-password-2">Powtórz hasło</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password-2"
                    type={passwordVisible ? 'text' : 'password'}
                    value={state.repeatedPassword}
                    onChange={handleChange}
                    name="repeatedPassword"
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
    </form>
}

export default AddUserAuthenticationDataComponent