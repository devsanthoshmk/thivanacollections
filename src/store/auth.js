import { ref, computed } from 'vue'
import { supabase } from '../supabase'

const user = ref(null)
const session = ref(null)
const loading = ref(false)
const error = ref(null)
export const useAuthStore = () => {

  // Initialize auth state
  const initAuth = async () => {
    loading.value = true
    try {
      const { data: { session: currentSession } } = await supabase.auth.getSession()
      session.value = currentSession
      user.value = currentSession?.user || null
      console.log('Current session:', currentSession)
      // Listen for auth changes
      supabase.auth.onAuthStateChange(async (_, newSession) => {
        session.value = newSession
        user.value = newSession?.user || null
      })
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  // Sign up with email and password
  const signUp = async (email, password) => {
    loading.value = true
    error.value = null
    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password
      })
      
      if (signUpError) throw signUpError
      
      return { success: true, data }
    } catch (err) {
      error.value = err.message
      return { success: false, error: err.message }
    } finally {
      loading.value = false
    }
  }

  // Sign in with email and password
  const signIn = async (email, password) => {
    loading.value = true
    error.value = null
    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      
      if (signInError) throw signInError
      
      session.value = data.session
      user.value = data.user
      
      return { success: true, data }
    } catch (err) {
      error.value = err.message
      return { success: false, error: err.message }
    } finally {
      loading.value = false
    }
  }

  // Sign out
  const signOut = async () => {
    loading.value = true
    try {
      const { error: signOutError } = await supabase.auth.signOut()
      
      if (signOutError) throw signOutError
      
      session.value = null
      user.value = null
      
      return { success: true }
    } catch (err) {
      error.value = err.message
      return { success: false, error: err.message }
    } finally {
      loading.value = false
    }
  }

  // Check if user is authenticated
  const isAuthenticated = computed(() => !!user.value)

  return {
    user,
    session,
    loading,
    error,
    isAuthenticated,
    initAuth,
    signUp,
    signIn,
    signOut
  }
}