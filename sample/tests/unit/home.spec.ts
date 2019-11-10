import VueCompositionApi from '@vue/composition-api';
import Vuex from 'vuex'

import { mount, createLocalVue } from '@vue/test-utils';

import HomeView from '@/views/Home.vue';

const MainStore = (jest.genMockFromModule('@/composables/MainStore.ts') as any ).default;
const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(VueCompositionApi);

jest.useFakeTimers();


// reserved for back-up for now, feel like, it is impossible to inject a provider via jest/test-tils
// describe('HomeView',()=>{
//
//     it ('compose correctly',()=>{
//         const store = new Vuex.Store({
//             modules:{
//                 application:{
//                     state:{
//                         loading:true,
//                     }
//                 }
//             }
//         });
//         store['sagaDispatchAction'] = jest.fn();
//
//         MainStore.mainStoreInjector=()=>{
//             return { store }
//         }
//
//         const wrapper = mount(HomeView, {store,mocks:{$store:store}, localVue });
//         expect(store['sagaDispatchAction']).not.toHaveBeenCalled();
//         console.log(wrapper.find('h4').text());
//         jest.runTimersToTime(5000);
//         console.log(wrapper.find('h4').text());
//         // expect(store['sagaDispatchAction']).toHaveBeenCalled();
//     })
//
// });
