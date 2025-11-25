'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Footprints, MapPin, Clock, Flame, TrendingUp, ArrowLeft, Play, Pause, RotateCcw } from 'lucide-react';

interface Atividade {
  id: string;
  data: string;
  passos: number;
  distancia: number;
  calorias: number;
  tempo: number;
}

export default function ContadorPassosPage() {
  const router = useRouter();
  const [ativo, setAtivo] = useState(false);
  const [passos, setPassos] = useState(0);
  const [tempo, setTempo] = useState(0);
  const [historico, setHistorico] = useState<Atividade[]>([]);
  const [suporteAcelerometro, setSuporteAcelerometro] = useState(false);

  // Constantes para cálculos
  const PASSOS_POR_KM = 1250; // média de passos por km
  const CALORIAS_POR_PASSO = 0.04; // média de calorias por passo

  // Verificar suporte a sensores
  useEffect(() => {
    if (typeof window !== 'undefined' && 'DeviceMotionEvent' in window) {
      setSuporteAcelerometro(true);
    }
  }, []);

  // Timer
  useEffect(() => {
    let intervalo: NodeJS.Timeout;
    if (ativo) {
      intervalo = setInterval(() => {
        setTempo(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(intervalo);
  }, [ativo]);

  // Simulação de detecção de passos (em produção real, usaria acelerômetro)
  useEffect(() => {
    let intervalo: NodeJS.Timeout;
    if (ativo) {
      intervalo = setInterval(() => {
        // Simula detecção de passos (em app real, usaria dados do acelerômetro)
        const novosPassos = Math.floor(Math.random() * 3); // 0-2 passos por segundo
        setPassos(prev => prev + novosPassos);
      }, 1000);
    }
    return () => clearInterval(intervalo);
  }, [ativo]);

  const iniciarParar = () => {
    if (ativo) {
      // Parar e salvar atividade
      if (passos > 0) {
        const novaAtividade: Atividade = {
          id: Date.now().toString(),
          data: new Date().toLocaleString('pt-BR'),
          passos: passos,
          distancia: parseFloat((passos / PASSOS_POR_KM).toFixed(2)),
          calorias: Math.round(passos * CALORIAS_POR_PASSO),
          tempo: tempo
        };
        setHistorico([novaAtividade, ...historico]);
      }
    }
    setAtivo(!ativo);
  };

  const resetar = () => {
    setAtivo(false);
    setPassos(0);
    setTempo(0);
  };

  const formatarTempo = (segundos: number) => {
    const horas = Math.floor(segundos / 3600);
    const minutos = Math.floor((segundos % 3600) / 60);
    const segs = segundos % 60;
    return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segs.toString().padStart(2, '0')}`;
  };

  const distanciaAtual = (passos / PASSOS_POR_KM).toFixed(2);
  const caloriasAtuais = Math.round(passos * CALORIAS_POR_PASSO);

  // Estatísticas totais
  const totalPassos = historico.reduce((acc, ativ) => acc + ativ.passos, 0);
  const totalDistancia = historico.reduce((acc, ativ) => acc + ativ.distancia, 0);
  const totalCalorias = historico.reduce((acc, ativ) => acc + ativ.calorias, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
          <Button 
            onClick={() => router.push('/')}
            variant="outline"
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-4">
              <Footprints className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-800">Contador de Passos</h1>
              <p className="text-gray-600">Acompanhe sua atividade diária</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Contador Principal */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-2 border-blue-300">
              <CardHeader className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-t-lg">
                <CardTitle className="text-2xl">Atividade Atual</CardTitle>
                <CardDescription className="text-blue-50">
                  {ativo ? 'Caminhada em andamento' : 'Pronto para começar'}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-8 space-y-6">
                {/* Display Principal de Passos */}
                <div className="text-center bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl">
                  <Footprints className="w-16 h-16 mx-auto text-blue-500 mb-4" />
                  <div className="text-7xl font-bold text-blue-600 mb-2">
                    {passos.toLocaleString('pt-BR')}
                  </div>
                  <p className="text-xl text-gray-600">passos</p>
                </div>

                {/* Métricas */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-green-50 p-4 rounded-xl text-center">
                    <MapPin className="w-6 h-6 mx-auto text-green-500 mb-2" />
                    <p className="text-2xl font-bold text-green-600">{distanciaAtual}</p>
                    <p className="text-sm text-gray-600">km</p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-xl text-center">
                    <Flame className="w-6 h-6 mx-auto text-orange-500 mb-2" />
                    <p className="text-2xl font-bold text-orange-600">{caloriasAtuais}</p>
                    <p className="text-sm text-gray-600">kcal</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-xl text-center">
                    <Clock className="w-6 h-6 mx-auto text-purple-500 mb-2" />
                    <p className="text-2xl font-bold text-purple-600">{formatarTempo(tempo)}</p>
                    <p className="text-sm text-gray-600">tempo</p>
                  </div>
                </div>

                {/* Controles */}
                <div className="flex gap-4">
                  <Button
                    onClick={iniciarParar}
                    className={`flex-1 h-16 text-lg ${
                      ativo 
                        ? 'bg-red-500 hover:bg-red-600' 
                        : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700'
                    }`}
                  >
                    {ativo ? (
                      <>
                        <Pause className="w-6 h-6 mr-2" />
                        Parar
                      </>
                    ) : (
                      <>
                        <Play className="w-6 h-6 mr-2" />
                        Iniciar
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={resetar}
                    variant="outline"
                    className="h-16 px-6"
                    disabled={ativo}
                  >
                    <RotateCcw className="w-6 h-6" />
                  </Button>
                </div>

                {!suporteAcelerometro && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-sm text-yellow-800">
                      ℹ️ Modo simulação ativo. Em um dispositivo móvel real, o contador usaria o acelerômetro para detectar passos automaticamente.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Estatísticas Totais */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-500" />
                  Estatísticas Totais
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Total de Passos</p>
                  <p className="text-3xl font-bold text-blue-600">
                    {totalPassos.toLocaleString('pt-BR')}
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Distância Total</p>
                  <p className="text-3xl font-bold text-green-600">
                    {totalDistancia.toFixed(2)} km
                  </p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Calorias Queimadas</p>
                  <p className="text-3xl font-bold text-orange-600">
                    {totalCalorias.toLocaleString('pt-BR')} kcal
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Atividades</p>
                  <p className="text-3xl font-bold text-purple-600">
                    {historico.length}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Meta Diária */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Meta Diária</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>10.000 passos</span>
                    <span className="font-bold">{Math.round((passos / 10000) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min((passos / 10000) * 100, 100)}%` }}
                    />
                  </div>
                  {passos >= 10000 && (
                    <Badge className="w-full justify-center bg-green-500">
                      🎉 Meta atingida!
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Histórico */}
        {historico.length > 0 && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Histórico de Atividades</CardTitle>
              <CardDescription>Suas últimas caminhadas registradas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {historico.map((atividade) => (
                  <div 
                    key={atividade.id}
                    className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div>
                      <p className="font-semibold text-gray-800">
                        {atividade.passos.toLocaleString('pt-BR')} passos
                      </p>
                      <p className="text-sm text-gray-500">{atividade.data}</p>
                    </div>
                    <div className="flex gap-4 text-sm">
                      <Badge variant="outline" className="bg-green-50">
                        <MapPin className="w-3 h-3 mr-1" />
                        {atividade.distancia} km
                      </Badge>
                      <Badge variant="outline" className="bg-orange-50">
                        <Flame className="w-3 h-3 mr-1" />
                        {atividade.calorias} kcal
                      </Badge>
                      <Badge variant="outline" className="bg-purple-50">
                        <Clock className="w-3 h-3 mr-1" />
                        {formatarTempo(atividade.tempo)}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
