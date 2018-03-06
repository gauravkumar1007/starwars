import React, { Component } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';
import styled from 'styled-components';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';

import { getUserData, setUserData } from '../../Redux/Actions/user.js';
import { ContainerLoader } from '../loader/container.js';

const LoginBoxWrapper = styled.div`
	width: 250px;
	margin:0 auto;
	height: 450px;
	padding: 25px;
	background-color: #fff;
`
const LoginBoxTitle = styled.div`
    text-align: left;
`;

const FormWrapper = styled.div`
	padding: 15px 0 20px 0;
    text-align: left;
`;

const FieldContainer = styled.div`
	padding: 15px 0px;
`;

const ErrorWrapper = styled.span`
	color: red;
	text-align: center;
`;

class LoginView extends Component {

	state = {
		remember_me: true,
		errorType: "",
		errorText: null,
		isBusy: false,
	}

	handleInputChange = (fieldName, event)=> {
		this.setState({
			[fieldName]: event.target.value,
			errorText: null,
		})
	}

	handleCheckBoxValueChange = () => {
	    this.setState((oldState) => {
	        return {
	        	remember_me: !oldState.remember_me,
	        };
	    });
    }

	onSubmit = (event) => {
		event.preventDefault();
		const { username, password, remember_me } = this.state;
		console.log("onSubmit state -->>",this.state);

		if(!username) {
			this.setState({ errorType: 'username' })
		} else if(!password) {
			this.setState({ errorType: 'password' })
		} else{
			const url = `https://swapi.co/api/people/?search=${username}`;
			this.setState({isBusy: true})
			this.props.getUserData(url, (response) => {
					console.log("onSubmit response -->>",response)
					let stateObj = { isBusy: false };

					if(isEmpty(response.results)){
						stateObj.errorText = "Either username or password incorrect!!";
					} else {
						const userData = get(response, "results[0]");
						if(userData.birth_year === password){
	                        if(remember_me){
	                            localStorage.setItem("username", username);
	                        }
	                        this.props.setUserData(userData);
	                        this.props.history.push('search')
	                    }else{
	                    	stateObj.errorText = "Wrong Password!!";
	                    }
					}

					this.setState(stateObj);

				}, (error) => {
					this.setState({isBusy: false})
					console.error("Error -->>",error)
				}
			)
		}
	}

  	render() {
  		console.log("LoginView state -->>",this.state);
  		console.log("LoginView props -->>",this.props);
	    const { errorType, isBusy, errorText } = this.state;

	    return (
	        <div className="row">
	        	<LoginBoxWrapper className="col-sm-4 col-sm-offset-4">
	            	{ isBusy && <ContainerLoader/>}
	            	<div className="col-xs-12">
		            	<LoginBoxTitle>
		            		Login In
		            	</LoginBoxTitle>
		            	<FormWrapper>
		            		<form onSubmit={this.onSubmit}>
		            			<FieldContainer className="col-xs-12">
			            			<TextField
		                                className="input-text"
		                                floatingLabelText="Username"
		                                type="text"
		                                onChange={this.handleInputChange.bind(this, "username")}
		                            	errorText={(errorType === 'username') && "Enter Username"}
		                            	fullWidth={true}
		                            />
		                            <br/>
		                            <TextField
		                                className="input-text"
		                                floatingLabelText="Password"
		                                type="password"
		                                onChange={this.handleInputChange.bind(this, "password")}
		                            	errorText={(errorType === 'password') && "Enter Password"}
		                            	fullWidth={true}
		                            />
		                        </FieldContainer>
		            			<FieldContainer className="col-xs-12">
		                        	<Checkbox
							            label="Remember me"
							            checked={this.state.remember_me}
							            onCheck={this.handleCheckBoxValueChange}
							        />
		                        </FieldContainer>
		                        {
		                        	errorText && <ErrorWrapper>
		                        		{errorText}
		                        	</ErrorWrapper>
		                        }
		            			<FieldContainer className="col-xs-12">
	                            	<FlatButton
	                            		label="Sign In"
	                            		backgroundColor="#17a2b8"
      									hoverColor="#8AA62F"
      									style={{color:'#fff'}}
	                            		type="submit"
	                            		primary={true}
	                            		fullWidth={true}
	                            	/>
		                        </FieldContainer>
		            		</form>
		            	</FormWrapper>
	            	</div>
	        	</LoginBoxWrapper>
	        </div>
	    );
    }
}

const mapDispatchToProps = function(dispatch){
    return ({
        getUserData:(url, successCallback, errorCallback)=>{
            dispatch(getUserData(url, successCallback, errorCallback))
        },
        setUserData:(user)=>{
            dispatch(setUserData(user))
        },
    })
}

export default connect(null, mapDispatchToProps)(LoginView);