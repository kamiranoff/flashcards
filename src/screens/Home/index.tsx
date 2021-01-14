import React from 'react';
import { Container } from '../../common';
import DecksList from './DecksList';
import TopBar from '../../common/TopBar';

const Home = () => (
  <Container>
    <TopBar />
    <DecksList />
  </Container>
);

export default Home;
