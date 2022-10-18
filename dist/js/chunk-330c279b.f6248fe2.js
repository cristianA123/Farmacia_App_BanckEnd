(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-330c279b"],{b842:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"d-flex flex-row flex-grow-1 mt-2"},[a("v-navigation-drawer",{staticClass:"elevation-1 rounded flex-shrink-0",class:[t.$vuetify.rtl?"ml-3":"mr-3"],attrs:{app:t.$vuetify.breakpoint.mdAndDown,permanent:t.$vuetify.breakpoint.lgAndUp,floating:"",right:t.$vuetify.rtl,width:"240"},model:{value:t.drawer,callback:function(e){t.drawer=e},expression:"drawer"}},[a("v-list",{staticClass:"mt-2 pa-0",attrs:{dense:"",nav:""}},[a("div",{staticClass:"mx-2 mb-2"},[a("v-btn",{attrs:{outlined:"",block:""},on:{click:function(e){return t.openNewAgenda()}}},[a("v-icon",{attrs:{small:"",left:""}},[t._v("mdi-plus")]),t._v(" Crear agenda ")],1)],1),t._l(t.agendas,(function(e,n){return a("v-list-item",{key:n,attrs:{to:"/tools/agendas/"+e.id,"active-class":"primary--text",link:""},model:{value:t.agendaSelected,callback:function(e){t.agendaSelected=e},expression:"agendaSelected"}},[a("v-list-item-icon",[a("v-icon",{attrs:{small:""}},[t._v("mdi-book-open-blank-variant")])],1),a("v-list-item-content",[a("v-list-item-title",[t._v(t._s(e.name))])],1),0!==e.all_contacts?a("v-list-item-action",[[e.upload?a("v-badge",{staticClass:"font-weight-bold",attrs:{inline:"",color:"orange",content:e.all_contacts}}):a("v-badge",{staticClass:"font-weight-bold",attrs:{inline:"",color:"primary",content:e.all_contacts}})]],2):t._e()],1)}))],2)],1),a("div",{staticClass:"d-flex flex-grow-1 flex-column"},[a("v-toolbar",{staticClass:"hidden-lg-and-up flex-grow-0 mb-2"},[a("v-app-bar-nav-icon",{on:{click:function(e){t.drawer=!t.drawer}}}),a("div",{staticClass:"title font-weight-bold"},[t._v("Agendas")])],1),a("ContactsComponent",{key:t.$route.params.agendaId,attrs:{"agenda-id":t.$route.params.agendaId,agendas:t.agendas},on:{onCreatedContact:t.refreshData}})],1),a("new-agenda",{ref:"newAgenda",on:{onCreatedAgenda:t.onCreatedAgenda}})],1)},s=[],o=a("1da1"),i=a("5530"),c=(a("159b"),a("96cf"),a("d40f")),r=a("88f5"),l=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"d-flex flex-column flex-grow-1"},[a("v-navigation-drawer",{attrs:{fixed:"",right:"","hide-overlay":"",temporary:"",width:"310"},model:{value:t.config,callback:function(e){t.config=e},expression:"config"}},[a("div",{staticClass:"d-flex align-center pa-2"},[a("div",{staticClass:"title"},[t._v("Configuraciones")]),a("v-spacer"),a("v-btn",{attrs:{icon:""},on:{click:function(e){t.config=!1}}},[a("v-icon",[t._v("mdi-close")])],1)],1),a("v-divider"),a("div",{staticClass:"pa-2"},[a("div",{staticClass:"font-weight-bold my-1"},[t._v("Duplicados")]),a("span",[t._v("Permite agregar contactos duplicados")]),a("br"),a("br"),a("v-switch",{attrs:{inset:"",label:"Aceptar contactos duplicados"},model:{value:t.duplicateAcept,callback:function(e){t.duplicateAcept=e},expression:"duplicateAcept"}})],1),a("div",{staticClass:"pa-2"},[a("div",{staticClass:"font-weight-bold my-1"},[t._v("Depurar base")]),a("span",[t._v("Elimina todos los números Incorrecto de esta Base de contactos")]),a("br"),a("br"),a("v-col",{staticClass:"pa-0 ma-0"},[a("v-btn",{staticClass:"col-lg-12",attrs:{mandatory:""}},[t._v(" Limpiar ")])],1)],1)],1),a("Move-Agenda",{ref:"moveAgenda",on:{onMoveAgenda:t.onMoveAgenda}}),a("v-card",[a("v-data-table",{attrs:{headers:t.headers,"show-select":"",loading:t.isLoading,items:t.contacts,"items-per-page":10,search:t.searchTable},scopedSlots:t._u([{key:"top",fn:function(){return[a("v-text-field",{directives:[{name:"debounce",rawName:"v-debounce:10000",value:t.getContacts,expression:"getContacts",arg:"10000"}],staticClass:"pa-2",attrs:{"append-icon":"mdi-magnify",solo:"",placeholder:"Ej.: Filtrar por numero, nombre1, nombre2,  email, apellido1, apellido2 etc",outlined:""},model:{value:t.searchText,callback:function(e){t.searchText=e},expression:"searchText"}})]},proxy:!0},{key:"top",fn:function(){return[a("v-col",{staticClass:"pb-1"},[a("v-row",[a("v-menu",{attrs:{"offset-y":"",left:""},scopedSlots:t._u([{key:"activator",fn:function(e){var n=e.on;return[a("transition",{attrs:{name:"slide-fade",mode:"out-in"}},[a("v-btn",t._g({directives:[{name:"show",rawName:"v-show",value:t.selectedUsers.length>0,expression:"selectedUsers.length > 0"}],staticClass:"ml-3"},n),[t._v(" Acciones "),a("v-icon",{attrs:{right:""}},[t._v("mdi-menu-down")])],1)],1)]}}])},[a("v-list",{attrs:{dense:""}},[a("v-list-item",{on:{click:t.deleteItems}},[a("v-list-item-title",[t._v("Eliminar seleccionados")])],1),a("v-list-item",{on:{click:t.moveItems}},[a("v-list-item-title",[t._v("Mover a otra agenda")])],1)],1)],1),a("v-spacer"),a("v-menu",{attrs:{"offset-y":"",left:"",transition:"slide-y-transition"},scopedSlots:t._u([{key:"activator",fn:function(e){var n=e.on;return[a("v-btn",{staticClass:"mr-3",attrs:{outlined:"",color:"primary",loading:t.loadingDownloadExcel},on:{click:t.downloadExcel}},[a("v-icon",[t._v("mdi-progress-download")])],1),a("v-btn",t._g({staticClass:"mr-1",attrs:{color:"primary"}},n),[a("v-icon",{attrs:{left:"",dark:""}},[t._v(" mdi-plus ")]),t._v(" Nuevos contactos ")],1)]}}])},[a("v-list",{attrs:{dense:"",nav:""}},[a("v-list-item",{on:{click:function(e){return t.openNewContact()}}},[a("v-list-item-content",[a("v-list-item-title",[t._v("Individual")])],1)],1),a("v-list-item",{on:{click:function(e){return t.openNewContactsFromExcel()}}},[a("v-list-item-content",[a("v-list-item-title",[t._v("Desde Excel")])],1)],1)],1)],1)],1)],1),a("v-col",{staticClass:"pt-1"},[a("v-text-field",{directives:[{name:"debounce",rawName:"v-debounce:1000",value:t.getContacts,expression:"getContacts",arg:"1000"}],attrs:{solo:"",placeholder:"Ej.: Filtrar por numero, nombre1, nombre2,  email, apellido1, apellido2 etc",outlined:""},model:{value:t.searchText,callback:function(e){t.searchText=e},expression:"searchText"}})],1)]},proxy:!0},{key:"item.id",fn:function(e){var n=e.item;return[a("div",{staticClass:"font-weight-bold"},[t._v("# "),a("copy-label",{attrs:{text:n.id+""}})],1)]}},{key:"item.name1",fn:function(e){var n=e.item;return[a("v-avatar",{attrs:{size:"40"}},[a("v-icon",[t._v(" mdi-account-circle ")])],1),t._v(" "+t._s(n.name1)+" ")]}},{key:"item.is_valid",fn:function(e){var n=e.item;return[1===n.is_valid?a("v-chip",{attrs:{color:"green","text-color":"white",small:""}},[t._v(" Correcto ")]):a("v-chip",{attrs:{color:"red","text-color":"white",small:""}},[t._v(" Incorrecto ")])]}},{key:"item.actions",fn:function(e){var n=e.item;return[a("v-menu",{attrs:{"offset-y":""},scopedSlots:t._u([{key:"activator",fn:function(e){var n=e.attrs,s=e.on;return[a("v-btn",t._g(t._b({attrs:{text:""}},"v-btn",n,!1),s),[t._v(" Acciones ")])]}}],null,!0)},[a("v-list",[a("v-list-item",{attrs:{link:""},on:{click:function(e){return t.detalle(n)}}},[t._v(" Ver detalle ")]),a("v-list-item",{attrs:{link:""},on:{click:function(e){return t.openNewContact(n)}}},[t._v(" Modificar ")]),[a("div",{staticClass:"text-center"},[a("v-dialog",{attrs:{persistent:"","max-width":"400"},scopedSlots:t._u([{key:"activator",fn:function(e){var n=e.on,s=e.attrs;return[a("v-list-item",t._g(t._b({attrs:{link:""}},"v-list-item",s,!1),n),[t._v(" Eliminar ")])]}}],null,!0),model:{value:t.dialogConfirm,callback:function(e){t.dialogConfirm=e},expression:"dialogConfirm"}},[a("v-card",[a("v-card-title",{staticClass:"text-h5"},[t._v(" Seguro de eliminar este contacto? ")]),a("v-card-text",[t._v("Una vez eliminado este contacto, no podrá recuperarla. Las campañas que se esten procesando y que hagan uso de esta agenda se enviarán con normalidad.")]),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"secondary",text:""},on:{click:function(e){t.dialogConfirm=!1}}},[t._v(" Cancelar ")]),a("v-btn",{attrs:{color:"success",text:""},on:{click:function(e){return t.deleteItem(n)}}},[t._v(" Confirmo ")])],1)],1)],1)],1)]],2)],1)]}}],null,!0),model:{value:t.selectedUsers,callback:function(e){t.selectedUsers=e},expression:"selectedUsers"}})],1),a("new-contact",{ref:"newContact",attrs:{"agenda-id":t.$route.params.agendaId},on:{onCreated:t.onCreated}}),a("new-contacts-from-excel",{ref:"newContactsFromExcel"})],1)},d=[],u=a("2909"),v=(a("b0c0"),a("43f0")),m=a("9afe"),g=a("5f1f"),f=a("2f62"),p=a("5e85"),h=a.n(p),b=a("c1df"),C=a.n(b),_={components:{MoveAgenda:g["a"],newContact:v["a"],newContactsFromExcel:m["a"]},props:{agendas:{type:Array,default:function(){return[]}}},data:function(){return{pagination:{current:1,total:10},searchText:"",duplicateAcept:!1,searchTable:"",isLoading:!1,config:!1,dialogConfirm:!1,agenda:"",lengthPagination:0,itemSelected:"",drawer:null,contacts:[],contact:{number:null,name1:"",name2:"",lastname1:"",lastname2:"",email:"",var1:"",var2:"",var3:"",var4:""},selectedUsers:[],headers:[{text:"Número",value:"number"},{text:"Nombre1",value:"name1"},{text:"Estado",value:"is_valid"},{text:"Ult. Modif.",value:"updated"},{text:"Acciones",value:"actions"}],cont_socket:0,loadingDownloadExcel:!1,pagiITtems:10}},computed:Object(i["a"])({countContacs:function(){return this.contacts.length},computedSelectedUsers:function(){return[1,2]}},Object(f["c"])("sockets",{pusher:"pusher"})),watch:{pagiITtems:function(t,e){}},mounted:function(){this.agenda=this.$route.params.agenda,this.getContacts(),this.listenEventPusher()},methods:{onPageChange:function(){this.getContacts()},getContacts:function(){var t=this;this.isLoading=!0,this.selectedUsers=[];this.searchText,""===this.searchText&&this.pagination.current;r["a"].get("/contactByAgenda/"+this.$route.params.agendaId).then((function(e){e.data.success?t.contacts=e.data.data:t.$store.dispatch("app/showToast",e.data.message),t.isLoading=!1})).catch((function(t){}))},selectContact:function(t){this.contact=t},openNewContact:function(t){this.$refs.newContact.open(t)},openNewContactsFromExcel:function(){this.$refs.newContactsFromExcel.open()},confirmDelete:function(t){this.deleteItem(t)},deleteItem:function(t){var e=this;r["a"].delete("/contact/"+t.id).then((function(t){t.data.success?(e.$store.dispatch("app/showToast","Contacto eliminado exitosamente"),e.dialogConfirm=!1,e.getContacts()):e.$store.dispatch("app/showToast",t.data.message)}))},deleteItems:function(){var t=this,e=[];this.selectedUsers.forEach((function(t){e.push(t.id)}));var a={contacts_id:e};r["a"].delete("/agenda/"+this.$route.params.agendaId+"/contacts",{data:a}).then((function(e){e.data.success&&(t.$store.dispatch("app/showToast",e.data.message),t.getContacts())}))},onMoveAgenda:function(t){var e=this,a=[];this.selectedUsers.forEach((function(t){a.push(t.id)}));var n={agenda_id:t,contacts_id:a};r["a"].post("/move/contact",n).then((function(t){t.data.success&&(e.$store.dispatch("app/showToast",t.data.message),e.getContacts())}))},moveItems:function(){this.$refs.moveAgenda.open()},onCreated:function(){this.getContacts(),this.$emit("onCreatedContact")},listenEventPusher:function(){var t=this,e=this.pusher.subscribe("NumberOfContacts"+$cookies.get("user").id);e.bind("NumberOfContactsInAgenda"+$cookies.get("user").id,(function(e){t.$route.params.agendaId&&parseInt(t.$route.params.agendaId)===e.data.agenda_id&&(t.cont_socket++,10===t.cont_socket&&(t.pagination.total++,t.cont_socket=0),t.contacts.unshift(e.data))}))},downloadExcel:function(){var t=this;this.loadingDownloadExcel=!0;var e="";this.agendas.forEach((function(a){a.id===parseInt(t.$route.params.agendaId)&&(e=a.name)})),r["a"].post("/downloadsContacts",{agenda_id:this.$route.params.agendaId}).then((function(a){if(a.data.success){var n=[{sheet:"contactos",columns:[{label:"CELULAR",value:"number"},{label:"PRIMER NOMBRE",value:"name1"},{label:"SEGUNDO NOMBRE",value:"name2"},{label:"CORREO",value:"email"},{label:"APELLIDO PATERNO",value:"last_name1"},{label:"APELLIDO MATERNO",value:"last_name2"},{label:"VAR1",value:"var1"},{label:"VAR2",value:"var2"},{label:"VAR3",value:"var3"},{label:"VAR4",value:"var4"}],content:Object(u["a"])(a.data.data)}],s={sheetName:"contactos",fileName:e+"_"+C()(new Date).format("L")};h()(n,s),t.loadingDownloadExcel=!1}}))}}},w=_,x=a("2877"),k=a("6544"),A=a.n(k),V=a("8212"),E=a("8336"),y=a("b0af"),I=a("99d9"),$=a("cc20"),T=a("62ad"),N=a("8fea"),L=a("169a"),D=a("ce7e"),O=a("132d"),R=a("8860"),S=a("da13"),M=a("5d23"),U=a("e449"),j=a("f774"),P=a("0fd9"),B=a("2fa4"),F=a("b73d"),z=a("8654"),q=Object(x["a"])(w,l,d,!1,null,null,null),G=q.exports;A()(q,{VAvatar:V["a"],VBtn:E["a"],VCard:y["a"],VCardActions:I["a"],VCardText:I["c"],VCardTitle:I["d"],VChip:$["a"],VCol:T["a"],VDataTable:N["a"],VDialog:L["a"],VDivider:D["a"],VIcon:O["a"],VList:R["a"],VListItem:S["a"],VListItemContent:M["b"],VListItemTitle:M["d"],VMenu:U["a"],VNavigationDrawer:j["a"],VRow:P["a"],VSpacer:B["a"],VSwitch:F["a"],VTextField:z["a"]});var J={components:{newAgenda:c["a"],ContactsComponent:G},data:function(){return{agendas:[],agendaSelected:1,drawer:null,dialogConfirm:!1,isLoading:!1,aux_all_contacts:0,aux_cont_contacts:0}},computed:Object(i["a"])({itemsEmpty:function(){return 0===this.agendas.length}},Object(f["c"])("sockets",{pusher:"pusher"})),mounted:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t.getAgendas(),t.listenEventPusher();case 2:case"end":return e.stop()}}),e)})))()},methods:{getAgendas:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.isLoading=!1,e.next=3,r["a"].get("/agenda");case 3:a=e.sent,a.data.success?t.agendas=a.data.data:t.$store.dispatch("app/showToast",a.data.message);case 5:case"end":return e.stop()}}),e)})))()},openNewAgenda:function(t){this.$refs.newAgenda.open(t)},confirmDelete:function(t){this.deleteItem(t)},deleteItem:function(t){var e=this;r["a"].delete("/agenda/"+t.id).then((function(t){t.data.success?(e.$store.dispatch("app/showToast","Agenda eliminada exitosamente"),e.dialogConfirm=!1,e.getAgendas()):e.$store.dispatch("app/showToast",t.data.message)}))},manage:function(t){this.$router.push({path:"/tools/agendas/"+t.id+"/contacts",params:{agenda:t}})},refreshData:function(){this.getAgendas()},onCreatedAgenda:function(){this.getAgendas()},listenEventPusher:function(){var t=this,e=this.pusher.subscribe("NumberOfContacts"+$cookies.get("user").id);e.bind("NumberOfContactsInAgenda"+$cookies.get("user").id,(function(e){t.agendas.forEach((function(a){a.id===e.data.agenda_id&&(0===t.aux_cont_contacts&&(t.aux_all_contacts=a.all_contacts,t.aux_cont_contacts++),a.all_contacts=Math.round(e.progresss)+"%",a.upload=1,100===e.progresss&&(a.all_contacts=t.aux_all_contacts+e.totalRows-1,a.upload=void 0,t.aux_all_contacts=0,t.aux_cont_contacts=0))}))}))}}},H=J,K=a("5bc1"),Q=a("4ca6"),W=a("1800"),X=a("34c3"),Y=a("71d9"),Z=Object(x["a"])(H,n,s,!1,null,null,null);e["default"]=Z.exports;A()(Z,{VAppBarNavIcon:K["a"],VBadge:Q["a"],VBtn:E["a"],VIcon:O["a"],VList:R["a"],VListItem:S["a"],VListItemAction:W["a"],VListItemContent:M["b"],VListItemIcon:X["a"],VListItemTitle:M["d"],VNavigationDrawer:j["a"],VToolbar:Y["a"]})},d40f:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-dialog",{attrs:{width:"600"},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[a("v-card",[a("v-form",{ref:"formNewAgenda",attrs:{"lazy-validation":""},on:{submit:function(e){return e.preventDefault(),t.save()}}},[a("v-card-title",{staticClass:"pa-2"},[t._v(" "+t._s(t.isEdit?"Modificar agenda":"Crear agenda")+" "),a("v-spacer"),a("v-btn",{attrs:{icon:""},on:{click:function(e){t.dialog=!1}}},[a("v-icon",[t._v("mdi-close")])],1)],1),a("v-divider"),a("div",[a("v-text-field",{staticClass:"px-2 py-1",attrs:{solo:"",flat:"",placeholder:"Nombre","error-messages":t.isValidName,autofocus:"",required:""},model:{value:t.name,callback:function(e){t.name=e},expression:"name"}}),a("v-divider")],1),a("v-divider"),a("v-card-actions",{staticClass:"pa-2"},[a("v-btn",{attrs:{outlined:""},on:{click:t.close}},[t._v("Cancelar")]),a("v-spacer"),a("v-btn",{attrs:{color:"primary",type:"submit",loading:t.isLoadingAgenda}},[t._v("Guardar")])],1)],1)],1)],1)},s=[],o=(a("b0c0"),a("88f5")),i={data:function(){return{backendErrors:{name:""},dialog:!1,name:"",agenda:null,isLoadingAgenda:!1}},computed:{isEdit:function(){return void 0!==this.agenda},isValidName:function(){return void 0===this.backendErrors.name?"":this.backendErrors.name}},methods:{open:function(t){this.agenda=t,this.isEdit?this.name=t.name:this.name="",this.dialog=!0},close:function(){this.dialog=!1,this.isLoadingAgenda=!1},save:function(){var t=this;if(this.$refs.formNewAgenda.validate())if(this.isLoadingAgenda=!0,this.isEdit){var e={name:this.name};o["a"].put("/agenda/"+this.agenda.id,e).then((function(e){e.data.success&&(t.$store.dispatch("app/showToast","Agenda actualizada exitosamente"),t.$emit("onCreatedAgenda"),t.close())})).catch((function(e){t.backendErrors=e.response.data.errors,t.isLoadingAgenda=!1}))}else{var a={name:this.name};o["a"].post("/agenda",a,{headers:{Authorization:"Bearer "+window.localStorage.token}}).then((function(e){e.data.success&&(t.$store.dispatch("app/showToast","Agenda creada exitosamente"),t.$emit("onCreatedAgenda"),t.close())})).catch((function(e){t.isLoadingAgenda=!1,t.backendErrors=e.response.data.errors}))}}}},c=i,r=a("2877"),l=a("6544"),d=a.n(l),u=a("8336"),v=a("b0af"),m=a("99d9"),g=a("169a"),f=a("ce7e"),p=a("4bd4"),h=a("132d"),b=a("2fa4"),C=a("8654"),_=Object(r["a"])(c,n,s,!1,null,null,null);e["a"]=_.exports;d()(_,{VBtn:u["a"],VCard:v["a"],VCardActions:m["a"],VCardTitle:m["d"],VDialog:g["a"],VDivider:f["a"],VForm:p["a"],VIcon:h["a"],VSpacer:b["a"],VTextField:C["a"]})}}]);