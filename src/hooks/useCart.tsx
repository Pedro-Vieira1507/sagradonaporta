import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

// Precisamos garantir que o item do carrinho tenha o storeId
export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  storeId: string; // NOVO: Identificador da loja
  storeName?: string; // NOVO: Nome da loja
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  currentStoreId: string | null;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('@SagradoNaPorta:cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('@SagradoNaPorta:cart', JSON.stringify(items));
  }, [items]);

  const currentStoreId = items.length > 0 ? items[0].storeId : null;
  const cartCount = items.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);

  const addToCart = (product: Omit<CartItem, 'quantity'>) => {
    setItems((currentItems) => {
      // REGRA: Apenas uma loja por vez no carrinho
      if (currentItems.length > 0 && currentItems[0].storeId !== product.storeId) {
        // Opção: Pode usar um modal de confirmação no futuro. Por ora, vamos bloquear e avisar.
        toast.error('Você só pode adicionar itens de um estabelecimento por vez. Limpe o carrinho para pedir desta loja.');
        return currentItems; 
      }

      const existingItem = currentItems.find(item => item.id === product.id);
      
      if (existingItem) {
        toast.success(`Mais um(a) ${product.name} adicionado!`);
        return currentItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      
      toast.success(`${product.name} adicionado ao carrinho!`);
      return [...currentItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setItems(items => items.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    setItems(items =>
      items.map(item => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider value={{
      items, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount, currentStoreId
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};