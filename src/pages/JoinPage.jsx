import { SignIn, useAuth } from '@clerk/react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../utils/supabase'

export default function JoinPage() {
  const { userId, isSignedIn } = useAuth()
  const navigate = useNavigate()

  // If already signed in, redirect to profile immediately
  useEffect(() => {
    if (isSignedIn && userId) {
      navigate('/profile')
    }
  }, [isSignedIn, userId, navigate])

  // After sign-in completes, save user and redirect
  useEffect(() => {
    if (isSignedIn && userId) {
      saveUserToSupabase(userId)
    }
  }, [isSignedIn, userId])

  const saveUserToSupabase = async (clerkUserId) => {
    const { error } = await supabase
      .from('users')
      .upsert({
        id: clerkUserId,  // use Clerk's userId as the primary key
        created_at: new Date().toISOString(),
      }, {
        onConflict: 'id',  // if user already exists, don't error
      })

    if (error) {
      console.error('Error saving user:', error)
    }
  }

  return (
    <div className="min-h-screen bg-cream pt-32 pb-20 px-4">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="font-serif text-4xl md:text-5xl text-ink mb-4">
            Join the Wilder Moms Village
          </h1>
          <p className="font-sans text-inkl text-lg">
            Get personalized trail recommendations, connect with local moms, and discover outdoor adventures that actually work for your family.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-lg">
          <div className="flex justify-center">
              <SignIn />
          </div>
        </div>
      </div>
    </div>
  )
}
