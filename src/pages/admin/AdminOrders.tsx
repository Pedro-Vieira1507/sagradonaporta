import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import { supabase } from '@/integrations-supabase/client';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Json } from '@/integrations-supabase/types';

interface Order {
  id: string;
  user_id: string | null;
  items: Json;
  total: number;
  status: string | null;
  payment_method: string | null;
  shipping_address: Json;
  shipping_price: number | null;
  created_at: string | null;
}

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface ShippingAddress {
  cep: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
}

const statusOptions = [
  { value: 'Pendente', label: 'Pendente', color: 'bg-yellow-500' },
  { value: 'Pago', label: 'Pago', color: 'bg-blue-500' },
  { value: 'Enviado', label: 'Enviado', color: 'bg-green-500' },
  { value: 'Entregue', label: 'Entregue', color: 'bg-emerald-500' },
  { value: 'Cancelado', label: 'Cancelado', color: 'bg-red-500' },
];

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const { toast } = useToast();

  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({ title: 'Erro ao carregar pedidos', variant: 'destructive' });
    } else {
      setOrders(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', orderId);

    if (error) {
      toast({ title: 'Erro ao atualizar status', variant: 'destructive' });
    } else {
      toast({ title: 'Status atualizado com sucesso' });
      fetchOrders();
    }
  };

  const getStatusColor = (status: string | null) => {
    const found = statusOptions.find((s) => s.value === status);
    return found?.color || 'bg-gray-500';
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-';
    return format(new Date(dateString), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });
  };

  const parseOrderItems = (items: Json): OrderItem[] => {
    if (Array.isArray(items)) {
      return items as unknown as OrderItem[];
    }
    return [];
  };

  const parseShippingAddress = (address: Json): ShippingAddress | null => {
    if (address && typeof address === 'object' && !Array.isArray(address)) {
      return address as unknown as ShippingAddress;
    }
    return null;
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Pedidos</h1>
          <p className="text-muted-foreground">Gerencie os pedidos da loja</p>
        </div>

        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Itens</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Pagamento</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    Carregando...
                  </TableCell>
                </TableRow>
              ) : orders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    Nenhum pedido encontrado
                  </TableCell>
                </TableRow>
              ) : (
                orders.map((order) => {
                  const items = parseOrderItems(order.items);
                  return (
                    <TableRow key={order.id}>
                      <TableCell className="font-mono text-sm">
                        {order.id.slice(0, 8)}...
                      </TableCell>
                      <TableCell>{formatDate(order.created_at)}</TableCell>
                      <TableCell>{items.length} item(s)</TableCell>
                      <TableCell>R$ {order.total.toFixed(2)}</TableCell>
                      <TableCell>{order.payment_method || '-'}</TableCell>
                      <TableCell>
                        <Select
                          value={order.status || 'Pendente'}
                          onValueChange={(value) => handleStatusChange(order.id, value)}
                        >
                          <SelectTrigger className="w-32">
                            <SelectValue>
                              <Badge className={`${getStatusColor(order.status)} text-white`}>
                                {order.status || 'Pendente'}
                              </Badge>
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            {statusOptions.map((status) => (
                              <SelectItem key={status.value} value={status.value}>
                                <Badge className={`${status.color} text-white`}>
                                  {status.label}
                                </Badge>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setSelectedOrder(order)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>

        <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Detalhes do Pedido</DialogTitle>
            </DialogHeader>
            {selectedOrder && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">ID do Pedido</p>
                    <p className="font-mono">{selectedOrder.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Data</p>
                    <p>{formatDate(selectedOrder.created_at)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <Badge className={`${getStatusColor(selectedOrder.status)} text-white`}>
                      {selectedOrder.status || 'Pendente'}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Pagamento</p>
                    <p>{selectedOrder.payment_method || '-'}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Itens do Pedido</h3>
                  <div className="space-y-2">
                    {parseOrderItems(selectedOrder.items).map((item, index) => (
                      <div key={index} className="flex justify-between items-center border-b pb-2">
                        <div className="flex items-center gap-3">
                          {item.image && (
                            <img src={item.image} alt={item.name} className="h-10 w-10 object-cover rounded" />
                          )}
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">Qtd: {item.quantity}</p>
                          </div>
                        </div>
                        <p>R$ {(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {parseShippingAddress(selectedOrder.shipping_address) && (
                  <div>
                    <h3 className="font-semibold mb-2">Endereço de Entrega</h3>
                    {(() => {
                      const addr = parseShippingAddress(selectedOrder.shipping_address)!;
                      return (
                        <div className="text-sm">
                          <p>{addr.street}, {addr.number}{addr.complement ? `, ${addr.complement}` : ''}</p>
                          <p>{addr.neighborhood} - {addr.city}/{addr.state}</p>
                          <p>CEP: {addr.cep}</p>
                        </div>
                      );
                    })()}
                  </div>
                )}

                <div className="border-t pt-4">
                  <div className="flex justify-between">
                    <span>Frete:</span>
                    <span>R$ {(selectedOrder.shipping_price || 0).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>R$ {selectedOrder.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
