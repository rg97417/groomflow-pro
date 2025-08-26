import { useState } from 'react';
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Search, 
  Phone, 
  Mail, 
  Calendar,
  MoreHorizontal,
  Users,
  Filter,
  User
} from "lucide-react";
import { AddClientDialog } from "@/components/clients/AddClientDialog";
import { useClients } from "@/hooks/useClients";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const Clients = () => {
  const { clients, isLoading } = useClients();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.phone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const clientStats = {
    total: clients.length,
    withPhone: clients.filter(c => c.phone).length,
    withEmail: clients.filter(c => c.email).length,
    totalVisits: clients.reduce((sum, c) => sum + c.total_visits, 0)
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Clientes</h1>
          </div>
          <div className="text-center py-8">
            <p>Carregando clientes...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Clientes</h1>
            <p className="text-muted-foreground">
              Gerencie seus clientes e histórico de atendimentos
            </p>
          </div>
          <AddClientDialog />
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-4">
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
              <Phone className="h-8 w-8 text-success" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Com Telefone</p>
                <p className="text-2xl font-bold text-foreground">{clientStats.withPhone}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="card-elegant">
            <CardContent className="flex items-center p-6">
              <Mail className="h-8 w-8 text-secondary" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Com Email</p>
                <p className="text-2xl font-bold text-foreground">{clientStats.withEmail}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="card-elegant">
            <CardContent className="flex items-center p-6">
              <Calendar className="h-8 w-8 text-warning" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">Total de Visitas</p>
                <p className="text-2xl font-bold text-foreground">{clientStats.totalVisits}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card className="card-elegant">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Buscar Clientes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Buscar por nome, telefone ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Clients Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredClients.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                {clients.length === 0 ? 'Nenhum cliente cadastrado' : 'Nenhum cliente encontrado'}
              </h3>
              <p className="text-muted-foreground mb-4">
                {clients.length === 0 
                  ? 'Comece adicionando seu primeiro cliente'
                  : 'Tente ajustar os filtros de busca'
                }
              </p>
              {clients.length === 0 && <AddClientDialog />}
            </div>
          ) : (
            filteredClients.map((client) => (
              <Card key={client.id} className="card-elegant hover-lift">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {client.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{client.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {client.total_visits} visita{client.total_visits !== 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    {client.phone && (
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{client.phone}</span>
                      </div>
                    )}
                    {client.email && (
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span>{client.email}</span>
                      </div>
                    )}
                    {client.birth_date && (
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>Nascimento: {format(new Date(client.birth_date), "dd/MM/yyyy", { locale: ptBR })}</span>
                      </div>
                    )}
                  </div>
                  
                  {client.notes && (
                    <div className="mt-4 p-3 bg-muted/30 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Observações:</p>
                      <p className="text-sm">{client.notes}</p>
                    </div>
                  )}
                  
                  {client.last_visit && (
                    <div className="mt-4 pt-4 border-t">
                      <p className="text-xs text-muted-foreground">
                        Última visita: {format(new Date(client.last_visit), "dd/MM/yyyy", { locale: ptBR })}
                      </p>
                    </div>
                  )}

                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm" className="flex-1">
                      Agendar
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      Histórico
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Clients;