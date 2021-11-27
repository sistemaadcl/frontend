<template>
  <div>
    <div class="container mt-5">
      <b-card
        title="Bienvenido a la configuracion"
        :sub-title="infoToken.username"
      >
        <hr />
        <b-card-text>
          Esta seccion es dedicada para la configuracion de tu perfil y perfiles
          de usuario, intenta trabajar de manera adecuada con la informacion.
        </b-card-text>
        <div class="container">
          <h4>Tu informacion</h4>
          <div class="d-flex">
            <h5>
              Usuario: <span> {{ userInfo.username }} </span>
            </h5>
          </div>
          <div class="d-flex">
            <h5>
              Email: <span> {{ userInfo.email }} </span>
            </h5>
          </div>
          <div class="d-flex">
            <h5>
              Cuenta creada el: <span> {{ moment(userInfo.updatedAt).format('MMMM d, YYYY') }} </span>
            </h5>
          </div>
        </div>
      </b-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      infoToken: "",
      userInfo: {},
    };
  },
  mounted() {
    this.infoToken = JSON.parse(localStorage.getItem("userInfo")) || [];
    this.getUserById();
  },
  methods: {
    getUserById() {
      console.log(this.infoToken, "data");
      axios
        .get(`http://localhost:4000/api/v1/user/${this.infoToken.id}`)
        .then((data) => {
          this.userInfo = data.data;
        });
    },
  },
};
</script>