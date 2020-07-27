import React from 'react';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { LoginForm, Loading } from '../components';
import ApolloClient from 'apollo-client';
import * as LoginTypes from './__generated__/login';

export const LOGIN_USER = gql`
  mutation login($email: String!) {
    login(email: $email)
  }
`;

/*
NOTE - A tuple is a collection which is ordered and unchangeable.

the first value in the useMutation hook result tuple is a mutate function that actually triggers the mutation when it is called. The second value in the result tuple is a result object that contains loading and error state, as well as the return value from the mutation.

Let's bind the LOGIN_USER mutation to our Login() component by passing it to the useMutation hook.
*/
export default function Login() {

  const client: ApolloClient<any> = useApolloClient();
  const [login, { loading, error }] = useMutation<LoginTypes.login, LoginTypes.loginVariables>(
    LOGIN_USER,
    {

      onCompleted({ login }) {
        localStorage.setItem('token', login as string);
        client.writeData({ data: { isLoggedIn: true } });
      }
    }
  );

  if (loading) return <Loading />;
  if (error) return <p>An error occurred</p>;

  return <LoginForm login={login} />;
}