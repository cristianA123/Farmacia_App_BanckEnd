(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-89d855ba"],{"5e1e":function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"d-flex flex-column flex-grow-1"},[a("div",{staticClass:"d-flex align-center py-3"},[e._m(0),a("v-spacer"),a("v-dialog",{attrs:{"max-width":"500px"},scopedSlots:e._u([{key:"activator",fn:function(t){var i=t.on,d=t.attrs;return[a("BtnToReload"),a("v-btn",e._g(e._b({attrs:{color:"primary",dark:""}},"v-btn",d,!1),i),[e._v(" Nueva ruta ")])]}}]),model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[a("v-card",[a("v-card-title",[a("span",{staticClass:"text-h5"},[e._v(e._s(e.formTitle))])]),a("v-card-text",[a("v-container",[a("v-row",[a("v-col",{staticClass:"my-0 py-0",attrs:{lg:"6"}},[a("v-text-field",{attrs:{"error-messages":e.isValidName,label:"Nombre",outlined:""},model:{value:e.editedItem.name,callback:function(t){e.$set(e.editedItem,"name",t)},expression:"editedItem.name"}})],1),a("v-col",{staticClass:"my-0 py-0",attrs:{lg:"6"}},[a("v-text-field",{attrs:{"error-messages":e.isValidPrice,label:"Precio",outlined:""},model:{value:e.editedItem.price,callback:function(t){e.$set(e.editedItem,"price",t)},expression:"editedItem.price"}})],1),a("v-col",{staticClass:"my-0 py-0",attrs:{lg:"12"}},[a("v-text-field",{attrs:{label:"Descripción",outlined:""},model:{value:e.editedItem.description,callback:function(t){e.$set(e.editedItem,"description",t)},expression:"editedItem.description"}})],1),a("v-col",{staticClass:"my-0 py-0",attrs:{lg:"6"}},[a("v-text-field",{attrs:{"error-messages":e.isValidApi_Key,label:"Apikey",outlined:""},model:{value:e.editedItem.api_Key,callback:function(t){e.$set(e.editedItem,"api_Key",t)},expression:"editedItem.api_Key"}})],1),a("v-col",{staticClass:"my-0 py-0",attrs:{lg:"6"}},[a("v-select",{attrs:{"error-messages":e.isValidProvider_id,label:"Seleccione proveedor",items:e.intervals,"item-text":"name","item-value":"id",outlined:""},model:{value:e.editedItem.provider_id,callback:function(t){e.$set(e.editedItem,"provider_id",t)},expression:"editedItem.provider_id"}})],1),a("v-col",{staticClass:"my-0 py-0",attrs:{lg:"6"}},[a("v-text-field",{attrs:{"error-messages":e.isValidDial,label:"Dial",outlined:""},model:{value:e.editedItem.dial,callback:function(t){e.$set(e.editedItem,"dial",t)},expression:"editedItem.dial"}})],1),a("v-col",{staticClass:"my-0 py-0",attrs:{lg:"6"}},[a("v-text-field",{attrs:{"error-messages":e.isValidAuthorization,label:"Authorization",outlined:""},model:{value:e.editedItem.authorization,callback:function(t){e.$set(e.editedItem,"authorization",t)},expression:"editedItem.authorization"}})],1),a("v-col",{staticClass:"my-0 py-0",attrs:{lg:"6"}},[a("v-text-field",{attrs:{label:"Mask",outlined:""},model:{value:e.editedItem.mask,callback:function(t){e.$set(e.editedItem,"mask",t)},expression:"editedItem.mask"}})],1),a("v-col",{staticClass:"my-0 py-0",attrs:{lg:"6"}},[a("v-text-field",{attrs:{label:"Var1",outlined:""},model:{value:e.editedItem.var1,callback:function(t){e.$set(e.editedItem,"var1",t)},expression:"editedItem.var1"}})],1),a("v-col",{staticClass:"my-0 py-0",attrs:{lg:"6"}},[a("v-text-field",{attrs:{label:"Var2",outlined:""},model:{value:e.editedItem.var2,callback:function(t){e.$set(e.editedItem,"var2",t)},expression:"editedItem.var2"}})],1)],1)],1)],1),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:e.close}},[e._v(" Cancelar ")]),a("v-btn",{attrs:{color:"blue darken-1",text:"",loading:e.btnLoading},on:{click:e.save}},[e._v(" Crear ")])],1)],1)],1)],1),a("v-card",[a("v-data-table",{staticClass:"flex-grow-1",attrs:{headers:e.headers,items:e.items,loading:e.isLoading},scopedSlots:e._u([{key:"item.actions",fn:function(t){var i=t.item;return[a("v-icon",{staticClass:"mr-2",attrs:{small:""},on:{click:function(t){return e.editItem(i)}}},[e._v(" mdi-pencil ")])]}}],null,!0)})],1)],1)},d=[function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"display-1"},[e._v("Canales")])])}],r=(a("b0c0"),a("88f5")),s=a("ed7b"),n={components:{BtnToReload:s["a"]},data:function(){return{backendErrors:{name:"",price:"",api_Key:"",authorization:"",provider_id:"",dial:""},selectedInterval:0,intervals:["Last 7 days","Last 28 days","Last month","Last year"],isLoading:!1,btnLoading:!1,dialog:!1,dialogDelete:!1,itemSelected:0,headers:[{text:"Canal",value:"id"},{text:"Nombre",value:"name"},{text:"Proveedor",value:"provider"},{text:"Descripción",value:"description"},{text:"Precio",value:"price"},{text:"APIKEY",value:"api_Key"},{text:"DIAL",value:"dial"},{text:"MASK",value:"mask"},{text:"AUTHORIZATION",value:"authorization"},{text:"VAR1",value:"var1"},{text:"VAR2",value:"var2"},{text:"Modificar",value:"actions"}],items:[],editedIndex:-1,editedItem:{name:"",description:"",price:1,api_Key:"",dial:"",mask:"",authorization:"",var1:"",var2:"",provider_id:null},defaultItem:{name:"",description:"",price:1,api_Key:"",dial:"",mask:"",authorization:"",var1:"",var2:"",provider_id:null}}},computed:{formTitle:function(){return-1===this.editedIndex?"Nuevo ruta de proveedor":"Editar ruta de proveedor"},isValidName:function(){var e,t;return void 0===(null===(e=this.backendErrors)||void 0===e?void 0:e.name)?"":null===(t=this.backendErrors)||void 0===t?void 0:t.name[0]},isValidPrice:function(){var e;return void 0===(null===(e=this.backendErrors)||void 0===e?void 0:e.price)?"":this.backendErrors.price[0]},isValidApi_Key:function(){var e;return void 0===(null===(e=this.backendErrors)||void 0===e?void 0:e.api_Key)?"":this.backendErrors.api_Key[0]},isValidAuthorization:function(){var e;return void 0===(null===(e=this.backendErrors)||void 0===e?void 0:e.authorization)?"":this.backendErrors.authorization[0]},isValidDial:function(){var e;return void 0===(null===(e=this.backendErrors)||void 0===e?void 0:e.dial)?"":this.backendErrors.dial[0]},isValidProvider_id:function(){var e;return void 0===(null===(e=this.backendErrors)||void 0===e?void 0:e.provider_id)?"":this.backendErrors.provider_id[0]}},watch:{dialog:function(e){e||this.close()},dialogDelete:function(e){e||this.closeDelete()}},created:function(){this.initialize()},methods:{initialize:function(){var e=this;this.items=[],r["a"].get("/channel").then((function(t){t.data.success&&(e.items=t.data.data),e.isLoading=!1})),this.intervals=[],r["a"].get("/provider").then((function(t){t.data.success&&(e.intervals=t.data.data),e.isLoading=!1}))},editItem:function(e){this.editedIndex=this.items.indexOf(e),this.editedItem=Object.assign({},e),this.dialog=!0,this.itemSelected=e.id},close:function(){var e=this;this.dialog=!1,this.$nextTick((function(){e.editedItem=Object.assign({},e.defaultItem),e.editedIndex=-1}))},save:function(){var e=this;this.btnLoading=!0;var t=this.editedItem;this.editedIndex>-1?r["a"].put("/channel/"+this.itemSelected,t).then((function(t){t.data.success&&(e.items=t.data.data,e.initialize()),e.close(),e.btnLoading=!1})).catch((function(t){e.btnLoading=!1,e.backendErrors=t.response.data.errors})):r["a"].post("/channel",t,{headers:{Authorization:"Bearer "+window.localStorage.token}}).then((function(t){t.data.success&&(e.items=t.data.data,e.initialize()),e.btnLoading=!1,e.close()})).catch((function(t){e.backendErrors=t.response.data.errors,e.btnLoading=!1}))}}},o=n,l=a("2877"),c=a("6544"),v=a.n(c),u=a("8336"),m=a("b0af"),p=a("99d9"),f=a("62ad"),h=a("a523"),b=a("8fea"),x=a("169a"),g=a("132d"),I=a("0fd9"),k=a("b974"),y=a("2fa4"),_=a("8654"),V=Object(l["a"])(o,i,d,!1,null,null,null);t["default"]=V.exports;v()(V,{VBtn:u["a"],VCard:m["a"],VCardActions:p["a"],VCardText:p["c"],VCardTitle:p["d"],VCol:f["a"],VContainer:h["a"],VDataTable:b["a"],VDialog:x["a"],VIcon:g["a"],VRow:I["a"],VSelect:k["a"],VSpacer:y["a"],VTextField:_["a"]})},ed7b:function(e,t,a){"use strict";var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("v-btn",{staticClass:"ml-2",attrs:{outlined:"",color:"primary"},on:{click:e.reoad}},[a("v-icon",[e._v(" mdi-reload ")])],1)],1)},d=[],r={data:function(){return{loading:!1}},methods:{reoad:function(){window.location.reload()}}},s=r,n=a("2877"),o=a("6544"),l=a.n(o),c=a("8336"),v=a("132d"),u=Object(n["a"])(s,i,d,!1,null,null,null);t["a"]=u.exports;l()(u,{VBtn:c["a"],VIcon:v["a"]})}}]);