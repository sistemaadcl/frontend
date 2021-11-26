<template>
  <div class="app-background">
    <div id="app" class="container">
      <!-- <img src="../assets/svgs/pass.svg"> -->
      <div class="abs-center">
        <b-card title="Registrarse" style="max-width: 20rem">
          <img src="../assets/logo.jpg" width="80" class="" />
          <b-card-body>
            <form>
              <b-form-input
                type="email"
                v-model="email"
                placeholder="Email..."
                class="mb-2 my-3"
              ></b-form-input>
              <b-form-input
                type="text"
                v-model="username"
                placeholder="Usuario..."
                class="mb-2 my-3"
              ></b-form-input>
              <b-form-input
                type="password"
                v-model="password"
                placeholder="Contraseña..."
                class="my-3"
              ></b-form-input>
              <div>
                <b-form-select
                  v-model="selected"
                  :options="options"
                ></b-form-select>
              </div>
              <b-button
                variant="outline-warning text-black"
                :disabled="username && password && email ? false : false"
                @click="enviarDatos"
                class="my-2 btn"
              >
                Registrarse
              </b-button>
            </form>
            <b-row>
              <b-col class="my-2">
                <router-link to="/login">
                  <a>Ir al inicio de sesión</a>
                </router-link>
              </b-col>
            </b-row>
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
      email: "",
      username: "",
      password: "",
      options: [],
      selected: null
    };
  },
  mounted(){
    this.getRoles()
  },

  methods: {
    getRoles(){
      axios
        .get("http://localhost:4000/api/v1/roles")
        .then( data => {
          console.log(data);
          data.data.forEach( roles => {
            console.log(roles);
            this.options.push(roles.name)
          })
        })
    },
    enviarDatos() {
      const This = this;
      if (
        !this.username.length ||
        !this.password.length ||
        !this.email.length
      ) {
        return This.$vToastify.info("Llena todos los datos para continuar");
      }
      axios
        .post("http://localhost:4000/api/v1/user/register", {
          username: This.username,
          email: This.email,
          password: This.password,
          roles: This.selected
        })
        .then((res) => {
          console.log(res);
          if (res.status == 200) {
            This.$vToastify.success(
              "Registrado con exito, prueba iniciando sesión"
            );
            This.$router.push("/login");
          } else {
            This.$vToastify.error("valida tus datos");
          }
        })
        .catch((error) => {
          This.$vToastify.error("Ha ocurrido un error");
        });
    },
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
