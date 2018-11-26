import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import axios from 'axios';
import { ROOT_URL } from '../constants/constants';

import linkedIn from '../assets/images/linkedIn_only_in.png'
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
        require('../styles/navbar.css')

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
                            <div className="navbar-header" style={{ marginTop: "0px", marginLeft: "8%" }}>
                                {/* <img style={{ height: "31px" }} src={linkedIn}></img> */}
                                <div className="linkedIn">in</div>

                            </div>
                            <div className="navbar-header" style={{ marginLeft: "10px" }}>
                                <input type="text" name="session_key" className="login-email" autocapitalize="off" tabindex="1" id="login-email" placeholder="Search" autofocus="autofocus" dir="ltr"></input>
                            </div>

                            <ul className="nav navbar-nav navbar-right" style={{textAlign:"center"}}>
                                <li style={{ marginRight: "15px" }}>
                                    <div> 
                                    
                                        {/* <i className="ion-ios-home-outline" style={{ 'margin-right': '7px', color: "#c7d1d8", fontSize:"24px" }}></i> */}
                                        <i className="ion-home" style={{ 'margin-right': '7px', color: "#c7d1d8", fontSize:"24px" }}></i>
                                    </div> 
                                    <div>
                                        <span className="icons_nav" style={{ color: "#c7d1d8" }}>Home</span>
                                    </div>
                                </li>
                                <li style={{ marginRight: "15px" }}>
                                    <i className="ion-ios-people" style={{ 'margin-right': '7px', color: "#c7d1d8" , fontSize:"24px"}}></i>
                                    <div>
                                        <span className="icons_nav" style={{ color: "#c7d1d8" }}>My Network</span>
                                    </div>
                                </li>
                                <li style={{ marginRight: "15px" }}>
                                    {/* <i class="fa fa-briefcase" style={{ 'margin-right': '7px', color: "#c7d1d8" , fontSize:"24px"}} aria-hidden="true"></i> */}
                                    
                                    <i className="ion-ios-briefcase-outline" style={{ 'margin-right': '7px', color: "#c7d1d8", fontSize:"24px" }}></i>

                                    <div>
                                        <span className="icons_nav" style={{ color: "#c7d1d8" }}>Jobs</span>
                                    </div>
                                </li>
                                <li style={{ marginRight: "15px" }}>
                                    <i className="ion-ios-chatboxes-outline " style={{ 'margin-right': '7px', color: "#c7d1d8", fontSize:"24px" }}></i>
                                    {/* <i className="ion-android-chat" style={{ 'margin-right': '7px', color: "#c7d1d8" }}></i> */}
                                    <div>
                                        <span className="icons_nav" style={{ color: "#c7d1d8" }}>Messaging</span>
                                    </div>
                                </li>
                                <li style={{ marginRight: "15px" }}>
                                    <i className="ion-ios-bell-outline" style={{ 'margin-right': '7px', color: "#c7d1d8" , fontSize:"24px"}}></i>
                                    {/* <i className="ion-ios-bell-outline" style={{ 'margin-right': '7px', color: "#c7d1d8" }}></i> */}
                                    <div>
                                        <span className="icons_nav" style={{ color: "#c7d1d8" }}>Notifications</span>
                                    </div>
                                </li>
                                <li style={{ marginRight: "15px" }}>

                                    <i className="ion-android-apps" style={{ 'margin-right': '7px', color: "#c7d1d8" , fontSize:"24px"}}></i>

                                    {/* <i class="fa fa-th" aria-hidden="true" style={{ 'margin-right': '7px', color: "#c7d1d8" , fontSize:"24px"}}></i> */}
                                    <div>
                                        <span className="icons_nav" style={{ color: "#c7d1d8" }}>Work</span>
                                    </div>
                                </li>
                                <li style={{ marginRight: "15px" }}>

                                    <i className="ion-android-apps" style={{ 'margin-right': '7px', color: "#c7d1d8" , fontSize:"24px"}}></i>

                                    {/* <i class="fa fa-th" aria-hidden="true" style={{ 'margin-right': '7px', color: "#c7d1d8" , fontSize:"24px"}}></i> */}
                                    <div>
                                        <span className="icons_nav" style={{ color: "#c7d1d8" }}>Post a job</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </nav>
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