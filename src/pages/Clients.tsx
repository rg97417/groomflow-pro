import React, { useState } from 'react';
import { User, Phone, Mail, Calendar, Scissors, Search, Plus, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Client {
  id: string;
  name: string;
  phone: string;
  email: string;
  avatar?: string;
  lastVisit: string;
  totalVisits: number;
  totalSpent: number;
  favoriteService: string;
  favoriteBarber: string;
  frequency: 'weekly' | 'monthly' | 'occasional';
  preferences: string[];
  status: 'active' | 'inactive' | 'vip';
}

const mockClients: Client[] = [
  {
    id: '1',
    name: 'João Silva',
    phone: '(11) 99999-9999',
    email: 'joao@email.com',
    lastVisit: '2024-01-10',
    totalVisits: 24,
    totalSpent: 1080.00,
    favoriteService: 'Corte + Barba',
    favoriteBarber: 'Carlos Santos',
    frequency: 'monthly',
    preferences: ['Degradê baixo', 'Barba aparada'],
    status: 'vip'
  },
  {
    id: '2',
    name: 'Pedro Oliveira',
    phone: '(11) 88888-8888',
    email: 'pedro@email.com',
    lastVisit: '2024-01-08',
    totalVisits: 12,
    totalSpent: 300.00,
    favoriteService: 'Corte Masculino',
    favoriteBarber: 'Ricardo Lima',
    frequency: 'monthly',
    preferences: ['Corte social'],
    status: 'active'
  },
  {
    id: '3',
    name: 'André Costa',
    phone: '(11) 77777-7777',
    email: 'andre@email.com',
    lastVisit: '2023-12-15',
    totalVisits: 3,
    totalSpent: 75.00,
    favoriteService: 'Barba Completa',
    favoriteBarber: 'Carlos Santos',
    frequency: 'occasional',
    preferences: ['Barba desenhada'],
    status: 'inactive'
  }
];

const statusColors = {
  active: 'bg-success text-success-foreground',
  inactive: 'bg-muted text-muted-foreground',
  vip: 'bg-secondary text-secondary-foreground'
};

const statusLabels = {
  active: 'Ativo',
  inactive: 'Inativo',
  vip: 'VIP'
};

const frequencyColors = {
  weekly: 'bg-primary text-primary-foreground',
  monthly: 'bg-success text-success-foreground',
  occasional: 'bg-warning text-warning-foreground'
};

const frequencyLabels = {
  weekly: 'Semanal',
  monthly: 'Mensal',
  occasional: 'Ocasional'
};

export default function Clients() {
  const [clients] = useState<Client[]>(mockClients);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.phone.includes(searchTerm) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const clientStats = {
    total: clients.length,
    active: clients.filter(c => c.status === 'active').length,
    vip: clients.filter(c => c.status === 'vip').length,
    totalRevenue: clients.reduce((sum, c) => sum + c.totalSpent, 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Clientes</h1>
          <p className="text-muted-foreground">Gerencie os clientes da barbearia</p>
        </div>
        <Button className="btn-gold flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Novo Cliente
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="card-elegant">
          <CardContent className="flex items-center p-6">
            <User className="h-8 w-8 text-primary" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Total de Clientes</p>
              <p className="text-2xl font-bold text-foreground">{clientStats.total}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="card-elegant">
          <CardContent className="flex items-center p-6">
            <div className="h-8 w-8 rounded-full bg-success flex items-center justify-center">
              <User className="h-4 w-4 text-success-foreground" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Clientes Ativos</p>
              <p className="text-2xl font-bold text-foreground">{clientStats.active}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="card-elegant">
          <CardContent className="flex items-center p-6">
            <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
              <span className="text-sm font-bold text-secondary-foreground">VIP</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Clientes VIP</p>
              <p className="text-2xl font-bold text-foreground">{clientStats.vip}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="card-elegant">
          <CardContent className="flex items-center p-6">
            <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
              <span className="text-sm font-bold text-secondary-foreground">R$</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Receita Total</p>
              <p className="text-2xl font-bold text-foreground">R$ {clientStats.totalRevenue.toFixed(2)}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="card-elegant">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Buscar por nome, telefone ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-border rounded-md bg-background text-foreground"
            >
              <option value="all">Todos os Status</option>
              <option value="active">Ativo</option>
              <option value="inactive">Inativo</option>
              <option value="vip">VIP</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClients.map((client) => (
          <Card key={client.id} className="card-elegant hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={client.avatar} alt={client.name} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {client.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{client.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {client.totalVisits} visitas
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <Badge className={statusColors[client.status]}>
                    {statusLabels[client.status]}
                  </Badge>
                  <Badge className={frequencyColors[client.frequency]} variant="outline">
                    {frequencyLabels[client.frequency]}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Contact Info */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">{client.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">{client.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">Última visita: {new Date(client.lastVisit).toLocaleDateString()}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="bg-muted/50 rounded-lg p-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">Total Gasto</span>
                  <span className="font-semibold text-foreground">R$ {client.totalSpent.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Ticket Médio</span>
                  <span className="font-semibold text-secondary">R$ {(client.totalSpent / client.totalVisits).toFixed(2)}</span>
                </div>
              </div>

              {/* Preferences */}
              <div>
                <p className="text-sm font-medium text-foreground mb-2">Favoritos</p>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-2">
                    <Scissors className="h-3 w-3 text-muted-foreground" />
                    <span className="text-foreground">{client.favoriteService}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-3 w-3 text-muted-foreground" />
                    <span className="text-foreground">{client.favoriteBarber}</span>
                  </div>
                </div>
              </div>

              {/* Preferences Tags */}
              <div>
                <p className="text-sm font-medium text-foreground mb-2">Preferências</p>
                <div className="flex flex-wrap gap-1">
                  {client.preferences.map((preference, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {preference}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4">
                <Button variant="outline" size="sm" className="flex-1">
                  Agendar
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Histórico
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}