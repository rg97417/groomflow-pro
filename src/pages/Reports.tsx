import React, { useState } from 'react';
import { BarChart3, TrendingUp, Users, Scissors, Calendar, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ServiceReport {
  service: string;
  quantity: number;
  revenue: number;
  growth: number;
}

interface BarberReport {
  name: string;
  appointments: number;
  revenue: number;
  commission: number;
  rating: number;
}

const mockServiceReports: ServiceReport[] = [
  { service: 'Corte Masculino', quantity: 45, revenue: 1125.00, growth: 12.5 },
  { service: 'Corte + Barba', quantity: 28, revenue: 1260.00, growth: 8.3 },
  { service: 'Barba Completa', quantity: 18, revenue: 360.00, growth: -5.2 },
  { service: 'Degradê', quantity: 22, revenue: 660.00, growth: 15.7 }
];

const mockBarberReports: BarberReport[] = [
  { name: 'Carlos Santos', appointments: 32, revenue: 1440.00, commission: 864.00, rating: 4.9 },
  { name: 'Ricardo Lima', appointments: 28, revenue: 1200.00, commission: 600.00, rating: 4.7 },
  { name: 'André Costa', appointments: 21, revenue: 840.00, commission: 336.00, rating: 4.5 }
];

export default function Reports() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const totalRevenue = mockServiceReports.reduce((sum, service) => sum + service.revenue, 0);
  const totalAppointments = mockServiceReports.reduce((sum, service) => sum + service.quantity, 0);
  const averageTicket = totalRevenue / totalAppointments;

  const bestPerformingService = mockServiceReports.reduce((best, current) => 
    current.revenue > best.revenue ? current : best
  );

  const bestPerformingBarber = mockBarberReports.reduce((best, current) => 
    current.revenue > best.revenue ? current : best
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Relatórios</h1>
          <p className="text-muted-foreground">Análise de desempenho da barbearia</p>
        </div>
        <Button className="btn-gold flex items-center gap-2">
          <Download className="h-4 w-4" />
          Exportar Relatórios
        </Button>
      </div>

      {/* Period Selector */}
      <Card className="card-elegant">
        <CardContent className="p-4">
          <div className="flex gap-2">
            {[
              { key: 'week', label: 'Esta Semana' },
              { key: 'month', label: 'Este Mês' },
              { key: 'quarter', label: 'Trimestre' },
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

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="card-elegant">
          <CardContent className="flex items-center p-6">
            <BarChart3 className="h-8 w-8 text-primary" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Faturamento Total</p>
              <p className="text-2xl font-bold text-foreground">R$ {totalRevenue.toFixed(2)}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="card-elegant">
          <CardContent className="flex items-center p-6">
            <Scissors className="h-8 w-8 text-success" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Total de Serviços</p>
              <p className="text-2xl font-bold text-foreground">{totalAppointments}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="card-elegant">
          <CardContent className="flex items-center p-6">
            <TrendingUp className="h-8 w-8 text-secondary" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Ticket Médio</p>
              <p className="text-2xl font-bold text-foreground">R$ {averageTicket.toFixed(2)}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="card-elegant">
          <CardContent className="flex items-center p-6">
            <Users className="h-8 w-8 text-primary" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Clientes Únicos</p>
              <p className="text-2xl font-bold text-foreground">68</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Performers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="card-premium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Scissors className="h-5 w-5 text-secondary" />
              Melhor Serviço do Período
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <div>
                <h3 className="text-2xl font-bold text-foreground">{bestPerformingService.service}</h3>
                <p className="text-muted-foreground">Serviço mais rentável</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-xl font-bold text-secondary">R$ {bestPerformingService.revenue.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground">Receita</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-secondary">{bestPerformingService.quantity}</p>
                  <p className="text-sm text-muted-foreground">Quantidade</p>
                </div>
              </div>
              <Badge className="bg-success text-success-foreground">
                +{bestPerformingService.growth.toFixed(1)}% vs período anterior
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="card-premium">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-secondary" />
              Melhor Barbeiro do Período
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <div>
                <h3 className="text-2xl font-bold text-foreground">{bestPerformingBarber.name}</h3>
                <p className="text-muted-foreground">Maior faturamento</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-xl font-bold text-secondary">R$ {bestPerformingBarber.revenue.toFixed(2)}</p>
                  <p className="text-sm text-muted-foreground">Receita</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-secondary">{bestPerformingBarber.appointments}</p>
                  <p className="text-sm text-muted-foreground">Atendimentos</p>
                </div>
              </div>
              <Badge className="bg-secondary text-secondary-foreground">
                ⭐ {bestPerformingBarber.rating} de avaliação
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Services Performance */}
      <Card className="card-elegant">
        <CardHeader>
          <CardTitle>Desempenho dos Serviços</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockServiceReports.map((service, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{service.service}</h3>
                    <p className="text-sm text-muted-foreground">{service.quantity} serviços realizados</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-bold text-foreground">R$ {service.revenue.toFixed(2)}</p>
                    <div className="flex items-center gap-1">
                      <Badge 
                        className={service.growth >= 0 ? 'bg-success text-success-foreground' : 'bg-destructive text-destructive-foreground'}
                      >
                        {service.growth >= 0 ? '+' : ''}{service.growth.toFixed(1)}%
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Barber Performance */}
      <Card className="card-elegant">
        <CardHeader>
          <CardTitle>Desempenho dos Barbeiros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockBarberReports.map((barber, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center">
                    <span className="text-secondary font-bold">{barber.name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{barber.name}</h3>
                    <p className="text-sm text-muted-foreground">{barber.appointments} atendimentos</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <p className="font-bold text-foreground">R$ {barber.revenue.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">Receita</p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-secondary">R$ {barber.commission.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">Comissão</p>
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-primary">{barber.rating}</p>
                    <p className="text-xs text-muted-foreground">Avaliação</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}