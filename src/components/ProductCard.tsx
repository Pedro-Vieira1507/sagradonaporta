import { Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  storeId?: string; // Identificador da loja para validação do carrinho
  storeName?: string; // Nome da loja
}

const ProductCard = ({ 
  id, 
  name, 
  price, 
  originalPrice, 
  image, 
  category, 
  storeId = '1', // Valor padrão caso não seja passado
  storeName = 'Estabelecimento Parceiro' 
}: ProductCardProps) => {
  const { addToCart } = useCart();
  
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // O hook useCart agora adiciona a 'quantity: 1' e faz os alertas de toast automaticamente
    addToCart({ 
      id, 
      name, 
      price, 
      image, 
      storeId, 
      storeName 
    });
  };

  const formatPrice = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <Link to={`/produto/${id}`} className="group">
      <div className="card-product h-full flex flex-col bg-card rounded-xl overflow-hidden border border-border/50 hover:shadow-lg transition-all">
        {/* Image container */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Discount badge */}
          {discount > 0 && (
            <div className="absolute top-3 left-3 bg-accent text-accent-foreground text-xs font-bold px-2 py-1 rounded">
              -{discount}%
            </div>
          )}
          
          {/* Quick actions */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button 
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
              className="w-9 h-9 bg-background/90 hover:bg-background rounded-full flex items-center justify-center shadow-md transition-colors"
            >
              <Heart className="w-4 h-4 text-foreground" />
            </button>
          </div>
          
          {/* Add to cart overlay (Agora mais visível e intuitivo) */}
          <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button 
              onClick={handleAddToCart}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
              size="sm"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Adicionar
            </Button>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-4 flex-1 flex flex-col">
          <span className="text-xs text-muted-foreground uppercase tracking-wide">{category}</span>
          <h3 className="font-medium text-foreground mt-1 line-clamp-2 group-hover:text-primary transition-colors">
            {name}
          </h3>
          
          <div className="mt-auto pt-4">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-primary">{formatPrice(price)}</span>
              {originalPrice && (
                <span className="text-sm text-muted-foreground line-through">{formatPrice(originalPrice)}</span>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              ou 3x de {formatPrice(price / 3)} sem juros
            </p>

            {/* Botão de comprar fixo (padrão de apps de delivery) */}
            <Button 
              onClick={handleAddToCart}
              variant="outline"
              className="w-full mt-3 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              Adicionar ao carrinho
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;