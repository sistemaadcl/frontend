<template>
  <div class="app-background">
    <div id="app" class="container">
      <div class="h2 pt-5 mb-0">
        <h2 class="text-white"><b-icon icon="list-task"></b-icon> Contabilidad</h2>
      </div>
      <section>
        <div class="tbl-header">
          <table cellpadding="0" cellspacing="0" border="0">
            <thead>
              <tr>
                <th>Orden</th>
                <th>Producto</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
          </table>
        </div>
        <div class="tbl-content">
          <table cellpadding="0" cellspacing="0" border="0">
            <tbody>
              <tr v-for="categoria of categorias" :key="categoria.id">
                <td>{{categoria.orden}}</td>
                <td>{{categoria.producto}}</td>
                <td>{{categoria.estado}}</td>
                <td>
                  <a href="#" class="btn btn-primary">Aprobar</a>
                  <a href="#" class="btn btn-danger">Rechazar</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <b-modal
        v-model="openModal"
        @ok="cancelarEventoModal"
        title="Ingresa los nuevos datos de la categoria"
      >
        <b-form-group label="Nombre">
          <b-form-input
            v-model.trim="nuevaCategoria.tipo"
            placeholder="Ingrese el nombre"
          ></b-form-input>
        </b-form-group>
      </b-modal>
    </div>
  </div>
</template>

<script>

export default {
  name: "Contabilidad",
  data() {
    return {
      categorias: [
        {
          orden: "234h23j423",
          producto: "Jabon liquido",
          estado: "En espera",
        },
        {
          orden: "34k34dfdf",
          producto: "Cloro",
          estado: "Pagado",
        },
        {
          orden: "asds9823",
          producto: "Jabon de cocina",
          estado: "En espera",
        },
      ],
      categoria: {
        tipo: "",
      },
      nuevaCategoria: {
        tipo: "",
      },
      openModal: false,
    };
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
