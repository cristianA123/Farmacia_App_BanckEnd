<template>
  <div>
    <div class="display-1 mb-4">Mostrar Creditos</div>
    <v-card class="pa-4">
      <div>
        <div class="mb-4">
          <h3 class="mb-2">Autenticación</h3>
          <span> 
            Permite consulta el consumo de los créditos de su usuario. Para su uso es necesario
            indicar la IP desde donde se consumirá el servicio y un usuario y clave con acceso a la
            plataforma web de gestion <a href="http://app.enviamas.pe/">https://app.enviamas.pe</a>.
          </span>
          <!-- <textarea ref="textarea" v-model="content"></textarea> -->
        </div>
  
        <div class="editor mb-4">
          <h3>Endpoint</h3>
          <span>
            La API está disponible en el siguiente endpoint:
          </span>
          <v-row class="justify-end ma-0">
            <v-btn
              class="rounded-b-0"
              dark
              small
              color="#272822"
              @click="copyCode('content')"
            >Copy code<v-icon>mdi-content-copy</v-icon></v-btn>
          </v-row>
          <textarea id="content" ref="content" v-model="content"></textarea>
        </div>

        <div class="editor mb-4">
          <h3 class="mb-2">Metodos</h3>
          <span>
            <v-chip
              class="mr-1 font-weight-black"
              dense
              label
              color="#FF7901"
              x-small
              dark
            >
              GET
            </v-chip> para obtener datos.
          </span>
        </div>

        <div class="editor">
          <h3 class="mb-2">Respuesta</h3>
          <textarea ref="respuesta" v-model="respuesta"></textarea>
          <v-simple-table dark class="my-3">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">
                    Status Code
                  </th>
                  <th class="text-left">
                    Descripciòn
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in respuestas"
                  :key="item.status"
                >
                  <td>{{ item.status }}</td>
                  <td>{{ item.descripcion }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        
        <!-- <span>
          La API devuelve las siguientes respuestas:<br>
          200 OK: la solicitud se realizó correctamente.<br>
          201 Created: se creó un nuevo recurso.<br>
          400 Bad Request: la solicitud es inválida.<br>
          401 Unauthorized: no se proporcionó una clave de API válida.<br>
          404 Not Found: el recurso solicitado no existe.<br>
        </span> -->
        </div>

        <div>
          <h3 class="mb-2">Descripción de parámetros</h3>
          <v-simple-table dark class="mt-2">
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">
                    Parametro
                  </th>
                  <th class="text-left">
                    Tipo
                  </th>
                  <th class="text-left">
                    Descripciòn
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in items"
                  :key="item.parametro"
                >
                  <td>{{ item.parametro }}</td>
                  <td>{{ item.tipo }}</td>
                  <td>{{ item.descripcion }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
import CodeMirror from 'codemirror'
import emmet from '@emmetio/codemirror-plugin'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/monokai.css'
import 'codemirror/addon/selection/active-line'
import 'codemirror/addon/edit/matchbrackets'
import 'codemirror/mode/vue/vue'
emmet(CodeMirror)
export default {
  data() {
    return {
      respuestas: [
        {
          status: '200',
          descripcion: 'OK: la solicitud se realizó correctamente'
        },
        {
          status: '201',
          descripcion: 'Created: se creó un nuevo recurso'
        },
        {
          status: '400',
          descripcion: 'Bad Request: la solicitud es inválida'
        },
        {
          status: '401',
          descripcion: 'Unauthorized: no se proporcionó una clave de API válida'
        },
        {
          status: '404',
          descripcion: 'Not Found: el recurso solicitado no existe'
        }
      ],
      items: [
        {
          parametro: 'Available_credits',
          tipo: 'number',
          descripcion: 'Créditos disponibles de su usuario'
        },
        {
          parametro: 'credits',
          tipo: 'number',
          descripcion: 'Créditos asginados a su usuario'
        },
        {
          parametro: 'credits_used_for_sms_service',
          tipo: 'number',
          descripcion: 'Créditos utilizados en el servicio sms en caso cuente con el servicio activo'
        },
        {
          parametro: 'credits_used_for_ivr_service',
          tipo: 'number',
          descripcion: 'Créditos utilizados en el servicio ivr en caso cuente con el servicio activo'
        }
      ],
      arrayEditor:[],
      text:null,
      editor: null,
      copyLabel: 'Copy Code',
      content: 'https://api.enviamas.pe/credits',
      respuesta: `{
 "success": true,
 "message": "Se consultó los créditos relacionados con éxito",
 "data": {
 "credits": 1000000,
 "available_credits": 843026,
 "credits_used_for_sms_service": 56974,
 "credits_used_for_ivr_service": 0
 }
}`
    }
  },
  mounted() {
    this.createCodeMirrorInstance('content'),
    this.createCodeMirrorInstance('respuesta')
  },
  methods: {
    createCodeMirrorInstance(ref) {
      this.editor = CodeMirror.fromTextArea(this.$refs[ref], {
        mode: 'javascript',
        theme: 'monokai',
        value: '<template></template>',
        lineNumbers: true,
        lineWrapping: true,
        tabSize: 2,
        autofocus: false,
        line: true,
        matchBrackets: true,
        readOnly: true
      })
      this.arrayEditor.push(this.editor)
    },
    copyCode(e) {
      const code = document.getElementById(e).value

      console.log(code)
      navigator.clipboard.writeText(code)

      this.copyLabel = 'Copied!'
      setTimeout(() => {
        this.copyLabel = 'Copy'
      }, 1000)
    },
    cambiarCode(e) {
      this.arrayEditor[1].setValue(this[e])
    }
    
  }

}
</script>

<style>
.CodeMirror {
  font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
  font-size: 0.875rem;
  font-weight: bold;
  background-color: #101c23;
  flex: 1;
}
.editor {
  position: relative;
  border-radius: 6px;
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>