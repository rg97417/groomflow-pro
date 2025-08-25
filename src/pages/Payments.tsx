import React, { useState } from 'react';
import { CreditCard, Smartphone, Banknote, Link, QrCode, Plus, Check, Clock, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

interface PaymentLink {
  id: string;
  description: string;
  amount: number;
  clientName: string;
  status: 'pending' | 'paid' | 'expired';
  createdAt: string;
  expiresAt: string;
  paymentMethod?: 'pix' | 'card';
}

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  description: string;
  enabled: boolean;
  config: any;
}

const mockPaymentLinks: PaymentLink[] = [
  {
    id: '1',
    description: 'Corte + Barba - João Silva',
    amount: 45.00,
    clientName: 'João Silva',
    status: 'paid',
    createdAt: '2024-01-15T14:00:00',
    expiresAt: '2024-01-16T14:00:00',
    paymentMethod: 'pix'
  },
  {
    id: '2',
    description: 'Corte Masculino - Pedro Oliveira',
    amount: 25.00,
    clientName: 'Pedro Oliveira',
    status: 'pending',
    createdAt: '2024-01-15T15:00:00',
    expiresAt: '2024-01-16T15:00:00'
  },
  {
    id: '3',
    description: 'Barba Completa - André Costa',
    amount: 20.00,
    clientName: 'André Costa',
    status: 'expired',
    createdAt: '2024-01-14T16:00:00',
    expiresAt: '2024-01-15T16:00:00'
  }
];

const paymentMethods: PaymentMethod[] = [
  {
    id: 'pix',
    name: 'PIX',
    icon: Smartphone,
    description: 'Pagamentos instantâneos via PIX',
    enabled: true,
    config: { pixKey: '11999999999' }
  },
  {
    id: 'credit',
    name: 'Cartão de Crédito',
    icon: CreditCard,
    description: 'Visa, Mastercard, Elo',
    enabled: true,
    config: { fees: 3.99 }
  },
  {
    id: 'debit',
    name: 'Cartão de Débito',
    icon: CreditCard,
    description: 'Débito online',
    enabled: true,
    config: { fees: 1.99 }
  },
  {
    id: 'cash',
    name: 'Dinheiro',
    icon: Banknote,
    description: 'Pagamento presencial',
    enabled: true,
    config: {}
  }
];

const statusColors = {
  pending: 'bg-warning text-warning-foreground',
  paid: 'bg-success text-success-foreground',
  expired: 'bg-destructive text-destructive-foreground'
};

const statusLabels = {
  pending: 'Pendente',
  paid: 'Pago',
  expired: 'Expirado'
};

const statusIcons = {
  pending: Clock,
  paid: Check,
  expired: X
};

export default function Payments() {
  const [paymentLinks] = useState<PaymentLink[]>(mockPaymentLinks);
  const [showCreateLink, setShowCreateLink] = useState(false);
  const [newLinkAmount, setNewLinkAmount] = useState('');
  const [newLinkDescription, setNewLinkDescription] = useState('');

  const linkStats = {
    total: paymentLinks.length,
    pending: paymentLinks.filter(l => l.status === 'pending').length,
    paid: paymentLinks.filter(l => l.status === 'paid').length,
    totalValue: paymentLinks.filter(l => l.status === 'paid').reduce((sum, l) => sum + l.amount, 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Pagamentos</h1>
          <p className="text-muted-foreground">Gerencie formas de pagamento e links</p>
        </div>
        <Button 
          className="btn-gold flex items-center gap-2"
          onClick={() => setShowCreateLink(true)}
        >
          <Plus className="h-4 w-4" />
          Criar Link de Pagamento
        </Button>
      </div>

      {/* Payment Links Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="card-elegant">
          <CardContent className="flex items-center p-6">
            <Link className="h-8 w-8 text-primary" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Total de Links</p>
              <p className="text-2xl font-bold text-foreground">{linkStats.total}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="card-elegant">
          <CardContent className="flex items-center p-6">
            <Clock className="h-8 w-8 text-warning" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Pendentes</p>
              <p className="text-2xl font-bold text-foreground">{linkStats.pending}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="card-elegant">
          <CardContent className="flex items-center p-6">
            <Check className="h-8 w-8 text-success" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Pagos</p>
              <p className="text-2xl font-bold text-foreground">{linkStats.paid}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="card-elegant">
          <CardContent className="flex items-center p-6">
            <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
              <span className="text-sm font-bold text-secondary-foreground">R$</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Valor Recebido</p>
              <p className="text-2xl font-bold text-foreground">R$ {linkStats.totalValue.toFixed(2)}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Create Payment Link */}
      {showCreateLink && (
        <Card className="card-elegant border-secondary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5 text-secondary" />
              Criar Link de Pagamento
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Descrição do Serviço
                </label>
                <Input
                  placeholder="Ex: Corte + Barba - João Silva"
                  value={newLinkDescription}
                  onChange={(e) => setNewLinkDescription(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Valor (R$)
                </label>
                <Input
                  type="number"
                  placeholder="0,00"
                  value={newLinkAmount}
                  onChange={(e) => setNewLinkAmount(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button className="btn-gold">
                <QrCode className="h-4 w-4 mr-2" />
                Gerar Link PIX
              </Button>
              <Button variant="outline">
                <CreditCard className="h-4 w-4 mr-2" />
                Link Cartão
              </Button>
              <Button variant="outline" onClick={() => setShowCreateLink(false)}>
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Payment Methods */}
      <Card className="card-elegant">
        <CardHeader>
          <CardTitle>Formas de Pagamento Disponíveis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {paymentMethods.map((method) => {
              const Icon = method.icon;
              return (
                <div key={method.id} className="p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <Icon className="h-8 w-8 text-primary" />
                    <Badge className={method.enabled ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground'}>
                      {method.enabled ? 'Ativo' : 'Inativo'}
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{method.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{method.description}</p>
                  {method.config.fees && (
                    <p className="text-xs text-warning">Taxa: {method.config.fees}%</p>
                  )}
                  {method.config.pixKey && (
                    <p className="text-xs text-muted-foreground">Chave: {method.config.pixKey}</p>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Payment Links History */}
      <Card className="card-elegant">
        <CardHeader>
          <CardTitle>Histórico de Links de Pagamento</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {paymentLinks.map((link) => {
              const StatusIcon = statusIcons[link.status];
              return (
                <div key={link.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                      link.status === 'paid' ? 'bg-success/10' : 
                      link.status === 'pending' ? 'bg-warning/10' : 'bg-destructive/10'
                    }`}>
                      <StatusIcon className={`h-5 w-5 ${
                        link.status === 'paid' ? 'text-success' : 
                        link.status === 'pending' ? 'text-warning' : 'text-destructive'
                      }`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{link.description}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Cliente: {link.clientName}</span>
                        <span>Criado: {new Date(link.createdAt).toLocaleDateString()}</span>
                        {link.paymentMethod && (
                          <Badge variant="outline" className="text-xs">
                            {link.paymentMethod.toUpperCase()}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-bold text-foreground">R$ {link.amount.toFixed(2)}</p>
                      <Badge className={statusColors[link.status]}>
                        {statusLabels[link.status]}
                      </Badge>
                    </div>
                    {link.status === 'pending' && (
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <QrCode className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          Reenviar
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}