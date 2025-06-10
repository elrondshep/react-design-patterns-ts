import '@/styles/atom-one-dark.scss'
import '@/styles/components/higherOrder.scss'
import hljs from 'highlight.js'
import { useEffect, useRef, useState } from 'react'
import BaseComponent from './BaseComponent'
import withLoading from './withLoading'
import withToggle from './withToggle'

const BaseComponentWithToggle = withToggle(BaseComponent)
const BaseComponentWithLoading = withLoading(BaseComponent)
const BaseComponentWithToggleLoading = withToggle(BaseComponentWithLoading)

const HocExample = () => {
  const baseComponentRef = useRef(null)
  const withToggleRef = useRef(null)
  const withLoadingRef = useRef(null)
  const baseComponentExampleRef = useRef(null)
  const baseComponentExampleWithToggleRef = useRef(null)
  const baseComponentExampleWithLoadingRef = useRef(null)
  const baseComponentExampleWithBothRef = useRef(null)

  useEffect(() => {
    if (baseComponentRef.current) {
      hljs.highlightBlock(baseComponentRef.current)
    }
    if (withToggleRef.current) {
      hljs.highlightBlock(withToggleRef.current)
    }
    if (withLoadingRef.current) {
      hljs.highlightBlock(withLoadingRef.current)
    }
    if (baseComponentExampleRef.current) {
      hljs.highlightBlock(baseComponentExampleRef.current)
    }
    if (baseComponentExampleWithToggleRef.current) {
      hljs.highlightBlock(baseComponentExampleWithToggleRef.current)
    }
    if (baseComponentExampleWithLoadingRef.current) {
      hljs.highlightBlock(baseComponentExampleWithLoadingRef.current)
    }
    if (baseComponentExampleWithBothRef.current) {
      hljs.highlightBlock(baseComponentExampleWithBothRef.current)
    }
  }, [])
  const [hocIndex, setHocIndex] = useState<number>(0)
  return (
    <div className="higher_order">
      <div className="higher_order__content">
        <h2>Component enhancement with HOCs (higher-order components)</h2>
        <p>
          A higher-order component takes in a component as an argument and
          returns a supercharged component injected with additional data or
          functionality. The possibility of HOCs in React is due to React
          preference of composition over inheritance. The Higher-Order Component
          (HOC) pattern offers a mechanism to increase or modify a component's
          functionality, facilitating component reuse and code sharing.
        </p>
        <p className="higher_order__section_header">When to use it</p>
        <ul>
          <li>
            When you need to share logic between multiple components without
            duplicating code.
          </li>
          <li>To add common behaviors or features to multiple components.</li>
          <li>
            When you want to isolate presentation logic from business logic in a
            component.
          </li>
        </ul>
        <p className="higher_order__section_header">When not to use it</p>
        <ul>
          <li>
            When the logic is specific to a single component and will not be
            reused.
          </li>
          <li>
            When the logic is too complex and may make HOCs difficult to
            understand.
          </li>
        </ul>
        <p className="higher_order__section_header">Advantages</p>
        <ul>
          <li>
            Promotes code reuse by encapsulating and sharing logic between
            components.
          </li>
          <li>
            Allows clear separation of presentation logic from business logic.
          </li>
          <li>
            Facilitates code composition and modularity by applying functional
            design patterns.
          </li>
        </ul>
        <p className="higher_order__section_header">Disadvantages</p>
        <ul>
          <li>
            May introduce an additional layer of abstraction that makes it
            difficult to track data flow.
          </li>
          <li>
            Excessive composition of HOCs can generate complex components that
            are difficult to debug.
          </li>
          <li>
            Sometimes, it can hide the component hierarchy, making it difficult
            to understand how the application is structured.
          </li>
        </ul>
        <h3 className="higher_order__section_header">Example</h3>
        <p>
          In this example we have a simple base component that displays a
          message and has code to provide toggle functionlity and handle loading
          state. There are four ways this component will function based on the
          props provided:
        </p>
        <ul>
          <li>The message will always display.</li>
          <li>The message and toggle functionality will display.</li>
          <li>
            The message will display after the loading state has completed.
          </li>
          <li>
            The message and toggle functionality will display after the loading
            state has completed.
          </li>
        </ul>
        <pre>
          <code ref={baseComponentRef}>{`
interface BaseComponentProps = WithLoadingProps & WithToggleProps & {
  message: string
}

const BaseComponent: React.FC<BaseComponentProps> = ({
  message,
  isToggled,
  toggle,
  isLoading,
}) => {
  if (isLoading) {
    return <div>Loading...</div>
  }
  return (
    <div>
      <p>{message}</p>
      {toggle && (
        <>
          <button onClick={toggle}>{isToggled ? 'Hide' : 'Show'}</button>
          {isToggled && <p>Toggled Content</p>}
        </>
      )}
    </div>
  )
}

export default BaseComponent
`}</code>
        </pre>
        <p>
          There is a lot of logic that is being used here but is not defined in
          this component. There is a loading state provided and being used to
          handle the display. There is toggle functionality: a button with a
          click event handler that is provided, and a boolean toggle state that
          is provided.
        </p>
        <p>
          Looking at this I would assume the parent is providing these
          properties. However, the type that is created that defines the
          properties combines two other types, and that indicates to me that
          something else is going on here.
        </p>
        <p>
          Remember that this design pattern combines two components into a new
          one. Lets look at the toggle component first. The naming convention is
          up to you, but I like to name these higher order components with a
          prefix of 'with'. The toggle higher order component is named
          'withToggle'. Similar to a custom hook when we use the prefix of
          'use'. THis way I know quickly what is a higher order component and
          what isn't.
        </p>
        <pre>
          <code ref={withToggleRef}>{`
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
`}</code>
        </pre>
        <p>
          You can see that a component is passed in as a property. There is
          other logic in here such as a state hook and a function used to work
          with that hook. It then returns a new component that is the component
          provided in the props with the properties and functionality of this
          component. When we use this higher order component with the base
          component we now have a component that has the logic and functionality
          of the toggle with the interaction and display of the base component.
          You can also see that it provides the interface to this function that
          is used in building the specific type of properties in the base
          component.
        </p>
        <p>
          The loading higher order component does the same thing but is not
          aware of the toggle functionality. So the base compnent has logic in
          place to use the loading state and the toggle functionlity if
          available. So the base component is not aware of where this logic is
          coming from, it just knows that if it is provided to it, it will
          utilize it.
        </p>
        <pre>
          <code ref={withLoadingRef}>{`
// Define the props that the HOC will inject
export interface WithLoadingProps = {
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
`}</code>
        </pre>
        <p>
          Here is how we would use the higher order component. Below are the
          four examples: basic use of the base component without using the
          higher order ponent, the base component with the "withToggle' higher
          order component, the base component with the 'withLoading' higher
          order component, and the base component using both higher order
          components.
        </p>
        <pre>
          <pre>
            <code ref={baseComponentExampleRef}>{`
<BaseComponent message="General use message" />
`}</code>
          </pre>
          <code ref={baseComponentExampleWithToggleRef}>{`
const BaseComponentWithToggle = withToggle(BaseComponent)
<BaseComponentWithToggle message="Toggle use message" />
`}</code>
        </pre>
        <pre>
          <code ref={baseComponentExampleWithLoadingRef}>{`
const BaseComponentWithLoading = withLoading(BaseComponent)
<BaseComponentWithLoading message="Loading use message" />
`}</code>
        </pre>
        <pre>
          <code ref={baseComponentExampleWithBothRef}>{`
const BaseComponentWithToggleLoading = withToggle(BaseComponentWithLoading)
<BaseComponentWithToggleLoading message="Loading & Toggle use message" />
`}</code>
        </pre>
        <p>
          This is each example in action. Click on the apporpriate button to see
          each example.
        </p>
      </div>
      <div className="higher_order__buttons">
        <button
          className="higher_order__buttons__button"
          onClick={() => setHocIndex(0)}
        >
          General
        </button>
        <button
          className="higher_order__buttons__button"
          onClick={() => setHocIndex(1)}
        >
          Toggle
        </button>
        <button
          className="higher_order__buttons__button"
          onClick={() => setHocIndex(2)}
        >
          Loading
        </button>
        <button
          className="higher_order__buttons__button"
          onClick={() => setHocIndex(3)}
        >
          Combo
        </button>
      </div>
      <div className="higher_order__content__components">
        {hocIndex === 0 && <BaseComponent message="General use message" />}
        {hocIndex === 1 && (
          <BaseComponentWithToggle message="Toggle use message" />
        )}
        {hocIndex === 2 && (
          <BaseComponentWithLoading message="Loading use message" />
        )}
        {hocIndex === 3 && (
          <BaseComponentWithToggleLoading message="Loading & Toggle use message" />
        )}
      </div>
    </div>
  )
}

export default HocExample
