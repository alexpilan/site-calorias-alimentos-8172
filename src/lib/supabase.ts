import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

// Validação das variáveis de ambiente
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️ Variáveis do Supabase não configuradas. Configure em Settings > Environment Variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    storageKey: 'supabase.auth.token',
    flowType: 'pkce',
  },
})

// Função para limpar sessão inválida
export const clearInvalidSession = async () => {
  try {
    const { data: { session }, error } = await supabase.auth.getSession()
    
    if (error || !session) {
      // Limpar storage se sessão inválida
      if (typeof window !== 'undefined') {
        localStorage.removeItem('supabase.auth.token')
      }
      await supabase.auth.signOut()
    }
  } catch (error) {
    console.error('Erro ao validar sessão:', error)
    if (typeof window !== 'undefined') {
      localStorage.removeItem('supabase.auth.token')
    }
  }
}

export type Profile = {
  id: string
  nome: string | null
  imagem_perfil: string | null
  created_at: string
  updated_at: string
}

export type Modulo = {
  id: string
  nome: string
  descricao: string | null
  imagem: string | null
  created_at: string
  updated_at: string
}

export type Imagem = {
  id: string
  usuario_id: string | null
  modulo_id: string | null
  url: string
  descricao: string | null
  created_at: string
}
