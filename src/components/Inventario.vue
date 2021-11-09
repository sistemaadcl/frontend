<template>
   <div id="app" class="container mt-5">
       <div class="alert alert-primary" role="alert">
            <h2 class="d-flex mx-auto text-dark text-white">Inventario</h2>
            </div>
            <div v-if="productos.length">
              <!-- inventario -->
              <b-card class="mt-3">
                  <h4 class="text-white">Inventario</h4>
                  <div class="mt-3" v-for="(item, index) of productosTimeFormated">
                      <div class="alert alert-primary" role="alert">
                          <div class="d-flex justify-content-between align-items-center">
                              <div>
                              <b> Producto: </b>  {{item.nombre}} <b>Precio de Venta:</b> {{item.precioVenta}} Bs. <b>fecha: </b>  {{item.createdAt}}
                              <b> Marca: </b> {{item.marca}}
                              </div>
                              <div>
                                  <button class="btn btn-danger btn-sm" @click="abrirModal(item._id, index)">Edit</button>
                                  <button class="btn btn-danger btn-sm" @click="deleteProduct(item._id)">x</button>
                              </div>
                          </div>
                      </div>
                  </div>
              </b-card>
              <!-- Lista de precios -->
              <b-card class="mt-3 mb-3">
                <h3>Lista de Precios </h3>
                <b-container class="bv-example-row">
                    <b-row>
                        <b-col><b>Nombre del producto</b></b-col>
                        <b-col><b>Marca</b></b-col>
                        <b-col><b>Precio Bs:</b> </b-col>
                    </b-row>
                </b-container>
                <div class="mt-3" v-for="(item, index) of productos">
                    <b-container class="bv-example-row">
                    <b-row>
                        <b-col>{{item.nombre}}</b-col>
                        <b-col>{{item.marca}}</b-col>
                        <b-col>{{item.precioVenta}}</b-col>
                    </b-row>
                </b-container>
                </div>
            </b-card>
            <b-modal
                id="modal-prevent-closing"
                v-model="openModal"
                @ok="handleOk"
                title="Ingresa nuevos datos del producto"  
                header-bg-variant="Black"
              >
                <form @submit.prevent="handleSubmit">
                  <b-form-group
                    label="Nombre:"  
                  >
                    <b-form-input v-model="newProducto.nombre" :placeholder="productos[indexProduct].nombre"></b-form-input>
                  </b-form-group>
                  <b-form-group
                    label="Marca:"  
                  >
                    <b-form-input v-model="newProducto.marca" :placeholder="productos[indexProduct].marca"></b-form-input>
                  </b-form-group>
                  <b-form-group
                    label="Precio de compra:"  
                  >
                    <b-form-input v-model="newProducto.precioCompra" :placeholder="productos[indexProduct].precioCompra"></b-form-input>
                  </b-form-group>
                  <b-form-group
                    label="Precio de venta:"  
                  >
                    <b-form-input v-model="newProducto.precioVenta" :placeholder="productos[indexProduct].precioVenta"></b-form-input>
                  </b-form-group>
                </form>
              </b-modal>
            </div>
        </div>
</template>

<script>
import axios from "axios"

export default {
    name: 'Inventario',
    data(){
        return{
            moreProducts: false,
            countProducts: '',
            productos: [],
            producto: {
                nombre: '',
                marca: '',
                precioCompra: '',
                precioVenta: '',
            },
            newProducto: {
                nombre: '',
                marca: '',
                precioCompra: '',
                precioVenta: '',
            },
            idProduct: '',
            openModal: false,
            indexProduct: 0,
        }
    },
}
</script>