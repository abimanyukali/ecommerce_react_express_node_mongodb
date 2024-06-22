import React from 'react';
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';
import { Badge } from '@mui/material';
import { mobile } from '../responsive';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logOutStart, logOutSuccess, loginFailure } from '../redux/userRedux';
import { useHistory } from 'react-router-dom'
const Container = styled.div`
  height: 60px;

  ${mobile({ height: '50px' })}
`;
const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  ${mobile({ Padding: '10px 0px ' })}
`;
const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;
const Input = styled.input`
  border: none;
  ${mobile({ width: '50px' })}
`;
const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: '24px' })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;
const Center = styled.div`
  flex: 1;
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-left: 25px;
  ${mobile({ justifyContent: 'center', flex: 2 })}
`;

const Language = styled.span`
  font-style: 14px;
  cursor: pointer;
  ${mobile({ display: 'none' })}
`;

const MenuItem = styled.div`
  font-style: 14px;
  cursor: pointer;
  ${mobile({ fontSize: '12px', marginLeft: '10px' })}
`;
const ButtonOut = styled.button`
  background-color: #df5454ac;
  padding: 5px;
  margin-left: 15px;
  border: none;
  border-radius: 15px;
  color: white;
`;
const ButtonIn = styled.button`
  background-color: #6edf60ac;
  padding: 5px;
  margin-left: 15px;
  border: none;
  border-radius: 15px;
  color: white;
`;

export default function Navbar() {
  const dispatch = useDispatch();
  const history = useHistory()
  const handleClick = () => {
    dispatch(logOutStart());
    try {
      dispatch(logOutSuccess());
    } catch (error) {
      dispatch(loginFailure());
    }
  };
  const handleLogin=()=>{
    history.push("/login")
  }
  const quantity = useSelector((state) => state.cart.quantity);
  const user = useSelector((state) => state.user.currentUser);
  console.log(user);
  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="search" />
            <SearchIcon style={{ color: 'gray', fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <Logo>ABI</Logo>
        </Center>
        <Right>
          <MenuItem>REGISTER</MenuItem>
          <MenuItem>SIGN IN</MenuItem>
          <Link to="/cart">
            <MenuItem>
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlinedIcon />
              </Badge>
            </MenuItem>
          </Link>
          {user && <ButtonOut onClick={handleClick}>logout</ButtonOut>}
          {!user && <ButtonIn onClick={handleLogin}>login</ButtonIn>}
        </Right>
      </Wrapper>
    </Container>
  );
}
