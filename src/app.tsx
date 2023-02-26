import { MantineProvider, Text } from '@mantine/core';
import css from './app.module.scss';

function App() {
  return (
      <MantineProvider withGlobalStyles withNormalizeCSS>
          <Text className={css.app}>Labas</Text>
      </MantineProvider>
  );
}

export default App;
