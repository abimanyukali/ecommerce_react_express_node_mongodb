import React, { useState } from 'react';
import styled from 'styled-components';
import {useParams,useHistory} from "react-router-dom"
import { forgot } from '../redux/apiCalls';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const Input = styled.input`
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;
const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  color: white;
  background-color: teal;
  margin-bottom: 10px;
  border-radius: 15px;
`;
const ResetPassword = () => {
  const history =useHistory()
  const {token}= useParams()
 console.log(token);
  const [password, setPassword] = useState();

  const handleClick = async (e) => {
    e.preventDefault();
    history.push("/login")
    try {
     forgot(token,password)
    } catch (error) {}
  };
  return (
    <Container>
      <Form>
        <Input
          placeholder="Enter New Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleClick}>Submit</Button>
      </Form>
    </Container>
  );
};

export default ResetPassword;
