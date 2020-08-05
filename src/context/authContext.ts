import { createContext } from 'react'

export const FirebaseAuthContext = createContext<firebase.User | null>(null)