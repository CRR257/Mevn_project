<template>
  <div id="app">
    <div id="nav">
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/login" v-if="!isActive">Login</router-link> |
      <router-link to="/data" v-if="isActive">Data</router-link>
      <button @click="closeSession()" v-if="isActive">Close Session</button> -->
      <router-link to="/">Home</router-link> |
      <router-link to="/login">Login</router-link> |
      <router-link to="/data">Data</router-link>
      <button @click="closeSession()">Close Session</button>
    </div>
    <router-view/>
  </div>
</template>

<script>

// import { mapActions, mapGetters } from "vuex";

// export default {
//   methods:{
//     ...mapActions(['closeSession', 'readToken'])
//   },
//   computed:{
//     ...mapGetters(['isActive'])
//   },
//   created(){
//     this.readToken();
//   }
// }

</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
