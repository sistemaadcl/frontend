<template>
  <div>
    <b-navbar toggleable="lg" type="light" variant="light" class="px-5">
      <b-navbar-brand href="#"
        ><img src="../assets/logo.jpg" width="25" class="mb-1" /> Sistema
        ADCL</b-navbar-brand
      >
      <b-navbar-toggle target="nav-collapse">
        <b-icon icon="three-dots" variant="info"></b-icon
      ></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav class="d-flex justify-content-end">
        <b-navbar-nav v-if="$route.name !== 'Principal'" class="px-5">
          <mdb-dropdown tag="li" class="nav-item">
            <mdb-dropdown-toggle tag="a" navLink color="gray" slot="toggle" waves-fixed>{{
              infoToken.username
            }}</mdb-dropdown-toggle>
            <mdb-dropdown-menu>
              <mdb-dropdown-item>
                <div
                  class="d-flex"
                  v-if="infoToken.role == 'cont' || infoToken.role == 'admin'"
                >
                  <b-dropdown-item to="/contabilidad"
                    ><b-icon icon="list-task"></b-icon> Contabilidad
                  </b-dropdown-item>
                </div></mdb-dropdown-item
              >
              <mdb-dropdown-item>
                <div
                  class="d-flex"
                  v-if="infoToken.role == 'invent' || infoToken.role == 'admin'"
                >
                  <b-dropdown-item to="/servicios"
                    ><b-icon icon="envelope"></b-icon> Inventario
                  </b-dropdown-item>
                </div></mdb-dropdown-item
              >
              <div>
                <div
                  class=""
                  v-if="infoToken.role == 'sale' || infoToken.role == 'admin'"
                >
                  <mdb-dropdown-item to="/cotizaciones" exact
                    ><b-icon icon="cloud-upload"></b-icon> Ventas Cotizaciones
                  </mdb-dropdown-item>
                  <mdb-dropdown-item to="/crear-promociones" exact
                    ><b-icon icon="tag-fill"></b-icon> Ventas
                    Catalogo</mdb-dropdown-item
                  >
                </div></div
              >
              <div class="dropdown-divider"></div>
              <mdb-dropdown-item>Separated link</mdb-dropdown-item>
            </mdb-dropdown-menu>
          </mdb-dropdown>
          <b-nav-item @click="logout">Salir</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav v-if="$route.name === 'Principal'" class="ml-auto fixed">
          <b-nav-item to="/">Registrarme</b-nav-item>
          <b-nav-item to="/login">Iniciar</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import {
  mdbDropdown,
  mdbDropdownItem,
  mdbDropdownMenu,
  mdbDropdownToggle,
} from "mdbvue";
export default {
  name: "Navbar",
  components: {
    mdbDropdown,
    mdbDropdownItem,
    mdbDropdownMenu,
    mdbDropdownToggle,
  },
  data() {
    return {
      infoToken: "",
    };
  },
  methods: {
    logout() {
      const This = this;
      localStorage.removeItem("token");
      localStorage.removeItem("userInfo");
      This.$router.go("/login");
    },
  },
  created() {
    this.infoToken = JSON.parse(localStorage.getItem("userInfo")) || [];
  },
};
</script>

<style>
  .dropdown{
    box-shadow: 0;
  }
</style>