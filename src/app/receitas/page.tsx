'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Apple, ChefHat, Clock, Flame, Search, ArrowLeft } from 'lucide-react';

interface Receita {
  id: string;
  nome: string;
  calorias: number;
  tempoPreparo: number;
  dificuldade: 'Fácil' | 'Médio' | 'Difícil';
  ingredientes: string[];
  modoPreparo: string[];
  categoria: 'Café da Manhã' | 'Almoço' | 'Jantar' | 'Lanche';
  saudavel: boolean;
}

const receitasSaudaveis: Receita[] = [
  {
    id: '1',
    nome: 'Salada de Quinoa com Legumes',
    calorias: 320,
    tempoPreparo: 25,
    dificuldade: 'Fácil',
    categoria: 'Almoço',
    saudavel: true,
    ingredientes: [
      '1 xícara de quinoa',
      '2 xícaras de água',
      '1 tomate picado',
      '1 pepino picado',
      '1/2 cebola roxa',
      'Suco de 1 limão',
      'Azeite de oliva',
      'Sal e pimenta'
    ],
    modoPreparo: [
      'Cozinhe a quinoa na água por 15 minutos',
      'Deixe esfriar',
      'Misture com os legumes picados',
      'Tempere com limão, azeite, sal e pimenta',
      'Sirva gelado'
    ]
  },
  {
    id: '2',
    nome: 'Omelete de Claras com Espinafre',
    calorias: 180,
    tempoPreparo: 10,
    dificuldade: 'Fácil',
    categoria: 'Café da Manhã',
    saudavel: true,
    ingredientes: [
      '4 claras de ovo',
      '1 xícara de espinafre',
      '1/4 cebola picada',
      'Sal e pimenta',
      'Spray de óleo'
    ],
    modoPreparo: [
      'Bata as claras levemente',
      'Refogue a cebola e espinafre',
      'Adicione as claras',
      'Cozinhe até firmar',
      'Dobre ao meio e sirva'
    ]
  },
  {
    id: '3',
    nome: 'Frango Grelhado com Batata Doce',
    calorias: 420,
    tempoPreparo: 35,
    dificuldade: 'Médio',
    categoria: 'Almoço',
    saudavel: true,
    ingredientes: [
      '200g de peito de frango',
      '1 batata doce média',
      'Alho e cebola',
      'Temperos naturais',
      'Azeite'
    ],
    modoPreparo: [
      'Tempere o frango com alho, sal e pimenta',
      'Grelhe o frango por 6-8 minutos de cada lado',
      'Corte a batata doce em rodelas',
      'Asse a batata doce no forno a 200°C por 25 minutos',
      'Sirva junto com salada verde'
    ]
  },
  {
    id: '4',
    nome: 'Smoothie Verde Detox',
    calorias: 150,
    tempoPreparo: 5,
    dificuldade: 'Fácil',
    categoria: 'Lanche',
    saudavel: true,
    ingredientes: [
      '1 banana',
      '1 xícara de espinafre',
      '1/2 maçã verde',
      '200ml de água de coco',
      '1 colher de chia'
    ],
    modoPreparo: [
      'Coloque todos os ingredientes no liquidificador',
      'Bata até ficar homogêneo',
      'Sirva imediatamente'
    ]
  },
  {
    id: '5',
    nome: 'Salmão ao Forno com Brócolis',
    calorias: 380,
    tempoPreparo: 30,
    dificuldade: 'Médio',
    categoria: 'Jantar',
    saudavel: true,
    ingredientes: [
      '200g de filé de salmão',
      '2 xícaras de brócolis',
      'Limão',
      'Alho',
      'Azeite',
      'Sal e pimenta'
    ],
    modoPreparo: [
      'Tempere o salmão com limão, alho, sal e pimenta',
      'Coloque em uma assadeira com o brócolis',
      'Regue com azeite',
      'Asse a 180°C por 20-25 minutos',
      'Sirva quente'
    ]
  },
  {
    id: '6',
    nome: 'Wrap Integral de Atum',
    calorias: 290,
    tempoPreparo: 15,
    dificuldade: 'Fácil',
    categoria: 'Lanche',
    saudavel: true,
    ingredientes: [
      '1 tortilha integral',
      '1 lata de atum em água',
      'Alface',
      'Tomate',
      'Cenoura ralada',
      'Iogurte natural'
    ],
    modoPreparo: [
      'Escorra bem o atum',
      'Misture com iogurte natural',
      'Espalhe na tortilha',
      'Adicione os vegetais',
      'Enrole e sirva'
    ]
  },
  {
    id: '7',
    nome: 'Sopa de Legumes Light',
    calorias: 120,
    tempoPreparo: 40,
    dificuldade: 'Fácil',
    categoria: 'Jantar',
    saudavel: true,
    ingredientes: [
      '2 cenouras',
      '1 abobrinha',
      '1 chuchu',
      '2 tomates',
      'Cebola e alho',
      'Temperos naturais',
      '1 litro de água'
    ],
    modoPreparo: [
      'Refogue a cebola e alho',
      'Adicione os legumes picados',
      'Cubra com água',
      'Cozinhe por 30 minutos',
      'Tempere a gosto e sirva'
    ]
  },
  {
    id: '8',
    nome: 'Panqueca de Aveia e Banana',
    calorias: 220,
    tempoPreparo: 15,
    dificuldade: 'Fácil',
    categoria: 'Café da Manhã',
    saudavel: true,
    ingredientes: [
      '1 banana madura',
      '2 ovos',
      '3 colheres de aveia',
      'Canela',
      'Mel (opcional)'
    ],
    modoPreparo: [
      'Amasse a banana',
      'Misture com ovos e aveia',
      'Adicione canela',
      'Cozinhe em frigideira antiaderente',
      'Sirva com mel se desejar'
    ]
  }
];

export default function ReceitasPage() {
  const router = useRouter();
  const [busca, setBusca] = useState('');
  const [categoriaFiltro, setCategoriaFiltro] = useState<string>('Todas');

  const receitasFiltradas = receitasSaudaveis.filter(receita => {
    const matchBusca = receita.nome.toLowerCase().includes(busca.toLowerCase()) ||
                       receita.ingredientes.some(ing => ing.toLowerCase().includes(busca.toLowerCase()));
    const matchCategoria = categoriaFiltro === 'Todas' || receita.categoria === categoriaFiltro;
    return matchBusca && matchCategoria;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-100 p-4 sm:p-8">
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
          
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-4">
              <ChefHat className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-800">Receitas Saudáveis</h1>
              <p className="text-gray-600">Deliciosas opções para emagrecer com saúde</p>
            </div>
          </div>

          {/* Busca e Filtros */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Buscar receitas ou ingredientes..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {['Todas', 'Café da Manhã', 'Almoço', 'Jantar', 'Lanche'].map((cat) => (
                <Button
                  key={cat}
                  variant={categoriaFiltro === cat ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCategoriaFiltro(cat)}
                  className={categoriaFiltro === cat ? 'bg-green-500 hover:bg-green-600' : ''}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid de Receitas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {receitasFiltradas.map((receita) => (
            <Card key={receita.id} className="hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <CardHeader className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-t-lg">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{receita.nome}</CardTitle>
                  {receita.saudavel && (
                    <Badge className="bg-white text-green-600">
                      <Apple className="w-3 h-3 mr-1" />
                      Saudável
                    </Badge>
                  )}
                </div>
                <CardDescription className="text-green-50">
                  {receita.categoria}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                {/* Info Rápida */}
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-orange-50 p-2 rounded-lg">
                    <Flame className="w-5 h-5 mx-auto text-orange-500 mb-1" />
                    <p className="text-xs text-gray-600">Calorias</p>
                    <p className="font-bold text-orange-600">{receita.calorias}</p>
                  </div>
                  <div className="bg-blue-50 p-2 rounded-lg">
                    <Clock className="w-5 h-5 mx-auto text-blue-500 mb-1" />
                    <p className="text-xs text-gray-600">Tempo</p>
                    <p className="font-bold text-blue-600">{receita.tempoPreparo}min</p>
                  </div>
                  <div className="bg-purple-50 p-2 rounded-lg">
                    <ChefHat className="w-5 h-5 mx-auto text-purple-500 mb-1" />
                    <p className="text-xs text-gray-600">Nível</p>
                    <p className="font-bold text-purple-600">{receita.dificuldade}</p>
                  </div>
                </div>

                {/* Ingredientes */}
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Ingredientes:</h4>
                  <ul className="text-sm text-gray-600 space-y-1 max-h-32 overflow-y-auto">
                    {receita.ingredientes.map((ing, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        {ing}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Modo de Preparo */}
                <div>
                  <h4 className="font-semibold text-gray-700 mb-2">Modo de Preparo:</h4>
                  <ol className="text-sm text-gray-600 space-y-1 max-h-32 overflow-y-auto">
                    {receita.modoPreparo.map((passo, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="font-bold text-green-500 mr-2">{idx + 1}.</span>
                        {passo}
                      </li>
                    ))}
                  </ol>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {receitasFiltradas.length === 0 && (
          <div className="text-center py-16">
            <ChefHat className="w-24 h-24 mx-auto text-gray-300 mb-4" />
            <p className="text-xl text-gray-500">Nenhuma receita encontrada</p>
            <p className="text-gray-400">Tente buscar por outros ingredientes</p>
          </div>
        )}
      </div>
    </div>
  );
}
