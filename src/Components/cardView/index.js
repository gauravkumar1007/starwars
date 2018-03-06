import React, { Component } from 'react';
import styled from 'styled-components';
import { Card, CardHeader, CardText } from 'material-ui/Card';

const CardContainer = styled.div`
	font-size: ${props => `${30 - props.fontSize*2}`}px;
`;

export const CardView = (props)=>{
    const { data, fontSize } = props;
    return (
        <CardContainer fontSize={fontSize}>
            <Card className="card-view">
                <CardHeader
                    title={data.name}
                    subtitle={`Population :- ${data.population}`}
                    actAsExpander={true}
                    showExpandableButton={true}
                />
                <CardText expandable={true}>
                    <strong>Diameter :- </strong>{data.diameter}
                    <br></br>
                    <strong>Gravity :- </strong>{data.gravity}
                    <br></br>
                    <strong>Rotation Period :- </strong>{data.rotation_period}
                    <br></br>
                    <strong>Orbital Period :- </strong>{data.orbital_period}
                    <br></br>
                    <strong>Climate :- </strong> {data.climate}
                    <br></br>
                    <strong>Terrain :- </strong> {data.terrain}
                    <br></br>
                </CardText>
            </Card>
        </CardContainer>
    )

}