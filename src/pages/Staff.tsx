import React, { useState } from 'react';
import { User, Scissors, Calendar, DollarSign, Plus, Phone, Mail, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Staff {
  id: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  avatar?: string;
  status: 'active' | 'inactive' | 'vacation';
  commission: number;
  todayAppointments: number;
  monthlyRevenue: number;
  rating: number;
  specialties: string[];
}

const mockStaff: Staff[] = [
  {
    id: '1',
    name: 'Carlos Santos',
    role: 'Barbeiro Senior',
    phone: '(11) 99999-1111',
    email: 'carlos@barbearia.com',
    status: 'active',
    commission: 60,
    todayAppointments: 8,
    monthlyRevenue: 3200.00,
    rating: 4.9,
    specialties: ['Corte Masculino', 'Barba', 'Pigmentação']
  },
  {
    id: '2',
    name: 'Ricardo Lima',
    role: 'Barbeiro',
    phone: '(11) 99999-2222',
    email: 'ricardo@barbearia.com',
    status: 'active',
    commission: 50,
    todayAppointments: 6,
    monthlyRevenue: 2400.00,
    rating: 4.7,
    specialties: ['Corte Masculino', 'Degradê']
  },
  {
    id: '3',
    name: 'André Costa',
    role: 'Barbeiro Junior',
    phone: '(11) 99999-3333',
    email: 'andre@barbearia.com',
    status: 'active',
    commission: 40,
    todayAppointments: 4,
    monthlyRevenue: 1600.00,
    rating: 4.5,
    specialties: ['Corte Masculino']
  }
];

const statusColors = {
  active: 'bg-success text-success-foreground',
  inactive: 'bg-destructive text-destructive-foreground',
  vacation: 'bg-warning text-warning-foreground'
};

const statusLabels = {
  active: 'Ativo',
  inactive: 'Inativo',
  vacation: 'Férias'
};

export default function Staff() {
  const [staff] = useState<Staff[]>(mockStaff);

  const totalStats = {
    activeStaff: staff.filter(s => s.status === 'active').length,
    totalAppointments: staff.reduce((sum, s) => sum + s.todayAppointments, 0),
    totalRevenue: staff.reduce((sum, s) => sum + s.monthlyRevenue, 0),
    averageRating: staff.reduce((sum, s) => sum + s.rating, 0) / staff.length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Funcionários</h1>
          <p className="text-muted-foreground">Gerencie a equipe da barbearia</p>
        </div>
        <Button className="btn-gold flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Adicionar Funcionário
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="card-elegant">
          <CardContent className="flex items-center p-6">
            <User className="h-8 w-8 text-primary" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Funcionários Ativos</p>
              <p className="text-2xl font-bold text-foreground">{totalStats.activeStaff}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="card-elegant">
          <CardContent className="flex items-center p-6">
            <Scissors className="h-8 w-8 text-success" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Atendimentos Hoje</p>
              <p className="text-2xl font-bold text-foreground">{totalStats.totalAppointments}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="card-elegant">
          <CardContent className="flex items-center p-6">
            <DollarSign className="h-8 w-8 text-secondary" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Receita Mensal</p>
              <p className="text-2xl font-bold text-foreground">R$ {totalStats.totalRevenue.toFixed(2)}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="card-elegant">
          <CardContent className="flex items-center p-6">
            <TrendingUp className="h-8 w-8 text-primary" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Avaliação Média</p>
              <p className="text-2xl font-bold text-foreground">{totalStats.averageRating.toFixed(1)}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {staff.map((member) => (
          <Card key={member.id} className="card-elegant hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Avatar className="w-20 h-20 mx-auto mb-4">
                <AvatarImage src={member.avatar} alt={member.name} />
                <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="text-xl">{member.name}</CardTitle>
              <p className="text-muted-foreground">{member.role}</p>
              <Badge className={statusColors[member.status]}>
                {statusLabels[member.status]}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Contact Info */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">{member.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">{member.email}</span>
                </div>
              </div>

              {/* Performance Stats */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">{member.todayAppointments}</p>
                  <p className="text-xs text-muted-foreground">Hoje</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">{member.rating}</p>
                  <p className="text-xs text-muted-foreground">Avaliação</p>
                </div>
              </div>

              {/* Revenue & Commission */}
              <div className="bg-muted/50 rounded-lg p-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">Receita Mensal</span>
                  <span className="font-semibold text-foreground">R$ {member.monthlyRevenue.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Comissão</span>
                  <span className="font-semibold text-secondary">{member.commission}%</span>
                </div>
              </div>

              {/* Specialties */}
              <div>
                <p className="text-sm font-medium text-foreground mb-2">Especialidades</p>
                <div className="flex flex-wrap gap-1">
                  {member.specialties.map((specialty, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4">
                <Button variant="outline" size="sm" className="flex-1">
                  Agenda
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Editar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}