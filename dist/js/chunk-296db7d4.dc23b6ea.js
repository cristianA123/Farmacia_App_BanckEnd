(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-296db7d4"],{"0428":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"d-flex flex-column flex-grow-1"},[a("div",{staticClass:"d-flex align-center py-3"},[t._m(0),a("v-spacer"),a("v-btn",{attrs:{color:"primary"},on:{click:function(e){return t.createUser()}}},[t._v(" Creación de usuario ")]),a("BtnToReload")],1),t.itemsEmpty&&!t.isLoading?a("EmptyItems",{attrs:{icon:"mdi-account-group",text:"No tiene usuarios creados. Para crear usuarios clic en el botón Creación de usuario"}}):a("v-card",[a("v-col",[a("v-row",[a("v-spacer"),a("v-text-field",{staticClass:"flex-grow-1 mr-md-2",attrs:{"append-icon":"mdi-magnify",dense:"",clearable:"",placeholder:"Ej.: Filtrar por name, email, empresa, etc",outlined:""},model:{value:t.searchText,callback:function(e){t.searchText=e},expression:"searchText"}})],1)],1),a("v-data-table",{staticClass:"flex-grow-1",attrs:{loading:t.isLoading,headers:t.headers,items:t.items_users_aux},scopedSlots:t._u([{key:"item.email",fn:function(e){var s=e.item;return[a("div",{staticClass:"d-none d-lg-block"},[a("userAvatar",{attrs:{user:s}})],1),a("div",{staticClass:"d-lg-none"},[t._v(" "+t._s(s.email)+" ")])]}},{key:"item.status",fn:function(e){var s=e.item;return[1===s.status?a("v-icon",{attrs:{small:"",color:"success"}},[t._v(" mdi-check-circle ")]):a("v-icon",{attrs:{small:""}},[t._v(" mdi-circle-outline ")])]}},{key:"item.created",fn:function(e){var s=e.item;return[a("div",[t._v(t._s(t._f("formatDate")(s.created,"ll")))])]}},{key:"item.credit",fn:function(e){var s=e.item;return[a("div",[t._v(t._s(t._f("formatCurrency")(s.credit,t.configFormat)))])]}},{key:"item.availableCredit",fn:function(e){var s=e.item;return[a("div",[t._v(t._s(t._f("formatCurrency")(s.availableCredit,t.configFormat)))])]}},{key:"item.actions",fn:function(e){var s=e.item;return[a("v-menu",{attrs:{"offset-y":""},scopedSlots:t._u([{key:"activator",fn:function(e){var s=e.attrs,i=e.on;return[a("v-btn",t._g(t._b({},"v-btn",s,!1),i),[t._v(" Acciones ")])]}}],null,!0)},[a("v-list",[a("v-list-item",{attrs:{link:""},on:{click:function(e){return t.updateUser(s.id)}}},[t._v(" Modificar ")])],1),s.status?a("v-list",[a("v-list-item",{attrs:{link:""},on:{click:function(e){return t.confirmDisabled(s)}}},[t._v(" Deshabilitar ")])],1):a("v-list",[a("v-list-item",{attrs:{link:""},on:{click:function(e){return t.confirmEnabled(s)}}},[t._v(" Habilitar ")])],1),t.isAdmin?a("v-list",[a("v-list-item",{attrs:{link:""},on:{click:function(e){return t.confirmLoginUser(s)}}},[t._v(" Iniciar sesión ")])],1):t._e()],1)]}}],null,!0)})],1),a("v-dialog",{attrs:{width:"600px"},model:{value:t.dialogConfirmLoginUser,callback:function(e){t.dialogConfirmLoginUser=e},expression:"dialogConfirmLoginUser"}},[a("v-card",[a("v-card-title",[a("v-icon",[t._v("mdi-login-variant")]),t._v("Iniciar sesión")],1),a("v-card-text",[a("p",{staticStyle:{"font-size":"18px"}},[t._v("Está seguro que desea iniciar sesión con este usuario?")])]),a("v-card-actions",[a("v-btn",{attrs:{text:""},on:{click:function(e){t.dialogConfirmLoginUser=!1}}},[t._v("Cancelar")]),a("v-spacer"),a("v-btn",{attrs:{text:""},on:{click:function(e){return t.loginUser()}}},[t._v("Iniciar sesión")])],1)],1)],1),a("v-dialog",{attrs:{width:"600px"},model:{value:t.dialogConfirmDisabledUser,callback:function(e){t.dialogConfirmDisabledUser=e},expression:"dialogConfirmDisabledUser"}},[a("v-card",[a("v-card-title",[a("v-icon",[t._v("mdi-account-cancel")]),t._v(" Deshabilitar usuario")],1),a("v-card-text",[a("p",{staticStyle:{"font-size":"18px"}},[t._v("Está seguro que desea deshabilitar a este usuario?")])]),a("v-card-actions",[a("v-btn",{attrs:{text:""}},[t._v("Cancelar")]),a("v-spacer"),a("v-btn",{attrs:{text:""},on:{click:function(e){return t.disableUser()}}},[t._v("Deshabilitar")])],1)],1)],1),a("v-dialog",{attrs:{width:"600px"},model:{value:t.dialogConfirmEnabledUser,callback:function(e){t.dialogConfirmEnabledUser=e},expression:"dialogConfirmEnabledUser"}},[a("v-card",[a("v-card-title",[a("v-icon",[t._v("mdi-account-cancel")]),t._v(" Habilitar usuario")],1),a("v-card-text",[a("p",{staticStyle:{"font-size":"18px"}},[t._v("Está seguro que desea habilitar a este usuario?")])]),a("v-card-actions",[a("v-btn",{attrs:{text:""}},[t._v("Cancelar")]),a("v-spacer"),a("v-btn",{attrs:{text:""},on:{click:function(e){return t.enableUser()}}},[t._v("Habilitar")])],1)],1)],1)],1)},i=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"display-1"},[t._v("Usuarios")])])}],r=(a("4de4"),a("caad"),a("2532"),a("b0c0"),a("88f5")),n=a("bc25"),o=a("ba57"),c=a("ed7b"),l={components:{userAvatar:n["a"],EmptyItems:o["a"],BtnToReload:c["a"]},data:function(){return{erros:{email:"",password:""},selectedUser:null,dialogConfirmLoginUser:!1,dialogConfirmDisabledUser:!1,dialogConfirmEnabledUser:!1,isLoading:!1,items:[],items_users_aux:[],myUser:null,searchText:"",headers:[{text:"Usuario",value:"email"},{text:"Crédito inicial",value:"credit"},{text:"Créditos disponibles",value:"availableCredit"},{text:"Última Modif.",value:"updated_at"},{text:"Estado",value:"status"},{text:"Acciones",value:"actions"}]}},computed:{itemsEmpty:function(){return 0===this.items.length},configFormat:function(){return{decimalDigits:0,decimalSeparator:".",thousandsSeparator:",",currencySymbol:"",currencySymbolNumberOfSpaces:0,currencySymbolPosition:"left"}},isValidEmail:function(){return void 0===this.erros.email?"":this.erros.email},isValidPassword:function(){return void 0===this.erros.password?"":this.erros.password},isAdmin:function(){return $cookies.get("user").isAdmin}},watch:{searchText:function(t){this.searchUser(t)}},mounted:function(){this.getUsers()},methods:{getUsers:function(){var t=this;this.isLoading=!0,r["a"].get("/user").then((function(e){e.data.success?(t.items=e.data.data,t.items_users_aux=e.data.data,t.isLoading=!1,console.log(t.items)):t.$store.dispatch("app/showToast",e.data.message)})).catch((function(t){console.log(t)}))},updateUser:function(t){this.$router.push({path:"/config/users/register/"+t})},createUser:function(){this.$router.push({path:"/config/users/register"})},loginUser:function(){var t=this;r["a"].post("/login/"+this.selectedUser.id).then((function(e){e.data.success?($cookies.set("user",e.data.data.user),$cookies.set("token",e.data.data.access_token),$cookies.set("services",e.data.data.services),window.location.href="/"):t.$store.dispatch("app/showToast",e.data.message)})).catch((function(e){t.erros=e.response.data.errors}))},disableUser:function(){var t=this,e={status:!1};r["a"].post("/disable/"+this.selectedUser.id,e).then((function(e){e.data.success?(t.$store.dispatch("app/showToast",e.data.message),t.dialogConfirmDisabledUser=!1,t.getUsers()):t.$store.dispatch("app/showToast",e.data.message)}))},enableUser:function(){var t=this,e={status:!0};r["a"].post("/disable/"+this.selectedUser.id,e).then((function(e){e.data.success?(t.$store.dispatch("app/showToast",e.data.message),t.dialogConfirmEnabledUser=!1,t.getUsers()):t.$store.dispatch("app/showToast",e.data.message)}))},confirmLoginUser:function(t){this.dialogConfirmLoginUser=!0,this.selectedUser=t},confirmDisabled:function(t){this.dialogConfirmDisabledUser=!0,this.selectedUser=t},confirmEnabled:function(t){this.dialogConfirmEnabledUser=!0,this.selectedUser=t},searchUser:function(t){t?this.items_users_aux=this.items.filter((function(e){return e.name.includes(t)||e.email.includes(t)})):this.getUsers()}}},d=l,u=(a("5134"),a("2877")),v=a("6544"),f=a.n(v),m=a("8336"),p=a("b0af"),h=a("99d9"),g=a("62ad"),b=a("8fea"),_=a("169a"),x=a("132d"),U=a("8860"),C=a("da13"),k=a("e449"),y=a("0fd9"),w=a("2fa4"),E=a("8654"),V=Object(u["a"])(d,s,i,!1,null,"26a99e88",null);e["default"]=V.exports;f()(V,{VBtn:m["a"],VCard:p["a"],VCardActions:h["a"],VCardText:h["c"],VCardTitle:h["d"],VCol:g["a"],VDataTable:b["a"],VDialog:_["a"],VIcon:x["a"],VList:U["a"],VListItem:C["a"],VMenu:k["a"],VRow:y["a"],VSpacer:w["a"],VTextField:E["a"]})},5134:function(t,e,a){"use strict";a("6236")},6236:function(t,e,a){},ba57:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-row",{attrs:{justify:"center"}},[a("v-col",{attrs:{cols:"9",lg:"3"}},[a("v-icon",{attrs:{size:"200",color:"#a8a8a8"}},[t._v(t._s(t.icon))]),a("p",{staticStyle:{color:"#a8a8a8"}},[t._v(" "+t._s(t.text)+" ")])],1)],1)},i=[],r={props:{show:{type:Boolean,default:!1},icon:{type:String,default:""},text:{type:String,default:""}}},n=r,o=a("2877"),c=a("6544"),l=a.n(c),d=a("62ad"),u=a("132d"),v=a("0fd9"),f=Object(o["a"])(n,s,i,!1,null,null,null);e["a"]=f.exports;l()(f,{VCol:d["a"],VIcon:u["a"],VRow:v["a"]})},ed7b:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("v-btn",{staticClass:"ml-2",attrs:{outlined:"",color:"primary"},on:{click:t.reoad}},[a("v-icon",[t._v(" mdi-reload ")])],1)],1)},i=[],r={data:function(){return{loading:!1}},methods:{reoad:function(){window.location.reload()}}},n=r,o=a("2877"),c=a("6544"),l=a.n(c),d=a("8336"),u=a("132d"),v=Object(o["a"])(n,s,i,!1,null,null,null);e["a"]=v.exports;l()(v,{VBtn:d["a"],VIcon:u["a"]})}}]);