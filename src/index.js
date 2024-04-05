import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import { createStore,applyMiddleware,compose } from 'redux'
import thunk from 'redux-thunk'
import  Reducers  from './reducers'
import { QueryClient, QueryClientProvider} from "@tanstack/react-query"




const store = createStore( Reducers,compose(applyMiddleware(thunk)) )
const queryClient = new QueryClient();

 ReactDOM.render(
  <Provider store={store}>
   <React.StrictMode>
   
    <QueryClientProvider client={queryClient}>
      <App />
      </QueryClientProvider>
   
   </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);


