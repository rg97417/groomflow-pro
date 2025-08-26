import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Scissors, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { FaGoogle } from 'react-icons/fa';

export function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [resetMode, setResetMode] = useState(false);
  
  const { signIn, signUp, signInWithGoogle, resetPassword } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (resetMode) {
        await resetPassword(email);
        setResetMode(false);
      } else if (isLogin) {
        const { error } = await signIn(email, password);
        if (!error) {
          navigate('/');
        }
      } else {
        const { error } = await signUp(email, password, fullName);
        if (!error) {
          setIsLogin(true);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signInWithGoogle();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-4 shadow-elegant">
            <Scissors className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold">BarberShop Pro</h1>
          <p className="text-muted-foreground">Sistema de Gestão Profissional</p>
        </div>

        <Card className="card-elegant shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">
              {resetMode ? 'Recuperar Senha' : isLogin ? 'Entrar' : 'Criar Conta'}
            </CardTitle>
            <CardDescription>
              {resetMode 
                ? 'Digite seu email para recuperar a senha'
                : isLogin 
                ? 'Entre na sua conta para continuar' 
                : 'Crie sua conta para começar'
              }
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && !resetMode && (
                <div className="space-y-2">
                  <Label htmlFor="fullName">Nome Completo</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="fullName"
                      placeholder="Seu nome completo"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {!resetMode && (
                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Sua senha"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1 h-8 w-8 px-0"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full btn-primary" 
                disabled={isLoading}
              >
                {isLoading ? 'Processando...' : resetMode ? 'Enviar Email' : isLogin ? 'Entrar' : 'Criar Conta'}
              </Button>
            </form>

            {!resetMode && (
              <>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">ou</span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full gap-2"
                  onClick={handleGoogleSignIn}
                  disabled={isLoading}
                >
                  <FaGoogle className="h-4 w-4" />
                  Continuar com Google
                </Button>
              </>
            )}

            <div className="space-y-2 text-center text-sm">
              {!resetMode && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {isLogin ? 'Não tem conta? Criar uma' : 'Já tem conta? Entrar'}
                </Button>
              )}
              
              {isLogin && !resetMode && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setResetMode(true)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Esqueceu a senha?
                </Button>
              )}

              {resetMode && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setResetMode(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Voltar ao login
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6 text-xs text-muted-foreground">
          <p>Ao continuar, você concorda com nossos Termos de Serviço.</p>
        </div>
      </div>
    </div>
  );
}