import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import ShopifyCredentials from './ShopifyCredentials';
import AmazonCredentials from './AmazonCredentials';
import MercadoLibreCredentials from './MercadoLibreCredentials';

const DialogCredentials = ({
  isOpen,
  type,
  onOpenChange,
}: {
  isOpen: boolean;
  type: 'shopify' | 'amazon' | 'mercadolibre' | null;
  onOpenChange: (open: boolean) => void;
}) => {
  const transformTypeToTitle = (
    type: 'shopify' | 'amazon' | 'mercadolibre',
  ) => {
    switch (type) {
      case 'mercadolibre':
        return 'Mercado Libre';
      default:
        return type;
    }
  };

  if (!type) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className=" overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="capitalize">
            Agregar Marketplace {transformTypeToTitle(type)}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Agrega las credenciales de API para cada marketplace
        </DialogDescription>
        {type === 'shopify' && <ShopifyCredentials isDialog />}
        {type === 'amazon' && <AmazonCredentials isDialog />}
        {type === 'mercadolibre' && <MercadoLibreCredentials isDialog />}
      </DialogContent>
    </Dialog>
  );
};

export default DialogCredentials;
