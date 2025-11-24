'use client';

import { useEffect, useState, useRef } from 'react';
import { supabase, clearInvalidSession } from '@/lib/supabase';
import { Camera, Heart, Apple, Users, Calculator, Moon, AlertTriangle, MessageCircle, Loader2, LogOut, Upload, Send, Plus, Trash2, Image as ImageIcon, Globe } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { translations, type Language } from '@/lib/translations';

interface Modulo {
  id: string;
  nome: string;
  descricao: string;
  imagem: string;
}

interface Profile {
  nome: string;
  imagem_perfil: string;
}

interface Message {
  id: number;
  content: string;
  user: string;
  created_at: string;
}

export default function Home() {
  const [modulos, setModulos] = useState<Modulo[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [moduloAtivo, setModuloAtivo] = useState<string | null>(null);
  const [language, setLanguage] = useState<Language>('pt-BR');
  const router = useRouter();

  // Estados para Análise de Foto
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  // Estados para Chat
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

  // Estados para Contador de Calorias
  const [atividades, setAtividades] = useState<Array<{nome: string, duracao: number, calorias: number}>>([]);
  const [alimentos, setAlimentos] = useState<Array<{nome: string, calorias: number}>>([]);
  const [novaAtividade, setNovaAtividade] = useState({nome: "", duracao: 0});
  const [novoAlimento, setNovoAlimento] = useState({nome: "", calorias: 0});

  // Estados para Pressão Arterial
  const [pressaoSistolica, setPressaoSistolica] = useState('');
  const [pressaoDiastolica, setPressaoDiastolica] = useState('');
  const [registrosPressao, setRegistrosPressao] = useState<Array<{sistolica: number, diastolica: number, data: string}>>([]);

  const t = translations[language];

  const iconMap: { [key: string]: any } = {
    'Análise de Alimentos por Foto': Camera,
    'Food Analysis by Photo': Camera,
    'Controle da Pressão Arterial': Heart,
    'Blood Pressure Control': Heart,
    'Emagrecimento Saudável': Apple,
    'Healthy Weight Loss': Apple,
    'Alimentação Infantil': Users,
    'Child Nutrition': Users,
    'Contador de Calorias': Calculator,
    'Calorie Counter': Calculator,
    'Melhor Horário para Dormir': Moon,
    'Best Time to Sleep': Moon,
    'Restrições Alimentares': AlertTriangle,
    'Dietary Restrictions': AlertTriangle,
    'Chat Comunitário': MessageCircle,
    'Community Chat': MessageCircle,
  };

  const colorMap: { [key: string]: string } = {
    'Análise de Alimentos por Foto': 'from-blue-500 via-cyan-500 to-teal-500',
    'Food Analysis by Photo': 'from-blue-500 via-cyan-500 to-teal-500',
    'Controle da Pressão Arterial': 'from-red-500 via-pink-500 to-rose-600',
    'Blood Pressure Control': 'from-red-500 via-pink-500 to-rose-600',
    'Emagrecimento Saudável': 'from-green-500 via-emerald-500 to-lime-600',
    'Healthy Weight Loss': 'from-green-500 via-emerald-500 to-lime-600',
    'Alimentação Infantil': 'from-purple-500 via-violet-500 to-fuchsia-600',
    'Child Nutrition': 'from-purple-500 via-violet-500 to-fuchsia-600',
    'Contador de Calorias': 'from-orange-500 via-amber-500 to-yellow-600',
    'Calorie Counter': 'from-orange-500 via-amber-500 to-yellow-600',
    'Melhor Horário para Dormir': 'from-indigo-500 via-blue-500 to-sky-600',
    'Best Time to Sleep': 'from-indigo-500 via-blue-500 to-sky-600',
    'Restrições Alimentares': 'from-yellow-500 via-orange-500 to-red-600',
    'Dietary Restrictions': 'from-yellow-500 via-orange-500 to-red-600',
    'Chat Comunitário': 'from-teal-500 via-cyan-500 to-blue-600',
    'Community Chat': 'from-teal-500 via-cyan-500 to-blue-600',
  };

  const atividadesPredefinidas = [
    { nome: t.calorieModule.lightWalk, caloriasPorMinuto: 3.3 },
    { nome: t.calorieModule.fastWalk, caloriasPorMinuto: 5.0 },
    { nome: t.calorieModule.lightRun, caloriasPorMinuto: 8.3 },
    { nome: t.calorieModule.fastRun, caloriasPorMinuto: 10.0 },
    { nome: t.calorieModule.cycling, caloriasPorMinuto: 6.7 },
    { nome: t.calorieModule.swimming, caloriasPorMinuto: 7.0 },
    { nome: t.calorieModule.dancing, caloriasPorMinuto: 5.0 },
    { nome: t.calorieModule.yoga, caloriasPorMinuto: 3.0 },
  ];

  const alimentosPredefinidos = [
    { nome: t.calorieModule.apple, calorias: 95 },
    { nome: t.calorieModule.banana, calorias: 105 },
    { nome: t.calorieModule.rice, calorias: 205 },
    { nome: t.calorieModule.chicken, calorias: 165 },
    { nome: t.calorieModule.salad, calorias: 50 },
    { nome: t.calorieModule.yogurt, calorias: 150 },
  ];

  // Módulos traduzidos
  const modulosTraduzidos = [
    {
      id: '1',
      nome: t.modules.foodAnalysis,
      descricao: t.modules.foodAnalysisDesc,
      imagem: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&h=600&fit=crop&q=80',
    },
    {
      id: '2',
      nome: t.modules.bloodPressure,
      descricao: t.modules.bloodPressureDesc,
      imagem: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&h=600&fit=crop&q=80',
    },
    {
      id: '3',
      nome: t.modules.weightLoss,
      descricao: t.modules.weightLossDesc,
      imagem: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=600&fit=crop&q=80',
    },
    {
      id: '4',
      nome: t.modules.childNutrition,
      descricao: t.modules.childNutritionDesc,
      imagem: 'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=800&h=600&fit=crop&q=80',
    },
    {
      id: '5',
      nome: t.modules.calorieCounter,
      descricao: t.modules.calorieCounterDesc,
      imagem: 'https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=800&h=600&fit=crop&q=80',
    },
    {
      id: '6',
      nome: t.modules.sleepTime,
      descricao: t.modules.sleepTimeDesc,
      imagem: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&h=600&fit=crop&q=80',
    },
    {
      id: '7',
      nome: t.modules.restrictions,
      descricao: t.modules.restrictionsDesc,
      imagem: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=600&fit=crop&q=80',
    },
    {
      id: '8',
      nome: t.modules.chat,
      descricao: t.modules.chatDesc,
      imagem: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&h=600&fit=crop&q=80',
    },
  ];

  useEffect(() => {
    // Limpar sessão inválida ao carregar
    clearInvalidSession().then(() => {
      checkUser();
      loadModulos();
    });
  }, []);

  useEffect(() => {
    if (moduloAtivo === t.modules.chat || moduloAtivo === 'Chat Comunitário') {
      fetchMessages();
      const channel = supabase
        .channel('messages')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, (payload) => {
          setMessages((prev) => [...prev, payload.new as Message]);
        })
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [moduloAtivo]);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);

    if (user) {
      const { data } = await supabase
        .from('profiles')
        .select('nome, imagem_perfil')
        .eq('id', user.id)
        .single();
      
      if (data) {
        setProfile(data);
      }
    }
  };

  const loadModulos = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('modulos')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;

      if (data) {
        setModulos(data);
      }
    } catch (error) {
      console.error('Erro ao carregar módulos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const openCamera = () => {
    cameraInputRef.current?.click();
  };

  const openGallery = () => {
    fileInputRef.current?.click();
  };

  const analyzeFood = async () => {
    if (!selectedFile) return;
    setAnalyzing(true);
    setTimeout(() => {
      const mockResults = [
        { food: language === 'pt-BR' ? "Maçã" : "Apple", calories: 52, hasGluten: false, suitableForDiabetics: true, suitableForHypertension: true },
        { food: language === 'pt-BR' ? "Pão de trigo" : "Wheat bread", calories: 265, hasGluten: true, suitableForDiabetics: false, suitableForHypertension: false },
        { food: language === 'pt-BR' ? "Arroz integral" : "Brown rice", calories: 130, hasGluten: false, suitableForDiabetics: true, suitableForHypertension: true },
        { food: language === 'pt-BR' ? "Banana" : "Banana", calories: 89, hasGluten: false, suitableForDiabetics: true, suitableForHypertension: true },
      ];
      setResult(mockResults[Math.floor(Math.random() * mockResults.length)]);
      setAnalyzing(false);
    }, 2000);
  };

  const fetchMessages = async () => {
    const { data } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: true });
    if (data) setMessages(data);
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || !user) return;
    await supabase.from('messages').insert([{ 
      content: newMessage, 
      user: profile?.nome || user.email 
    }]);
    setNewMessage('');
  };

  const adicionarAtividade = () => {
    if (novaAtividade.nome && novaAtividade.duracao > 0) {
      const atividade = atividadesPredefinidas.find(a => a.nome === novaAtividade.nome);
      if (atividade) {
        const calorias = Math.round(atividade.caloriasPorMinuto * novaAtividade.duracao);
        setAtividades([...atividades, { ...novaAtividade, calorias }]);
        setNovaAtividade({nome: "", duracao: 0});
      }
    }
  };

  const adicionarAlimento = () => {
    if (novoAlimento.nome && novoAlimento.calorias > 0) {
      setAlimentos([...alimentos, novoAlimento]);
      setNovoAlimento({nome: "", calorias: 0});
    }
  };

  const adicionarPressao = () => {
    const sistolica = parseInt(pressaoSistolica);
    const diastolica = parseInt(pressaoDiastolica);
    if (sistolica && diastolica) {
      setRegistrosPressao([...registrosPressao, {
        sistolica,
        diastolica,
        data: new Date().toLocaleString(language === 'pt-BR' ? 'pt-BR' : 'en-US')
      }]);
      setPressaoSistolica('');
      setPressaoDiastolica('');
    }
  };

  const classificarPressao = (sistolica: number, diastolica: number) => {
    if (sistolica < 120 && diastolica < 80) return { texto: t.bloodPressureModule.normal, cor: 'bg-green-500' };
    if (sistolica < 130 && diastolica < 80) return { texto: t.bloodPressureModule.elevated, cor: 'bg-yellow-500' };
    if (sistolica < 140 || diastolica < 90) return { texto: t.bloodPressureModule.stage1, cor: 'bg-orange-500' };
    return { texto: t.bloodPressureModule.stage2, cor: 'bg-red-500' };
  };

  const totalCaloriasPerdidas = atividades.reduce((total, atividade) => total + atividade.calorias, 0);
  const totalCaloriasIngeridas = alimentos.reduce((total, alimento) => total + alimento.calorias, 0);
  const balancoCalorico = totalCaloriasIngeridas - totalCaloriasPerdidas;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-200 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 animate-spin text-purple-600 mx-auto mb-4" />
          <p className="text-xl font-semibold text-gray-700">{t.loading}</p>
        </div>
      </div>
    );
  }

  if (moduloAtivo) {
    const modulo = modulosTraduzidos.find(m => m.nome === moduloAtivo);
    const IconComponent = iconMap[moduloAtivo] || Camera;
    const gradientColor = colorMap[moduloAtivo] || 'from-gray-500 to-gray-600';

    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100">
        <div className="max-w-7xl mx-auto p-4 sm:p-8">
          {/* Header */}
          <div className="mb-6 flex justify-between items-center bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl">
            <Button 
              onClick={() => setModuloAtivo(null)}
              variant="outline"
              className="flex items-center gap-2"
            >
              ← {t.back}
            </Button>
            <div className="flex items-center gap-4">
              {/* Seletor de Idioma */}
              <Select value={language} onValueChange={(value) => setLanguage(value as Language)}>
                <SelectTrigger className="w-[140px]">
                  <Globe className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pt-BR">🇧🇷 Português</SelectItem>
                  <SelectItem value="en">🇺🇸 English</SelectItem>
                </SelectContent>
              </Select>
              {user && (
                <>
                  <img 
                    src={profile?.imagem_perfil || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
                    alt="Avatar"
                    className="w-10 h-10 rounded-full border-2 border-purple-500"
                  />
                  <Button onClick={handleLogout} variant="destructive" size="sm">
                    <LogOut className="w-4 h-4 mr-2" />
                    {t.logout}
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Conteúdo do Módulo */}
          <div className="space-y-6">
            {/* Header do Módulo */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src={modulo?.imagem}
                alt={moduloAtivo}
                className="w-full h-48 object-cover"
              />
              <div className={`absolute inset-0 bg-gradient-to-r ${gradientColor} opacity-80`} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <IconComponent className="w-16 h-16 mx-auto mb-4" />
                  <h1 className="text-4xl font-bold">{moduloAtivo}</h1>
                </div>
              </div>
            </div>

            {/* Análise de Alimentos por Foto */}
            {(moduloAtivo === t.modules.foodAnalysis || moduloAtivo === 'Análise de Alimentos por Foto') && (
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Camera className="h-5 w-5" />
                      {t.photoAnalysis.title}
                    </CardTitle>
                    <CardDescription>{t.photoAnalysis.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Inputs ocultos */}
                    <input 
                      ref={cameraInputRef}
                      type="file" 
                      accept="image/*" 
                      capture="environment"
                      onChange={handleFileChange} 
                      className="hidden"
                    />
                    <input 
                      ref={fileInputRef}
                      type="file" 
                      accept="image/*"
                      onChange={handleFileChange} 
                      className="hidden"
                    />
                    
                    {/* Botões de ação */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Button 
                        onClick={openCamera}
                        className="w-full h-24 text-lg bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
                      >
                        <Camera className="mr-3 h-6 w-6" />
                        {t.photoAnalysis.takePhoto}
                      </Button>
                      <Button 
                        onClick={openGallery}
                        variant="outline"
                        className="w-full h-24 text-lg border-2 border-blue-500 hover:bg-blue-50"
                      >
                        <ImageIcon className="mr-3 h-6 w-6" />
                        {t.photoAnalysis.chooseGallery}
                      </Button>
                    </div>

                    {preview && (
                      <div className="text-center space-y-4">
                        <img src={preview} alt="Preview" className="max-w-full h-64 object-cover rounded-lg mx-auto shadow-lg" />
                        <Button onClick={analyzeFood} disabled={analyzing} className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600">
                          {analyzing ? <><Upload className="mr-2 h-4 w-4 animate-spin" />{t.photoAnalysis.analyzing}</> : <><Upload className="mr-2 h-4 w-4" />{t.photoAnalysis.analyze}</>}
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {result && (
                  <Card className="border-2 border-purple-300">
                    <CardHeader>
                      <CardTitle>{t.photoAnalysis.resultTitle}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center">
                        <h3 className="text-3xl font-bold text-purple-600">{result.food}</h3>
                        <p className="text-4xl font-bold text-orange-500 my-2">{result.calories} {t.photoAnalysis.calories}</p>
                        <p className="text-sm text-gray-600">{t.photoAnalysis.per100g}</p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Badge variant={result.hasGluten ? "destructive" : "secondary"} className="justify-center py-2">
                          {result.hasGluten ? t.photoAnalysis.hasGluten : t.photoAnalysis.noGluten}
                        </Badge>
                        <Badge variant={result.suitableForDiabetics ? "secondary" : "destructive"} className="justify-center py-2">
                          {result.suitableForDiabetics ? t.photoAnalysis.okDiabetics : t.photoAnalysis.avoidDiabetics}
                        </Badge>
                        <Badge variant={result.suitableForHypertension ? "secondary" : "destructive"} className="justify-center py-2">
                          {result.suitableForHypertension ? t.photoAnalysis.okHypertension : t.photoAnalysis.avoidHypertension}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {/* Chat Comunitário */}
            {(moduloAtivo === t.modules.chat || moduloAtivo === 'Chat Comunitário') && (
              <Card>
                <CardHeader>
                  <CardTitle>{t.chatModule.title}</CardTitle>
                  <CardDescription>{t.chatModule.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 rounded-lg p-4 h-96 overflow-y-auto mb-4 space-y-2">
                    {messages.map((msg) => (
                      <div key={msg.id} className="bg-white p-3 rounded-lg shadow-sm">
                        <strong className="text-purple-600">{msg.user}:</strong> {msg.content}
                        <span className="text-xs text-gray-500 ml-2">{new Date(msg.created_at).toLocaleTimeString(language === 'pt-BR' ? 'pt-BR' : 'en-US')}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder={t.chatModule.placeholder}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    />
                    <Button onClick={sendMessage}>
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Contador de Calorias */}
            {(moduloAtivo === t.modules.calorieCounter || moduloAtivo === 'Contador de Calorias') && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>{t.calorieModule.activities}</CardTitle>
                      <CardDescription>{t.calorieModule.activitiesDesc}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label>{t.calorieModule.activity}</Label>
                        <Select value={novaAtividade.nome} onValueChange={(value) => setNovaAtividade({...novaAtividade, nome: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder={t.calorieModule.selectActivity} />
                          </SelectTrigger>
                          <SelectContent>
                            {atividadesPredefinidas.map((atividade, index) => (
                              <SelectItem key={index} value={atividade.nome}>
                                {atividade.nome} ({atividade.caloriasPorMinuto} cal/min)
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>{t.calorieModule.duration}</Label>
                        <Input type="number" value={novaAtividade.duracao || ""} onChange={(e) => setNovaAtividade({...novaAtividade, duracao: parseInt(e.target.value) || 0})} />
                      </div>
                      <Button onClick={adicionarAtividade} className="w-full">
                        <Plus className="w-4 h-4 mr-2" />
                        {t.calorieModule.add}
                      </Button>
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {atividades.map((atividade, index) => (
                          <div key={index} className="flex justify-between items-center p-2 bg-green-50 rounded">
                            <span className="text-sm">{atividade.nome} ({atividade.duracao}min)</span>
                            <Badge variant="secondary">{atividade.calorias} cal</Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>{t.calorieModule.foods}</CardTitle>
                      <CardDescription>{t.calorieModule.foodsDesc}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label>{t.calorieModule.food}</Label>
                        <Input value={novoAlimento.nome} onChange={(e) => setNovoAlimento({...novoAlimento, nome: e.target.value})} placeholder={t.calorieModule.foodName} />
                      </div>
                      <div>
                        <Label>{t.calorieModule.calories}</Label>
                        <Input type="number" value={novoAlimento.calorias || ""} onChange={(e) => setNovoAlimento({...novoAlimento, calorias: parseInt(e.target.value) || 0})} />
                      </div>
                      <Button onClick={adicionarAlimento} className="w-full">
                        <Plus className="w-4 h-4 mr-2" />
                        {t.calorieModule.add}
                      </Button>
                      <div className="grid grid-cols-2 gap-2">
                        {alimentosPredefinidos.map((alimento, index) => (
                          <Button key={index} variant="outline" size="sm" onClick={() => setAlimentos([...alimentos, alimento])}>
                            {alimento.nome}
                          </Button>
                        ))}
                      </div>
                      <div className="space-y-2 max-h-32 overflow-y-auto">
                        {alimentos.map((alimento, index) => (
                          <div key={index} className="flex justify-between items-center p-2 bg-red-50 rounded">
                            <span className="text-sm">{alimento.nome}</span>
                            <Badge variant="secondary">{alimento.calorias} cal</Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="border-2 border-purple-300">
                  <CardHeader>
                    <CardTitle>{t.calorieModule.summary}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center p-4 bg-red-50 rounded-lg">
                        <div className="text-4xl font-bold text-red-600">{totalCaloriasIngeridas}</div>
                        <div className="text-sm text-gray-600 mt-2">{t.calorieModule.caloriesConsumed}</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-4xl font-bold text-green-600">{totalCaloriasPerdidas}</div>
                        <div className="text-sm text-gray-600 mt-2">{t.calorieModule.caloriesBurned}</div>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <div className={`text-4xl font-bold ${balancoCalorico >= 0 ? 'text-red-600' : 'text-green-600'}`}>
                          {balancoCalorico > 0 ? '+' : ''}{balancoCalorico}
                        </div>
                        <div className="text-sm text-gray-600 mt-2">{t.calorieModule.calorieBalance}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Controle da Pressão Arterial */}
            {(moduloAtivo === t.modules.bloodPressure || moduloAtivo === 'Controle da Pressão Arterial') && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Heart className="h-5 w-5 text-red-500" />
                      {t.bloodPressureModule.title}
                    </CardTitle>
                    <CardDescription>{t.bloodPressureModule.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>{t.bloodPressureModule.systolic}</Label>
                        <Input type="number" value={pressaoSistolica} onChange={(e) => setPressaoSistolica(e.target.value)} placeholder="120" />
                      </div>
                      <div>
                        <Label>{t.bloodPressureModule.diastolic}</Label>
                        <Input type="number" value={pressaoDiastolica} onChange={(e) => setPressaoDiastolica(e.target.value)} placeholder="80" />
                      </div>
                    </div>
                    <Button onClick={adicionarPressao} className="w-full">
                      <Plus className="w-4 h-4 mr-2" />
                      {t.bloodPressureModule.register}
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>{t.bloodPressureModule.history}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {registrosPressao.length === 0 ? (
                        <p className="text-center text-gray-500 py-8">{t.bloodPressureModule.noRecords}</p>
                      ) : (
                        registrosPressao.map((registro, index) => {
                          const classificacao = classificarPressao(registro.sistolica, registro.diastolica);
                          return (
                            <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                              <div>
                                <p className="text-2xl font-bold text-gray-800">{registro.sistolica}/{registro.diastolica}</p>
                                <p className="text-xs text-gray-500">{registro.data}</p>
                              </div>
                              <Badge className={`${classificacao.cor} text-white`}>
                                {classificacao.texto}
                              </Badge>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Outros Módulos - Em Desenvolvimento */}
            {![t.modules.foodAnalysis, t.modules.chat, t.modules.calorieCounter, t.modules.bloodPressure, 'Análise de Alimentos por Foto', 'Chat Comunitário', 'Contador de Calorias', 'Controle da Pressão Arterial'].includes(moduloAtivo) && (
              <Card>
                <CardContent className="py-16 text-center">
                  <IconComponent className="w-24 h-24 mx-auto mb-6 text-purple-400" />
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">{moduloAtivo}</h2>
                  <p className="text-xl text-gray-600 mb-8">{modulo?.descricao}</p>
                  <Badge variant="secondary" className="text-lg px-6 py-2">{t.comingSoon}</Badge>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-200 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header com perfil */}
        {user && (
          <div className="mb-8 flex justify-between items-center bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
            <div className="flex items-center space-x-4">
              <img 
                src={profile?.imagem_perfil || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
                alt="Avatar"
                className="w-12 h-12 rounded-full border-2 border-purple-500"
              />
              <div>
                <p className="font-semibold text-gray-800">{profile?.nome || t.user}</p>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {/* Seletor de Idioma */}
              <Select value={language} onValueChange={(value) => setLanguage(value as Language)}>
                <SelectTrigger className="w-[140px]">
                  <Globe className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pt-BR">🇧🇷 Português</SelectItem>
                  <SelectItem value="en">🇺🇸 English</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleLogout} variant="destructive">
                <LogOut className="w-4 h-4 mr-2" />
                {t.logout}
              </Button>
            </div>
          </div>
        )}

        {/* Banner principal */}
        <div className="relative w-full h-72 sm:h-96 rounded-3xl shadow-2xl mb-12 overflow-hidden group">
          <img 
            src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1200&h=600&fit=crop&q=80"
            alt="Alimentos saudáveis"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8 text-white">
            <h1 className="text-4xl sm:text-6xl font-bold mb-4 drop-shadow-lg">{t.appTitle}</h1>
            <p className="text-lg sm:text-2xl font-light drop-shadow-md">{t.appSubtitle}</p>
          </div>
        </div>
        
        {/* Grid de módulos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {modulosTraduzidos.map((modulo) => {
            const IconComponent = iconMap[modulo.nome] || Camera;
            const gradientColor = colorMap[modulo.nome] || 'from-gray-500 to-gray-600';
            
            return (
              <div
                key={modulo.id}
                onClick={() => setModuloAtivo(modulo.nome)}
                className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={modulo.imagem}
                    alt={modulo.nome}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${gradientColor} opacity-80 group-hover:opacity-70 transition-opacity`} />
                </div>

                <div className="relative bg-white p-6">
                  <div className="flex items-start space-x-3 mb-3">
                    <div className={`bg-gradient-to-br ${gradientColor} rounded-xl p-3 shadow-lg`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 leading-tight flex-1">
                      {modulo.nome}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {modulo.descricao}
                  </p>
                  <button className={`w-full bg-gradient-to-r ${gradientColor} text-white font-semibold py-2.5 rounded-xl hover:shadow-lg transition-all`}>
                    {t.explore}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Call to action */}
        <div className="mt-16 relative rounded-3xl overflow-hidden shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=1200&h=400&fit=crop&q=80"
            alt="Comida saudável"
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 to-pink-900/90 backdrop-blur-sm" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              {t.ctaTitle}
            </h2>
            <p className="text-white/90 text-lg mb-6 max-w-2xl">
              {t.ctaDescription}
            </p>
            {!user && (
              <button 
                onClick={() => router.push('/login')}
                className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
              >
                {t.ctaButton}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
