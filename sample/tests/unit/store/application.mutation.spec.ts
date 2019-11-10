import { MutationsActions, mutations } from '@/store/application/mutations';


describe('Application mutations',()=>{

    describe('act creators',()=>{

        it('ready',()=>{
            expect(''+MutationsActions.ready).toMatchSnapshot('application_mut_act_ready_name');
            expect(MutationsActions.ready()).toMatchSnapshot('application_mut_act_ready');
        })

    })

    describe('mutator',()=>{

        it('ready',()=>{
            const initSate = {
                loading: true,
            };
            expect(initSate).toMatchSnapshot('before ready mutator');
            mutations[''+MutationsActions.ready](initSate);
            expect(initSate).toMatchSnapshot('after ready mutator');
        })

    })

})
