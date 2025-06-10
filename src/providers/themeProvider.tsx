import { createContext, ReactNode, useContext, useMemo } from 'react'

type ThemeProviderProps = {
  children: ReactNode
}

const ThemeContext = createContext<string>('light')

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const theme = useMemo(() => {
    console.log('In the useMemo for theme provider')
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      return 'dark'
    }
    return 'light'
  }, [])

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
}

const useThemeProvider = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('userThemeProvider must be used in ThemeProvider')
  }
  return context
}

export { ThemeProvider, useThemeProvider }
