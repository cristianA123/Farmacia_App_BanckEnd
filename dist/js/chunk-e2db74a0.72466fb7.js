(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e2db74a0"],{"6e15":function(e,t,a){"use strict";a("acc0")},"7dd4":function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"display-1 mb-4"},[e._v("Reporte Campaña")]),a("v-card",{staticClass:"pa-4"},[a("div",[a("div",{staticClass:"mb-4"},[a("h3",{staticClass:"mb-2"},[e._v("Autenticación")]),a("span",[e._v(" Permite consultar el reporte de una campaña SMS desde servicios externos a la plataforma. Para su uso es necesario indicar la IP desde donde se consumirá el servicio y un usuario y clave con acceso a la plataforma web de gestion ")])]),a("div",{staticClass:"editor mb-4"},[a("h3",[e._v("Endpoint")]),a("span",[e._v(" La API está disponible en el siguiente endpoint: ")]),a("v-row",{staticClass:"justify-end ma-0"},[a("v-btn",{staticClass:"rounded-b-0",attrs:{dark:"",small:"",color:"#272822"},on:{click:function(t){return e.copyCode("content")}}},[e._v("Copy code"),a("v-icon",[e._v("mdi-content-copy")])],1)],1),a("textarea",{directives:[{name:"model",rawName:"v-model",value:e.content,expression:"content"}],ref:"content",attrs:{id:"content"},domProps:{value:e.content},on:{input:function(t){t.target.composing||(e.content=t.target.value)}}})],1),a("div",{staticClass:"editor mb-4"},[a("h3",{staticClass:"mb-2"},[e._v("Metodos")]),a("span",[a("v-chip",{staticClass:"mr-1 font-weight-black",attrs:{dense:"",label:"",color:"#FF7901","x-small":"",dark:""}},[e._v(" GET ")]),e._v(" para obtener datos. ")],1)]),a("div",{staticClass:"editor"},[a("h3",{staticClass:"mb-2"},[e._v("Respuesta")]),a("textarea",{directives:[{name:"model",rawName:"v-model",value:e.respuesta,expression:"respuesta"}],ref:"respuesta",domProps:{value:e.respuesta},on:{input:function(t){t.target.composing||(e.respuesta=t.target.value)}}}),a("v-simple-table",{staticClass:"my-3",attrs:{dark:""},scopedSlots:e._u([{key:"default",fn:function(){return[a("thead",[a("tr",[a("th",{staticClass:"text-left"},[e._v(" Status Code ")]),a("th",{staticClass:"text-left"},[e._v(" Descripciòn ")])])]),a("tbody",e._l(e.respuestas,(function(t){return a("tr",{key:t.status},[a("td",[e._v(e._s(t.status))]),a("td",[e._v(e._s(t.descripcion))])])})),0)]},proxy:!0}])})],1),a("div",[a("h3",{staticClass:"mb-2"},[e._v("Descripción de parámetros")]),a("v-simple-table",{staticClass:"mt-2",attrs:{dark:""},scopedSlots:e._u([{key:"default",fn:function(){return[a("thead",[a("tr",[a("th",{staticClass:"text-left"},[e._v(" Parametro ")]),a("th",{staticClass:"text-left"},[e._v(" Tipo ")]),a("th",{staticClass:"text-left"},[e._v(" Descripciòn ")])])]),a("tbody",e._l(e.items,(function(t){return a("tr",{key:t.parametro},[a("td",[e._v(e._s(t.parametro))]),a("td",[e._v(e._s(t.tipo))]),a("td",[e._v(e._s(t.descripcion))])])})),0)]},proxy:!0}])})],1)])])],1)},n=[],o=a("56b3"),i=a.n(o),r=a("49e7");a("a7be"),a("7a7a"),a("31c5"),a("8c33"),a("693d");Object(r["a"])(i.a);var c={data:function(){return{respuestas:[{status:"200",descripcion:"OK: la solicitud se realizó correctamente"},{status:"201",descripcion:"Created: se creó un nuevo recurso"},{status:"400",descripcion:"Bad Request: la solicitud es inválida"},{status:"401",descripcion:"Unauthorized: no se proporcionó una clave de API válida"},{status:"404",descripcion:"Not Found: el recurso solicitado no existe"}],items:[{parametro:"message_id",tipo:"text",descripcion:"Identificador del mensaje enviado al crear la campaña"},{parametro:"phone",tipo:"text",descripcion:"Número de celular válido (Contiene 9 dígitos y comienza con 9) el cual será el destinatario del mensaje a enviar"},{parametro:"text",tipo:"text",descripcion:"Contenido del mensaje, debe cumplir el formato GSM-7"},{parametro:"status",tipo:"text",descripcion:"Estado del mensaje"},{parametro:"carrier",tipo:"text",descripcion:"Operador telefónico asociado"},{parametro:"send_at",tipo:"datetime",descripcion:"Fecha y hora de envío del mensaje"}],arrayEditor:[],text:null,editor:null,copyLabel:"Copy Code",content:"https://api.enviamas.pe/sms/report_campaign/{campaign_id}",respuesta:'{\n "success": true,\n "message": "Reporte de mensajes por campaña",\n "data": [\n {\n "message_id": "asd21",\n "phone": "99988877",\n "text": "Mensaje uno",\n "send_at": "2023-01-09 17:00:12",\n "status": "REJECTED",\n "carrier": null\n },\n {\n "message_id": "dase3",\n "phone": "999111000",\n "text": "Mensaje dos",\n "send_at": "2023-01-09 17:00:12",\n "status": "DELIVERED",\n "carrier": Entel\n }\n ]\n}'}},mounted:function(){this.createCodeMirrorInstance("content"),this.createCodeMirrorInstance("respuesta")},methods:{createCodeMirrorInstance:function(e){this.editor=i.a.fromTextArea(this.$refs[e],{mode:"javascript",theme:"monokai",value:"<template></template>",lineNumbers:!0,lineWrapping:!0,tabSize:2,autofocus:!1,line:!0,matchBrackets:!0,readOnly:!0}),this.arrayEditor.push(this.editor)},copyCode:function(e){var t=this,a=document.getElementById(e).value;console.log(a),navigator.clipboard.writeText(a),this.copyLabel="Copied!",setTimeout((function(){t.copyLabel="Copy"}),1e3)},cambiarCode:function(e){this.arrayEditor[1].setValue(this[e])}}},d=c,l=(a("6e15"),a("2877")),p=a("6544"),u=a.n(p),m=a("8336"),v=a("b0af"),f=a("cc20"),_=a("132d"),h=a("0fd9"),C=a("1f4f"),b=Object(l["a"])(d,s,n,!1,null,null,null);t["default"]=b.exports;u()(b,{VBtn:m["a"],VCard:v["a"],VChip:f["a"],VIcon:_["a"],VRow:h["a"],VSimpleTable:C["a"]})},acc0:function(e,t,a){}}]);