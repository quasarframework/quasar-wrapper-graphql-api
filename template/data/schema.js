const typeDefinitions = `

# The return string will be "Hello " + the 'name' argument.
type Message {
  message: String
}

# This query is called via the greeter field and will return "Hello", and if you add a name as an argument, it will add it.
type HelloWorld {
  greeter(name: String): Message
}

schema {
  query: HelloWorld
}
`
export default [typeDefinitions]
