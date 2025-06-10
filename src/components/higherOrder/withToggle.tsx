import { ComponentType, useState } from 'react'

// Define the props that the HOC will inject
export interface WithToggleProps {
  isToggled?: boolean
  toggle?: () => void
}

// Define a generic type for the wrapped component's props
type PropsWithToggle<P extends object> = P & WithToggleProps

// Create the HOC function
function withToggle<P extends object>(WrappedComponent: ComponentType<P>) {
  return (props: PropsWithToggle<P>) => {
    const [isToggled, setIsToggled] = useState(false)

    const toggle = () => {
      setIsToggled(!isToggled)
    }

    // Pass down the injected props along with the original props
    return (
      <WrappedComponent
        {...(props as P)}
        isToggled={isToggled}
        toggle={toggle}
      />
    )
  }
}

export default withToggle
