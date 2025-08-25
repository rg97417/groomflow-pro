import React, { useState } from 'react';
import { Calendar, Clock, User, Phone, Scissors, Plus, Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface Appointment {
  id: string;
  clientName: string;
  clientPhone: string;
  service: string;
  barber: string;
  date: string;
  time: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  price: number;
}

const mockAppointments: Appointment[] = [
  {
    id: '1',
    clientName: 'João Silva',
    clientPhone: '(11) 99999-9999',
    service: 'Corte + Barba',
    barber: 'Carlos Santos',
    date: '2024-01-15',
    time: '14:00',
    status: 'confirmed',
    price: 45.00
  },
  {
    id: '2',
    clientName: 'Pedro Oliveira',
    clientPhone: '(11) 88888-8888',
    service: 'Corte Masculino',
    barber: 'Ricardo Lima',
    date: '2024-01-15',
    time: '15:30',
    status: 'pending',
    price: 25.00
  },
  {
    id: '3',
    clientName: 'André Costa',
    clientPhone: '(11) 77777-7777',
    service: 'Barba Completa',
    barber: 'Carlos Santos',
    date: '2024-01-15',
    time: '16:00',
    status: 'completed',
    price: 20.00
  }
];

const statusColors = {
  confirmed: 'bg-success text-success-foreground',
  pending: 'bg-warning text-warning-foreground', 
  completed: 'bg-primary text-primary-foreground',
  cancelled: 'bg-destructive text-destructive-foreground'
};

const statusLabels = {
  confirmed: 'Confirmado',
  pending: 'Pendente',
  completed: 'Concluído',
  cancelled: 'Cancelado'
};

export default function Appointments() {
  const [appointments] = useState<Appointment[]>(mockAppointments);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.barber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || appointment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const todayStats = {
    total: appointments.length,
    confirmed: appointments.filter(a => a.status === 'confirmed').length,
    completed: appointments.filter(a => a.status === 'completed').length,
    revenue: appointments.filter(a => a.status === 'completed').reduce((sum, a) => sum + a.price, 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Agendamentos</h1>
          <p className="text-muted-foreground">Gerencie os agendamentos da barbearia</p>
        </div>
        <Button className="btn-gold flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Novo Agendamento
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="card-elegant">
          <CardContent className="flex items-center p-6">
            <Calendar className="h-8 w-8 text-primary" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Total Hoje</p>
              <p className="text-2xl font-bold text-foreground">{todayStats.total}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="card-elegant">
          <CardContent className="flex items-center p-6">
            <Clock className="h-8 w-8 text-success" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Confirmados</p>
              <p className="text-2xl font-bold text-foreground">{todayStats.confirmed}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="card-elegant">
          <CardContent className="flex items-center p-6">
            <Scissors className="h-8 w-8 text-primary" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Concluídos</p>
              <p className="text-2xl font-bold text-foreground">{todayStats.completed}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="card-elegant">
          <CardContent className="flex items-center p-6">
            <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
              <span className="text-sm font-bold text-secondary-foreground">R$</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Faturamento</p>
              <p className="text-2xl font-bold text-foreground">R$ {todayStats.revenue.toFixed(2)}</p>
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
                placeholder="Buscar por cliente, serviço ou barbeiro..."
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
              <option value="pending">Pendente</option>
              <option value="confirmed">Confirmado</option> 
              <option value="completed">Concluído</option>
              <option value="cancelled">Cancelado</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Appointments List */}
      <Card className="card-elegant">
        <CardHeader>
          <CardTitle>Agendamentos de Hoje</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredAppointments.map((appointment) => (
              <div key={appointment.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{appointment.clientName}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Phone className="h-3 w-3" />
                        {appointment.clientPhone}
                      </span>
                      <span className="flex items-center gap-1">
                        <Scissors className="h-3 w-3" />
                        {appointment.service}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {appointment.barber}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-semibold text-foreground">{appointment.time}</p>
                    <p className="text-sm text-muted-foreground">R$ {appointment.price.toFixed(2)}</p>
                  </div>
                  <Badge className={statusColors[appointment.status]}>
                    {statusLabels[appointment.status]}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}