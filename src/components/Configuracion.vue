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
        <hr />
        <div class="d-flex">
          <h4>Agrega un rol a un usuario</h4>
          <div>
            <b-button
              class="m-0 ml-3"
              variant="primary"
              v-b-modal.modal-prevent-closing
              >Configurar Usuario</b-button
            >

            <b-modal
              id="modal-prevent-closing"
              ref="modal"
              title="Submit Your Name"
              @show="resetModal"
              @hidden="resetModal"
              @ok="handleOk"
            >
              <form ref="form" @submit.stop.prevent="handleSubmit">
                <div class="d-flex">
                  <h2 class="mr-1"><b-badge>admin</b-badge></h2>
                  <h2 class="mr-1"><b-badge>invent</b-badge></h2>
                  <h2 class="mr-1"><b-badge>sale</b-badge></h2>
                  <h2 class="mr-1"><b-badge>cont</b-badge></h2>
                </div>
                <label> Elije un usuario </label>
                <div>
                  <b-form-select
                    v-model="selected"
                    :options="options"
                  ></b-form-select>
                </div>
                <b-form-group
                  class="mt-2"
                  label="Escribe un rol"
                  label-for="name-input"
                  invalid-feedback="Name is required"
                  :state="nameState"
                >
                  <b-form-input
                    id="name-input"
                    v-model="name"
                    :state="nameState"
                    required
                  ></b-form-input>
                </b-form-group>
                <div class="mt-3">
                  Selected: <strong>{{ selected }}</strong>
                </div>
              </form>
            </b-modal>
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
      name: "",
      nameState: null,
      submittedNames: [],
      options: [],
      selected: null,
      infoToken: "",
      userInfo: {},
    };
  },
  mounted() {
    this.getUsers();
    this.infoToken = JSON.parse(localStorage.getItem("userInfo")) || [];
    this.getUserById();
  },
  methods: {
    getUsers() {
      axios.get("http://localhost:4000/api/v1/user").then((data) => {
        data.data.forEach((x) => {
          this.options.push({
            value: x.username,
            text: x.username,
          });
        });
      });
    },
    getUserById() {
      console.log(this.infoToken, "data");
      axios
        .get(`http://localhost:4000/api/v1/user/${this.infoToken.id}`)
        .then((data) => {
          this.userInfo = data.data;
          console.log(this.userInfo);
        });
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      this.nameState = valid;
      return valid;
    },
    resetModal() {
      this.name = "";
      this.nameState = null;
      this.selected = null;
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }
      // Push the name to submitted names
      this.submittedNames.push(this.name);

      axios
        .post("http://localhost:4000/api/v1/user/update/rol", {
          username: this.selected,
          roles: this.name,
        })
        .then((data) => console.log(data));

      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide("modal-prevent-closing");
      });
    },
  },
};
</script>