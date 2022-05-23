(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f01bcd3e"],{"4bd4":function(t,a,e){"use strict";var n=e("5530"),i=(e("caad"),e("2532"),e("07ac"),e("4de4"),e("159b"),e("7db0"),e("58df")),s=e("7e2b"),r=e("3206");a["a"]=Object(i["a"])(s["a"],Object(r["b"])("form")).extend({name:"v-form",provide:function(){return{form:this}},inheritAttrs:!1,props:{disabled:Boolean,lazyValidation:Boolean,readonly:Boolean,value:Boolean},data:function(){return{inputs:[],watchers:[],errorBag:{}}},watch:{errorBag:{handler:function(t){var a=Object.values(t).includes(!0);this.$emit("input",!a)},deep:!0,immediate:!0}},methods:{watchInput:function(t){var a=this,e=function(t){return t.$watch("hasError",(function(e){a.$set(a.errorBag,t._uid,e)}),{immediate:!0})},n={_uid:t._uid,valid:function(){},shouldValidate:function(){}};return this.lazyValidation?n.shouldValidate=t.$watch("shouldValidate",(function(i){i&&(a.errorBag.hasOwnProperty(t._uid)||(n.valid=e(t)))})):n.valid=e(t),n},validate:function(){return 0===this.inputs.filter((function(t){return!t.validate(!0)})).length},reset:function(){this.inputs.forEach((function(t){return t.reset()})),this.resetErrorBag()},resetErrorBag:function(){var t=this;this.lazyValidation&&setTimeout((function(){t.errorBag={}}),0)},resetValidation:function(){this.inputs.forEach((function(t){return t.resetValidation()})),this.resetErrorBag()},register:function(t){this.inputs.push(t),this.watchers.push(this.watchInput(t))},unregister:function(t){var a=this.inputs.find((function(a){return a._uid===t._uid}));if(a){var e=this.watchers.find((function(t){return t._uid===a._uid}));e&&(e.valid(),e.shouldValidate()),this.watchers=this.watchers.filter((function(t){return t._uid!==a._uid})),this.inputs=this.inputs.filter((function(t){return t._uid!==a._uid})),this.$delete(this.errorBag,a._uid)}}},render:function(t){var a=this;return t("form",{staticClass:"v-form",attrs:Object(n["a"])({novalidate:!0},this.attrs$),on:{submit:function(t){return a.$emit("submit",t)}}},this.$slots.default)}})},b842:function(t,a,e){"use strict";e.r(a);var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"d-flex flex-column flex-grow-1"},[e("div",{staticClass:"d-flex align-center py-3"},[t._m(0),e("v-spacer"),e("v-btn",{attrs:{color:"primary"},on:{click:function(a){return t.openNewAgenda()}}},[t._v(" Crear nueva agenda ")])],1),t.itemsEmpty&&!t.isLoading?e("EmptyItems",{attrs:{icon:"mdi-contacts",text:"No tiene agendas creadas. Para crear agendas cortas clic en botón Crear Nueva Agenda"}}):[e("v-data-table",{staticClass:"elevation-1",attrs:{headers:t.headers,items:t.items,"items-per-page":5},scopedSlots:t._u([{key:"item.deliverability",fn:function(a){var e=a.item;return[t._v(" "+t._s(100*e.deliverability)+"% ")]}},{key:"item.status",fn:function(a){var n=a.item;return[0===n.status?e("v-chip",{staticClass:"ma-2",attrs:{color:"secondary","text-color":"white",small:""}},[t._v(" Sin contactos ")]):t._e(),1===n.status?e("v-chip",{staticClass:"ma-2",attrs:{color:"green","text-color":"white",small:""}},[t._v(" Disponible ")]):t._e(),2===n.status?e("v-chip",{staticClass:"ma-2",attrs:{color:"orange","text-color":"white",small:""}},[t._v(" Procesando ")]):t._e()]}},{key:"item.actions",fn:function(a){var n=a.item;return[e("v-menu",{attrs:{"offset-y":""},scopedSlots:t._u([{key:"activator",fn:function(a){var n=a.attrs,i=a.on;return[e("v-btn",t._g(t._b({attrs:{text:""}},"v-btn",n,!1),i),[t._v(" Acciones ")])]}}],null,!0)},[e("v-list",[e("v-list-item",{attrs:{link:""},on:{click:function(a){return t.openNewAgenda(n)}}},[t._v(" Renombrar ")]),e("v-list-item",{attrs:{link:""},on:{click:function(a){return t.manage(n)}}},[t._v(" Gestionar ")]),[e("div",{staticClass:"text-center"},[e("v-dialog",{attrs:{persistent:"","max-width":"400"},scopedSlots:t._u([{key:"activator",fn:function(a){var n=a.on,i=a.attrs;return[e("v-list-item",t._g(t._b({attrs:{link:""}},"v-list-item",i,!1),n),[t._v(" Eliminar ")])]}}],null,!0),model:{value:t.dialogConfirm,callback:function(a){t.dialogConfirm=a},expression:"dialogConfirm"}},[e("v-card",[e("v-card-title",{staticClass:"text-h5"},[t._v(" Seguro de eliminar esta agenda? ")]),e("v-card-text",[t._v("Una vez eliminado esta agenda, no podrá recuperarla. Las campañas que se esten procesando y que hagan uso de esta agenda se enviarán con normalidad.")]),e("v-card-actions",[e("v-spacer"),e("v-btn",{attrs:{color:"secondary",text:""},on:{click:function(a){t.dialog=!1}}},[t._v(" Cancelar ")]),e("v-btn",{attrs:{color:"success",text:""},on:{click:function(a){return t.confirmDelete(n)}}},[t._v(" Confirmo ")])],1)],1)],1)],1)]],2)],1)]}}])})],e("new-agenda",{ref:"newAgenda",on:{onCreated:t.onCreated}})],2)},i=[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("div",{staticClass:"display-1"},[t._v("Agendas")])])}],s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("v-dialog",{attrs:{width:"600"},model:{value:t.dialog,callback:function(a){t.dialog=a},expression:"dialog"}},[e("v-card",[e("v-form",{ref:"formNewAgenda",attrs:{"lazy-validation":""},on:{submit:function(a){return a.preventDefault(),t.save()}}},[e("v-card-title",{staticClass:"pa-2"},[t._v(" "+t._s(t.isEdit?"Modificar agenda":"Crear agenda")+" "),e("v-spacer"),e("v-btn",{attrs:{icon:""},on:{click:function(a){t.dialog=!1}}},[e("v-icon",[t._v("mdi-close")])],1)],1),e("v-divider"),e("div",[e("v-text-field",{staticClass:"px-2 py-1",attrs:{solo:"",flat:"",placeholder:"Nombre","error-messages":t.isValidName,autofocus:"",required:""},model:{value:t.name,callback:function(a){t.name=a},expression:"name"}}),e("v-divider")],1),e("v-divider"),e("v-card-actions",{staticClass:"pa-2"},[e("v-btn",{attrs:{outlined:""},on:{click:t.close}},[t._v("Cancelar")]),e("v-spacer"),e("v-btn",{attrs:{color:"primary",type:"submit"}},[t._v("Guardar")])],1)],1)],1)],1)},r=[],o=(e("b0c0"),e("88f5")),c={data:function(){return{backendErrors:{name:""},dialog:!1,name:"",agenda:null}},computed:{isEdit:function(){return void 0!==this.agenda},isValidName:function(){return void 0===this.backendErrors.name?"":this.backendErrors.name}},methods:{open:function(t){this.agenda=t,this.isEdit?this.name=t.name:this.name="",this.dialog=!0},close:function(){this.dialog=!1},save:function(){var t=this;if(this.$refs.formNewAgenda.validate())if(this.isEdit){var a={name:this.name};o["a"].put("/agenda/"+this.agenda.id,a).then((function(a){a.data.success&&(t.$store.dispatch("app/showToast","Agenda actualizada exitosamente"),t.$emit("onCreated"),t.close())})).catch((function(a){t.backendErrors=a.response.data.errors}))}else{var e={name:this.name};o["a"].post("/agenda",e,{headers:{Authorization:"Bearer "+window.localStorage.token}}).then((function(a){a.data.success&&(t.$store.dispatch("app/showToast","Agenda creada exitosamente"),t.$emit("onCreated"),t.close())})).catch((function(a){t.backendErrors=a.response.data.errors}))}}}},d=c,l=e("2877"),u=e("6544"),f=e.n(u),v=e("8336"),m=e("b0af"),h=e("99d9"),p=e("169a"),g=e("ce7e"),_=e("4bd4"),b=e("132d"),w=e("2fa4"),C=e("8654"),x=Object(l["a"])(d,s,r,!1,null,null,null),V=x.exports;f()(x,{VBtn:v["a"],VCard:m["a"],VCardActions:h["a"],VCardTitle:h["d"],VDialog:p["a"],VDivider:g["a"],VForm:_["a"],VIcon:b["a"],VSpacer:w["a"],VTextField:C["a"]});var y=e("ba57"),k={components:{newAgenda:V,EmptyItems:y["a"]},data:function(){return{headers:[{text:"Nombre",value:"name"},{text:"Contactos",value:"all_contacts"},{text:"Entregabilidad",value:"deliverability"},{text:"Estado",value:"status"},{text:"Última modificación",value:"updated_at"},{text:"Acciones",value:"actions"}],items:[],dialogConfirm:!1,isLoading:!1}},computed:{itemsEmpty:function(){return 0===this.items.length}},mounted:function(){this.getAgendas()},methods:{getAgendas:function(){var t=this;this.isLoading=!1,o["a"].get("/agenda").then((function(a){t.isLoading=!1,a.data.success?(t.items=a.data.data,console.log(t.items)):t.$store.dispatch("app/showToast",a.data.message)})).catch((function(t){console.log(t)}))},openNewAgenda:function(t){this.$refs.newAgenda.open(t)},confirmDelete:function(t){this.deleteItem(t)},deleteItem:function(t){var a=this;o["a"].delete("/agenda/"+t.id).then((function(t){t.data.success?(a.$store.dispatch("app/showToast","Agenda eliminada exitosamente"),a.dialogConfirm=!1,a.getAgendas()):a.$store.dispatch("app/showToast",t.data.message)}))},manage:function(t){this.$router.push({path:"/tools/agendas/"+t.id+"/contacts",params:{agenda:t}})},onCreated:function(){this.getAgendas()}}},E=k,A=e("cc20"),$=e("8fea"),B=e("8860"),N=e("da13"),S=e("e449"),T=Object(l["a"])(E,n,i,!1,null,null,null);a["default"]=T.exports;f()(T,{VBtn:v["a"],VCard:m["a"],VCardActions:h["a"],VCardText:h["c"],VCardTitle:h["d"],VChip:A["a"],VDataTable:$["a"],VDialog:p["a"],VList:B["a"],VListItem:N["a"],VMenu:S["a"],VSpacer:w["a"]})},ba57:function(t,a,e){"use strict";var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("v-row",{attrs:{justify:"center"}},[e("v-col",{attrs:{cols:"9",lg:"3"}},[e("v-icon",{attrs:{size:"200",color:"#a8a8a8"}},[t._v(t._s(t.icon))]),e("p",{staticStyle:{color:"#a8a8a8"}},[t._v(" "+t._s(t.text)+" ")])],1)],1)},i=[],s={props:{show:{type:Boolean,default:!1},icon:{type:String,default:""},text:{type:String,default:""}}},r=s,o=e("2877"),c=e("6544"),d=e.n(c),l=e("62ad"),u=e("132d"),f=e("0fd9"),v=Object(o["a"])(r,n,i,!1,null,null,null);a["a"]=v.exports;d()(v,{VCol:l["a"],VIcon:u["a"],VRow:f["a"]})}}]);