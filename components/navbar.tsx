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
  width: 100%;
  height: 4rem;
  
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  background-color: #FFF;
  
  z-index: 100;
  padding: 0 1rem;
  position: fixed;

  @media screen and (max-width: 505px) {
    flex-direction: column;
    height: 5rem;
    padding: 1rem;
  }
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
  padding-right: 1rem;
`

const ListItem = styled.li`
  color: #000;
  margin: 0 1rem;
  font-size: 1.2rem;
  font-style: normal;
  list-style: none;
  font-family: 'Carter One', cursive;
  text-transform: uppercase;

  @media screen and (max-width: 505px) {
    font-size: 1rem;
  }

  &:hover {
    cursor: pointer;
    color: #FF0000;
    transition: .4s all;
  }
`