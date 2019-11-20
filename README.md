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
project root to extends vuex store types. Along with it, the temp composition api extension definition are also suggested.

*src/vuex-saga-ts.d.ts*
```typescript
import Vue from 'vue';
import {SagaDispatchActionFun, SagaDispatchFun} from "vuex-saga-ts";

declare module '@vue/composition-api/dist/component/component' {
    interface SetupContext {
        readonly refs: { [key: string]: Vue | Element | Vue[] | Element[] };
    }
}

declare module 'vuex' {
    interface Store<S>{
        sagaDispatch:SagaDispatchFun;
        sagaDispatchAction:SagaDispatchActionFun;
    }
}
``` 

### Usage

#### Action Creators

We provide an action creator `createAction`

```typescript
import { createAction } from 'vuex-saga-ts'

export const SagaActions = {
    start:createAction<void>('APPLICATION_START')
}
```
- `createAction` can take two parameters, the first, a required action type string, and then
the second optional payload creator
- The first generic type of createAction is the payload type, and the rest will be input parameter types
of the payload creator function; four subsequent types at most after the payload type
- The return type of createAction is a function whose toString will always return the type string

#### Use `mapSagaActions` to map into methods

```vue
<template>
    <button @click="APPLICATION_START()">Start</button>

</template>
<script>
import Vue from 'vue'
import {mapSagaActions} from 'vuex-saga-ts'
export const SampleComp = Vue.extend({
    methods:{
        ...mapSagaActions(['APPLICATION_START']),    
    }
})
</script>
```
#### Use Composition Api instead to inject

> At my early stage of learning Vue.js, the feature I missed the most is hook-api from react world; 
> thus, with due respect, I will call vue's composition apis into hook apis for short.

Using hooks, components do not need to map methods and passing them around any more. Hooks are the 
ideal wrapper to encapsulate the connection to vuex.

vuex-saga-ts extends the store of vuex with two additional functions

```typescript
    interface Store<S>{
        sagaDispatch:(type:string,payload:any) => void;
        sagaDispatchAction:(action:Action) => void;
    }
```

As you can tell by the type, they are used to dispatch action into saga chanel. Therefore we could 
easily wrapper these action creators into a hook.

*src/composables/compzApplicatoinCtx.ts*
```typescript
import { reactive, toRefs } from '@vue/composition-api';

import { SagaActions } from '@/store/application'

import { mainStoreInjector } from './MainStore'
import {IApplicationState} from "@/store/application/types";

interface IApplicaitonCtx extends IApplicationState{
    actions:{
        start:()=>void;
    }
}

export function compzApplicatoinCtx():IApplicaitonCtx{
    const {store} = mainStoreInjector();

    const applicationsState = reactive(store.state.application);

    return {
        // @ts-ignore
        ...toRefs(applicationsState),
        actions:{
            start: ()=>{store.sagaDispatchAction(SagaActions.start())}
        }
    };

}
```

*src/views/Home.vue*
```vue
<template>
  <div class="home">
    <img
            :class="['animated', 'infinite', {
              'flash': loading,
              'tada' : !loading,
            }]"
            alt="Vue logo" src="../assets/logo.png">

    <h4 v-if="loading">Loading..</h4>
    <h4 v-else>Loaded~</h4>

    <HelloWorld msg="Welcome to Your Vue.js App"/>

  </div>
</template>

<script>
import { onMounted ,createComponent } from '@vue/composition-api';
import { compzApplicatoinCtx } from '@/composables/compzApplicatoinCtx';
import HelloWorld from '@/components/HelloWorld.vue'

export default createComponent({
  name:'home',
  components:{
    HelloWorld
  },
  setup(){
    const {
      loading,
      actions:{start}
    } = compzApplicatoinCtx();

    onMounted(()=>{
      start()
    });

    return {
      loading
    }

  }
})
</script>
```

### Sample Project

This short markdown might not explain all details suggested, thus checking out the sample project in the sample folder 
should bring the gist of using this plugin.

### Credits

This plugin is nothing but a connector. Great thanks to [redux-saga](https://redux-saga.js.org) for rescuing me from the
crisis of handling changing requirements in my previous projects. 


[LICENSE]: ./LICENSE.md
[CHANGELOG]: ./CHANGELOG.md
[version-badge]: https://img.shields.io/badge/version-0.20.2-blue.svg
[license-badge]: https://img.shields.io/badge/license-MIT-green.svg
