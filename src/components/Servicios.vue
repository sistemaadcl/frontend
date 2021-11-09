<template>
  <div class="app-background">
    <div id="app" class="container">
      <div class="h2 pt-5 mb-0">
        <h2  class="text-white"><b-icon icon="wrench"></b-icon> Inventario</h2>
      </div>
      <!-- Lista de servicios -->
      <b-card title="Ordenes aprobadas" class="mt-3">
        <b-list-group v-if="servicios && servicios.length">
          <b-list-group-item
            v-for="item of servicios"
            :key="'servicio' + item.id_servicio"
          >
            <b>Orden:</b> {{ item.orden }} - <b>Producto:</b>
            {{ item.producto }} <b>Estado:</b> {{ item.estado }}
          </b-list-group-item>
        </b-list-group>
        <div v-else>
          <p>No hay servicios registrados</p>
        </div>
      </b-card>
      <b-modal
        v-model="openModal"
        @ok="cancelarEventoModal"
        title="Ingresa los nuevos datos del servicio"
      >
        <b-form-group label="Nombre">
          <b-form-input
            v-model.trim="nuevoServicio.descripcion"
            placeholder="Ingrese el nombre"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Categoria">
          <b-form-select
            v-model="nuevoServicio.id_categoria"
            :options="categorias"
            value-field="id_categoria"
            text-field="tipo"
          >
            <template #first>
              <b-form-select-option value="" disabled
                >Selecciona una categoria</b-form-select-option
              >
            </template>
          </b-form-select>
        </b-form-group>
        <b-form-group label="Monto">
          <b-form-input
            v-model.number="nuevoServicio.monto"
            placeholder="Ingrese el monto"
          ></b-form-input>
        </b-form-group>
      </b-modal>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "agregar-servicio",
  data() {
    return {
      servicios: [
        {
          orden: "234h23j423",
          producto: "Jabon liquido",
          estado: "Aprobado",
        },
        {
          orden: "34k34dfdf",
          producto: "Cloro",
          estado: "Aprobado",
        },
        {
          orden: "asds9823",
          producto: "Jabon de cocina",
          estado: "Aprobado",
        },
      ],
      categorias: [],
      servicio: {
        descripcion: "",
        id_categoria: "",
        monto: "",
      },
      nuevoServicio: {
        descripcion: "",
        id_categoria: "",
        monto: "",
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
</style>
