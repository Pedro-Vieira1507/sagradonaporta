import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/ProductCard';

// Mock products - will be replaced with Supabase data
const allProducts = [
  { id: '1', name: 'Terço de Madeira Nossa Senhora Aparecida', price: 39.90, originalPrice: 49.90, image: 'https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=400&h=400&fit=crop', category: 'Terços' },
  { id: '2', name: 'Bíblia Sagrada Edição de Luxo', price: 89.90, image: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=400&h=400&fit=crop', category: 'Bíblias' },
  { id: '3', name: 'Imagem de São Jorge 30cm', price: 129.90, originalPrice: 159.90, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop', category: 'Imagens' },
  { id: '4', name: 'Kit Velas Aromáticas 7 Dias', price: 24.90, image: 'https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?w=400&h=400&fit=crop', category: 'Velas' },
  { id: '5', name: 'Terço de Cristal Rosa', price: 59.90, image: 'https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=400&h=400&fit=crop', category: 'Terços' },
  { id: '6', name: 'Imagem Nossa Senhora de Fátima 40cm', price: 189.90, originalPrice: 219.90, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop', category: 'Imagens' },
  { id: '7', name: 'Bíblia Infantil Ilustrada', price: 49.90, image: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=400&h=400&fit=crop', category: 'Bíblias' },
  { id: '8', name: 'Vela Decorativa Sagrada Família', price: 34.90, image: 'https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?w=400&h=400&fit=crop', category: 'Velas' },
];

const categories = ['Todos', 'Terços', 'Imagens', 'Bíblias', 'Velas'];

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState(allProducts);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('relevance');
  
  const searchQuery = searchParams.get('search') || '';
  const categoryFilter = searchParams.get('categoria') || 'todos';

  useEffect(() => {
    let filtered = allProducts;
    
    // Filter by search
    if (searchQuery) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by category
    if (categoryFilter && categoryFilter !== 'todos') {
      filtered = filtered.filter(
        (p) => p.category.toLowerCase() === categoryFilter.toLowerCase()
      );
    }
    
    // Sort
    if (sortBy === 'price-asc') {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
      filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    }
    
    setProducts(filtered);
  }, [searchQuery, categoryFilter, sortBy]);

  const handleCategoryChange = (category: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (category === 'todos') {
      newParams.delete('categoria');
    } else {
      newParams.set('categoria', category.toLowerCase());
    }
    setSearchParams(newParams);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-secondary/50 py-12">
          <div className="container-main">
            <h1 className="section-title mb-2">Nossos Produtos</h1>
            <p className="text-muted-foreground">
              {products.length} produtos encontrados
              {searchQuery && ` para "${searchQuery}"`}
            </p>
          </div>
        </section>

        <section className="py-8">
          <div className="container-main">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Sidebar Filters */}
              <aside className="lg:w-64 flex-shrink-0">
                <div className="sticky top-24 bg-card rounded-xl p-6 border border-border/50">
                  <div className="flex items-center gap-2 mb-6">
                    <Filter className="w-5 h-5 text-primary" />
                    <h3 className="font-display text-lg font-semibold">Filtros</h3>
                  </div>
                  
                  {/* Categories */}
                  <div className="mb-6">
                    <h4 className="font-medium text-foreground mb-3">Categorias</h4>
                    <div className="space-y-2">
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => handleCategoryChange(cat)}
                          className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                            (cat.toLowerCase() === categoryFilter) || (cat === 'Todos' && categoryFilter === 'todos')
                              ? 'bg-primary text-primary-foreground'
                              : 'hover:bg-muted text-foreground/80'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Price Range */}
                  <div>
                    <h4 className="font-medium text-foreground mb-3">Faixa de Preço</h4>
                    <div className="flex gap-2">
                      <Input type="number" placeholder="Min" className="w-full" />
                      <Input type="number" placeholder="Max" className="w-full" />
                    </div>
                    <Button className="w-full mt-3" variant="outline" size="sm">
                      Aplicar
                    </Button>
                  </div>
                </div>
              </aside>

              {/* Products Grid */}
              <div className="flex-1">
                {/* Toolbar */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal className="w-5 h-5 text-muted-foreground" />
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-48">
                        <SelectValue placeholder="Ordenar por" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="relevance">Mais Relevantes</SelectItem>
                        <SelectItem value="price-asc">Menor Preço</SelectItem>
                        <SelectItem value="price-desc">Maior Preço</SelectItem>
                        <SelectItem value="name">Nome A-Z</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'outline'}
                      size="icon"
                      onClick={() => setViewMode('grid')}
                    >
                      <Grid className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'outline'}
                      size="icon"
                      onClick={() => setViewMode('list')}
                    >
                      <List className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Products */}
                {products.length > 0 ? (
                  <div className={`grid gap-6 ${
                    viewMode === 'grid' 
                      ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' 
                      : 'grid-cols-1'
                  }`}>
                    {products.map((product, index) => (
                      <div 
                        key={product.id} 
                        className="animate-fade-in"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <ProductCard {...product} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <p className="text-muted-foreground text-lg">Nenhum produto encontrado.</p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => setSearchParams({})}
                    >
                      Limpar Filtros
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Products;
