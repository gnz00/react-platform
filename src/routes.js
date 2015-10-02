/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React from 'react';
import Router from 'react-routing/src/Router';
import http from './core/HttpClient';
import App from './components/App';
import IndexPage from './components/IndexPage';
import ChannelPage from './components/ChannelPage';
import ShowPage from './components/ShowPage';
import NotFoundPage from './components/NotFoundPage';
import ErrorPage from './components/ErrorPage';

import ActionCreator from "./actions/ActionCreator";
import JsonApiStore from "./stores/JsonApiStore";
import CSSTransitionGroup from 'react-addons-css-transition-group';

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

  on('/shows/:id', async (state, next) => {
    let startingRuntime = (state.query && state.query.time ? parseInt(state.query.time, 10) : 0);
    return (
      <CSSTransitionGroup transitionName="default" transitionAppear={true} transitionLeaveTimeout={5000} transitionAppearTimeout={5000} transitionEnterTimeout={5000}>
        <ShowPage key="show_page" show_id={state.params.id} currentRuntime={startingRuntime}/>
      </CSSTransitionGroup>
    );
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
