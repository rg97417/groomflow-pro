import React, { useState } from 'react';
import { DollarSign, TrendingUp, TrendingDown, Calendar, CreditCard, Banknote, PieChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Transaction {
  id: string;
  type: 'income' | 'expense';
  description: string;
  amount: number;
  category: string;
  paymentMethod: 'cash' | 'card' | 'pix';
  date: string;
  time: string;
}

const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'income',
    description: 'Corte + Barba - João Silva',
    amount: 45.00,
    category: 'Serviços',
    paymentMethod: 'pix',
    date: '2024-01-15',
    time: '14:30'
  },
  {
    id: '2',
    type: 'income',
    description: 'Corte Masculino - Pedro Oliveira',
    amount: 25.00,
    category: 'Serviços',
    paymentMethod: 'card',
    date: '2024-01-15',
    time: '15:00'
  },
  {
    id: '3',
    type: 'expense',
    description: 'Produtos para cabelo',
    amount: 150.00,
    category: 'Produtos',
    paymentMethod: 'card',
    date: '2024-01-15',
    time: '10:00'
  },
  {
    id: '4',
    type: 'expense',
    description: 'Energia elétrica',
    amount: 280.00,
    category: 'Contas',
    paymentMethod: 'card',
    date: '2024-01-14',
    time: '16:00'
  }
];

const paymentMethodIcons = {
  cash: Banknote,
  card: CreditCard,
  pix: DollarSign
};

const paymentMethodLabels = {
  cash: 'Dinheiro',
  card: 'Cartão',
  pix: 'PIX'
};

const categoryColors = {
  'Serviços': 'bg-success text-success-foreground',
  'Produtos': 'bg-warning text-warning-foreground',
  'Contas': 'bg-destructive text-destructive-foreground',
  'Outros': 'bg-muted text-muted-foreground'
};

export default function Financial() {
  const [transactions] = useState<Transaction[]>(mockTransactions);
  const [selectedPeriod, setSelectedPeriod] = useState('today');

  const todayIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const todayExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const profit = todayIncome - todayExpenses;

  const paymentMethodStats = {
    pix: transactions.filter(t => t.paymentMethod === 'pix' && t.type === 'income').reduce((sum, t) => sum + t.amount, 0),
    card: transactions.filter(t => t.paymentMethod === 'card' && t.type === 'income').reduce((sum, t) => sum + t.amount, 0),
    cash: transactions.filter(t => t.paymentMethod === 'cash' && t.type === 'income').reduce((sum, t) => sum + t.amount, 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Financeiro</h1>
          <p className="text-muted-foreground">Controle financeiro da barbearia</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            Adicionar Receita
          </Button>
          <Button className="btn-gold">
            Fechar Caixa
          </Button>
        </div>
      </div>

      {/* Period Selector */}
      <Card className="card-elegant">
        <CardContent className="p-4">
          <div className="flex gap-2">
            {[
              { key: 'today', label: 'Hoje' },
              { key: 'week', label: 'Esta Semana' },
              { key: 'month', label: 'Este Mês' },
              { key: 'year', label: 'Este Ano' }
            ].map((period) => (
              <Button
                key={period.key}
                variant={selectedPeriod === period.key ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedPeriod(period.key)}
              >
                {period.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Financial Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="card-elegant">
          <CardContent className="flex items-center p-6">
            <TrendingUp className="h-8 w-8 text-success" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Receitas Hoje</p>
              <p className="text-2xl font-bold text-foreground">R$ {todayIncome.toFixed(2)}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="card-elegant">
          <CardContent className="flex items-center p-6">
            <TrendingDown className="h-8 w-8 text-destructive" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Despesas Hoje</p>
              <p className="text-2xl font-bold text-foreground">R$ {todayExpenses.toFixed(2)}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="card-elegant">
          <CardContent className="flex items-center p-6">
            <DollarSign className={`h-8 w-8 ${profit >= 0 ? 'text-success' : 'text-destructive'}`} />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Lucro Hoje</p>
              <p className={`text-2xl font-bold ${profit >= 0 ? 'text-success' : 'text-destructive'}`}>
                R$ {profit.toFixed(2)}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="card-elegant">
          <CardContent className="flex items-center p-6">
            <PieChart className="h-8 w-8 text-primary" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Margem</p>
              <p className="text-2xl font-bold text-foreground">
                {todayIncome > 0 ? ((profit / todayIncome) * 100).toFixed(1) : '0.0'}%
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Methods */}
      <Card className="card-elegant">
        <CardHeader>
          <CardTitle>Formas de Pagamento - Hoje</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(paymentMethodStats).map(([method, amount]) => {
              const Icon = paymentMethodIcons[method as keyof typeof paymentMethodIcons];
              return (
                <div key={method} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Icon className="h-6 w-6 text-primary" />
                    <span className="font-medium text-foreground">
                      {paymentMethodLabels[method as keyof typeof paymentMethodLabels]}
                    </span>
                  </div>
                  <span className="font-bold text-foreground">R$ {amount.toFixed(2)}</span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card className="card-elegant">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Transações Recentes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.map((transaction) => {
              const Icon = paymentMethodIcons[transaction.paymentMethod];
              return (
                <div key={transaction.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                      transaction.type === 'income' ? 'bg-success/10' : 'bg-destructive/10'
                    }`}>
                      {transaction.type === 'income' ? (
                        <TrendingUp className={`h-5 w-5 text-success`} />
                      ) : (
                        <TrendingDown className={`h-5 w-5 text-destructive`} />
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">{transaction.description}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{transaction.time}</span>
                        <div className="flex items-center gap-1">
                          <Icon className="h-3 w-3" />
                          {paymentMethodLabels[transaction.paymentMethod]}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge className={categoryColors[transaction.category] || categoryColors['Outros']}>
                      {transaction.category}
                    </Badge>
                    <span className={`font-bold text-lg ${
                      transaction.type === 'income' ? 'text-success' : 'text-destructive'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}R$ {transaction.amount.toFixed(2)}
                    </span>
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