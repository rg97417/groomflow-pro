import { Scissors, Clock, DollarSign, Edit, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ServiceCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  category: "corte" | "barba" | "combo";
  image?: string;
  popular?: boolean;
}

export function ServiceCard({
  id,
  name,
  description,
  price,
  duration,
  category,
  popular = false
}: ServiceCardProps) {
  const categoryColors = {
    corte: "bg-primary/10 text-primary",
    barba: "bg-secondary/10 text-secondary",
    combo: "bg-success/10 text-success"
  };

  const categoryLabels = {
    corte: "Corte",
    barba: "Barba", 
    combo: "Combo"
  };

  return (
    <Card className="card-elegant hover:shadow-xl transition-all duration-300 group">
      {popular && (
        <div className="absolute -top-2 -right-2 z-10">
          <Badge className="bg-gradient-gold text-secondary-foreground shadow-lg">
            Popular
          </Badge>
        </div>
      )}
      
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-lg ${categoryColors[category]}`}>
              <Scissors className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">{name}</h3>
              <Badge variant="outline" className={categoryColors[category]}>
                {categoryLabels[category]}
              </Badge>
            </div>
          </div>
        </div>

        <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
          {description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-success" />
              <span className="font-bold text-lg">R$ {price}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">{duration}min</span>
            </div>
          </div>
        </div>

        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Button size="sm" variant="outline" className="flex-1">
            <Edit className="h-4 w-4 mr-2" />
            Editar
          </Button>
          <Button size="sm" variant="outline" className="text-destructive hover:text-destructive">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}