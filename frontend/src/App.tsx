import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { FC } from 'react';
import Configurator from './components/configurator/Configurator';
import RenderArea from './components/render/RenderArea';
import { StartPageProvider } from './StartPageContext';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: 'http://localhost:4000/graphql',
});

const App: FC = () => {
  return (
    <ApolloProvider client={client}>
      <StartPageProvider>
        <div className="bg-violet-200 w-full h-screen flex">
          <RenderArea />

          <Configurator />
        </div>
      </StartPageProvider>
    </ApolloProvider>
  );
};

export default App;
