/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React from 'react';
import Router from 'react-routing/src/Router';
import http from './core/HttpClient';
import App from './components/App';
import IndexPage from './components/IndexPage';
import ChannelPage from './components/ChannelPage';
import NotFoundPage from './components/NotFoundPage';
import ErrorPage from './components/ErrorPage';

/**
 * Need to import stores so that they'll register with the Dispatcher.
 */
import ChannelStore from './stores/ChannelStore';

const router = new Router(on => {
  on('*', async (state, next) => {
    const component = await next();
    return component && <App context={state.context}>{component}</App>;
  });

  on('/', async () => {
    return <IndexPage/>
  });

  on('/channels/:id', async (state, next) => {
    return <ChannelPage channel_id={state.params.id}/>
  });

  on('error', (state, error) => {
    console.log(error);
    console.log(state);
    return state.statusCode === 404 ?
      <App context={state.context} error={error}><NotFoundPage /></App> :
      <App context={state.context} error={error}><ErrorPage /></App>
    }
  );
});

export default router;
