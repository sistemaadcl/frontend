<template>
  <div class="app-background">
    <div id="app" class="container">
      <div class="abs-center">
        <b-card title="Iniciar sesión" style="max-width: 20rem;">
          <img src="../assets/logo.jpg" width="80" />
          <b-card-body>
            <form>
              <b-form-input
                type="text"
                v-model="usuario"
                placeholder="Usuario..."
                class="mb-2 my-3"
              ></b-form-input>
              <b-form-input
                type="password"
                v-model="clave"
                placeholder="Contraseña..."
                class="my-3"
              ></b-form-input>
              <b-button
                variant="outline-warning"
                :disabled="usuario && clave ? false : false"
                @click="enviarDatos"
                class="my-2"
              >
                Iniciar sesión
              </b-button>
              <router-link to="/">
                <a>Registrarse</a>
              </router-link>
            </form>
          </b-card-body>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import jwt_decode from "jwt-decode";

export default {
  name: "Login",
  data() {
    return {
      usuario: "",
      clave: "",
    };
  },
  methods: {
    enviarDatos() {
      const This = this;
      if (!this.usuario.length || !this.clave.length) {
        return This.$vToastify.info("Llena todos los datos para continuar");
      }
      axios
        .post("http://localhost:4000/api/v1/user/login", {
          username: This.usuario,
          password: This.clave,
        })
        .then((res) => {
          if (res.status == 200) {
            localStorage.setItem("token", res.data.token);
            This.$vToastify.success("Logueado con exito");
            const token = res.data.token;
            const decoded = jwt_decode(token);
            localStorage.setItem("userInfo", JSON.stringify(decoded));
            switch (decoded.role) {
              case "admin":
                This.$router.push("/crear-promociones");
                break;
              case "sale":
                This.$router.push("/crear-promociones");
                break;
              case "invent":
                This.$router.push("/servicios");
                break;
              case "cont":
                This.$router.push("/contabilidad");
                break;
              default:
                break;
            }
          } else {
            This.$vToastify.error("valida tus datos");
          }
        })
        .catch(() => {
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
</style>
