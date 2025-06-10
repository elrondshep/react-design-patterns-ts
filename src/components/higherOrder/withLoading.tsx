import { ComponentType, useEffect, useState } from 'react'

// Define the props that the HOC will inject
export type WithLoadingProps = {
  isLoading?: boolean
}

// Define a generic type for the wrapped component's props
type PropsWithLoading<P extends object> = P & WithLoadingProps

// Create the HOC function
const withLoading = <P extends object>(WrappedComponent: ComponentType<P>) => {
  return (props: PropsWithLoading<P>) => {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
      setTimeout(() => {
        setIsLoading(false)
      }, 2000)
    }, [])

    // Pass down the injected props along with the original props
    return <WrappedComponent {...props} isLoading={isLoading} />
  }
}

export default withLoading
