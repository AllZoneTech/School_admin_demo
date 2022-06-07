// import '../styles/globals.css';
import React from 'react';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import DashboardLayout from '../src/components/DashboardLayout';

type MyState = Array<number>;
export interface MyContext {
  state: MyState;
  setState: (c: MyState) => void;
}
export const Context = React.createContext<MyContext | null>(null);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      refetchOnWindowFocus: false,
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  const [state, setState] = React.useState<MyState>([]);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      <Context.Provider value={{ state, setState }}>
        <DashboardLayout>
          <Component {...pageProps} />
        </DashboardLayout>
      </Context.Provider>
    </QueryClientProvider>
  );
}

export default MyApp;
