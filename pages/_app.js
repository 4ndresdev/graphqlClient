import React, { useEffect } from "react";
import '../styles/globals.css';
import {
  ApolloProvider
} from "@apollo/client";
import client from "../config/apollo.js";
import { useRouter } from "next/router";

function MyApp({
  Component,
  pageProps
}) {

  const router = useRouter();  

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    if(router.pathname != "/" && token === null){
      router.push("/");
    }

  }, [])

  return ( 
    <ApolloProvider client={client}>
      <Component {...pageProps}/>
    </ApolloProvider>
  )
}

export default MyApp