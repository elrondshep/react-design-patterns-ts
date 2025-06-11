import ControlledExample from '@/components/controlled/ControlledExample'
import ExampleHome from '@/components/ExampleHome'
import Loading from '@/components/loading'
import '@/styles/pages/home.scss'
import { lazy, Suspense, useState } from 'react'

const CompoundExample = lazy(
  () => import('@/components/compound/CompoundExample')
)
const ContainerPresentation = lazy(
  () => import('@/components/containerPresentation/ContainerPresentation')
)
const ContainerPresentationWithHook = lazy(
  () => import('@/components/customHookUse/ContainerPresentationWithHook')
)
const HigherOrder = lazy(() => import('@/components/higherOrder/HocExample'))
const ProvidersExample = lazy(
  () => import('@/components/providersExample/ProvidersExample')
)
const LazyLoadComponents = lazy(
  () => import('@/components/lazyLoad/LazyLoadExample')
)
const MemoExample = lazy(() => import('@/components/memoization/Memoization'))
const ReducerComponent = lazy(
  () => import('@/components/reducer/ReducerExample')
)

const menuOptions = [
  'Home',
  'Container Presentation',
  'Custom Hooks',
  'Content Provider',
  'Compound Component',
  'Higher Order Component',
  'State Reducers',
  'Lazy Load Components',
  'Memoization',
  'Controlled & Uncontrolled',
]
function Home() {
  const [exampleOption, setExampleOption] = useState<string>('Home')

  return (
    <div className="home">
      <div className="home__nav_container">
        {menuOptions.map((menuOption, idx) => (
          <button
            key={idx}
            onClick={() => setExampleOption(menuOption)}
            className="home__nav_container__item"
          >
            {menuOption}
          </button>
        ))}
      </div>
      <div className="home__content_container">
        {exampleOption === 'Home' && (
          <Suspense fallback={<Loading />}>
            <ExampleHome />
          </Suspense>
        )}
        {exampleOption === 'Container Presentation' && (
          <Suspense fallback={<Loading />}>
            <ContainerPresentation />
          </Suspense>
        )}
        {exampleOption === 'Custom Hooks' && (
          <Suspense fallback={<Loading />}>
            <ContainerPresentationWithHook />
          </Suspense>
        )}
        {exampleOption === 'Content Provider' && (
          <Suspense fallback={<Loading />}>
            <ProvidersExample />
          </Suspense>
        )}
        {exampleOption === 'Compound Component' && (
          <Suspense fallback={<Loading />}>
            <CompoundExample />
          </Suspense>
        )}
        {exampleOption === 'Higher Order Component' && (
          <Suspense fallback={<Loading />}>
            <HigherOrder />
          </Suspense>
        )}
        {exampleOption === 'Lazy Load Components' && (
          <Suspense fallback={<Loading />}>
            <LazyLoadComponents />
          </Suspense>
        )}
        {exampleOption === 'Memoization' && (
          <Suspense fallback={<Loading />}>
            <MemoExample />
          </Suspense>
        )}
        {exampleOption === 'State Reducers' && (
          <Suspense fallback={<Loading />}>
            <ReducerComponent />
          </Suspense>
        )}
        {exampleOption === 'Controlled & Uncontrolled' && (
          <Suspense fallback={<Loading />}>
            <ControlledExample />
          </Suspense>
        )}
      </div>
    </div>
  )
}
export default Home
