<template>
  <div class="app-background">
    <div id="app" class="container" v-if="cotizations.length >= 0">
      <div class="h2 pt-5 mb-3">
        <h2 class="text-white">
          <b-icon icon="person-badge"></b-icon>Solicitud de cotizaciones
        </h2>
      </div>
      <!-- Lista de Servidores -->
      <section>
        <!--for demo wrap-->
        <div class="tbl-header">
          <table cellpadding="0" cellspacing="0" border="0">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Oferta</th>
                <th>Promocion</th>
                <th>Acciones</th>
              </tr>
            </thead>
          </table>
        </div>
        <div class="tbl-content">
          <table cellpadding="0" cellspacing="0" border="0">
            <tbody>
              <tr v-for="cotization of cotizations" :key="cotization.id">
                <td>{{ cotization.name }}</td>
                <td>{{ cotization.offer ? "si" : "no" }}</td>
                <td>{{ cotization.state ? "Pagado" : "No Pagado" }}</td>
                <td>
                  <button
                    v-b-modal.modal-prevent-closing
                    class="btn btn-primary"
                    @click="verifyId(cotization._id)"
                  >
                    Atender
                  </button>
                  <button
                    v-b-modal.modal-1
                    class="btn btn-warning"
                    @click="getAllData(cotization._id)"
                  >
                    Verificar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
    <div class="mt-5" v-else> <h3 class="text-white"> No hay cotizaciones que mostrar... </h3> </div>
    <!-- Modal agregar cotizacion al cliente -->
    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Buscar un cliente"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <label> Elije un usuario </label>
        <div>
          <b-form-select v-model="selected" :options="options"></b-form-select>
        </div>
        <div class="mt-3">
          Selected: <strong>{{ selected }}</strong>
        </div>
      </form>
    </b-modal>
    <div>
      <b-modal id="modal-1" title="Cotizaciones de clientes">
        <div v-for="(res, i) of data" :key="res.id">
          <div class="container w-full">
            <h4 class="text-center"> Cotizacion {{i + 1}} </h4>
            <hr>
            <p class="font-weight-bold">Nombre del cliente: <span class="font-weight-normal"> {{res.name}} {{res.lastname}} </span></p>
            <p class="font-weight-bold">DNI: <span class="font-weight-normal"> {{res.dni}} </span></p>
            <div v-for="(product, i) of products" :key="product.id">
              <hr>
              <p class="font-weight-bold">Producto: {{i + 1}}  <span class="font-weight-normal"> {{product.name}}$ </span></p>
              <p class="font-weight-bold">Precio a pagar: {{i + 1}}  <span class="font-weight-normal"> {{product.price_sell}}$ </span></p>
              <hr>
            </div>
            <h4>Monto Total: {{ totalPriceSell }}$</h4>
            <hr>
          </div>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Cotizaciones",
  data() {
    return {
      cotizations: [],
      clients: [],
      products: [],
      data: [],
      id: "",
      submittedNames: [],
      options: [],
      selected: null,
    };
  },
  computed: {
    totalPriceSell(){
      let sum = 0;
      this.products.forEach( x => {
        sum += (parseInt(x.price_sell));
      } )
      return sum
    }
  },
  mounted() {
    this.getAllCatalogs();
    this.getAllClients();
  },
  methods: {
    getAllCatalogs() {
      axios.get("http://localhost:4000/api/v1/cotization").then((data) => {
        this.cotizations = data.data;
      });
    },
    getAllClients() {
      axios.get("http://localhost:4000/api/v1/client").then((data) => {
        this.clients = data.data;
        data.data.forEach((x) => {
          this.options.push({
            value: x._id,
            text: `${x.name} ${x.lastname} `,
          });
        });
      });
    },
    getAllData(id) {
      axios
        .get(`http://localhost:4000/api/v1/cotization/client/${id}`)
        .then((data) => {
          (this.data = data.data.clients)
          data.data.catalog.forEach( x => {
            this.products = x.products
            console.log(this.products);
          } )
        });
    },
    verifyId(id) {
      this.id = id;
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
        .post("http://localhost:4000/api/v1/add/cotization", {
          idClient: this.selected,
          idCotization: this.id,
        })
        .then((data) => {
          axios
            .post("http://localhost:4000/api/v1/add/client", {
              clientId: this.selected,
              cotizationId: this.id,
            })
            .then((data) => console.log(data, "client"));
        });

      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide("modal-prevent-closing");
      });
    },
  },
};
</script>
<style>
body {
  background: -webkit-linear-gradient(left, #25c481, #25b7c4);
  background: linear-gradient(to right, #25c481, #25b7c4);
  font-family: "Roboto", sans-serif;
}
h1 {
  font-size: 30px;
  color: #fff;
  text-transform: uppercase;
  font-weight: 300;
  text-align: center;
  margin-bottom: 15px;
}
table {
  width: 100%;
  table-layout: fixed;
}
.tbl-header {
  background-color: rgba(255, 255, 255, 0.3);
  background: -webkit-linear-gradient(left, #1b9e67, #1e96a1);
  background: linear-gradient(to right, #1b9e67, #1e96a1);
  border: 1px solid #3b9ea5;
}
.tbl-content {
  height: 300px;
  overflow-x: auto;
  margin-top: 0px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: -webkit-linear-gradient(left, #1b9e67, #1e96a1);
  background: linear-gradient(to right, #1b9e67, #1e96a1);
  border: 1px solid #3b9ea5;
}
th {
  padding: 20px 15px;
  text-align: left;
  font-weight: 500;
  font-size: 12px;
  color: #fff;
  text-transform: uppercase;
}
td {
  padding: 15px;
  text-align: left;
  vertical-align: middle;
  font-weight: 300;
  font-size: 12px;
  color: #fff;
  border-bottom: solid 1px rgba(255, 255, 255, 0.1);
}

/* demo styles */

section {
  margin: 50px 0px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* follow me template */
.made-with-love {
  margin-top: 40px;
  padding: 10px;
  clear: left;
  text-align: center;
  font-size: 10px;
  font-family: arial;
  color: #fff;
}
.made-with-love i {
  font-style: normal;
  color: #f50057;
  font-size: 14px;
  position: relative;
  top: 2px;
}
.made-with-love a {
  color: #fff;
  text-decoration: none;
}
.made-with-love a:hover {
  text-decoration: underline;
}

/* for custom scrollbar for webkit browser*/

::-webkit-scrollbar {
  width: 6px;
}
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}
::-webkit-scrollbar-thumb {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}
</style>
