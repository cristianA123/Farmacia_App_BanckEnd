<template>
  <div>
    <div class="display-1 mb-4">Crear Campaña</div>
    <v-card class="pa-4">
      <div>
        <div class="mb-4">
          <h3 class="mb-2">Autenticación</h3>
          <span> 
            Permite crear campañas SMS desde servicios externos a la plataforma. Para su uso es
            necesario indicar la IP desde donde se consumirá el servicio y un usuario y clave con
            acceso a la plataforma web de gestion <a href="http://app.enviamas.pe/">https://app.enviamas.pe</a>.
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
            La API soporta el siguiente metodo HTTP:<br>
            POST: para crear un nuevo recurso.
          </span>
        </div>

        <div class="editor mb-4">
          <h3 class="mb-2">Ejemplos de solicitud</h3>
          <v-row
            class="ma-0"
            justify="space-between"
          >
            <v-btn-toggle
              v-model="text"
              class="rounded-b-0"
              dark
            >
              <v-btn small color="#272822" value="left" @click="cambiarCode('solicitud')">
                JSON
              </v-btn>

              <v-btn small color="#272822" value="Python" @click="cambiarCode('solicitudPython')">
                Python
              </v-btn>

              <v-btn small color="#272822" value="PHP" @click="cambiarCode('solicitudPHP')">
                PHP
              </v-btn>

              <v-btn small color="#272822" value="JavaScript" @click="cambiarCode('solicitudJS')">
                JavaScript
              </v-btn>

              <v-btn small color="#272822" value="Nodejs" @click="cambiarCode('solicitudNode')">
                Nodejs
              </v-btn>
            </v-btn-toggle>
            <v-btn
              class="rounded-b-0"
              dark
              small
              color="#272822"
              @click="copyCode('solicitud')"
            >{{ copyLabel }}<v-icon>mdi-content-copy</v-icon></v-btn>
      
          </v-row>
          <textarea id="solicitud" ref="solicitud" v-model="solicitud"></textarea>
        </div>

        <div class="editor mb-4">
          <h3 class="mb-2">Respuestas</h3>
          <textarea ref="respuesta" v-model="respuesta"></textarea>
        </div>

        <div>
          <h3 class="mb-2">Respuestas Status</h3>
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
          parametro: 'campaign_name',
          tipo: 'text',
          descripcion: 'Nombre de la campaña'
        },
        {
          parametro: 'messages',
          tipo: 'array',
          descripcion: 'Mensajes a enviar. phone: Número de destinatario, text '
        },
        {
          parametro: 'phone',
          tipo: 'text',
          descripcion: 'Número de celular válido (Contiene 9 dígitos y comienza con 9) el cual será el destinatario del mensaje a enviar'
        },
        {
          parametro: 'text',
          tipo: 'text',
          descripcion: 'Contenido del mensaje, debe cumplir el formato GSM-7'
        },
        {
          parametro: 'message_id',
          tipo: 'text',
          descripcion: 'Identificador del mensaje, el cual será devuelto en las consultas del reporte'
        },
        {
          parametro: 'options',
          tipo: 'object',
          descripcion: 'Contiene las opciones de la campaña'
        },
        {
          parametro: 'push',
          tipo: 'bool',
          descripcion: 'Permite activar la función SMS CLASE 0, esto despliega una ventana flotante con el contenido del mensaje de texto. Consulte con su asesor sobre las restricciones del uso.'
        },
        {
          parametro: 'is_bidirectional',
          tipo: 'bool',
          descripcion: 'Permite activar la función de respuesta a los mensajes enviados'
        }
      ],
      arrayEditor:[],
      text:null,
      editor: null,
      copyLabel: 'Copy Code',
      content: 'https://api.enviamas.pe/sms/create_campaign',
      solicitud: `{
 "campaign_name": "Campaña de ejemplo",
 "messages": [
  {
  "phone": 99988877,
  "text": "Mensaje uno ",
  "message_id": "asd21"
  },
  {
  "phone": 999111000,
  "text": "Mensaje dos",
  "message_id": "dase3"
  }
  ],
  "options": {
  "push": false,
  "is_bidireccional": false
  }
}`,
      solicitudJS : `const campaignData = {
    "campaign_name": "Campaña de ejemplo",
    "messages": [
    {
    "phone": 99988877,
    "text": "Mensaje uno ",
    "message_id": "asd21"
    },
    {
    "phone": 999111000,
    "text": "Mensaje dos",
    "message_id": "dase3"
    }
    ],
    "options": {
    "push": false,
    "is_bidireccional": false
    }
    };

const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(campaignData)
};

fetch('https://api.enviamas.pe/sms/create_campaign', options)
  .then(res => res.json())
  .then(res => console.log(res))
  .catch(error => console.error(error));`,
      respuesta: `{
  'success': true,
  'message': 'Campaña creada exitosamente',
  'data': {
    'campaign_id': 'ODE='
  }
}`,
      solicitudPHP:`<?php
require_once 'HTTP/Request2.php';
$request = new HTTP_Request2();
$request->setUrl('https://api.enviamas.pe/api/sms/create_campaign');
$request->setMethod(HTTP_Request2::METHOD_POST);
$request->setConfig(array(
  'follow_redirects' => TRUE
));
$request->setHeader(array(
  'Authorization' => 'Basic bXRlcnJvbmVzLnJhQGdtYWlsLmNvbToxMjM0NTY=',
  'Content-Type' => 'text/plain'
));
$request->setBody('{\n "campaign_name": "Campaña de ejemplo",\n "messages": [\n {\n "phone": 99988877,\n "text": "Mensaje uno ",\n "message_id": "asd21"\n },\n {\n "phone": 999111000,\n "text": "Mensaje dos",\n "message_id": "dase3"\n }\n ],\n "options": {\n "push": false,\n "is_bidireccional": false\n }\n}');
try {
  $response = $request->send();
  if ($response->getStatus() == 200) {
    echo $response->getBody();
  }
  else {
    echo 'Unexpected HTTP status: ' . $response->getStatus() . ' ' .
    $response->getReasonPhrase();
  }
}
catch(HTTP_Request2_Exception $e) {
  echo 'Error: ' . $e->getMessage();
}`,
      solicitudNode:`var request = require('request');
var options = {
  'method': 'POST',
  'url': 'https://api.enviamas.pe/api/sms/create_campaign',
  'headers': {
    'Authorization': 'Basic bXRlcnJvbmVzLnJhQGdtYWlsLmNvbToxMjM0NTY=',
    'Content-Type': 'text/plain'
  },
  body: '{\n "campaign_name": "Campaña de ejemplo",\n "messages": [\n {\n "phone": 99988877,\n "text": "Mensaje uno ",\n "message_id": "asd21"\n },\n {\n "phone": 999111000,\n "text": "Mensaje dos",\n "message_id": "dase3"\n }\n ],\n "options": {\n "push": false,\n "is_bidireccional": false\n }\n}'

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});`,
      solicitudPython: `import requests

url = "https://api.enviamas.pe/api/sms/create_campaign"

payload = {
    "campaign_name": "Campaña de ejemplo",
    "messages": [
      {
      "phone": 99988877,
      "text": "Mensaje uno ",
      "message_id": "asd21"
      },
      {
      "phone": 999111000,
      "text": "Mensaje dos",
      "message_id": "dase3"
      }
    ],
    "options": {
      "push": False,
      "is_bidireccional": False
    }
}

headers = {
  'Authorization': 'Basic bXRlcnJvbmVzLnJhQGdtYWlsLmNvbToxMjM0NTY=',
  'Content-Type': 'application/json'
}

response = requests.post(url, headers=headers, json=payload)

print(response.text)`
    }
  },
  mounted() {
    this.createCodeMirrorInstance('content'),
    this.createCodeMirrorInstance('solicitud'),
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