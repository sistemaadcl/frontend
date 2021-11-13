<template>
  <div class="app-background">
    <div id="app" class="container">
      <div class="h2 d-flex justify-content-center pt-5 mb-5 text-white">
        <h2>
          <b-icon icon="person-fill"></b-icon> Agregar nuevo Producto/Catalogo
        </h2>
        <div>
          <b-button
            class="m-0 ml-3"
            variant="warning"
            v-b-modal.modal-prevent-closing
            >Agregar a catalogo</b-button
          >

          <b-modal
            id="modal-prevent-closing"
            ref="modal"
            title="Agregar productos al catalogo"
            @show="resetModal"
            @hidden="resetModal"
            @ok="handleOk"
          >
            <form ref="form" @submit.stop.prevent="handleSubmit">
              <label> Elije un catalogo </label>
              <div>
                <b-form-select
                  v-model="selected"
                  :options="options"
                ></b-form-select>
              </div>
              <label> Elije un producto </label>
              <div>
                <b-form-select
                  v-model="selectedTwo"
                  :options="optionsTwo"
                ></b-form-select>
              </div>
              <div class="mt-3">
                Catalogs: <strong>{{ selected }}</strong>
              </div>
              <div class="mt-3">
                Product: <strong>{{ selectedTwo }}</strong>
              </div>
            </form>
          </b-modal>
        </div>
      </div>

      <!-- Ingrese datos de nuevo cliente -->
      <b-card title="Ingrese datos del producto">
        <b-form-group label-cols-lg="1" label="Nombre">
          <b-form-input
            v-model.trim="product.name"
            placeholder="Ingrese el nombre..."
          ></b-form-input>
        </b-form-group>
        <b-form-group label-cols-lg="1" label="Marca">
          <b-form-input
            v-model.trim="product.brand"
            placeholder="Ingrese el número de Marca..."
          ></b-form-input>
        </b-form-group>
        <b-form-group label-cols-lg="1" label="Precio">
          <b-form-input
            v-model.trim="product.price"
            placeholder="Ingrese el Precio..."
          ></b-form-input>
        </b-form-group>
        <b-form-group label-cols-lg="1" label="Precio Venta">
          <b-form-input
            v-model.number="product.price_sell"
            placeholder="Ingrese el precio de venta..."
          ></b-form-input>
        </b-form-group>
        <b-form-group label-cols-lg="1" label="Cantidad">
          <b-form-input
            v-model.number="product.stock"
            placeholder="Ingrese la cantidad..."
          ></b-form-input>
        </b-form-group>
        <b-button @click.prevent="createdProduct()" variant="primary"
          >Agregar</b-button
        >
      </b-card>
      <!-- Lista de clientes -->
      <div>{{ this.output }}</div>
      <section v-if="products.length > 0">
        <!--for demo wrap-->
        <h1>Seccion de productos</h1>
        <div class="tbl-header">
          <table cellpadding="0" cellspacing="0" border="0">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Marca</th>
                <th>Precio</th>
                <th>Precio de Venta</th>
                <th>Cantidad</th>
                <th>Acciones</th>
              </tr>
            </thead>
          </table>
        </div>
        <div class="tbl-content">
          <table cellpadding="0" cellspacing="0" border="0">
            <tbody>
              <tr v-for="product of products" :key="product.id">
                <td>{{ product.name }}</td>
                <td>{{ product.brand }}</td>
                <td>{{ product.price }}</td>
                <td>{{ product.price_sell }}</td>
                <td>{{ product.stock }}</td>
                <td>
                  <a href="#" class="btn btn-primary">Editar</a>
                  <a href="#" class="btn btn-danger">x</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <div v-else><h2 class="mt-5 text-white">No hay productos...</h2></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mdbTbl, mdbTblHead, mdbTblBody } from "mdbvue";

export default {
  name: "agregar-cliente",
  components: {
    mdbTbl,
    mdbTblHead,
    mdbTblBody,
  },
  data() {
    return {
      output: null,
      products: [],
      catalogs: [],
      options: [],
      optionsTwo: [],
      selected: null,
      selectedTwo: null,
      name: "",
      nameState: null,
      submittedNames: [],
      product: {
        name: "",
        brand: "",
        price: "",
        price_sell: "",
        stock: "",
      },
    };
  },
  mounted() {
    this.getAllProducts();
    this.getAllCatalogs();
    console.log(this.products.length);
  },
  methods: {
    createdProduct() {
      axios
        .post("http://localhost:4000/api/v1/products", this.product)
        .then((data) => {
          this.getAllProducts();
          this.product = {
            name: "",
            brand: "",
            price: "",
            price_sell: "",
            stock: "",
          };
        });
    },
    getAllProducts() {
      axios.get("http://localhost:4000/api/v1/products").then((data) => {
        console.log(data);
        this.products = data.data;
        data.data.forEach((x) => {
          console.log(x);
          this.optionsTwo.push({
            value: x._id,
            text: x.name,
          });
        });
      });
    },
    getAllCatalogs() {
      axios.get("http://localhost:4000/api/v1/catalog").then((data) => {
        data.data.forEach((x) => {
          this.options.push({
            value: x.name,
            text: x.name,
          });
        });
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
      this.selectedTwo = null;
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

      if (this.selected !== null || this.selectedTwo !== null) {
        axios
        .post("http://localhost:4000/api/v1/add/product", {
          name: this.selected,
          products: this.selectedTwo,
        })
        .then((data) => console.log(data));
      }

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
