import React from "react";
import styled from 'styled-components';

import { useRouter } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();
  return (
    <Nav>
      <Logo onClick={ () => router.push('/') } src="/logo.webp" alt="logo" />
      <List>
        <ListItem onClick={ () => router.push('/') }>Home</ListItem>
        <ListItem onClick={ () => router.push('/all-heroes') }>All Heroes</ListItem>
        <ListItem onClick={ () => window.open('https://www.linkedin.com/in/rwalber/', '_blank') } >Developer</ListItem>
      </List>
    </Nav>
  );
};

export default Navbar;

const Nav = styled.nav`
  background-color: #FFF;
  height: 8vh;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  justify-content: space-between;
`

const Logo = styled.img`
  width: 7rem;
  &:hover {
    cursor: pointer;
  }
`

const List = styled.ul`
  display: flex;
  align-items: center;
  flex-direction: row;
`

const ListItem = styled.li`
  list-style: none;
  margin: 0 1rem;
  font-size: 1.2rem;
  font-style: normal;
  text-transform: uppercase;
  font-family: 'Carter One', cursive;
  color: #000;
  &:hover {
    cursor: pointer;
    color: #FF0000;
    transition: .4s all;
  }
`