import React, { useState } from 'react';
import styled from 'styled-components';
import { mobile } from '../responsive';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/apiCalls';
import { Link } from 'react-router-dom';
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: linear-gradient(
    rgba(255, 255, 255, 0.5),
    rgba(255, 255, 255, 0.5),
    url('')
  );
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  padding: 20px;
  width: 25%;
  background-color: #e6e0e0ac;
  ${mobile({
    width: '75%',
  })}
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const Input = styled.input`
  float: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  color: white;
  background-color: #1a9999ac;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;
const Links = styled.a`
  margin: 5px 0px;
  font-style: 12px;
  text-decoration: underline;
  cursor: pointer;
`;
const Error = styled.span`
  color: red;
`;
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);
  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { email: email, password: password });
  };
  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT </Title>
        <Form>
          <Input
            placeholder="email"
            type='email'
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button onClick={handleClick} disabled={isFetching}>
            LOGIN
          </Button>
          <Link to="/forgotPassword">forget Password</Link>
          {error && <Error>Something went Wrong...</Error>}
          <Links>DO NOT YOU REMEMBER THE PASSWORD?</Links>
          <Links>CREATE A NEW ACCOUNT</Links>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
