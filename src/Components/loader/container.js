import React from "react";
import styled from 'styled-components';
import CircularProgress from 'material-ui/CircularProgress';

const LoaderWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 9000;
    background-color: rgba(255,255,255, 0.55);
`
export const ContainerLoader = (props) => (
  <LoaderWrapper>
    <CircularProgress size={props.size || 30}/>
  </LoaderWrapper>
);