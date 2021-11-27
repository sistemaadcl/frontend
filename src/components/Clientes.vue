<template>
  <div class="app-background">
    <div id="app" class="container">
      <div class="mt-5 text-white">
          <h1>Bienvenido al panel de registro de clientes</h1>
      </div>
      <div class="abs-center">
        <b-card title="Nuevo Cliente" style="max-width: 20rem">
          <img src="../assets/logo.jpg" width="80" class="" />
          <b-card-body>
            <form>
              <b-form-input
                type="text"
                v-model="client.name"
                placeholder="Nombre..."
                class="mb-2 my-3"
              ></b-form-input>
              <b-form-input
                type="text"
                v-model="client.lastname"
                placeholder="Apellido..."
                class="mb-2 my-3"
              ></b-form-input>
              <b-form-input
                type="text"
                v-model="client.dni"
                placeholder="DNI..."
                class="my-3"
              ></b-form-input>
              <b-button
                variant="outline-warning text-black"
                :disabled="client.name && client.lastname && client.dni ? false : false"
                @click="enviarDatos"
                class="my-2 btn"
              >
                Registrarse
              </b-button>
            </form>
          </b-card-body>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "registro",
  data() {
    return {
        client: {},
    };
  },
  mounted(){
  },

  methods: {
      enviarDatos(){
          axios.post("http://localhost:4000/api/v1/client", this.client )
            .then( data => {
                this.$vToastify.success("Cliente registrado correctamente")
                this.client = {}
            } )
      }
  },
};
</script>

<style>
body {
  background: -webkit-linear-gradient(left, #25c481, #25b7c4);
  background: linear-gradient(to right, #25c481, #25b7c4);
}
/* Centrado absoluto, vertical y horizontalmente
  con display: flex; se vuelve un elemento flex
  y con align-items: center se centra horizontalmente*/
.abs-center {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}
.app-background {
}

.btn {
  color: black;
}

img {
  border-radius: 25px;
}
</style>
