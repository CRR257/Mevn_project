<template>
  <div class="container">
     <h1>Login</h1>
    <form @submit.prevent="login">
      <input
        type="text"
        class="form-control my-2"
        placeholder="email"
        v-model="user.email"
      />
      <input
        type="text"
        class="form-control my-2"
        placeholder="pass"
        v-model="user.password"
      />
      <b-button type="submit" >Login!</b-button>
    </form>
    <div v-if="messageLogin !== ''">
      <p>{{messageLogin}}</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import router from '../router';

export default {
  data() {
    return {
      user: {email: 'email@gmail.com', password: ''},
      messageLogin: ''
    };
  },
  methods: {
    ...mapMutations(['getUser']),
    ...mapActions(['saveUser', 'readToken', 'closeSession']),
    login(){
      this.axios.post('/login', this.user)
        .then(res => {
          // console.log(res.data.token);
          const token = res.data.token;
          // this.userDB = res.data.userDB
          this.saveUser(token);
        })
        .catch(err => {
          console.log(err.response.data.messageLogin);
          this.message = err.response.data.messageLogin;
        })
    },
  }
};
</script>

