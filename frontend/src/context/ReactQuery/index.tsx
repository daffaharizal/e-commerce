import {
  useQueryClient,
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';

import { IChildrenProps } from 'types';

// Create a client
const queryClient = new QueryClient();

const QueryProvider: React.FC<IChildrenProps> = ({ children }) => {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

// Access the client
const QueryConsumer = () => useQueryClient();

export { QueryProvider, QueryConsumer };
