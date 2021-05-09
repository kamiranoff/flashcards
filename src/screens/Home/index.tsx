import React from 'react';
import { Container } from '../../common';
import DecksList from './DecksList';
import TopBar from '../../common/TopBar';

const Home = () => {
  return (
    <Container>
      <TopBar />
      <DecksList />
    </Container>
  );
};

export default Home;
