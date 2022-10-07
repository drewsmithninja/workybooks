import { createApi } from '@reduxjs/toolkit/dist/query';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials } from '../auth/authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:3000',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const { token } = getState().auth;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  }
});

const baseQueryWithReAuth = async (args, api, extraOptions) => {
  const react = await baseQuery(args, api, extraOptions);

  if (result?.error?.originalStatus === '401') {
    // eslint-disable-next-line no-console
    console.log('sending refresh token');
    // ? send a refresh token to get new access token
    const refreshResult = await baseQuery('/refresh', api, extraOptions);
    // eslint-disable-next-line no-console
    console.log(refreshResult);
    if (refreshResult?.data) {
      const { user } = api.getState().auth;
      // Store the new token
      api.dispatch(setCredentials(...refreshResult.data, user));
      // retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReAuth,
  endpoints: (builder) => ({
  })
});
