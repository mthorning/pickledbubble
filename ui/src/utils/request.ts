import { gql, request as authReqest, GraphQLClient } from "graphql-request";

import type { Response } from 'express'

const endpoint = `${process.env.API_URL}/graphql`

interface LoginData {
  login: {
    jwt: string
  }
}

const { NODE_ENV, API_PASSWORD, API_USERNAME } = process.env
const dev = NODE_ENV === "development";

const authClient: Promise<GraphQLClient> = new Promise(resolve => {
  authReqest(
    endpoint,
    gql`
    mutation {
      login(input: { identifier: "${API_USERNAME}", password: "${API_PASSWORD}" }) {
        jwt
      }
    }
    `,
  ).then((response: LoginData) => {
    const client = new GraphQLClient(endpoint, {
      headers: {
        'Authorization': `Bearer ${response?.login?.jwt}`
      }
    })
    resolve(client)
  })
})



export default async function request(query: string, res?: Response, variables?: { [key: string]: any }) {
  const client = await authClient
  return client
    .request(
      gql`${query}`,
      variables
    )
    .catch((error) => {
      console.error("error", error);
      const message =
        (dev && error && error.response && error.response.errors[0].message) ||
        "Not Found";

      if (res) {
        res.writeHead(404, {
          "Content-Type": "application/json",
        });

        res.end(
          JSON.stringify({
            message,
          })
        );
      }
    });
}
