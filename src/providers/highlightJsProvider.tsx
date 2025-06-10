import hljs from 'highlight.js'
import { createContext, ReactNode, useContext } from 'react'

type HighlightJSContextType = typeof hljs | undefined
type HighlightJSProviderProps = {
  children: ReactNode
}
const HighlightJSContext = createContext<HighlightJSContextType>(undefined)
export const HighlightJSProvider = ({ children }: HighlightJSProviderProps) => {
  return (
    <HighlightJSContext.Provider value={hljs}>
      {children}
    </HighlightJSContext.Provider>
  )
}

export const useHighlightJS = () => {
  const context = useContext(HighlightJSContext)
  if (context === undefined) {
    throw new Error('useHighlightJS must be used within a HighlightJSProvider')
  }
  return context
}
