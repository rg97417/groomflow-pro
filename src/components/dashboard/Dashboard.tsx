import { Calendar, DollarSign, Users, Scissors, TrendingUp, Clock } from "lucide-react";
import { StatsCard } from "./StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const statsData = [
  {
    title: "Agendamentos Hoje",
    value: 12,
    change: "+3 desde ontem",
    changeType: "positive" as const,
    icon: Calendar,
    color: "primary" as const
  },
  {
    title: "Faturamento Hoje", 
    value: "R$ 1.280",
    change: "+15% desde ontem",
    changeType: "positive" as const,
    icon: DollarSign,
    color: "success" as const
  },
  {
    title: "Clientes Ativos",
    value: 324,
    change: "+8 este mês",
    changeType: "positive" as const,
    icon: Users,
    color: "secondary" as const
  },
  {
    title: "Serviços Realizados",
    value: 45,
    change: "Hoje",
    changeType: "neutral" as const,
    icon: Scissors,
    color: "warning" as const
  }
];

const recentAppointments = [
  { time: "09:00", client: "João Silva", service: "Corte + Barba", barber: "Carlos", status: "confirmed" },
  { time: "09:30", client: "Pedro Santos", service: "Corte Simples", barber: "André", status: "confirmed" },
  { time: "10:00", client: "Lucas Costa", service: "Barba", barber: "Carlos", status: "waiting" },
  { time: "10:30", client: "Rafael Lima", service: "Combo Premium", barber: "André", status: "in-progress" },
  { time: "11:00", client: "Bruno Alves", service: "Corte + Barba", barber: "Carlos", status: "confirmed" }
];

const topServices = [
  { name: "Corte + Barba", count: 45, revenue: "R$ 2.250", growth: "+12%" },
  { name: "Corte Simples", count: 32, revenue: "R$ 960", growth: "+8%" },
  { name: "Barba", count: 28, revenue: "R$ 700", growth: "+15%" },
  { name: "Combo Premium", count: 18, revenue: "R$ 1.440", growth: "+22%" }
];

export function Dashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Acompanhe o desempenho da sua barbearia em tempo real
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Calendar className="h-4 w-4" />
            Hoje
          </Button>
          <Button className="btn-primary gap-2">
            <Clock className="h-4 w-4" />
            Novo Agendamento
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statsData.map((stat, index) => (
          <StatsCard
            key={stat.title}
            {...stat}
            className="animate-slide-in"
          />
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Appointments */}
        <Card className="card-elegant">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">Agendamentos de Hoje</CardTitle>
            <Button variant="ghost" size="sm">Ver todos</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAppointments.map((appointment, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{appointment.client}</p>
                      <p className="text-sm text-muted-foreground">
                        {appointment.service} • {appointment.barber}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-semibold">{appointment.time}</p>
                    <div className={`text-xs px-2 py-1 rounded-full ${
                      appointment.status === 'confirmed' ? 'bg-success/20 text-success' :
                      appointment.status === 'waiting' ? 'bg-warning/20 text-warning' :
                      appointment.status === 'in-progress' ? 'bg-primary/20 text-primary' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {appointment.status === 'confirmed' ? 'Confirmado' :
                       appointment.status === 'waiting' ? 'Aguardando' :
                       appointment.status === 'in-progress' ? 'Em andamento' : 'Concluído'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Services */}
        <Card className="card-elegant">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">Serviços Mais Vendidos</CardTitle>
            <Button variant="ghost" size="sm">Ver relatório</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topServices.map((service, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                      <Scissors className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <p className="font-medium">{service.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {service.count} serviços • {service.revenue}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-success" />
                    <span className="text-success font-medium">{service.growth}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="card-premium">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Ações Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Button className="btn-primary h-auto p-4 flex-col gap-2">
              <Calendar className="h-6 w-6" />
              <span>Novo Agendamento</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col gap-2">
              <Users className="h-6 w-6" />
              <span>Cadastrar Cliente</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex-col gap-2">
              <Scissors className="h-6 w-6" />
              <span>Adicionar Serviço</span>
            </Button>
            <Button className="btn-gold h-auto p-4 flex-col gap-2">
              <DollarSign className="h-6 w-6" />
              <span>Registrar Pagamento</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}