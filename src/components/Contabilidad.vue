<template>
  <div class="app-background">
    <div id="app" class="container" v-if="cotizations.length >= 1">
      <div class="h2 pt-5 mb-0">
        <h2 class="text-white">
          <b-icon icon="list-task"></b-icon> Contabilidad
        </h2>
      </div>
      <section>
        <div class="tbl-header">
          <table cellpadding="0" cellspacing="0" border="0">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Estado</th>
                <th>Orden</th>
                <th>Acciones</th>
              </tr>
            </thead>
          </table>
        </div>
        <div class="tbl-content">
          <table cellpadding="0" cellspacing="0" border="0">
            <tbody>
              <tr
                v-for="cotization of cotizations"
                :key="cotization._id"
                v-b-modal.modal-1
                @click="loadModal(cotization._id), getOrderByCotization(cotization._id)"
              >
                <td>{{ cotization.name }}</td>
                <td>{{ cotization.state && "Pagado" }}</td>
                <td>{{ cotization.state && "Procesando" }}</td>
                  <td>
                    <button
                      @click="handleApprove(cotization._id)"
                      class="btn btn-primary"
                    >
                      Aprobar
                    </button>
                    <a href="#" class="btn btn-danger">Rechazar</a>
                  </td>
                <div v-if="cotization._id === id">
                  <b-modal id="modal-1" title="Cotizaciones de clientes">
                    <div class="d-flex flex-column justify-content-center align-items-center">
                      <h2>Detalles</h2>
                      <p><strong>Nombre: </strong>{{cotization.name}}</p>
                      <p><strong>Estado: </strong>{{cotization.state ? "Pagado" : "Procesando"}}</p>
                      <p><strong>Oferta: </strong>{{cotization.offer ? "Si" : "No"}}</p>
                      <p><strong>Cliente: </strong>{{cotization.clients[0].name}} {{cotization.clients[0].lastname}}</p>
                      <p><strong>DNI: </strong>{{cotization.clients[0].dni}}</p>
                      <div :key="order._id" v-for="order of orders"
                      class="d-flex flex-column justify-content-center align-items-center"
                      >
                        <h2>Orden de compra</h2>
                        <p><strong>Tracking: </strong>{{order.tracking}}</p>
                        <p><strong>Nombre de Orden: </strong>{{order.name}}</p>
                      </div>
                    </div>
                </b-modal>
                </div>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
    <div class="mt-5" v-else>
      <h3 class="text-white">No hay nada que mostrar...</h3>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export default {
  name: "Contabilidad",
  data() {
    return {
      cotizations: [],
      orders: [],
      data: [],
      id: ""
    };
  },
  mounted() {
    this.getCotizationsPay();
  },
  methods: {
    getCotizationsPay() {
      axios.get("http://localhost:4000/api/v1/cotization/pay").then((data) => {
        this.cotizations = data.data;
        console.log(data.data);
      });
    },
    loadModal(id){
      this.id = id;
    },
    getOrderByCotization(id){
      axios.get(`http://localhost:4000/api/v1/orders/cotization/${id}`)
        .then( data => {
          this.orders = data.data
        })
    },
    handleApprove(id) {
      axios
        .post("http://localhost:4000/api/v1/create/order", {
          name: uuidv4(),
          id: id,
        })
        .then((data) =>
          this.$vToastify.success("Orden enviada a inventario correctamente")
        );
    },
  },
};
</script>
<style>
body {
  background: -webkit-linear-gradient(left, #25c481, #25b7c4);
  background: linear-gradient(to right, #25c481, #25b7c4);
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
