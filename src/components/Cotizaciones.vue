<template>
  <div class="app-background">
    <div id="app" class="container">
      <div class="h2 pt-5 mb-3">
        <h2 class="text-white"><b-icon icon="person-badge"></b-icon>Solicitud de cotizaciones</h2>
      </div>
      <!-- Lista de Servidores -->
      <section>
        <!--for demo wrap-->
        <div class="tbl-header">
          <table cellpadding="0" cellspacing="0" border="0">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Descripcion</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
          </table>
        </div>
        <div class="tbl-content">
          <table cellpadding="0" cellspacing="0" border="0">
            <tbody>
              <tr v-for="cotization of cotizations" :key="cotization.id">
                <td>{{cotization.cliente}}</td>
                <td>{{cotization.descripcion}}</td>
                <td>{{cotization.estado}}</td>
                <td>
                  <a href="#" class="btn btn-primary">Atender</a>
                  <a href="#" class="btn btn-danger">Verficar</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <b-modal
        v-model="openModal"
        @ok="cancelarEventoModal"
        title="Ingresa los nuevos datos del servidor"
      >
        <b-form-group label="Nombre">
          <b-form-input
            v-model.trim="nuevoServidor.descripcion"
            placeholder="Ingrese el nombre"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Teléfono">
          <b-form-input
            v-model.trim="nuevoServidor.telefono"
            placeholder="Ingrese el número de teléfono"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Usuario">
          <b-form-input
            v-model.trim="nuevoServidor.usuario"
            placeholder="Ingrese el usuario"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Clave">
          <b-form-input
            v-model.number="nuevoServidor.clave"
            placeholder="Ingrese la clave"
          ></b-form-input>
        </b-form-group>
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
      cotizations: [
        {
          id: 1,
          cliente: "Abraham",
          descripcion: "lorem impsun lorem impsun lorem impsun",
          estado: "No revisado",
        },
        {
          id: 2,
          cliente: "Dayred",
          descripcion: "lorem impsun lorem impsun lorem impsun",
          estado: "Revisado",
        },
        {
          id: 3,
          cliente: "Carlos",
          descripcion: "lorem impsun lorem impsun lorem impsun",
          estado: "No revisado",
        },
      ],
      servidor: {
        descripcion: "",
        telefono: "",
        usuario: "",
        clave: "",
      },
      nuevoServidor: {
        descripcion: "",
        telefono: "",
        usuario: "",
        clave: "",
      },
      validar: {},
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
</style>
