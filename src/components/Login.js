// React Module Imports
import React, { useState } from "react";

// Prime React Imports
import { Password } from "primereact/password";

// 3rd Party Imports
import * as yup from "yup";
import { ErrorMessage, Formik, Field } from "formik";
import { ToastContainer } from "react-toastify";
import { AppConfig } from "../AppConfig";
import toast from "../components/Toast";
import Cookies from 'js-cookie'
import { useHistory } from "react-router-dom";
import PrimeReact from "primereact/api";

// Style and Component Imports

// Interface/Helper Imports
import Axios from "axios";

const Login = (props) => {
    const history = useHistory();
    const [layoutMode, setLayoutMode] = useState("static");
    const [layoutColorMode, setLayoutColorMode] = useState("light");
    const [inputStyle, setInputStyle] = useState("outlined");
    const [ripple, setRipple] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [authSpinner, setAuthSpinner] = useState(false);
    console.log("props", props);
    const validationSchema = yup.object().shape({
        email: yup.string().required("Please enter email").email("Please enter valid email"),
        password: yup.string().required("Please enter password"),
    });
    PrimeReact.ripple = true;
    // LoginSubmitHandler
    const LoginSubmitHandler = async (userData) => {
        try {
            setAuthSpinner(true);
            const { data } = await Axios.post(`http://localhost:3000/category/login`,
                userData,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
            if (data && data.token) {
                console.log(data);
                let token = data.token;
                console.log(token);
                let localStorageToken = "aalpha" + token + "swaminarayan";
                let cookieToken = "swaminarayan" + token + "aalphatech";
                window.localStorage.setItem("x-auth-token-word-puzzle-admin", JSON.stringify(localStorageToken));
                Cookies.set('Elzzup-Word-Drow', cookieToken)
                return history.push('/');
            }
            setAuthSpinner(false);
        } catch (err) {
            setAuthSpinner(false);
            return toast({ type: "error", message: err.response.data.message });
        }
    };

    const onRipple = (e) => {
        PrimeReact.ripple = e.value;
        setRipple(e.value);
    };

    const onLayoutModeChange = (mode) => {
        setLayoutMode(mode);
    };

    const onColorModeChange = (mode) => {
        setLayoutColorMode(mode);
    };

    const onInputStyleChange = (inputStyle) => {
        setInputStyle(inputStyle);
    };

    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            <div className={'authContainer'}>
                <div className="flex justify-content-center">
                    <div className={'authForm'}>
                        <Formik
                            initialValues={{
                                email: "",
                                password: "",
                            }}
                            validationSchema={validationSchema}
                            onSubmit={(values, { setSubmitting }) => {
                                LoginSubmitHandler(JSON.stringify(values, null, 2));
                                setSubmitting(false);
                            }}
                        >
                            {(props) => (
                                <form onSubmit={props.handleSubmit}>
                                    {authSpinner ? (
                                        <div className='formSpinner'>
                                            <div className='loading'></div>
                                        </div>
                                    ) : null}
                                    <div className='titleBox'>
                                        <h3>Sign In to Admin Dashboard</h3>
                                    </div>
                                    <div className="login-box">
                                        <div className='inputBox'>
                                            <label htmlFor="email">Email</label>
                                            <Field type="email" name="email" className="Input" autoComplete="false" />
                                            <ErrorMessage name="email">{(msg) => <p className={'error'}>{msg}</p>}</ErrorMessage>
                                        </div>

                                        <div className='inputBox'>
                                            <label htmlFor="password">Password</label>
                                            <Field name="password">{({ field }) => <Password className="Input" {...field} toggleMask feedback={false} />}</Field>
                                            <ErrorMessage name="password">{(msg) => <p className={'error'}>{msg}</p>}</ErrorMessage>
                                        </div>
                                    {errorMessage ? <p className={"formError p-mt-0"}>{errorMessage}</p> : null}
                                    <button type="submit">Login</button>
                                    </div>
                                </form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Login;
