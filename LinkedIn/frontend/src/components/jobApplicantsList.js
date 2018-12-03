import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import axios from 'axios';
import '../styles/jobposting.css'
import Stepper from 'react-stepper-horizontal'
import bulb from '../assets/images/postjobbulb.PNG'
import jobpostlogo from '../assets/images/jobpostlogo.PNG'
var swal = require('sweetalert')
var redirectVar = null;
var formData = "";

class JobApplicantsList extends Component{

    constructor(props){
        super(props);
        this.state={

        }

    }

}

export default JobApplicantsList;