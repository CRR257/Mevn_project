<template>
  <div class="container">
    <b-alert
      :show="dismissCountDown"
      dismissible
      :variant="message.color"
      @dismissed="dismissCountDown = 0"
      @dismiss-count-down="countDownChanged"
    >
      {{ message.text }}
    </b-alert>
    <form @submit.prevent="editData(dataEdited)" v-if="edit">
      <h3 class="text-center">Edit data</h3>
      <input
        type="text"
        placeholder="Add a name"
        class="form-control my-2"
        v-model="dataEdited.name"
      />
      <input
        type="text"
        placeholder="Add description"
        class="form-control my-2"
        v-model="dataEdited.description"
      />
      <b-button class="btn-warning my-2 mx-2" type="submit">Edit</b-button>
      <b-button class="my-2" type="submit" @click="edit = false">Cancel</b-button>

    </form>

     <form @submit.prevent="addingData()" v-if="!edit">
      <h3 class="text-center">Add new data</h3>
      <input
        type="text"
        placeholder="Add a name"
        class="form-control my-2"
        v-model="addData.name"
      />
      <input
        type="text"
        placeholder="Add description"
        class="form-control my-2"
        v-model="addData.description"
      />
      <b-button class="btn-success my-2 btn-block" type="submit">Add</b-button>
    </form>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Description</th>
          <th scope="col">Date</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in data" :key="index">
          <th scope="row">{{ item._id }}</th>
          <td>{{ item.name }}</td>
          <td>{{ item.description }}</td>
          <td>{{ item.date }}</td>
          <td>
            <!-- <b-button @click="alert()">Action</b-button> -->
            <b-button @click="deleteData(item._id)" class="btn-danger btn-sm mx-2">Delete</b-button>
            <b-button @click="activeEditData(item._id)" class="btn-warning btn-sm">Edit</b-button>

          </td>

        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
// import { mapState, mapMutations, mapActions } from "vuex";
// import router from '../router';
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      data: [],
      message: { color: "success", text: "" },
      dismissSecs: 5,
      dismissCountDown: 0,
      addData: { name: "", description: "" },
      dataEdited: {},
      edit: false,
      // user: {email: 'prueba1@bluuweb.cl', password: '123123'},
      // messageLogin: ''
    };
  },
  created() {
    this.getData();
  },
  computed: {
  ...mapState(["token"])
  },
  methods: {
    // ...mapMutations(['getUser']),
    // ...mapActions(['saveUser', 'readToken', 'closeSession']),
    // login(){
    //   this.axios.post('/login', this.user)
    //     .then(res => {
    //       // console.log(res.data.token);
    //       const token = res.data.token;
    //       // this.usuarioDB = res.data.usuarioDB
    //       this.saveUser(token);
    //     })
    //     .catch(err => {
    //       console.log(err.response.data.messageLogin);
    //       this.message = err.response.data.messageLogin;
    //     })
    // },

    getData() {
      let config = {
        headers: {
          token: this.token
        }
      }
      this.axios
        .get("/data", config)
        .then(res => {
          this.data = res.data;
          console.log(res.data);
        })
        .catch(e => {
          console.log(e.response);
        });
    },
    addingData() {
      this.axios
        .post("/new-data", this.addData, config)
        .then(res => {
          this.data.push(res.data);
          this.addData.name = "";
          this.addData.description = "";
          this.message.color = "success";
          this.message.text = "User added correctly";
          this.showAlert();
        })
        .catch(e => {
          if (e.response.data.error.errors.name.message) {
            this.message.text = e.response.data.error.errors.name.message;
          } else {
            this.message.text = "Error system";
          }
          this.showAlert();
          this.message.color = "danger";
          console.log(e.response);
        });
    },
    deleteData(id) {
        console.log(id)
        this.axios
            .delete(`/data/${id}`, id )
            .then(res => {
                const index = this.data.findIndex( item => item._id === res.data._id);
                this.data.splice(index, 1);
                console.log(index)
                console.log(res)
                console.log(this.data)
                this.message.color = "success";
                this.message.text = "user deleted correctly";
                this.showAlert();
            })
            .catch( e => {
                console.log(e.response)
            })
    },
    activeEditData(id) {
        this.edit = true;
        this.axios.get(`/data/${id}`)
        .then(res => {
            this.dataEdited = res.data;
            console.log(this.dataEdited)
        })
        .catch(e => {
            console.log(e.response)
        })

    },
    editData(item){
        this.axios
        .put(`/data/${item._id}`, item)
        // item is the body
        .then(res => {
            const index = this.data.findIndex( n => n._id === res.data._id);
            this.data[index].name = res.data.name;
            this.data[index].description = res.data.description;
            this.message.color = "success";
            this.message.text = "edited data correctly";
            this.showAlert();
            this.edit = false;
        })
        .catch(e => {
            console.log(e.response)
        })
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },
    alert() {
      this.message.color = "danger";
      this.message.text = "alertaaaaaaaa";
      this.showAlert();
    }
  }
};
</script>
