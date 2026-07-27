// AuthCorner — small persistent cluster for the top-right of every Wilder
// surface (onboarding + dashboard). Renders the signed-in state explicitly
// so users can see at a glance whether they're signed in, and gives them a
// one-click way to manage their account.
//
// - Signed out: "Sign In" text button + "Sign Up" ember pill.
//   Both open Clerk's modal with forceRedirectUrl="/" so users land back
//   at the index after auth.
// - Signed in: "Hi, [firstName]" greeting + <UserButton /> avatar menu
//   (sign out goes back to "/").

import { Link } from 'react-router-dom'
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
  const firstName =
    user?.firstName ||
    (user?.username && user.username.split(' ')[0]) ||
    null

  const brandLink = (
    <Link
      to="/"
      className="font-serif text-lg md:text-xl text-ink tracking-tight"
    >
      Wilder <span className="text-ember">Moms</span>
    </Link>
  )

  const authCluster = isSignedIn ? (
    <div className="flex items-center gap-3">
      {isLoaded && firstName && (
        <span className="hidden sm:inline text-inkl text-sm font-medium">
          Hi, <span className="text-ink">{firstName}</span>
        </span>
      )}
      <UserButton afterSignOutUrl="/" />
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
