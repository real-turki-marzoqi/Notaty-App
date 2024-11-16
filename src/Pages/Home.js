import React, { useEffect, useState } from 'react';
import NoteContainer from '../Components/Notes/NoteContainer';
import NavBar from '../Components/utils/NavBar';
import { Container } from 'react-bootstrap';

const Home = () => {
  


  return (
    <div className='home'>
      <NavBar />
      <Container style={{ width: "70%" }}>
        <NoteContainer  /> 
      </Container>
    </div>
  );
};

export default Home;
