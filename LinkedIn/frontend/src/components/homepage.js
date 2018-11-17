import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import axios from 'axios';
import { ROOT_URL } from '../constants/constants';

import linkedIn from '../assets/images/linkedIn.png'
// import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
// import { login } from "../../actions";



class Login extends Component {

    constructor(props) {
        super(props);
        let myData = JSON.parse(localStorage.getItem('myData'));
        this.state = {
            email: "",
            pswd: "",
            authFlag: false,
            errorFlag: false,
            invalidFlag: false,
            myData: myData
        }
    }

    renderField(field) {
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? "has-danger" : ""}`;

        return (
            <div className="padding5 " style={{ "margin-top": "4px" }}>
                <label for="reg-label" className="reg-label">First name</label>
                <input type="text" className="inputFields" style={{ width: "100%", padding: "0 8px" }} name="lastName" id="reg-lastname" aria-required="true" tabindex="1" placeholder=""></input>
                {/* <input className="inputField" type="text" name="email"  {...field.input} placeholder="Email address"></input> */}
                <span className="error">
                    {touched ? error : ""}
                </span>
            </div>
        );
    }



    renderFieldPassword(field) {
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? "has-danger" : ""}`;
        return (
            <div className="padding5 " style={{ "margin-top": "-10px" }}>
                <label for="reg-label" className="reg-label">Password (6 or more characters)</label>
                <input className="inputFields" name="password"  {...field.input} type="password" placeholder=""></input>
                <span className="error">
                    {touched ? error : ""}
                </span>
            </div>
        );
    }

    renderFieldLastName(field) {
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? "has-danger" : ""}`;
        return (
            <div className="padding5 " style={{ "margin-top": "-10px" }}>
                <label for="reg-label" className="reg-label">Last name</label>
                <input className="inputFields" name="lastname"  {...field.input} type="text" placeholder=""></input>
                <span className="error">
                    {touched ? error : ""}
                </span>
            </div>
        );
    }

    renderFieldEmail(field) {
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? "has-danger" : ""}`;
        return (
            <div className="padding5 " style={{ "margin-top": "-10px" }}>
                <label for="reg-label" className="reg-label">Email</label>
                <input className="inputFields" name="email"  {...field.input} type="text" placeholder=""></input>
                <span className="error">
                    {touched ? error : ""}
                </span>
            </div>
        );
    }

    onSubmit(values) {
        console.log(values);
        values.type = "T";


        this.props.onSubmitHandle(values)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    console.log(response.data)
                    if (response.data) {
                        if (response.data.status === 1) {
                            console.log(response.data.info)
                            localStorage.setItem('myData', JSON.stringify(response.data.info));
                            let test = JSON.parse(localStorage.getItem('myData'));
                            console.log(test.firstname);
                            this.setState({
                                authFlag: true,
                                invalidFlag: false,
                                myData: test
                            })
                        } else if (response.data.status === -1) {
                            this.setState({
                                invalidFlag: true
                            })
                        }
                    }

                } else {
                    this.setState({
                        invalidFlag: false
                    })
                }
            });

    }


    render() {
        require('../styles/homepage.css')

        let invalid, redirectVar;

        if (this.state.invalidFlag) {
            invalid = <div style={{ marginTop: '10px' }} className="invalid">
                <span>
                    The email or password you entered is incorrect.
            </span>
            </div>
        }

        if (this.state.myData) {
            redirectVar = <Redirect to="/TravelerHome" />
        }

        const { handleSubmit } = this.props;

        return (


            <div style={{ backgroundColor: "#f4f4f4" }}>
                {redirectVar}
                <div id="">
                    <nav className="navbar navbar-expand-sm" style={{ 'border-bottom-color': '', 'padding': ' 0%', 'backgroundColor': '#283e4a', "border-radius": "0px", marginBottom: "0px" }}>
                        <div className="container-fluid" >
                            <div className="navbar-header" style={{ marginTop: "10px", marginLeft: "8%" }}>
                                <img src={linkedIn}></img>
                            </div>
                            <ul className="nav navbar-nav navbar-right">
                                <li style={{ marginRight: "15px" }}>
                                    <input type="text" name="session_key" className="login-email" autocapitalize="off" tabindex="1" id="login-email" placeholder="Email" autofocus="autofocus" dir="ltr"></input>

                                </li>
                                <li style={{ marginRight: "15px" }}>
                                    <input type="password" name="session_password" class="login-password" id="login-password" aria-required="true" tabindex="1" placeholder="Password" dir="ltr"></input>
                                </li>
                                <li style={{ marginRight: "15px" }}>
                                    <input tabindex="1" className="login-submit" type="submit" value="Sign in"></input>
                                </li>
                                <li style={{ marginRight: "15px" }}>
                                    <a className="linkForgot">Forgot Password?</a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
                <div className="login-background">

                    <div style={{ paddingTop: "2%" }}>
                        <div className="formProps">
                            <form style={{ width: "100%" }} onSubmit={handleSubmit(this.onSubmit.bind(this))}>

                                {/* <div>  */}
                                <div className="form-title">Be great at what you do </div>
                                <div className="form-subtitle">Get started - it's free. </div>
                                {/* </div> */}
                                {invalid}
                                <Field
                                    name="email"
                                    component={this.renderField}
                                />

                                <Field
                                    name="lastname"
                                    component={this.renderFieldLastName}
                                />
                                <Field
                                    name="email"
                                    component={this.renderFieldEmail}
                                />
                                <Field
                                    name="password"
                                    component={this.renderFieldPassword}
                                />
                                

                                <div class="form-group padding5 " style={{ "marginBottom": '-14px', "marginTop": "-5%" }}>
                                    <div className="agreement">By clicking Join now, you agree to the LinkedIn User Agreement, Privacy Policy, and Cookie Policy.
                                        </div>
                                </div>
                                <div class="form-group padding5" style={{ "marginBottom": '0px' }}>
                                    <button type="submit" className="btn btn-primary submitButton" value="Log In" tabindex="4" >Join now</button>
                                    {/* <div class="remember checkbox traveler">
                                        <label for="rememberMe">
                                            <input id="rememberMe" name="rememberMe" tabindex="3" checked="true" type="checkbox" value="true" /><input type="hidden" name="_rememberMe" value="on" />
                                            Keep me signed in
                                </label>
                                    </div>*/}
                                </div> 
                            </form>

                        </div>
                    </div>
                    <br />
                </div>
            </div>
        )
    }
}


function validate(values) {

    const errors = {};
    if (!values.email || !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email)) {
        errors.email = "Enter valid email address";
    }
    if (!values.password) {
        errors.password = "Enter password ";
    }

    return errors;
}

const mapStateToProps = state => {
    return {
        mydata: state.reducer.myData
    }
}

const mapDispatchStateToProps = dispatch => {
    return {
        onSubmitHandle: (data) => {
            return axios.post(`${ROOT_URL}/login`, data, { withCredentials: true })
                .then(response => {
                    if (response.data.status == 1) {
                        let res = {
                            status: 1,
                            data: {
                                uid: response.data.info.uid,
                                email: response.data.info.email,
                                firstname: response.data.info.firstname,
                                lastname: response.data.info.lastname,
                                profileImage: response.data.info.profileImage,
                                type: response.data.info.type
                            }
                        }
                        dispatch({ type: 'SAVEMYDATA', payload: res });
                        return response;
                    } else {
                        return response;
                    }
                }, (error) => {

                    return error;
                });
        }

    }
}



export default reduxForm({
    validate,
    form: "TravelerLoginForm"
})(connect(mapStateToProps, mapDispatchStateToProps)(Login));

// export default reduxForm({
//     validate,
//     form: "TravelerLoginForm"
// })(connect(null, { login })(Login));
// export default Login;