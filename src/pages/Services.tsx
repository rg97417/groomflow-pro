import { Plus, Search, Filter } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { ServiceCard } from "@/components/services/ServiceCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const servicesData = [
  {
    id: "1",
    name: "Corte Tradicional",
    description: "Corte clássico com máquina e tesoura, finalizado com gel modelador",
    price: 35,
    duration: 30,
    category: "corte" as const,
    popular: true
  },
  {
    id: "2", 
    name: "Corte + Barba",
    description: "Corte moderno + barba bem feita e aparada com navalha",
    price: 55,
    duration: 45,
    category: "combo" as const,
    popular: true
  },
  {
    id: "3",
    name: "Barba Completa",
    description: "Barba aparada e modelada com navalha, incluindo hidratação",
    price: 25,
    duration: 20,
    category: "barba" as const
  },
  {
    id: "4",
    name: "Combo Premium", 
    description: "Corte + Barba + Sobrancelha + Tratamento facial básico",
    price: 80,
    duration: 60,
    category: "combo" as const
  },
  {
    id: "5",
    name: "Corte Infantil",
    description: "Corte especial para crianças até 12 anos",
    price: 25,
    duration: 25,
    category: "corte" as const
  },
  {
    id: "6",
    name: "Barba + Bigode",
    description: "Aparação e modelagem de barba e bigode com navalha",
    price: 30,
    duration: 25,
    category: "barba" as const
  }
];

export default function Services() {
  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Serviços</h1>
            <p className="text-muted-foreground">
              Gerencie os serviços oferecidos pela sua barbearia
            </p>
          </div>
          
          <Button className="btn-primary gap-2">
            <Plus className="h-4 w-4" />
            Novo Serviço
          </Button>
        </div>

        {/* Filters & Search */}
        <Card className="card-elegant">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Buscar serviços..." 
                  className="pl-10"
                />
              </div>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filtrar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Services Stats */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="card-elegant">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total de Serviços
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{servicesData.length}</div>
              <p className="text-xs text-muted-foreground">Serviços ativos</p>
            </CardContent>
          </Card>
          
          <Card className="card-elegant">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Preço Médio
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                R$ {Math.round(servicesData.reduce((acc, service) => acc + service.price, 0) / servicesData.length)}
              </div>
              <p className="text-xs text-muted-foreground">Por serviço</p>
            </CardContent>
          </Card>

          <Card className="card-elegant">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Duração Média
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(servicesData.reduce((acc, service) => acc + service.duration, 0) / servicesData.length)}min
              </div>
              <p className="text-xs text-muted-foreground">Por atendimento</p>
            </CardContent>
          </Card>
        </div>

        {/* Services Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {servicesData.map((service) => (
            <ServiceCard key={service.id} {...service} />
          ))}
        </div>
      </div>
    </Layout>
  );
}