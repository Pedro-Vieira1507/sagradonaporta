import { Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';
import { toast } from 'sonner';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
}

const ProductCard = ({ id, name, price, originalPrice, image, category }: ProductCardProps) => {
  const { addToCart } = useCart();
  
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({ id, name, price, image, quantity: 1 });
    toast.success('Produto adicionado ao carrinho!');
  };

  const formatPrice = (value: number) => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <Link to={`/produto/${id}`} className="group">
      <div className="card-product">
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
            <button className="w-9 h-9 bg-background/90 hover:bg-background rounded-full flex items-center justify-center shadow-md transition-colors">
              <Heart className="w-4 h-4 text-foreground" />
            </button>
          </div>
          
          {/* Add to cart overlay */}
          <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button 
              onClick={handleAddToCart}
              className="w-full bg-background hover:bg-accent text-foreground hover:text-accent-foreground"
              size="sm"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Adicionar
            </Button>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-4">
          <span className="text-xs text-muted-foreground uppercase tracking-wide">{category}</span>
          <h3 className="font-medium text-foreground mt-1 line-clamp-2 group-hover:text-primary transition-colors">
            {name}
          </h3>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-lg font-bold text-primary">{formatPrice(price)}</span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through">{formatPrice(originalPrice)}</span>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            ou 3x de {formatPrice(price / 3)} sem juros
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
