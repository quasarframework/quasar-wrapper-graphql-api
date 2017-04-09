const resolvers = {
  HelloWorld: {
    greeter (_, args) {
      if (args.name) {
        return {
          message: 'Hello ' + args.name }
      }
      return {
        message: 'Hello'
      }
    }
  }
}

export default resolvers
