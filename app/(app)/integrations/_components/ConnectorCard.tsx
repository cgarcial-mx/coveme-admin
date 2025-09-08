'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plug, CheckCircle2, XCircle } from 'lucide-react';
import { MarketplaceCredential } from '@/types/marketplace';
import { syncProductsAndListings } from '../connectors/actions/connectors.server';
import { toast } from 'sonner';

const ConnectorCard = ({
  id,
  connectionStatus,
  marketplaceType,
  marketplaceName,
}: MarketplaceCredential) => {
  const handleSync = async (connectorId: number) => {
    const response = await syncProductsAndListings({
      credentialsId: connectorId,
    });

    toast.success('Sync exitoso');
  };

  return (
    <Card key={id}>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <Plug className="size-4 capitalize" /> {marketplaceType}
        </CardTitle>
        <CardDescription>{marketplaceName}</CardDescription>
        <CardDescription>
          {connectionStatus === 'connected' ? (
            <span className="inline-flex items-center gap-1 text-emerald-600">
              <CheckCircle2 className="size-4" /> Conectado
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-rose-600">
              <XCircle className="size-4" /> Desconectado
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center gap-2">
        {connectionStatus === 'connected' ? (
          <Button variant="destructive" size="sm">
            Disconnect
          </Button>
        ) : (
          <Button size="sm">Connect</Button>
        )}
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleSync(id)}
          disabled={connectionStatus !== 'connected'}
        >
          Sync Listing
        </Button>
      </CardContent>
    </Card>
  );
};

export default ConnectorCard;
