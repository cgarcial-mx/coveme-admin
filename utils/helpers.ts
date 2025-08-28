import { ConnectionStatus } from '@/types';

export const marketplaceCredentialStatusParse = (status: ConnectionStatus) => {
  const statusCredentials: Record<string, string> = {
    connected: 'Conectado',
    disconnected: 'Desconectado',
    error: 'Error',
    pending: 'Pendiente',
  };

  return statusCredentials[status];
};
