# Vuex Saga Plugin in TS

[![version][version-badge]][CHANGELOG] [![license][license-badge]][LICENSE]

> vuex-saga-ts just was a vuex plugin connecting [redux-saga](https://redux-saga.js.org) and it also provided some utils
> which might help some especially for a project in typescript. My new project called for some complicated-side-effect 
> controls in Vuex, and I missed redux-saga a lot. Thus I created this to simplify my life. Meanwhile hope it could 
> also help some others as well.
 
### Setup

- First of all, we have to install it

```shell script
    
    yarn add vuex-saga-ts

#    or

    npm install vuex-saga-ts

```
- Then init and inject it with the root saga function as one vuex plugin when you create vuex. And leave the work to 
the root saga to clear.

*src/store/index.ts*
```typescript
import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import { VuexSagaPlugin } from 'vuex-saga-ts';
import rootSaga from './sagas';

Vue.use(Vuex);
const store:Store<any> = new Vuex.Store({
  state:{
    version: '1.0.0',
  },
  plugins:[
    VuexSagaPlugin(rootSaga )
  ],
  modules:{
  }
});

export default store;
``` 

- Since veux-saga-ts extends the default Store type of vuex, a type definition file is suggested created at your 
project root to extends the types

*src/vuex-saga-ts.d.ts*
```typescript
/// <reference types="vuex-saga-ts" />
``` 

### Usage



[LICENSE]: ./LICENSE.md
[CHANGELOG]: ./CHANGELOG.md
[version-badge]: https://img.shields.io/badge/version-0.1.0-blue.svg
[license-badge]: https://img.shields.io/badge/license-MIT-green.svg
