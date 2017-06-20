![Quasar Framework logo](https://cdn.rawgit.com/quasarframework/quasar-art/863c14bd/dist/svg/quasar-logo-full-inline.svg)

Quasar app wrapper for a GraphQL API backend
---

* WIP
* Full frontend and backend solution in one project folder

## Getting Started


This wrapper requires a previously initialized Quasar app, before it can be installed. 

If you already have a Quasar app installed, carry out this command in the root directory of your app.

```Bash
quasar wrap graphql-api
```

If you are just starting with Quasar, please [follow the instructions to install the CLI](http://quasar-framework.org/guide/) and [create a default Quasar app](http://quasar-framework.org/guide/#Create-your-first-App).

This `quasar wrap` command will load up the needed files under the newly added `/api` directory. Once the CLI is finished, `cd` into the `/api` directory and then run:

```Bash
npm install
```

Once the dependencies for the Apollo GraphQL server have been installed, you can run the server with:

```Bash
npm start
```

This bare bones API server will also start under Nodemon for development purposes, which means your file changes will also restart the server automatically.

Once the server has started, you should see something like this:

```Bash
> nodemon ./server.js --exec babel-node

[nodemon] 1.11.0
[nodemon] to restart at any time, enter `rs`
[nodemon] watching: *.*
[nodemon] starting `babel-node ./server.js`
GraphQL Server is now running on http://localhost:8081/graphql
``` 
The API will be running under the URL mentioned above.

You should also be able to access the GraphiQL GraphQL Introspection UI under:

[http://localhost:8081/graphiql](http://localhost:8081/graphql)

###### Add image of GraphiQL UI here!

## First a Little Fun with GraphQL

### Introspect the GraphQL API

The ability to introspect the API is a very cool and advantageous part of GraphQL. Click on the "Docs" button top right of the UI. You will see the root query type "Hello World". Click on it, and you can explore the type graph. In our example it is very simple, but you can imagine how this can be very useful. 

### Your first query

On the left side of GraphiQL, go ahead and enter the text below and press the play button top left. 

Don't copy and paste the text! Please actually enter the text manually.

```Javascript
{greeter 
  {
  message
  }
}
```

Notice you also get code auto-completion in GraphiQL. Isn't that cool!

Go ahead and change the query to this adding your name in the quotes:

```Javascript
{greeter(name: "") 
  {
  message
  }
}

```

Now Big Brother is watching you! 

To understand how this all works, you'll need to learn some more about [GraphQL](http://graphql.org/learn/) and [Apollo](http://www.apollodata.com/). Once you get the concepts, you can see what our example is doing, by looking at the files under the `/data` directory within the `/api` directory. There you'll see the `schema.js` and `resolvers.js` files. Please note, this is a very simple example with no real application logic or database/ data source connectivity.

## Getting Quasar Hooked Up to Your Apollo GraphQL API  

Ok. So, we've gotten the GraphQL server runnning. Great! 

Now we need to get Quasar running with `Apollo-Client` and `Vue-Apollo`. To do this, make sure you are in your Quasar app root and run this command.

```Bash
npm install --save vue-apollo apollo-client
```

Now open your `main.js` file and replace its contents with the code below:

```Javascript
// === DEFAULT / CUSTOM STYLE ===
// WARNING! always comment out ONE of the two require() calls below.
// 1. use next line to activate CUSTOM STYLE (./src/themes)
// require(`./themes/app.${__THEME}.styl`)
// 2. or, use next line to activate DEFAULT QUASAR STYLE
require(`quasar/dist/quasar.${__THEME}.css`)
// ==============================

import Vue from 'vue'
import Quasar from 'quasar'
import router from './router'

// Import the Apollo Client and VueApollo files
import { ApolloClient, createNetworkInterface } from 'apollo-client'
import VueApollo from 'vue-apollo'

// Create the apollo client
const apolloClient = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'http://localhost:8081/graphql',
    transportBatching: true
  }),
  connectToDevTools: true
})

Vue.use(Quasar) // Install Quasar Framework
Vue.use(VueApollo) // Install VueApollo

// Create the apolloProvider Plug-in
const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

Quasar.start(() => {
  /* eslint-disable no-new */
  new Vue({
    el: '#q-app',
    router,
    apolloProvider, // add the appollo Plug-in into Vue
    render: h => h(require('./App'))
  })
})

```

The comments within the above code explain what has been added to get Apollo and VueApollo running.

Now go to `/components/index.vue` and replace its contents with the following code:

```Javascript
<template>
  <q-layout>
    <div slot="header" class="toolbar">
      <q-toolbar-title :padding="0">
        Quasar Framework v{{$q.version}}
      </q-toolbar-title>
    </div>

    <!--
      Replace following "div" with
      "<router-view class="layout-view">" component
      if using subRoutes
    -->
    <div class="layout-view">
      <div class="logo-container non-selectable no-pointer-events">
        <div class="logo">
          <img src="~assets/quasar-logo.png">
          <p class="caption text-center">
            {{ greeter.message }}
          </p>
        </div>
      </div>
    </div>
  </q-layout>
</template>

<script>
import gql from 'graphql-tag'

const messageQuery = gql`
  {
    greeter
    {
    message
    }
  }`

export default {
  data: () => ({
    greeter: ''
  }),
  apollo: {
    greeter: {
      query: messageQuery
    }
  }
}
</script>

<style lang="styl">
.logo-container
  width 192px
  height 280px
  perspective 800px
  position absolute
  top 50%
  left 50%
  transform translateX(-50%) translateY(-50%)
.logo
  position absolute
  transform-style preserve-3d
</style>


``` 

This code has no comments, but all we did was removed the mouse movement code from the default template. We also imported the `graphql-tag` module to create our query. 

```Javascript
const messageQuery = gql`
  {
    greeter
    {
    message
    }
  }`

```

Notice the query is the same exact query we used in GraphiQL earlier.

And we also initialized our data needed for our component with `greeter` and also the apollo object to call the query, which returned the data we need for `greeter.message` in our template. This call is made once the component is built and rendered. 

```Javascript
  data: () => ({
    greeter: ''
  }),
  apollo: {
    greeter: {
      query: messageQuery
    }
  }
```

That is it for this quick and simple wrapper for Apollo, which adds minimal GraphQL functionality to Quasar.  
 
For more information about using Apollo with Quasar (via Vue), [check out the VueApollo docs](https://github.com/Akryum/vue-apollo). For more information about Apollo, check out [their docs](http://www.apollodata.com/) and also check out [the GraphQL docs](http://graphql.org/learn/) for more about GraphQL. 

We'll be creating a demo with Apollo's realtime subscription system, which will show more of the capabilities of Quasar, Apollo and GraphQL. Once the demo is finished, we'll be adding a link to it here. It will be the next step you your journey into Quasar with GraphQL!  
