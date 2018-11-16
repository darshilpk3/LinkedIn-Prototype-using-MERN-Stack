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
            <div className="padding5 " style={{ "margin-top": "10px" }}>
                <input className="inputField" type="text" name="email"  {...field.input} placeholder="Email address"></input>
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
                <input className="inputField" name="password"  {...field.input} type="password" placeholder="Password"></input>
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
                    <nav className="navbar navbar-expand-sm" style={{ 'border-bottom-color': '#dfdbdb', 'padding': ' 1%', 'backgroundColor': 'white' }}>
                        <div className="container-fluid" >
                            <div className="navbar-header">
                                <img  src={linkedIn}></img>

                                <a className="navbar-brand" id="mainHeading" href="/">Linked<span>in</span></a>
                            </div>
                            <ul className="nav navbar-nav navbar-right">
                                <li style={{ marginRight: "15px" }}>
                                    <img alt="HomeAway birdhouse" src="//csvcus.homeaway.com/rsrcs/cdn-logos/2.10.6/bce/moniker/homeaway_us/birdhouse-bceheader.svg"></img>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
                <div>
                    <div style={{ 'text-align': 'center', "margin-top": "5%" }}>
                        <div><span id="loginHeading">Log in to HomeAway</span></div>
                        <div><span id="" style={{ 'color': '#666', 'font-size': '18px' }}>Need an account? <Link to={{ pathname: '/SignUp', state: { type: 'T' } }}><span style={{ color: '#2a6ebb' }}>Sign Up</span></Link></span></div>
                    </div>
                    <div>
                        <div className="formProps">
                            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>

                                <div className="padding5" style={{ "font-size": "25px" }}>Account login</div>
                                <hr style={{ margin: '0px' }}></hr>
                                {invalid}
                                <Field
                                    name="email"
                                    component={this.renderField}
                                />

                                <Field
                                    name="password"
                                    component={this.renderFieldPassword}
                                />


                                <div class="form-group padding5 " style={{ "marginBottom": '0px', "marginTop": "-5%" }}>
                                    <span id="urlForgotPassword" style={{ "display": "none" }}>/forgotPassword?service=https%3A%2F%2Fwww.homeaway.com%2Fexp%2Fsso%2Fauth%3Flt%3Dtraveler%26context%3Ddef%26service%3D%252F</span>
                                    <a href=""
                                        id="forgotPasswordUrl" class="forgot-password">Forgot password?</a>
                                </div>
                                <div class="form-group padding5" style={{ "marginBottom": '0px' }}>
                                    <button type="submit" className="btn btn-primary  " value="Log In" id="loginButton" tabindex="4" >Login</button>
                                    {/* <input type="submit" onClick={this.login} className="btn btn-primary  " value="Log In" id="loginButton" tabindex="4" /> */}
                                    <div class="remember checkbox traveler">
                                        <label for="rememberMe">
                                            <input id="rememberMe" name="rememberMe" tabindex="3" checked="true" type="checkbox" value="true" /><input type="hidden" name="_rememberMe" value="on" />
                                            Keep me signed in
                                </label>
                                    </div>
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