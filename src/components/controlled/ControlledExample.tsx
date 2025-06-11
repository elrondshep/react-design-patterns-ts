import '@/styles/atom-one-dark.scss'
import '@/styles/components/controlledComponent.scss'
import hljs from 'highlight.js'
import { useEffect, useRef } from 'react'

export default function ControlledExample() {
  const controlledRef = useRef(null)
  const uncontrolledRef = useRef(null)
  const uncontrolledObjectRef = useRef(null)
  useEffect(() => {
    if (controlledRef.current) {
      hljs.highlightBlock(controlledRef.current)
    }
    if (uncontrolledRef.current) {
      hljs.highlightBlock(uncontrolledRef.current)
    }
    if (uncontrolledObjectRef.current) {
      hljs.highlightBlock(uncontrolledObjectRef.current)
    }
  }, [])
  return (
    <div className="controlled">
      <div className="controlled__content">
        <h2>Controlled & Uncontrolled</h2>
        <p>
          The Controlled Input pattern can be used to handle input fields. This
          pattern involves using an event handler to update the component state
          if the value of an input field changes, as well as storing the current
          value of the input field in the component state.
        </p>
        <p>
          Because React controls the state and behavior of the component, this
          pattern makes code more predictable and readable than the uncontrolled
          inputs pattern, which does not use the component's state and instead
          controls it directly through the DOM (Document object model).
        </p>
        <p>
          The use of this concept is up to the developer and, just like
          everything, there are trade offs. It's a concept to understand
          nonetheless and to know those trade offs. There might be some reason
          there needs to be a good level of control, or perhaps it's controlled
          but not as heavy. React usually needs some level of control,
          especially for input fields and having client side validation.
        </p>
        <h3 className="controlled__section_header">Example</h3>
        <p>
          In the example below, you can see that the input field is controlled
          by react. As the user types the inputValue state is set. When the
          submit button is clicked, react is handling that event as well. React
          is controlling all aspects of this form.
        </p>

        <pre>
          <code ref={controlledRef}>{`
const ControlledForm = () => {
  const [inputValue, setInputValue] = useState<string>('')

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    // Perhaps you can add some validation as the value is entered.
    setInputValue(event.target.value)
  }

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault()
    console.log('Submitted form values: ', inputValue)
  }

  return (
    <div>
      <form>
        <input type="text" value={inputValue} onChange={handleChange} />
        <input type="button" value="submit" onClick={handleFormSubmit} />
      </form>
    </div>
  )
}

export default ControlledForm
`}</code>
        </pre>
        <p>
          One of the things you might be able to tell in this situation is that
          there are a lot of rendering happening the more these inputs are
          controlled. Imagine if we had 20 different input fields to control. So
          many handler functions and state hooks. Below is an example of this
          form that is uncontrolled, at least a bit more.
        </p>

        <pre>
          <code ref={uncontrolledRef}>{`
const ControlledForm = () => {
  const handleFormSubmit = (formData: FormData) => {
    const inputValue = (formData.get('example') as string | null) || ''
    console.log('Submitted form values: ', inputValue)
  }

  return (
    <div>
      <form action={handleFormSubmit}>
        <input type="text" name="example" value="" />
        <input type="submit" value="submit" />
      </form>
    </div>
  )
}

export default ControlledForm
`}</code>
        </pre>
        <p>
          This shows how the form is a normal HTML style form. The action of the
          submit is the react handler function and uses the{' '}
          <code>FormData</code> property to access the input rather than storing
          it in a state hook and accessing it from there. Of course there are
          tradeoffs. You could not handle specific functionality as the user
          types, but you could use the first example, and just not use the state
          hook to avoid renders. You could use an <code>onBlur</code> event to
          handle validation as the user finishes entry and moves focus to
          another element.
        </p>

        <p>
          There is another trade-off here. You'll notice that when using
          TypeScript it's difficult to set the type of value the input field is.
          You will also need to get each input value by it's name using the{' '}
          <code>formData.get</code> method for each input field. You can use the{' '}
          <code>Object.fromEntries</code> to get the values in a JSON object.
          You could use a schema-based JavaScript validator like Zod to make
          sure the object is type safe.
        </p>
        <p>
          Zod was very specifically written to work well with TypeScript. Since
          this isn't a Zod tutorial, we'll try to convey Zod's power as briefly
          as we can. The idea of using Zod here is that you'll probably need
          validation anyways, why not get better types without assertions? When
          you pass this opaque formValues object into the schema validator, Zod
          validates it based on the schema you wrote (not shown here) but then
          also gives you back your data but in a type-safe way according to the
          rules of your schema that it just passed
        </p>

        <pre>
          <code ref={uncontrolledObjectRef}>{`
const ControlledForm = () => {
  const handleFormSubmit = (formData: FormData) => {
    const formValues = Object.fromEntries(formData) // typeof is { [example: string]: FormDataEntryValue }
    for (let [key, value] of formValues) {
      console.log(\`Value for \${key} is \${value}\`)
    }

    // Using Zod to validate and build a type safe object okey value pairs
    const results = myFormSchema.safeParse(formValues)
    if (results.success) {
      results.data // typeof is { example: string }
      console.log(results.data.email)
    } else {
      // Do what you want with results.errors
    }
  }

  return (
    <div>
      <form action={handleFormSubmit}>
        <input type="text" name="example" value="" />
        <input type="submit" value="submit" />
      </form>
    </div>
  )
}

export default ControlledForm
`}</code>
        </pre>
      </div>
    </div>
  )
}
