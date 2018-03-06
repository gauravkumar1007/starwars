import React from "react";
import styled from 'styled-components';
import FlatButton from 'material-ui/FlatButton';

const AppHeader = styled.div`
	background-color: #222;
    height: 75px;
    padding: 20px;
    color: white;
    display: flex;
    justify-content: space-between;
`
const AppHeaderTitle = styled.div`
	font-size: 1.5em;
`

export const HeaderView = (props) => (
    <AppHeader>
    	<AppHeaderTitle>
        	<h1>Welcome to Star Wars</h1>
    	</AppHeaderTitle>
        {
            props.user && (
                <div>
                    <FlatButton
                        label="Sign Out"
                        backgroundColor="#17a2b8"
                        hoverColor="#8AA62F"
                        style={{color:'#fff'}}
                        primary={true}
                        onClick={props.logOut}
                    />
                </div>
            )
        }
    </AppHeader>
);