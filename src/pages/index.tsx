//Modules
import { Heading } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import type { NextPage } from 'next'
import styled from 'styled-components';

//Components
import { Logo } from '../components/navigation'
import { Profiles } from '../components/profile';

const Home: NextPage = () => {
  const Main = styled.main`
    height:100%;
    .profiles{
      height:calc(100% - 4em);
      display:flex;
      flex-direction:column;
      justify-content:center;
      align-items:center;
      gap:1em;
    }
  `;

  return (
    <Main>
      <Logo />
      <div className="profiles">
        <Heading 
          size='lg' 
          as={motion.h1}
          initial={{ opacity:0, translateY:10}}
          animate={{ opacity:1, translateY:0 }}
          transitionDuration='.75s'
        >Quem está assistindo?</Heading>
        <Profiles />
      </div>
    </Main>
  )
};

export default Home;