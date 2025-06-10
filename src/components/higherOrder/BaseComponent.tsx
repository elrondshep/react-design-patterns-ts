import { WithLoadingProps } from '@/components/higherOrder/withLoading'
import { WithToggleProps } from '@/components/higherOrder/withToggle'

type BaseComponentProps = WithLoadingProps &
  WithToggleProps & {
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
