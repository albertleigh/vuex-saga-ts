import { SagaActions } from '@/store/application/actions';

describe('Application actions',()=>{

    describe('act creators',()=>{

        it('start',()=>{
            expect(''+SagaActions.start).toMatchSnapshot('application_saga_act_start_name');
            expect(SagaActions.start()).toMatchSnapshot('application_saga_act_start');
        })

    })

})
