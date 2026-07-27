// AuthCorner — small persistent cluster for the top-right of every Wilder
// surface (onboarding + dashboard). Renders the signed-in state explicitly
// so users can see at a glance whether they're signed in, and gives them a
// one-click way to manage their account.
//
// - Signed out: "Sign In" text button + "Sign Up" ember pill.
//   Both open Clerk's modal with forceRedirectUrl="/" so users land back
//   at the index after auth.
// - Signed in: "Hi, [firstName]" greeting + <UserButton /> avatar menu
//   (sign out navigates to "/landing").

import { useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  SignInButton,
  SignUpButton,
  SignOutButton,
  UserButton,
  useAuth,
  useUser,
} from '@clerk/react'

export default function AuthCorner({ variant = 'overlay' }) {
  const { isSignedIn } = useAuth()
  const { user, isLoaded } = useUser()
  const navigate = useNavigate()
  const firstName =
    user?.firstName ||
    (user?.username && user.username.split(' ')[0]) ||
    null

  // When the user signs out (via the UserButton or anywhere else), we
  // explicitly navigate them off the index. Clerk's UserButton also has
  // afterSignOutUrl="/landing" set as a belt-and-suspenders fallback, but
  // relying on a hard redirect here means we don't leave a signed-out user
  // staring at their dashboard if the redirect is missed.
  const prevSignedInRef = useRef(isSignedIn)
  useEffect(() => {
    if (prevSignedInRef.current && !isSignedIn && isLoaded) {
      try { navigate('/landing', { replace: true }) } catch (e) {}
    }
    prevSignedInRef.current = isSignedIn
  }, [isSignedIn, isLoaded, navigate])

  const brandLink = (
    <Link
      to="/"
      className="inline-flex items-center"
      aria-label="Wilder Moms — home"
    >
      <img
        src="/wilder-moms-logo.jpeg"
        alt="Wilder Moms"
        className="h-9 md:h-11 w-auto"
      />
    </Link>
  )

  const authCluster = isSignedIn ? (
    <div className="flex items-center gap-3">
      {isLoaded && firstName && (
        <span className="hidden sm:inline text-inkl text-sm font-medium">
          Hi, <span className="text-ink">{firstName}</span>
        </span>
      )}
      <UserButton afterSignOutUrl="/landing" />
    </div>
  ) : (
    <div className="flex items-center gap-2 md:gap-3">
      <SignInButton mode="modal" forceRedirectUrl="/">
        <button
          type="button"
          className="font-sans font-medium text-sm px-3 md:px-4 py-2 text-ink hover:text-ember transition-colors"
        >
          Sign In
        </button>
      </SignInButton>
      <SignUpButton mode="modal" forceRedirectUrl="/">
        <button
          type="button"
          className="bg-ember text-white font-sans font-medium text-sm px-4 md:px-5 py-2 md:py-2.5 rounded-full hover:bg-forest transition-colors duration-300"
        >
          Sign Up
        </button>
      </SignUpButton>
    </div>
  )

  if (variant === 'minimal') return authCluster

  return (
    <header className="px-6 pt-6 md:pt-8">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {brandLink}
        {authCluster}
      </div>
    </header>
  )
}
