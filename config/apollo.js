import {
    ApolloClient,
    createHttpLink,
    InMemoryCache
} from "@apollo/client";
import {
    setContext
} from "apollo-link-context";

const HttpLink = createHttpLink({
    uri: "https://nameless-bastion-81405.herokuapp.com/"
})

const authLink = setContext((_, {
    headers
}) => {

    // Get localStorage token
    const token = localStorage.getItem("token");

    return {
        headers: {
            ...headers,
            authorization: token
        }
    }
});

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(HttpLink)
});

export default client;