<template>
  <div class="app-background">
    <div id="app" class="container" v-if="orders.length >= 1">
      <div class="h2 pt-5 mb-0">
        <h2  class="text-white"><b-icon icon="wrench"></b-icon> Inventario</h2>
      </div>
      <section>
        <div class="tbl-header">
          <table cellpadding="0" cellspacing="0" border="0">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Estado</th>
                <th>Cotizacion</th>
              </tr>
            </thead>
          </table>
        </div>
        <div class="tbl-content">
          <table cellpadding="0" cellspacing="0" border="0">
            <tbody>
              <tr v-for="product of orders" :key="product.id">
                <td>{{ product.name }}</td>
                <td>{{ product.state && "Procesado" }}</td>
                <td>{{ product.cotizations[0] }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
    <div class="mt-5" v-else> <h3 class="text-white"> No hay ordenes que mostrar </h3> </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "agregar-servicio",
  data() {
    return {
      orders: [],
    };
  },
  mounted(){
    this.getAllOrders()
  },
  methods: {
    getAllOrders() {
      axios.get( "http://localhost:4000/api/v1/orders" )
        .then( data => {
          console.log(data.data);
          this.orders = data.data
        })
    }
  }
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
