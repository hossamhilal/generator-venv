<template>
  <div class="home">
    <img alt="Vue logo" src="@/assets/imgs/logo.png" />
    <HelloWorld msg="Welcome to Venv Generator" />  
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  components: {
    HelloWorld
  }
};
</script>
