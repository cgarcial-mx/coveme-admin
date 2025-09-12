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

export const getMarginColor = (margin: number) => {
  if (margin > 25) return 'text-green-600 bg-green-50';
  if (margin > 15) return 'text-blue-600 bg-blue-50';
  return 'text-red-600 bg-red-50';
};
