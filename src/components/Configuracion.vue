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
      axios
        .get(`http://localhost:4000/api/v1/user/${this.infoToken.id}`)
        .then((data) => {
          this.userInfo = data.data;
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