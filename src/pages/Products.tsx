import { useState, useEffect } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, Grid, List, Star, Clock, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/ProductCard';
import { nearbyStores } from './Index'; // Puxando o mock da Home para o Header da Loja

// Mock products 
const allProducts = [
  { id: '1', name: 'Terço de Madeira Nossa Senhora Aparecida', price: 39.90, originalPrice: 49.90, image: 'https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=400&h=400&fit=crop', category: 'Terços', storeId: '4' },
  { id: '2', name: 'Bíblia Sagrada Edição de Luxo', price: 89.90, image: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=400&h=400&fit=crop', category: 'Bíblias', storeId: '2' },
  { id: '3', name: 'Imagem de São Jorge 30cm', price: 129.90, originalPrice: 159.90, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop', category: 'Imagens', storeId: '1' },
  { id: '4', name: 'Kit Velas Aromáticas 7 Dias', price: 24.90, image: 'https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?w=400&h=400&fit=crop', category: 'Velas', storeId: '3' },
  { id: '5', name: 'Terço de Cristal Rosa', price: 59.90, image: 'https://images.unsplash.com/photo-1599707367072-cd6ada2bc375?w=400&h=400&fit=crop', category: 'Terços', storeId: '4' },
  { id: '6', name: 'Imagem Nossa Senhora de Fátima 40cm', price: 189.90, originalPrice: 219.90, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop', category: 'Imagens', storeId: '4' },
];

const categories = ['Todos', 'Terços', 'Imagens', 'Bíblias', 'Velas'];

const Products = () => {
  const { id } = useParams(); // ID do estabelecimento via URL
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState(allProducts);
  const [storeInfo, setStoreInfo] = useState<any>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('relevance');
  
  const searchQuery = searchParams.get('search') || '';
  const categoryFilter = searchParams.get('categoria') || 'todos';

  useEffect(() => {
    // Configura os dados do estabelecimento atual
    if (id) {
      const store = nearbyStores.find(s => s.id === id);
      setStoreInfo(store || null);
    } else {
      setStoreInfo(null);
    }

    let filtered = allProducts;
    
    // Filtra produtos SOMENTE desta loja (se estiver na rota da loja)
    if (id) {
      // Simulação: se não encontrar o storeId no mock, retorna alguns aleatórios para demonstração
      const storeProducts = filtered.filter(p => p.storeId === id);
      filtered = storeProducts.length > 0 ? storeProducts : filtered.slice(0, 3);
    }
    
    // Filtro por busca
    if (searchQuery) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filtro por categoria
    if (categoryFilter && categoryFilter !== 'todos') {
      filtered = filtered.filter(
        (p) => p.category.toLowerCase() === categoryFilter.toLowerCase()
      );
    }
    
    // Ordenação
    if (sortBy === 'price-asc') {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
      filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    }
    
    setProducts(filtered);
  }, [searchQuery, categoryFilter, sortBy, id]);

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
        {/* Cabeçalho da Loja / Vitrine */}
        <section className="bg-secondary/50 py-8 border-b border-border">
          <div className="container-main">
            {storeInfo ? (
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="w-24 h-24 rounded-2xl overflow-hidden border border-border/50 shadow-sm shrink-0">
                  <img src={storeInfo.image} alt={storeInfo.name} className="w-full h-full object-cover" />
                </div>
                <div className="text-center md:text-left flex-1">
                  <h1 className="section-title mb-2 text-2xl md:text-3xl">{storeInfo.name}</h1>
                  <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1 font-medium text-foreground"><Star className="w-4 h-4 text-accent fill-accent" /> {storeInfo.rating}</span>
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {storeInfo.deliveryTime}</span>
                    <span className="flex items-center gap-1 text-green-600 font-medium">{storeInfo.fee}</span>
                    <span className="uppercase tracking-wider font-semibold border-l border-border pl-4">{storeInfo.category}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <h1 className="section-title mb-2">Todos os Produtos</h1>
                <p className="text-muted-foreground">Explorando produtos de várias lojas</p>
              </div>
            )}
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
                </div>
              </aside>

              {/* Products Grid */}
              <div className="flex-1">
                {/* Toolbar */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <p className="text-muted-foreground text-sm">
                    {products.length} itens encontrados {searchQuery && ` para "${searchQuery}"`}
                  </p>
                  
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal className="w-5 h-5 text-muted-foreground hidden sm:block" />
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
                  <div className="text-center py-16 bg-card rounded-xl border border-border/50">
                    <Store className="w-12 h-12 mx-auto text-muted-foreground mb-4 opacity-50" />
                    <p className="text-muted-foreground text-lg">Nenhum produto encontrado com este filtro nesta loja.</p>
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