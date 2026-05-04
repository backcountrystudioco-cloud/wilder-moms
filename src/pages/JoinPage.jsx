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
      navigate('/explore')
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
          <p className="font-sans text-inkl text-lg leading-relaxed">
            Find your perfect trail, build your wilder home, and connect with moms who get it. This is motherhood with more dirt, more nature, and a lot less figuring-it-out-alone.
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-lg">
          <p className="text-center text-inkl mb-6 font-sans">Sign in or create your free account</p>
          <div className="flex justify-center">
              <SignIn />
          </div>
        </div>
      </div>
    </div>
  )
}
