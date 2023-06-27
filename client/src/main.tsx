import React from "react"
import ReactDOM from "react-dom/client"
import {ApolloClient, InMemoryCache, ApolloProvider, DefaultOptions} from "@apollo/client"
import {createUploadLink} from "apollo-upload-client"

import {createGlobalStyle} from "styled-components"
import App from "./App"

const defaultOptions: DefaultOptions = {
    watchQuery: {
        fetchPolicy: "no-cache",
        errorPolicy: "ignore"
    },
    query: {
        fetchPolicy: "no-cache",
        errorPolicy: "all"
    }
}

const client = new ApolloClient({
    link: createUploadLink({uri: "http://localhost:4000/graphql"}),
    cache: new InMemoryCache(),
    defaultOptions: defaultOptions
})

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Manrope', sans-serif;
  }
`

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

root.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <GlobalStyle/>
            <App/>
        </ApolloProvider>
    </React.StrictMode>
)
