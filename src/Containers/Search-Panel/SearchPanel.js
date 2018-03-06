import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import TextField from 'material-ui/TextField';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';
import debounce from 'lodash/debounce';

import { HeaderView } from '../../Components/header/index.js';
import { getUserData, setUserData } from '../../Redux/Actions/user.js';
import { getPlanetsData } from '../../Redux/Actions/planet.js';
import { ContainerLoader } from '../../Components/loader/container.js';
import { CardView } from '../../Components/cardView/index.js';

const FallBackMsgWrapper = styled.div`
	margin: 20px;
	color: red;
`;

const ContentWrapper = styled.div`
	margin: 15px;
`;

const ErrorWrapper = styled.span`
	color: red;
	text-align: center;
`;

class SearchPanel extends Component {

	constructor(props){
        super(props);
        this.state = {
			isLoading: true,
			isBusy: false,
			viewAccess: false,
			errorText: null,
			sortedPlanetData: [],
		}
		this.counter = 0;
    }

	componentWillMount() {
		const { user } = this.props;
		const username = localStorage.getItem('username');
		console.log("componentWillMount -->>",this.props)
		const planetUrl = "https://swapi.co/api/planets/";
		if(!isEmpty(user)) {
			console.log("<<<-- if part -->>");
			this.getPlanetsData(planetUrl, user);
		} else if(username) {

				console.log("<<<-- else part -->>");
				const url = `https://swapi.co/api/people/?search=${username}`;
				this.props.getUserData(url, (response) => {
						const userData = get(response, "results[0]");
						this.props.setUserData(userData);
						this.getPlanetsData(planetUrl, userData);
					},
					(error) => {
						this.setState({isLoading: false, errorText: error})
						console.error("Error -->>",error)
					}
				)
		} else {
			this.setState({ isLoading: false})
		}
	}

	componentDidMount(){
        this.myInterval = setInterval(this.initailizeCounter ,1000*60);
    }


    componentWillUnmount(){
        clearInterval(this.myInterval);
    }

    initailizeCounter = () => {
    	this.counter = 0;
    }

	getPlanetsData = (planetUrl, userData) => {
		this.props.getPlanetsData(planetUrl, (response) => {
				console.log("Final getPlanetsData -->>",response);
				const allPlanet = get(response, "results");
				let sortedPlanetData = [];
				if(!isEmpty(allPlanet)) {
					sortedPlanetData = allPlanet.sort(( current_item, next_item)=>{
						let x = isNaN(current_item.population) ? 0 : current_item.population;
                		let y = isNaN(next_item.population) ? 0 : next_item.population;
						return y - x;
					})
				}

				let stateObj = {
					isLoading: false,
					viewAccess: true,
					isBusy: false,
					sortedPlanetData: sortedPlanetData,
					errorText: null,
				};

				if(userData) {
					stateObj.userData = userData;
				}
				this.setState(stateObj)
			},
			(error) => {
				this.setState({isLoading: false, errorText: error})
				console.error("Error -->>",error)
			}
		)
	}

	logOut = () => {
        localStorage.clear();
        this.props.history.push('/');
    }

    onSearch = debounce((event, text) => {
    	console.log("onSearch -->>",text)
    	const { user } = this.props;

    	this.setState({isBusy:true});
    	this.counter += 1;

    	if(this.counter <= 15 || (user && user.name === "Luke Skywalker")) {
        	this.getPlanetsData(`https://swapi.co/api/planets/?search=${text}`)
    	} else {

    		this.setState({
    			isBusy: false,
    			errorText: "You have crossed maximum search per minute"
    		})
    	}
    }, 500)

	render() {
		console.log("SearchPanel props -->>",this.props);
		console.log("SearchPanel state -->>",this.state);
		console.log("SearchPanel counter -->>",this.counter);
		const {
			isLoading,
			isBusy,
			viewAccess,
			userData,
			sortedPlanetData,
			errorText,
		} = this.state;

		if(isLoading)
			return <ContainerLoader size={80}/>

		if(!viewAccess)
			return (
                <FallBackMsgWrapper>
					<h1>Need to login!!</h1>
                </FallBackMsgWrapper>
			)

		return (
			<div className="App">
                <HeaderView
                	user={userData ? true : false}
                	logOut={this.logOut}
                />
        		<ContentWrapper className="col-xs-10">
		            <TextField
		            	type="text"
		            	hintText="Search Planet"
		            	onChange={this.onSearch}
		            	fullWidth={true}
		            />
		        </ContentWrapper>
		        { isBusy && <ContainerLoader/>}
		        <ContentWrapper className="col-xs-12">
		        	{
                    	errorText && <ErrorWrapper>
                    		{errorText}
                    	</ErrorWrapper>
                    }
		        	{
		        		sortedPlanetData.map((planet, index) => {

		        			return <CardView
		        				key={index}
		        				data={planet}
		        				fontSize={index}
		        			/>
		        		})
		        	}
		        </ContentWrapper>
            </div>
		)
	}
}

const mapStateToProps = (state)=>{
    return {...state.user}
}

const mapDispatchToProps  = function (dispatch) {
    return ({
        getUserData:(url,successCallback,errorCallback)=>{
            dispatch(getUserData(url,successCallback,errorCallback))
        },
        setUserData:(user)=>{
            dispatch(setUserData(user))
        },
        getPlanetsData:(url,successCallback,errorCallback)=>{
            dispatch(getPlanetsData(url,successCallback,errorCallback))
        },
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchPanel);