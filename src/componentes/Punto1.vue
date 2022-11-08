<template>

  <section class="src-componentes-punto-1">
    <div class="jumbotron">
      <h2>Formulario: Carga de pagos:</h2>
      <hr>
      <br>

      <vue-form :state="formState" @submit.prevent="enviar()">
         
        <!-- Campo nombre -->
        <validate tag="div">
          <label for="nombre">Nombre</label>
          <input 
            id="nombre"
            class="form-control"
            type="text" 
            v-model.trim="formData.nombre" 
            required 
            :minlength="nombreMinLength"
            name="nombre" 
            autocomplete="off"/>

          <field-messages name="nombre" show="$dirty">
            <div slot="required" class="alert alert-danger mt-1">Campo requerido</div>
            <div slot="minlength" class="alert alert-danger mt-1">Este campo debe poseer al menos {{ nombreMinLength }} caracteres.</div>
          </field-messages>
        </validate>

        <validate tag="div">
          <label for="dni">DNI</label>
          <input 
            id="dni"
            class="form-control"
            type="number" 
            v-model.trim="formData.dni" 
            required 
            :minlength="dniLength"
            :maxlength="dniLength"
            name="dni" 
            autocomplete="off"/>

          <field-messages name="dni" show="$dirty">
            <div slot="required" class="alert alert-danger mt-1">Campo requerido</div>
            <div slot="minlength" class="alert alert-danger mt-1">Este campo debe poseer {{ dniLength }} caracteres.</div>
            <div slot="maxlength" class="alert alert-danger mt-1">Este campo debe poseer {{ dniLength }} caracteres.</div>
          </field-messages>
        </validate>

        <validate tag="div">
          <label for="totalAPagar">Total a pagar</label>
          <input 
            id="totalAPagar"
            class="form-control"
            type="number" 
            v-model.trim="formData.totalAPagar" 
            required
            name="totalAPagar" 
            autocomplete="off"/>

          <field-messages name="totalAPagar" show="$dirty">
            <div slot="required" class="alert alert-danger mt-1">Campo requerido</div>
          </field-messages>
        </validate>

        <validate tag="div">
          <label for="pagoEfectuado">Pago Efectuado</label>
          <input 
            id="pagoEfectuado"
            class="form-control"
            type="number" 
            v-model.trim="formData.pagoEfectuado" 
            required
            name="pagoEfectuado" 
            autocomplete="off"/>

          <field-messages name="pagoEfectuado" show="$dirty">
            <div slot="required" class="alert alert-danger mt-1">Campo requerido</div>
          </field-messages>
        </validate>
      
        <button class="btn btn-success my-3" :disabled="formState.$invalid">Enviar</button>

      </vue-form>
      <div v-if="datosRegistrados.length">
        <hr>
        <hr>
        <h1>Registros: </h1>
        <br>
        <table class="table">
          <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Dni</th>
              <th>Total a Pagar</th>
              <th>Pago Efectuado</th>
              <th>Fecha del Registro</th>
          </tr>
          <tr v-for="(pago, index) in datosRegistrados" :key="index" :style="{color: analizarSaldo(pago).color }">
              <td>{{ index + 1 }}</td>
              <td>{{ pago.nombre }}</td>
              <td>{{ pago.dni }}</td>
              <td>{{ pago.totalAPagar }}</td>
              <td>{{ pago.pagoEfectuado }}</td>
              <td>{{ pago.fechaCreacionReg }}</td>
              <td>{{ pago.totalAPagar - pago.pagoEfectuado }}</td>
          </tr>
        </table>
      </div>
    </div>
  </section>

</template>

<script>

  export default  {
    name: 'src-componentes-punto-1',
    props: [],
    mounted () {

    },
    data () {
      return {
        formState: {},
        formData: this.getDataInicial(),
        nombreMinLength: 3,
        dniLength: 8,
        datosRegistrados: [ ]
      }
    },
    methods: {
      getDataInicial() {
        return {
          nombre: null,
          dni: null,
          totalAPagar: null,
          pagoEfectuado: null,
          fechaCreacionReg: null
        }
      },
      enviar() {
        this.formData.fechaCreacionReg = this.obtenerFechaCreacionReg()
        this.datosRegistrados.push({...this.formData})
        this.formData = this.getDataInicial()
        this.formState._reset()
      },
      obtenerFechaCreacionReg() {
        return new Date().toLocaleString()
      },
      analizarSaldo(pago) {
        let dif = pago.totalAPagar - pago.pagoEfectuado
        let color = '#080'
        if(dif < 0) color = '#00F'
        if(dif > 0) color = '#F00'
        return {
          valor : dif,
          color
        }
      }

    },
    computed: {

    }
}


</script>

<style scoped lang="css">

</style>
