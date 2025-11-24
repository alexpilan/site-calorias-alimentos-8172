export type Language = 'pt-BR' | 'en';

export const translations = {
  'pt-BR': {
    // Header
    logout: 'Sair',
    back: 'Voltar',
    user: 'Usuário',
    
    // Home
    appTitle: 'NutriApp',
    appSubtitle: 'Sua Saúde em Primeiro Lugar',
    explore: 'Explorar',
    loading: 'Carregando...',
    
    // CTA
    ctaTitle: 'Comece Sua Jornada Saudável Hoje!',
    ctaDescription: 'Descubra ferramentas poderosas para melhorar sua alimentação e qualidade de vida.',
    ctaButton: 'Começar Agora',
    
    // Módulos
    modules: {
      foodAnalysis: 'Análise de Alimentos por Foto',
      foodAnalysisDesc: 'Tire uma foto e descubra informações nutricionais instantaneamente',
      bloodPressure: 'Controle da Pressão Arterial',
      bloodPressureDesc: 'Monitore sua pressão arterial diariamente e acompanhe sua saúde cardiovascular',
      weightLoss: 'Emagrecimento Saudável',
      weightLossDesc: 'Dicas e orientações para perder peso de forma saudável e sustentável',
      childNutrition: 'Alimentação Infantil',
      childNutritionDesc: 'Guia completo para alimentação saudável de crianças e adolescentes',
      calorieCounter: 'Contador de Calorias',
      calorieCounterDesc: 'Registre suas refeições e atividades para controlar seu balanço calórico',
      sleepTime: 'Melhor Horário para Dormir',
      sleepTimeDesc: 'Descubra o melhor horário para dormir e acordar descansado',
      restrictions: 'Restrições Alimentares',
      restrictionsDesc: 'Informações sobre alergias, intolerâncias e dietas especiais',
      chat: 'Chat Comunitário',
      chatDesc: 'Converse com outros usuários, compartilhe experiências e tire dúvidas',
    },
    
    // Análise de Foto
    photoAnalysis: {
      title: 'Capturar ou Escolher Foto',
      description: 'Tire uma foto do alimento ou escolha da galeria para descobrir suas informações nutricionais',
      takePhoto: 'Tirar Foto',
      chooseGallery: 'Escolher da Galeria',
      analyzing: 'Analisando...',
      analyze: 'Analisar Alimento',
      resultTitle: 'Resultado da Análise',
      calories: 'kcal',
      per100g: 'por 100g',
      hasGluten: 'Contém Glúten',
      noGluten: 'Sem Glúten',
      okDiabetics: 'OK para Diabéticos',
      avoidDiabetics: 'Evitar',
      okHypertension: 'OK para Hipertensos',
      avoidHypertension: 'Evitar',
    },
    
    // Chat
    chatModule: {
      title: 'Converse com a Comunidade',
      description: 'Compartilhe experiências e tire dúvidas',
      placeholder: 'Digite sua mensagem...',
    },
    
    // Contador de Calorias
    calorieModule: {
      activities: 'Atividades Físicas',
      activitiesDesc: 'Registre suas atividades',
      foods: 'Alimentos Ingeridos',
      foodsDesc: 'Registre suas refeições',
      activity: 'Atividade',
      selectActivity: 'Selecione',
      duration: 'Duração (minutos)',
      add: 'Adicionar',
      food: 'Alimento',
      foodName: 'Nome do alimento',
      calories: 'Calorias',
      summary: 'Resumo do Dia',
      caloriesConsumed: 'Calorias Ingeridas',
      caloriesBurned: 'Calorias Queimadas',
      calorieBalance: 'Balanço Calórico',
      
      // Atividades predefinidas
      lightWalk: 'Caminhada leve',
      fastWalk: 'Caminhada rápida',
      lightRun: 'Corrida leve',
      fastRun: 'Corrida rápida',
      cycling: 'Ciclismo',
      swimming: 'Natação',
      dancing: 'Dança',
      yoga: 'Yoga',
      
      // Alimentos predefinidos
      apple: 'Maçã média',
      banana: 'Banana média',
      rice: 'Arroz (1 xícara)',
      chicken: 'Frango (100g)',
      salad: 'Salada verde',
      yogurt: 'Iogurte natural',
    },
    
    // Pressão Arterial
    bloodPressureModule: {
      title: 'Registrar Pressão Arterial',
      description: 'Monitore sua pressão diariamente',
      systolic: 'Sistólica (mmHg)',
      diastolic: 'Diastólica (mmHg)',
      register: 'Registrar Medição',
      history: 'Histórico de Medições',
      noRecords: 'Nenhuma medição registrada ainda',
      normal: 'Normal',
      elevated: 'Elevada',
      stage1: 'Hipertensão Estágio 1',
      stage2: 'Hipertensão Estágio 2',
    },
    
    // Em desenvolvimento
    comingSoon: 'Em breve disponível',
  },
  
  'en': {
    // Header
    logout: 'Logout',
    back: 'Back',
    user: 'User',
    
    // Home
    appTitle: 'NutriApp',
    appSubtitle: 'Your Health First',
    explore: 'Explore',
    loading: 'Loading...',
    
    // CTA
    ctaTitle: 'Start Your Healthy Journey Today!',
    ctaDescription: 'Discover powerful tools to improve your nutrition and quality of life.',
    ctaButton: 'Get Started',
    
    // Modules
    modules: {
      foodAnalysis: 'Food Analysis by Photo',
      foodAnalysisDesc: 'Take a photo and discover nutritional information instantly',
      bloodPressure: 'Blood Pressure Control',
      bloodPressureDesc: 'Monitor your blood pressure daily and track your cardiovascular health',
      weightLoss: 'Healthy Weight Loss',
      weightLossDesc: 'Tips and guidance for losing weight in a healthy and sustainable way',
      childNutrition: 'Child Nutrition',
      childNutritionDesc: 'Complete guide for healthy nutrition for children and teenagers',
      calorieCounter: 'Calorie Counter',
      calorieCounterDesc: 'Log your meals and activities to control your caloric balance',
      sleepTime: 'Best Time to Sleep',
      sleepTimeDesc: 'Discover the best time to sleep and wake up refreshed',
      restrictions: 'Dietary Restrictions',
      restrictionsDesc: 'Information about allergies, intolerances and special diets',
      chat: 'Community Chat',
      chatDesc: 'Chat with other users, share experiences and ask questions',
    },
    
    // Photo Analysis
    photoAnalysis: {
      title: 'Capture or Choose Photo',
      description: 'Take a photo of the food or choose from gallery to discover its nutritional information',
      takePhoto: 'Take Photo',
      chooseGallery: 'Choose from Gallery',
      analyzing: 'Analyzing...',
      analyze: 'Analyze Food',
      resultTitle: 'Analysis Result',
      calories: 'kcal',
      per100g: 'per 100g',
      hasGluten: 'Contains Gluten',
      noGluten: 'Gluten Free',
      okDiabetics: 'OK for Diabetics',
      avoidDiabetics: 'Avoid',
      okHypertension: 'OK for Hypertension',
      avoidHypertension: 'Avoid',
    },
    
    // Chat
    chatModule: {
      title: 'Chat with the Community',
      description: 'Share experiences and ask questions',
      placeholder: 'Type your message...',
    },
    
    // Calorie Counter
    calorieModule: {
      activities: 'Physical Activities',
      activitiesDesc: 'Log your activities',
      foods: 'Food Consumed',
      foodsDesc: 'Log your meals',
      activity: 'Activity',
      selectActivity: 'Select',
      duration: 'Duration (minutes)',
      add: 'Add',
      food: 'Food',
      foodName: 'Food name',
      calories: 'Calories',
      summary: 'Daily Summary',
      caloriesConsumed: 'Calories Consumed',
      caloriesBurned: 'Calories Burned',
      calorieBalance: 'Calorie Balance',
      
      // Predefined activities
      lightWalk: 'Light walk',
      fastWalk: 'Fast walk',
      lightRun: 'Light run',
      fastRun: 'Fast run',
      cycling: 'Cycling',
      swimming: 'Swimming',
      dancing: 'Dancing',
      yoga: 'Yoga',
      
      // Predefined foods
      apple: 'Medium apple',
      banana: 'Medium banana',
      rice: 'Rice (1 cup)',
      chicken: 'Chicken (100g)',
      salad: 'Green salad',
      yogurt: 'Natural yogurt',
    },
    
    // Blood Pressure
    bloodPressureModule: {
      title: 'Record Blood Pressure',
      description: 'Monitor your pressure daily',
      systolic: 'Systolic (mmHg)',
      diastolic: 'Diastolic (mmHg)',
      register: 'Record Measurement',
      history: 'Measurement History',
      noRecords: 'No measurements recorded yet',
      normal: 'Normal',
      elevated: 'Elevated',
      stage1: 'Hypertension Stage 1',
      stage2: 'Hypertension Stage 2',
    },
    
    // Coming soon
    comingSoon: 'Coming soon',
  },
};

export function getTranslation(lang: Language, key: string): string {
  const keys = key.split('.');
  let value: any = translations[lang];
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  return value || key;
}
