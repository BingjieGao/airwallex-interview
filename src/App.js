import React from 'react';
import Layout from '@/Layout';
import Home from '@/Home';

function App() {
  return (
      <Layout children={<Home />}/>
  );
}

export default App;
