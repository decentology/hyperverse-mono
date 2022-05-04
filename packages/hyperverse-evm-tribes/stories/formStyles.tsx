import styled from 'styled-components';

export const Styles = styled.div`
 background: #DEDEDE;
 padding: 20px;

 h1 {
   border-bottom: 1px solid white;
   color: #3d3d3d;
   font-family: sans-serif;
   font-size: 20px;
   font-weight: 600;
   line-height: 24px;
   padding: 10px;
   text-align: center;
 }

 form {
   background: white;
   border-radius: 5px;
   box-shadow: 5px 5px 5px #B7B9BA;
   display: flex;
   flex-direction: column;
   justify-content: space-around;
   margin: 0 auto;
   max-width: 500px;
   padding: 30px 20px;
 }

 input {
   border: 2px solid #d9d9d9;
   border-radius: 5px;
   box-sizing: border-box;
   padding: 10px;
   margin-bottom: 5px;
   width: 100%;
 }

 label {
   color: #3d3d3d;
   display: block;
   font-family: sans-serif;
   font-size: 14px;
   font-weight: 500;
   margin-bottom: 5px;
 }

 .error {
   color: red;
   font-family: sans-serif;
   font-size: 12px;
   height: 30px;
 }

 .submitButton {
   background-color: #DAEBF5;
   color: white;
   font-family: sans-serif;
   font-size: 14px;
   margin: 0px 0px;

`;