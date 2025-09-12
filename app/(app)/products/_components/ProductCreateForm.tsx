'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { createProduct } from '@/app/(app)/products/new/actions';
import {
  ImageIcon,
  Plus,
  X,
  Package,
  DollarSign,
  Tag,
  Settings,
} from 'lucide-react';

export function ProductCreateForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, setIsPending] = React.useState(false);

  // Form states
  const [trackInventory, setTrackInventory] = React.useState(false);
  const [chargesTax, setChargesTax] = React.useState(false);
  const [continueSelling, setContinueSelling] = React.useState(false);
  const [selectedMarketplaces, setSelectedMarketplaces] = React.useState<
    string[]
  >([]);
  const [images, setImages] = React.useState<string[]>([]);
  const [tags, setTags] = React.useState<string[]>([]);
  const [newTag, setNewTag] = React.useState('');

  // Marketplace configurations
  const [marketplaceConfigs, setMarketplaceConfigs] = React.useState<{
    [key: string]: {
      price: string;
      sku: string;
      category: string;
      fulfillment?: string;
      keywords?: string[];
    };
  }>({});

  const availableMarketplaces = [
    { id: 'amazon', name: 'Amazon', icon: '🛒' },
    { id: 'ebay', name: 'eBay', icon: '🏪' },
    { id: 'shopify', name: 'Shopify', icon: '🛍️' },
    { id: 'mercadolibre', name: 'MercadoLibre', icon: '🏬' },
  ];

  const handleMarketplaceToggle = (marketplaceId: string) => {
    setSelectedMarketplaces((prev) => {
      if (prev.includes(marketplaceId)) {
        const newConfigs = { ...marketplaceConfigs };
        delete newConfigs[marketplaceId];
        setMarketplaceConfigs(newConfigs);
        return prev.filter((id) => id !== marketplaceId);
      } else {
        setMarketplaceConfigs((prev) => ({
          ...prev,
          [marketplaceId]: {
            price: '',
            sku: '',
            category: '',
            fulfillment: marketplaceId === 'amazon' ? 'FBA' : undefined,
            keywords: [],
          },
        }));
        return [...prev, marketplaceId];
      }
    });
  };

  const updateMarketplaceConfig = (
    marketplaceId: string,
    field: string,
    value: string,
  ) => {
    setMarketplaceConfigs((prev) => ({
      ...prev,
      [marketplaceId]: {
        ...prev[marketplaceId],
        [field]: value,
      },
    }));
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const addImage = () => {
    const newImageUrl = `/placeholder.svg?height=400&width=400&text=Imagen+${
      images.length + 1
    }`;
    setImages([...images, newImageUrl]);
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);

    try {
      const formData = new FormData(e.currentTarget);

      // Add hidden fields
      formData.set('client_id', '1');
      formData.set('internal_sku', `SKU-${Date.now()}`);
      formData.set('created_by', '1');
      formData.set(
        'selected_marketplaces',
        JSON.stringify(selectedMarketplaces),
      );
      formData.set('marketplace_configs', JSON.stringify(marketplaceConfigs));
      formData.set('product_tags', JSON.stringify(tags));
      formData.set('product_images', JSON.stringify(images));

      const result = await createProduct(formData);

      if (result.ok) {
        toast({
          title: 'Producto creado',
          description: `ID del producto: ${result.id}`,
        });
        router.push('/products');
      } else {
        toast({
          title: 'Error al crear producto',
          description: result.message ?? 'Revisa los campos.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Ocurrió un error inesperado',
        variant: 'destructive',
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-4">
      {/* Main Content - 3 columns */}
      <div className="lg:col-span-3">
        <form onSubmit={handleSubmit} id="product-form">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic" className="flex items-center gap-2">
                <Package className="size-4" />
                Básico
              </TabsTrigger>
              <TabsTrigger value="pricing" className="flex items-center gap-2">
                <DollarSign className="size-4" />
                Precios
              </TabsTrigger>
              <TabsTrigger
                value="marketplaces"
                className="flex items-center gap-2"
              >
                <Settings className="size-4" />
                Marketplaces
              </TabsTrigger>
              <TabsTrigger value="seo" className="flex items-center gap-2">
                <Tag className="size-4" />
                SEO & Tags
              </TabsTrigger>
            </TabsList>

            {/* Basic Information Tab */}
            <TabsContent value="basic" className="space-y-6 mt-6">
              {/* Product Title & Description */}
              <Card>
                <CardHeader>
                  <CardTitle>Información Básica</CardTitle>
                  <CardDescription>
                    Detalles principales del producto
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Título del Producto *</Label>
                    <Input
                      id="title"
                      name="title"
                      placeholder="Ej: Papel Bond Premium A4 500 hojas"
                      required
                      className="text-base"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Descripción</Label>
                    <Textarea
                      id="description"
                      name="description"
                      className="min-h-[120px]"
                      placeholder="Describe las características principales, beneficios y especificaciones del producto..."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="brand">Marca</Label>
                      <Input
                        id="brand"
                        name="brand"
                        placeholder="Ej: Office Lab"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="model">Modelo</Label>
                      <Input
                        id="model"
                        name="model"
                        placeholder="Ej: Premium A4"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Categoría *</Label>
                      <Select name="category" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccionar categoría" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="papeleria">Papelería</SelectItem>
                          <SelectItem value="oficina">Oficina</SelectItem>
                          <SelectItem value="electronica">
                            Electrónica
                          </SelectItem>
                          <SelectItem value="hogar">Hogar</SelectItem>
                          <SelectItem value="ropa">Ropa</SelectItem>
                          <SelectItem value="deportes">Deportes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="weight">Peso (g)</Label>
                      <Input
                        id="weight"
                        name="weight"
                        type="number"
                        placeholder="500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="status">Estado</Label>
                      <Select name="status" defaultValue="draft">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Activo</SelectItem>
                          <SelectItem value="draft">Borrador</SelectItem>
                          <SelectItem value="archived">Archivado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Images */}
              <Card>
                <CardHeader>
                  <CardTitle>Imágenes del Producto</CardTitle>
                  <CardDescription>
                    Agrega hasta 10 imágenes de alta calidad
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {images.map((image, index) => (
                      <div
                        key={index}
                        className="relative group aspect-square border rounded-lg overflow-hidden bg-muted"
                      >
                        <img
                          src={image || '/placeholder.svg'}
                          alt={`Producto ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="size-3" />
                        </button>
                        <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                          {index + 1}
                        </div>
                      </div>
                    ))}

                    {images.length < 10 && (
                      <button
                        type="button"
                        onClick={addImage}
                        className="aspect-square border-2 border-dashed border-muted-foreground/25 rounded-lg flex flex-col items-center justify-center gap-2 hover:border-muted-foreground/50 transition-colors"
                      >
                        <Plus className="size-6 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          Agregar imagen
                        </span>
                      </button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Pricing Tab */}
            <TabsContent value="pricing" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Configuración de Precios</CardTitle>
                  <CardDescription>
                    Define los precios base y márgenes del producto
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="cost">Costo Base *</Label>
                      <div className="relative">
                        <Input
                          id="cost"
                          name="cost"
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          className="pr-8"
                          required
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                          $
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="suggested_price">Precio Sugerido</Label>
                      <div className="relative">
                        <Input
                          id="suggested_price"
                          name="suggested_price"
                          type="number"
                          step="0.01"
                          placeholder="0.00"
                          className="pr-8"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                          $
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="charges_tax"
                      name="charges_tax"
                      checked={chargesTax}
                      onCheckedChange={(checked) =>
                        setChargesTax(Boolean(checked))
                      }
                    />
                    <Label htmlFor="charges_tax" className="text-sm">
                      Este producto incluye impuestos
                    </Label>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-medium">Gestión de Inventario</h4>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="track_inventory"
                        name="track_inventory"
                        checked={trackInventory}
                        onCheckedChange={(checked) =>
                          setTrackInventory(Boolean(checked))
                        }
                      />
                      <Label htmlFor="track_inventory" className="text-sm">
                        Hacer seguimiento del inventario
                      </Label>
                    </div>

                    {trackInventory && (
                      <div className="space-y-4 pl-6 border-l-2 border-muted">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="initial_stock">Stock Inicial</Label>
                            <Input
                              id="initial_stock"
                              name="initial_stock"
                              type="number"
                              placeholder="100"
                              min="0"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="min_stock">Stock Mínimo</Label>
                            <Input
                              id="min_stock"
                              name="min_stock"
                              type="number"
                              placeholder="10"
                              min="0"
                            />
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="continue_selling"
                            name="continue_selling"
                            checked={continueSelling}
                            onCheckedChange={(checked) =>
                              setContinueSelling(Boolean(checked))
                            }
                          />
                          <Label htmlFor="continue_selling" className="text-sm">
                            Permitir ventas sin stock
                          </Label>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Marketplaces Tab */}
            <TabsContent value="marketplaces" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Configuración por Marketplace</CardTitle>
                  <CardDescription>
                    Selecciona y configura los marketplaces donde venderás este
                    producto
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Marketplace Selection */}
                  <div className="space-y-4">
                    <h4 className="font-medium">Marketplaces Disponibles</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {availableMarketplaces.map((marketplace) => (
                        <div
                          key={marketplace.id}
                          className="flex items-center space-x-3 p-3 border rounded-lg"
                        >
                          <Checkbox
                            id={marketplace.id}
                            checked={selectedMarketplaces.includes(
                              marketplace.id,
                            )}
                            onCheckedChange={() =>
                              handleMarketplaceToggle(marketplace.id)
                            }
                          />
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{marketplace.icon}</span>
                            <Label
                              htmlFor={marketplace.id}
                              className="font-medium"
                            >
                              {marketplace.name}
                            </Label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Marketplace Configurations */}
                  {selectedMarketplaces.length > 0 && (
                    <div className="space-y-4">
                      <Separator />
                      <h4 className="font-medium">Configuración Específica</h4>

                      <Tabs
                        defaultValue={selectedMarketplaces[0]}
                        className="w-full"
                      >
                        <TabsList className="grid w-full grid-cols-4">
                          {selectedMarketplaces.map((marketplaceId) => {
                            const marketplace = availableMarketplaces.find(
                              (m) => m.id === marketplaceId,
                            );
                            return (
                              <TabsTrigger
                                key={marketplaceId}
                                value={marketplaceId}
                              >
                                <span className="mr-1">
                                  {marketplace?.icon}
                                </span>
                                {marketplace?.name}
                              </TabsTrigger>
                            );
                          })}
                        </TabsList>

                        {selectedMarketplaces.map((marketplaceId) => {
                          const marketplace = availableMarketplaces.find(
                            (m) => m.id === marketplaceId,
                          );
                          const config =
                            marketplaceConfigs[marketplaceId] || {};

                          return (
                            <TabsContent
                              key={marketplaceId}
                              value={marketplaceId}
                              className="space-y-4"
                            >
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label>Precio en {marketplace?.name}</Label>
                                  <div className="relative">
                                    <Input
                                      type="number"
                                      step="0.01"
                                      placeholder="0.00"
                                      value={config.price || ''}
                                      onChange={(e) =>
                                        updateMarketplaceConfig(
                                          marketplaceId,
                                          'price',
                                          e.target.value,
                                        )
                                      }
                                      className="pr-8"
                                    />
                                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                      $
                                    </span>
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <Label>SKU</Label>
                                  <Input
                                    placeholder={`${marketplaceId.toUpperCase()}-${Date.now()
                                      .toString()
                                      .slice(-6)}`}
                                    value={config.sku || ''}
                                    onChange={(e) =>
                                      updateMarketplaceConfig(
                                        marketplaceId,
                                        'sku',
                                        e.target.value,
                                      )
                                    }
                                  />
                                </div>
                              </div>

                              <div className="space-y-2">
                                <Label>Categoría en {marketplace?.name}</Label>
                                <Input
                                  placeholder="Ej: Office Products > Paper"
                                  value={config.category || ''}
                                  onChange={(e) =>
                                    updateMarketplaceConfig(
                                      marketplaceId,
                                      'category',
                                      e.target.value,
                                    )
                                  }
                                />
                              </div>

                              {marketplaceId === 'amazon' && (
                                <div className="space-y-2">
                                  <Label>Método de Fulfillment</Label>
                                  <Select
                                    value={config.fulfillment || 'FBA'}
                                    onValueChange={(value) =>
                                      updateMarketplaceConfig(
                                        marketplaceId,
                                        'fulfillment',
                                        value,
                                      )
                                    }
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="FBA">
                                        FBA (Fulfillment by Amazon)
                                      </SelectItem>
                                      <SelectItem value="FBM">
                                        FBM (Fulfillment by Merchant)
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              )}
                            </TabsContent>
                          );
                        })}
                      </Tabs>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* SEO & Tags Tab */}
            <TabsContent value="seo" className="space-y-6 mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>SEO y Etiquetas</CardTitle>
                  <CardDescription>
                    Optimiza tu producto para búsquedas y organización
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="seo_title">Título SEO</Label>
                    <Input
                      id="seo_title"
                      name="seo_title"
                      placeholder="Título optimizado para motores de búsqueda"
                    />
                    <p className="text-xs text-muted-foreground">
                      Máximo 60 caracteres recomendados
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="seo_description">Descripción SEO</Label>
                    <Textarea
                      id="seo_description"
                      name="seo_description"
                      placeholder="Descripción que aparecerá en los resultados de búsqueda"
                      className="min-h-[80px]"
                    />
                    <p className="text-xs text-muted-foreground">
                      Máximo 160 caracteres recomendados
                    </p>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Etiquetas del Producto</Label>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Agregar etiqueta"
                          value={newTag}
                          onChange={(e) => setNewTag(e.target.value)}
                          onKeyPress={(e) =>
                            e.key === 'Enter' && (e.preventDefault(), addTag())
                          }
                        />
                        <Button
                          type="button"
                          onClick={addTag}
                          variant="outline"
                        >
                          <Plus className="size-4" />
                        </Button>
                      </div>
                    </div>

                    {tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {tags.map((tag, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="flex items-center gap-1"
                          >
                            {tag}
                            <button
                              type="button"
                              onClick={() => removeTag(tag)}
                              className="ml-1 hover:text-destructive"
                            >
                              <X className="size-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="keywords">Palabras Clave</Label>
                    <Textarea
                      id="keywords"
                      name="keywords"
                      placeholder="papel, oficina, bond, premium, A4, impresión"
                      className="min-h-[60px]"
                    />
                    <p className="text-xs text-muted-foreground">
                      Separa las palabras clave con comas
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </form>
      </div>

      {/* Sidebar - 1 column */}
      <div className="space-y-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Acciones</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              type="submit"
              form="product-form"
              disabled={isPending}
              className="w-full"
            >
              {isPending ? 'Creando...' : 'Crear Producto'}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full bg-transparent"
              onClick={() => router.back()}
            >
              Cancelar
            </Button>
          </CardContent>
        </Card>

        {/* Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Vista Previa</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
              {images.length > 0 ? (
                <img
                  src={images[0] || '/placeholder.svg'}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <div className="text-center text-muted-foreground">
                  <ImageIcon className="size-8 mx-auto mb-2" />
                  <p className="text-sm">Sin imagen</p>
                </div>
              )}
            </div>
            <div className="space-y-2">
              <p className="font-medium text-sm">Marketplaces seleccionados:</p>
              {selectedMarketplaces.length > 0 ? (
                <div className="flex flex-wrap gap-1">
                  {selectedMarketplaces.map((id) => {
                    const marketplace = availableMarketplaces.find(
                      (m) => m.id === id,
                    );
                    return (
                      <Badge key={id} variant="outline" className="text-xs">
                        {marketplace?.icon} {marketplace?.name}
                      </Badge>
                    );
                  })}
                </div>
              ) : (
                <p className="text-xs text-muted-foreground">
                  Ninguno seleccionado
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Tips */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">💡 Consejos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <div className="space-y-2">
              <p>
                <strong>Imágenes:</strong> Usa fotos de alta calidad con fondo
                blanco para mejores resultados.
              </p>
              <p>
                <strong>Precios:</strong> Considera los márgenes de cada
                marketplace al establecer precios.
              </p>
              <p>
                <strong>SEO:</strong> Incluye palabras clave relevantes en
                título y descripción.
              </p>
              <p>
                <strong>Inventario:</strong> Activa el seguimiento si planeas
                vender en múltiples canales.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
