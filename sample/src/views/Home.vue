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
// @ is an alias to /src
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
      state:{
        loading
      },
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
