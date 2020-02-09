<template>
  <div class="hello">
    <h1>{{ msg }}</h1>


    <h3> Installed </h3>
    <ul class="list-group list-group-horizontal-lg">  
      <%_ if (includeRouter) { -%>
      <li class="list-group-item"> Router </li>
      <%_ } -%>
      <%_ if (includeVuex) { -%>
      <li class="list-group-item"> Vuex </li>
      <%_ } -%>
      <%_ if (includeTypeScript) { -%>
      <li class="list-group-item"> TypeScript </li>
      <%_ } -%>
      <%_ if (includeAxios) { -%>
      <li class="list-group-item"> Axios </li>
      <%_ } -%>
      <%_ if (includeBootstrap) { -%>
      <li class="list-group-item"> Bootstrap </li>
      <li class="list-group-item"> Popper </li>
      <%_ } -%>
      <%_ if (includeSass) { -%>
      <li class="list-group-item"> Sass </li>
      <%_ } -%>
      <%_ if (this.includeBootstrap || this.includeJQuery) { -%>
      <li class="list-group-item"> JQuery </li>    
      <%_ } -%>  
      <%_ if (this.includeBootstrap || this.includeModernizr) { -%>
      <li class="list-group-item"> Modernizr </li>
      <%_ } -%>
      <%_ if (includeAnalytics) { -%>
      <li class="list-group-item"> Google Analytics </li>
      <%_ } -%>
    </ul>
  </div>
</template>


<%_ if (includeTypeScript) { -%>
<script lang="ts">
  import { Component, Prop, Vue } from "vue-property-decorator";

  @Component
  export default class HelloWorld extends Vue {
    @Prop() private msg!: string;
  }
</script>
<%_ } else { -%>
<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  }
};
</script>
<%_ } -%>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
