<template>
    <div id="app" class="app">
        <%_ if (includeRouter) { -%>
        <div class="appNav">
            <img alt="Vue logo" src="./assets/imgs/logo.png" />
            <div id="nav" class="nav">
                <router-link to="/">Home</router-link> 
                <router-link to="/about">About</router-link>
            </div>
        </div>
        <router-view />      
        <%_ } else { -%>
        <img alt="Vue logo" src="./assets/imgs/logo.png" /> 
        <HelloWorld msg="Welcome to Venv Generator" />      
        <%_ } -%>        
    </div>
</template>

<%_ if (!includeRouter && !includeTypeScript) { -%>
<script>
import HelloWorld from './components/HelloWorld.vue';

export default {
    name: 'app',
    components: {
        HelloWorld
    }
};
</script>
<%_ } -%>

<style lang="scss">
body {
  margin: 0;
}

.app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}


<%_ if (includeRouter) { -%>

.appNav {
    display: flex;
    justify-content: flex-end;
    height: 100px;
    background: #e01e2e;

    img {
      position: absolute;
      left: 0;
      width: 70px;
      margin: 10px 30px;
    }

    .nav {
      height: 100%;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      padding: 0 30px;

      a {
        color: #f5d08c;
        font-size: 25px;
        text-decoration: none;
        padding: 0 20px;
        height: 100%;
        display: flex;
        align-items: center;
        text-transform: uppercase;

        &.router-link-exact-active {
          color: #fff;
          background: #060607;
          position: relative;

          &::after {
            content: "";
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 5px;
            background: #e01e2e;
          }
        }
      }
    }
}

<%_ } -%>
</style>
