(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-51dd4af9"],{"1cb6":function(t,e,i){"use strict";e["a"]={headers:{Authorization:"Bearer "+window.localStorage.token}}},"2b5d":function(t,e,i){"use strict";var n=i("53ca"),a=i("5530"),s=(i("d3b7"),i("25f0"),i("7db0"),i("8a79"),i("fb6a"),i("b0c0"),i("caad"),i("2532"),i("c740"),i("a434"),i("2bfd"),i("b974")),r=(i("d81d"),i("4de4"),i("498a"),i("8654")),o=i("d9f7"),l=i("80d2"),c=Object(a["a"])(Object(a["a"])({},s["b"]),{},{offsetY:!0,offsetOverflow:!0,transition:!1}),u=s["a"].extend({name:"v-autocomplete",props:{allowOverflow:{type:Boolean,default:!0},autoSelectFirst:{type:Boolean,default:!1},filter:{type:Function,default:function(t,e,i){return i.toLocaleLowerCase().indexOf(e.toLocaleLowerCase())>-1}},hideNoData:Boolean,menuProps:{type:s["a"].options.props.menuProps.type,default:function(){return c}},noFilter:Boolean,searchInput:{type:String}},data:function(){return{lazySearch:this.searchInput}},computed:{classes:function(){return Object(a["a"])(Object(a["a"])({},s["a"].options.computed.classes.call(this)),{},{"v-autocomplete":!0,"v-autocomplete--is-selecting-index":this.selectedIndex>-1})},computedItems:function(){return this.filteredItems},selectedValues:function(){var t=this;return this.selectedItems.map((function(e){return t.getValue(e)}))},hasDisplayedItems:function(){var t=this;return this.hideSelected?this.filteredItems.some((function(e){return!t.hasItem(e)})):this.filteredItems.length>0},currentRange:function(){return null==this.selectedItem?0:String(this.getText(this.selectedItem)).length},filteredItems:function(){var t=this;return!this.isSearching||this.noFilter||null==this.internalSearch?this.allItems:this.allItems.filter((function(e){var i=Object(l["r"])(e,t.itemText),n=null!=i?String(i):"";return t.filter(e,String(t.internalSearch),n)}))},internalSearch:{get:function(){return this.lazySearch},set:function(t){this.lazySearch!==t&&(this.lazySearch=t,this.$emit("update:search-input",t))}},isAnyValueAllowed:function(){return!1},isDirty:function(){return this.searchIsDirty||this.selectedItems.length>0},isSearching:function(){return this.multiple&&this.searchIsDirty||this.searchIsDirty&&this.internalSearch!==this.getText(this.selectedItem)},menuCanShow:function(){return!!this.isFocused&&(this.hasDisplayedItems||!this.hideNoData)},$_menuProps:function(){var t=s["a"].options.computed.$_menuProps.call(this);return t.contentClass="v-autocomplete__content ".concat(t.contentClass||"").trim(),Object(a["a"])(Object(a["a"])({},c),t)},searchIsDirty:function(){return null!=this.internalSearch&&""!==this.internalSearch},selectedItem:function(){var t=this;return this.multiple?null:this.selectedItems.find((function(e){return t.valueComparator(t.getValue(e),t.getValue(t.internalValue))}))},listData:function(){var t=s["a"].options.computed.listData.call(this);return t.props=Object(a["a"])(Object(a["a"])({},t.props),{},{items:this.virtualizedItems,noFilter:this.noFilter||!this.isSearching||!this.filteredItems.length,searchInput:this.internalSearch}),t}},watch:{filteredItems:"onFilteredItemsChanged",internalValue:"setSearch",isFocused:function(t){t?(document.addEventListener("copy",this.onCopy),this.$refs.input&&this.$refs.input.select()):(document.removeEventListener("copy",this.onCopy),this.$refs.input&&this.$refs.input.blur(),this.updateSelf())},isMenuActive:function(t){!t&&this.hasSlot&&(this.lazySearch=null)},items:function(t,e){e&&e.length||!this.hideNoData||!this.isFocused||this.isMenuActive||!t.length||this.activateMenu()},searchInput:function(t){this.lazySearch=t},internalSearch:"onInternalSearchChanged",itemText:"updateSelf"},created:function(){this.setSearch()},destroyed:function(){document.removeEventListener("copy",this.onCopy)},methods:{onFilteredItemsChanged:function(t,e){var i=this;t!==e&&(this.setMenuIndex(-1),this.$nextTick((function(){i.internalSearch&&(1===t.length||i.autoSelectFirst)&&(i.$refs.menu.getTiles(),i.setMenuIndex(0))})))},onInternalSearchChanged:function(){this.updateMenuDimensions()},updateMenuDimensions:function(){this.isMenuActive&&this.$refs.menu&&this.$refs.menu.updateDimensions()},changeSelectedIndex:function(t){this.searchIsDirty||(this.multiple&&t===l["y"].left?-1===this.selectedIndex?this.selectedIndex=this.selectedItems.length-1:this.selectedIndex--:this.multiple&&t===l["y"].right?this.selectedIndex>=this.selectedItems.length-1?this.selectedIndex=-1:this.selectedIndex++:t!==l["y"].backspace&&t!==l["y"].delete||this.deleteCurrentItem())},deleteCurrentItem:function(){var t=this.selectedIndex,e=this.selectedItems[t];if(this.isInteractive&&!this.getDisabled(e)){var i=this.selectedItems.length-1;if(-1!==this.selectedIndex||0===i){var n=this.selectedItems.length,a=t!==n-1?t:t-1,s=this.selectedItems[a];s?this.selectItem(e):this.setValue(this.multiple?[]:null),this.selectedIndex=a}else this.selectedIndex=i}},clearableCallback:function(){this.internalSearch=null,s["a"].options.methods.clearableCallback.call(this)},genInput:function(){var t=r["a"].options.methods.genInput.call(this);return t.data=Object(o["a"])(t.data,{attrs:{"aria-activedescendant":Object(l["p"])(this.$refs.menu,"activeTile.id"),autocomplete:Object(l["p"])(t.data,"attrs.autocomplete","off")},domProps:{value:this.internalSearch}}),t},genInputSlot:function(){var t=s["a"].options.methods.genInputSlot.call(this);return t.data.attrs.role="combobox",t},genSelections:function(){return this.hasSlot||this.multiple?s["a"].options.methods.genSelections.call(this):[]},onClick:function(t){this.isInteractive&&(this.selectedIndex>-1?this.selectedIndex=-1:this.onFocus(),this.isAppendInner(t.target)||this.activateMenu())},onInput:function(t){if(!(this.selectedIndex>-1)&&t.target){var e=t.target,i=e.value;e.value&&this.activateMenu(),this.internalSearch=i,this.badInput=e.validity&&e.validity.badInput}},onKeyDown:function(t){var e=t.keyCode;!t.ctrlKey&&[l["y"].home,l["y"].end].includes(e)||s["a"].options.methods.onKeyDown.call(this,t),this.changeSelectedIndex(e)},onSpaceDown:function(t){},onTabDown:function(t){s["a"].options.methods.onTabDown.call(this,t),this.updateSelf()},onUpDown:function(t){t.preventDefault(),this.activateMenu()},selectItem:function(t){s["a"].options.methods.selectItem.call(this,t),this.setSearch()},setSelectedItems:function(){s["a"].options.methods.setSelectedItems.call(this),this.isFocused||this.setSearch()},setSearch:function(){var t=this;this.$nextTick((function(){t.multiple&&t.internalSearch&&t.isMenuActive||(t.internalSearch=!t.selectedItems.length||t.multiple||t.hasSlot?null:t.getText(t.selectedItem))}))},updateSelf:function(){(this.searchIsDirty||this.internalValue)&&(this.multiple||this.valueComparator(this.internalSearch,this.getValue(this.internalValue))||this.setSearch())},hasItem:function(t){return this.selectedValues.indexOf(this.getValue(t))>-1},onCopy:function(t){var e,i;if(-1!==this.selectedIndex){var n=this.selectedItems[this.selectedIndex],a=this.getText(n);null==(e=t.clipboardData)||e.setData("text/plain",a),null==(i=t.clipboardData)||i.setData("text/vnd.vuetify.autocomplete.item+plain",a),t.preventDefault()}}}});e["a"]=u.extend({name:"v-combobox",props:{delimiters:{type:Array,default:function(){return[]}},returnObject:{type:Boolean,default:!0}},data:function(){return{editingIndex:-1}},computed:{computedCounterValue:function(){return this.multiple?this.selectedItems.length:(this.internalSearch||"").toString().length},hasSlot:function(){return s["a"].options.computed.hasSlot.call(this)||this.multiple},isAnyValueAllowed:function(){return!0},menuCanShow:function(){return!!this.isFocused&&(this.hasDisplayedItems||!!this.$slots["no-data"]&&!this.hideNoData)},searchIsDirty:function(){return null!=this.internalSearch}},methods:{onInternalSearchChanged:function(t){if(t&&this.multiple&&this.delimiters.length){var e=this.delimiters.find((function(e){return t.endsWith(e)}));null!=e&&(this.internalSearch=t.slice(0,t.length-e.length),this.updateTags())}this.updateMenuDimensions()},genInput:function(){var t=u.options.methods.genInput.call(this);return delete t.data.attrs.name,t.data.on.paste=this.onPaste,t},genChipSelection:function(t,e){var i=this,n=s["a"].options.methods.genChipSelection.call(this,t,e);return this.multiple&&(n.componentOptions.listeners=Object(a["a"])(Object(a["a"])({},n.componentOptions.listeners),{},{dblclick:function(){i.editingIndex=e,i.internalSearch=i.getText(t),i.selectedIndex=-1}})),n},onChipInput:function(t){s["a"].options.methods.onChipInput.call(this,t),this.editingIndex=-1},onEnterDown:function(t){t.preventDefault(),this.getMenuIndex()>-1||this.$nextTick(this.updateSelf)},onFilteredItemsChanged:function(t,e){this.autoSelectFirst&&u.options.methods.onFilteredItemsChanged.call(this,t,e)},onKeyDown:function(t){var e=t.keyCode;!t.ctrlKey&&[l["y"].home,l["y"].end].includes(e)||s["a"].options.methods.onKeyDown.call(this,t),this.multiple&&e===l["y"].left&&0===this.$refs.input.selectionStart?this.updateSelf():e===l["y"].enter&&this.onEnterDown(t),this.changeSelectedIndex(e)},onTabDown:function(t){if(this.multiple&&this.internalSearch&&-1===this.getMenuIndex())return t.preventDefault(),t.stopPropagation(),this.updateTags();u.options.methods.onTabDown.call(this,t)},selectItem:function(t){this.editingIndex>-1?this.updateEditing():(u.options.methods.selectItem.call(this,t),this.internalSearch&&this.multiple&&this.getText(t).toLocaleLowerCase().includes(this.internalSearch.toLocaleLowerCase())&&(this.internalSearch=null))},setSelectedItems:function(){null==this.internalValue||""===this.internalValue?this.selectedItems=[]:this.selectedItems=this.multiple?this.internalValue:[this.internalValue]},setValue:function(t){s["a"].options.methods.setValue.call(this,null!=t?t:this.internalSearch)},updateEditing:function(){var t=this,e=this.internalValue.slice(),i=this.selectedItems.findIndex((function(e){return t.getText(e)===t.internalSearch}));if(i>-1){var a="object"===Object(n["a"])(e[i])?Object.assign({},e[i]):e[i];e.splice(i,1),e.push(a)}else e[this.editingIndex]=this.internalSearch;this.setValue(e),this.editingIndex=-1,this.internalSearch=null},updateCombobox:function(){if(this.searchIsDirty){this.internalSearch!==this.getText(this.internalValue)&&this.setValue();var t=Boolean(this.$scopedSlots.selection)||this.hasChips;t&&(this.internalSearch=null)}},updateSelf:function(){this.multiple?this.updateTags():this.updateCombobox()},updateTags:function(){var t=this,e=this.getMenuIndex();if(!(e<0&&!this.searchIsDirty||!this.internalSearch)){if(this.editingIndex>-1)return this.updateEditing();var i=this.selectedItems.findIndex((function(e){return t.internalSearch===t.getText(e)})),a=i>-1&&"object"===Object(n["a"])(this.selectedItems[i])?Object.assign({},this.selectedItems[i]):this.internalSearch;if(i>-1){var s=this.internalValue.slice();s.splice(i,1),this.setValue(s)}if(e>-1)return this.internalSearch=null;this.selectItem(a),this.internalSearch=null}},onPaste:function(t){var e;if(this.multiple&&!this.searchIsDirty){var i=null==(e=t.clipboardData)?void 0:e.getData("text/vnd.vuetify.autocomplete.item+plain");i&&-1===this.findExistingIndex(i)&&(t.preventDefault(),s["a"].options.methods.selectItem.call(this,i))}},clearableCallback:function(){this.editingIndex=-1,u.options.methods.clearableCallback.call(this)}}})},"2bfd":function(t,e,i){},"4bd4":function(t,e,i){"use strict";var n=i("5530"),a=(i("caad"),i("2532"),i("07ac"),i("4de4"),i("159b"),i("7db0"),i("58df")),s=i("7e2b"),r=i("3206");e["a"]=Object(a["a"])(s["a"],Object(r["b"])("form")).extend({name:"v-form",provide:function(){return{form:this}},inheritAttrs:!1,props:{disabled:Boolean,lazyValidation:Boolean,readonly:Boolean,value:Boolean},data:function(){return{inputs:[],watchers:[],errorBag:{}}},watch:{errorBag:{handler:function(t){var e=Object.values(t).includes(!0);this.$emit("input",!e)},deep:!0,immediate:!0}},methods:{watchInput:function(t){var e=this,i=function(t){return t.$watch("hasError",(function(i){e.$set(e.errorBag,t._uid,i)}),{immediate:!0})},n={_uid:t._uid,valid:function(){},shouldValidate:function(){}};return this.lazyValidation?n.shouldValidate=t.$watch("shouldValidate",(function(a){a&&(e.errorBag.hasOwnProperty(t._uid)||(n.valid=i(t)))})):n.valid=i(t),n},validate:function(){return 0===this.inputs.filter((function(t){return!t.validate(!0)})).length},reset:function(){this.inputs.forEach((function(t){return t.reset()})),this.resetErrorBag()},resetErrorBag:function(){var t=this;this.lazyValidation&&setTimeout((function(){t.errorBag={}}),0)},resetValidation:function(){this.inputs.forEach((function(t){return t.resetValidation()})),this.resetErrorBag()},register:function(t){this.inputs.push(t),this.watchers.push(this.watchInput(t))},unregister:function(t){var e=this.inputs.find((function(e){return e._uid===t._uid}));if(e){var i=this.watchers.find((function(t){return t._uid===e._uid}));i&&(i.valid(),i.shouldValidate()),this.watchers=this.watchers.filter((function(t){return t._uid!==e._uid})),this.inputs=this.inputs.filter((function(t){return t._uid!==e._uid})),this.$delete(this.errorBag,e._uid)}}},render:function(t){var e=this;return t("form",{staticClass:"v-form",attrs:Object(n["a"])({novalidate:!0},this.attrs$),on:{submit:function(t){return e.$emit("submit",t)}}},this.$slots.default)}})},5311:function(t,e,i){"use strict";var n=i("5607"),a=i("2b0e");e["a"]=a["a"].extend({name:"rippleable",directives:{ripple:n["b"]},props:{ripple:{type:[Boolean,Object],default:!0}},methods:{genRipple:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return this.ripple?(t.staticClass="v-input--selection-controls__ripple",t.directives=t.directives||[],t.directives.push({name:"ripple",value:{center:!0}}),this.$createElement("div",t)):null}}})},"6ca7":function(t,e,i){},7884:function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"flex-grow-1"},[i("div",{staticClass:"d-flex align-center pb-3"},[i("div",[i("div",{staticClass:"display-1"},[t._v(t._s(t.isEdit?"Editar usuario":"Crear usuario"))])]),i("v-spacer"),i("Back-Page",{attrs:{to:"users"}})],1),i("div",{staticClass:"my-2"},[i("div",[!1===t.user.status?i("v-card",{staticClass:"warning mb-4",attrs:{light:""}},[i("v-card-title",[t._v("Usuario deshabilitado")]),i("v-card-subtitle",[t._v("¡Este usuario ha sido deshabilitado! Se revocaron los accesos de inicio de sesión.")]),i("v-card-text",[i("v-btn",{attrs:{dark:""},on:{click:function(e){return t.enableUser()}}},[i("v-icon",{attrs:{left:"",small:""}},[t._v("mdi-account-check")]),t._v("Habilitar usuario ")],1)],1)],1):t._e(),i("v-card",{attrs:{loading:t.isLoading,disabled:t.isLoading}},[i("v-card-title",[t._v(" Información básica ")]),i("v-card-text",[i("div",{staticClass:"d-flex flex-column flex-sm-row"},[i("div",{staticClass:"flex-grow-1 pt-2 pa-sm-2"},[i("v-form",{ref:"form",attrs:{"lazy-validation":""},on:{submit:function(e){return e.preventDefault(),t.submit.apply(null,arguments)}},model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[i("v-text-field",{attrs:{"error-messages":t.isValidName,label:"Nombre",placeholder:"Mi nombre",rules:[function(t){return!!t||"Nombre es obligatorio"}],outlined:"","prepend-icon":"mdi-account-outline"},model:{value:t.user.name,callback:function(e){t.$set(t.user,"name",e)},expression:"user.name"}}),i("v-combobox",{attrs:{disabled:!t.isAdmin,"hide-no-data":!t.search,"search-input":t.search,filter:t.filter,items:t.companies,"prepend-icon":"mdi-briefcase-outline",label:"Seleccione la empresa",rules:[function(t){return!!t||"Empresa es obligatorio"}],outlined:"","small-chips":""},on:{"update:searchInput":function(e){t.search=e},"update:search-input":function(e){t.search=e}},scopedSlots:t._u([{key:"no-data",fn:function(){return[i("v-list-item",[i("span",{staticClass:"subheading"},[t._v("Crear")]),i("v-chip",{attrs:{color:t.colors[t.nonce-1]+" lighten-3",label:"",small:""},on:{click:t.createCompany}},[t._v(" "+t._s(t.search)+" ")])],1)]},proxy:!0},{key:"selection",fn:function(e){var n=e.attrs,a=e.item,s=e.parent,r=e.selected;return[a===Object(a)?i("v-chip",t._b({attrs:{color:a.color+" lighten-3","input-value":r,label:"",small:""}},"v-chip",n,!1),[i("span",{staticClass:"pr-2"},[t._v(" "+t._s(a.text)+" ")]),i("v-icon",{attrs:{small:""},on:{click:function(t){return s.selectItem(a)}}},[t._v(" $delete ")])],1):t._e()]}},{key:"item",fn:function(e){var n=e.index,a=e.item;return[t.editing===a?i("v-text-field",{attrs:{autofocus:"",flat:"","background-color":"transparent","hide-details":"",solo:""},on:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.edit(n,a)}},model:{value:t.editing.text,callback:function(e){t.$set(t.editing,"text",e)},expression:"editing.text"}}):i("v-chip",{attrs:{color:a.color+" lighten-3",dark:"",label:"",small:""}},[t._v(" "+t._s(a.text)+" ")]),i("v-spacer")]}}]),model:{value:t.model,callback:function(e){t.model=e},expression:"model"}}),i("v-text-field",{attrs:{"error-messages":t.isValidEmail,label:"Email",rules:[function(t){return!!t||"Email es obligatorio"},function(t){return/.+@.+\..+/.test(t)||"Email no es válido"}],"prepend-icon":"mdi-at",outlined:""},model:{value:t.user.email,callback:function(e){t.$set(t.user,"email",e)},expression:"user.email"}}),i("v-text-field",{attrs:{"error-messages":t.isValidCredit,label:"Credito inicial [min: 100, máx: 7280]",rules:t.creditRules,"prepend-icon":"mdi-currency-usd",outlined:""},model:{value:t.user.credit,callback:function(e){t.$set(t.user,"credit",e)},expression:"user.credit"}}),i("v-row",[i("v-col",[i("v-card",{attrs:{outlined:""}},[i("v-card-title",[t._v(" Servicios ")]),i("v-card-text",[i("ServicesCheckComponent",{attrs:{services:t.services,user:t.user,"backend-errors":t.backendErrors},on:{onChange:t.onChangeServicesCheck}})],1)],1)],1)],1),i("div",{staticClass:"d-flex"},[i("v-spacer"),i("v-btn",{attrs:{color:"primary",type:"submit",loading:t.isLoading}},[t._v(" "+t._s(t.isEdit?"Editar":"Crear")+" ")])],1)],1)],1)])])],1)],1),i("v-dialog",{attrs:{"max-width":"290"},model:{value:t.disableDialog,callback:function(e){t.disableDialog=e},expression:"disableDialog"}},[i("v-card",[i("v-card-title",{staticClass:"headline"},[t._v("Disable User")]),i("v-card-text",[t._v("Are you sure you want to disable this user?")]),i("v-card-actions",[i("v-spacer"),i("v-btn",{on:{click:function(e){t.disableDialog=!1}}},[t._v("Cancel")]),i("v-btn",{attrs:{color:"warning"},on:{click:function(e){t.user.disabled=!0,t.disableDialog=!1}}},[t._v("Disable")])],1)],1)],1),i("v-dialog",{attrs:{"max-width":"290"},model:{value:t.deleteDialog,callback:function(e){t.deleteDialog=e},expression:"deleteDialog"}},[i("v-card",[i("v-card-title",{staticClass:"headline"},[t._v("Delete User")]),i("v-card-text",[t._v("Are you sure you want to delete this user?")]),i("v-card-actions",[i("v-spacer"),i("v-btn",{on:{click:function(e){t.deleteDialog=!1}}},[t._v("Cancel")]),i("v-btn",{attrs:{color:"error"},on:{click:function(e){t.deleteDialog=!1}}},[t._v("Delete")])],1)],1)],1),i("Dialog-Password-Component",{ref:"dialogPassword",on:{onOk:function(e){return t.$router.push({name:"users"})}}}),i("Company",{ref:"newCompany",on:{onCreatedCompany:t.onCreatedCompany}})],1)])},a=[],s=(i("b0c0"),i("d3b7"),i("25f0"),i("ac1f"),i("841c"),i("159b"),i("b570")),r=i("1cb6"),o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-dialog",{attrs:{width:"600px",persistent:""},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[i("v-card",[i("v-card-title",[t._v(" Contraseña generada ")]),i("v-card-text",[i("p",[t._v("Usuario: "+t._s(t.email))]),i("p",[t._v("Contraseña: "+t._s(t.password))])]),i("v-card-actions",[i("v-spacer"),i("v-btn",{attrs:{text:""},on:{click:t.onOk}},[t._v(" Ok ")])],1)],1)],1)},l=[],c={data:function(){return{dialog:!1,email:"",password:""}},methods:{open:function(t,e){this.dialog=!0,this.password=e,this.email=t},onOk:function(){this.$emit("onOk")},doCopy:function(t){this.$copyText(t).then((function(t){console.log(t)}))}}},u=c,d=i("2877"),h=i("6544"),p=i.n(h),m=i("8336"),f=i("b0af"),v=i("99d9"),g=i("169a"),b=i("2fa4"),x=Object(d["a"])(u,o,l,!1,null,null,null),y=x.exports;p()(x,{VBtn:m["a"],VCard:f["a"],VCardActions:v["a"],VCardText:v["c"],VCardTitle:v["d"],VDialog:g["a"],VSpacer:b["a"]});var C=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"ml-4 my-0 py-0"},[i("v-row",[i("v-col",{staticClass:"ml-0 pl-0"},[t.isAdmin?i("v-select",{attrs:{"item-text":"name","item-value":"id",label:"Canal",items:t.channels,"error-messages":t.isValidChannel_id,outlined:"","hide-details":""},model:{value:t.user.channel_id,callback:function(e){t.$set(t.user,"channel_id",e)},expression:"user.channel_id"}}):t._e()],1)],1),t._l(t.services,(function(e){return i("v-row",{key:e.id},[i("v-checkbox",{attrs:{label:e.name,"hide-details":""},model:{value:e.status,callback:function(i){t.$set(e,"status",i)},expression:"service.status"}})],1)}))],2)},I=[],S=i("88f5"),k={props:{services:{type:Array,default:function(){return[]}},user:{type:Object,default:function(){}},backendErrors:{type:Object,default:function(){return{provider_id:""}}}},data:function(){return{channels:[]}},computed:{isEdit:function(){return void 0!==this.$route.params.userId},isValidChannel_id:function(){return void 0===this.backendErrors.channel_id?"":this.backendErrors.channel_id},isAdmin:function(){return $cookies.get("user").isAdmin}},mounted:function(){this.getChannels()},methods:{getChannels:function(){var t=this;S["a"].get("/channel").then((function(e){e.data.success&&(t.channels=e.data.data)}))}}},V=k,_=i("ac7c"),w=i("62ad"),D=i("0fd9"),$=i("b974"),E=Object(d["a"])(V,C,I,!1,null,null,null),O=E.exports;p()(E,{VCheckbox:_["a"],VCol:w["a"],VRow:D["a"],VSelect:$["a"]});var j=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-dialog",{attrs:{width:"600"},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[i("v-card",[i("v-form",{ref:"formNewCompany",attrs:{"lazy-validation":""},on:{submit:function(e){return e.preventDefault(),t.submit()}}},[i("v-card-title",{staticClass:"pa-2"},[t._v(" Crear empresa "),i("v-spacer"),i("v-btn",{attrs:{icon:""},on:{click:function(e){t.dialog=!1}}},[i("v-icon",[t._v("mdi-close")])],1)],1),i("v-card-text",[i("v-text-field",{attrs:{placeholder:"Empresa",rules:[function(t){return!!t||"Nombre de la empresa es obligatorio"}],outlined:""},model:{value:t.nameCompany,callback:function(e){t.nameCompany=e},expression:"nameCompany"}}),i("v-text-field",{attrs:{placeholder:"RUC",rules:[function(t){return!!t||"Ruc de la empresa es obligatorio"}],outlined:""},model:{value:t.ruc,callback:function(e){t.ruc=e},expression:"ruc"}})],1),i("v-card-actions",{staticClass:"pa-2"},[i("v-btn",{attrs:{outlined:""},on:{click:t.close}},[t._v("Cancelar")]),i("v-spacer"),i("v-btn",{attrs:{color:"primary",type:"submit"}},[t._v("Crear")])],1)],1)],1)],1)},T=[],A={data:function(){return{nameCompany:"",ruc:"",dialog:!1}},methods:{open:function(t){this.dialog=!0,this.nameCompany=t},close:function(){this.$refs.formNewCompany.reset(),this.dialog=!1},submit:function(){var t=this;if(this.$refs.formNewCompany.validate()){var e=new FormData;e.append("company",this.nameCompany.toUpperCase()),e.append("ruc",this.ruc),S["a"].post("/user/company",e).then((function(e){e.data.success&&(t.$store.dispatch("app/showToast",e.data.message),t.$emit("onCreatedCompany",e.data.data),t.close())})).catch((function(e){t.$store.dispatch("app/showToast",e.response.data.message)}))}}}},B=A,L=i("4bd4"),F=i("132d"),M=i("8654"),P=Object(d["a"])(B,j,T,!1,null,null,null),z=P.exports;p()(P,{VBtn:m["a"],VCard:f["a"],VCardActions:v["a"],VCardText:v["c"],VCardTitle:v["d"],VDialog:g["a"],VForm:L["a"],VIcon:F["a"],VSpacer:b["a"],VTextField:M["a"]});var U={components:{BackPage:s["a"],DialogPasswordComponent:y,ServicesCheckComponent:O,Company:z},data:function(){var t=this;return{activator:null,attach:null,colors:["red","blue","green","purple","indigo","cyan","teal","orange"],editing:null,editingIndex:-1,companies:[{header:"Seleccione una empresa o cree una"}],nonce:1,menu:!1,model:null,x:0,search:null,y:0,company_id:"",backendErrors:{name:"",email:"",company:"",credit:"",channel_id:""},user:{},breadcrumbs:[{text:"Usuarios",to:"/usuarios/",exact:!0},{text:"Editar usuario"}],services:[],providers:[],dialogPassword:!1,password:"",errors:{name:"",company:"",email:""},isLoading:!1,deleteDialog:!1,disableDialog:!1,valid:!0,slider:50,min:0,max:300,startCredit:0,creditRules:[function(e){return e>t.min||e<t.max||"No se puede asignar este crédito"}]}},computed:{isEdit:function(){return!!this.$route.params.userId},isValidName:function(){return void 0===this.backendErrors.name?"":this.backendErrors.name},isValidEmail:function(){return void 0===this.backendErrors.email?"":this.backendErrors.email},isValidCompany:function(){return void 0===this.backendErrors.company?"":this.backendErrors.company},isValidCredit:function(){return void 0===this.backendErrors.credit?"":this.backendErrors.credit},isAdmin:function(){return $cookies.get("user").isAdmin}},watch:{model:function(t,e){t!==e&&(this.model=t)}},mounted:function(){this.isEdit?this.getUserInfo():(this.getServicesAndCompanyUser(),this.services=[],this.$refs.form.reset(),this.user={name:"",email:"",company:"",sms:!1,ivr:!1,whatsapp:!1,mailling:!1,channel_id:null,credit:0,provider_id:1})},created:function(){this.getCompanies()},methods:{edit:function(t,e){this.editing?(this.editing=null,this.editingIndex=-1):(this.editing=e,this.editingIndex=t)},filter:function(t,e,i){if(t.header)return!1;var n=function(t){return null!==t?t:""},a=n(i),s=n(e);return a.toString().toLowerCase().indexOf(s.toString().toLowerCase())>-1},createCompany:function(){this.$refs.newCompany.open(this.search)},onCreatedCompany:function(t){this.getCompanies();var e={id:t.id,text:t.company,color:this.colors[this.nonce-1]};this.nonce++,this.model=e},getUserInfo:function(){var t=this;S["a"].get("/user/"+this.$route.params.userId).then((function(e){if(e.data.success){t.user=e.data.data;var i={id:e.data.data.company.id,text:e.data.data.company.company,color:t.colors[t.nonce-1]};t.model=i,t.nonce++,t.services=e.data.data.father_services}}))},getServicesAndCompanyUser:function(){var t=this;S["a"].get("/user/company/"+$cookies.get("user").id).then((function(e){if(e.data.success){var i,n,a;if(null!==(i=e.data.data.company)&&void 0!==i&&i.id){var s={id:e.data.data.company.id,text:e.data.data.company.company,color:t.colors[t.nonce-1]};t.model=s,t.nonce++}null!==(n=e.data.data)&&void 0!==n&&n.channel_id&&(t.user.channel_id=e.data.data.channel_id),t.services=(null===(a=e.data.data)||void 0===a?void 0:a.father_services)||[]}}))},submit:function(){var t=this;if(this.$refs.form.validate()){this.isLoading=!0;var e={name:this.user.name,email:this.user.email,company:this.user.company,services:this.services,credit:this.user.credit,channel_id:this.user.channel_id,user_id:this.$route.params.userId,company_id:this.model.id};this.isEdit?S["a"].post("/user",e).then((function(e){e.data.success&&(t.isLoading=!1,t.$router.push({name:"users"}))})).catch((function(e){t.isLoading=!1,t.backendErrors=e.response.data.errors})):S["a"].post("/user",e).then((function(e){e.data.success&&(t.isLoading=!1,t.$refs.dialogPassword.open(e.data.data.email,e.data.data.userPassword))})).catch((function(e){t.backendErrors=e.response.data.errors,t.isLoading=!1,t.errors={email:"Este email ya existe"}}))}},enableUser:function(){var t=this,e={user_id_disable:this.user.id,status:1};axios.post("/disableUser",e,r["a"]).then((function(e){e.data.success?(t.snackbar=!0,t.textSnackbar=e.data.message):(t.snackbar=!0,t.textSnackbar="Error al habilitar el usuario"),t.isLoading=!1})).catch((function(e){t.isLoading=!1,console.log(e)}))},getProviders:function(){var t=this;S["a"].get("/provider").then((function(e){e.data.success&&(t.providers=e.data.data)}))},getCompanies:function(){var t=this;S["a"].get("/user/companies").then((function(e){e.data.success&&(console.log(e.data),e.data.data.forEach((function(e){var i={id:e.id,text:e.company,color:t.colors[t.nonce-1]};t.companies.push(i),t.nonce++})))}))},onChangeServicesCheck:function(t){this.services=t}}},N=U,R=i("cc20"),K=i("2b5d"),J=i("da13"),H=Object(d["a"])(N,n,a,!1,null,null,null);e["default"]=H.exports;p()(H,{VBtn:m["a"],VCard:f["a"],VCardActions:v["a"],VCardSubtitle:v["b"],VCardText:v["c"],VCardTitle:v["d"],VChip:R["a"],VCol:w["a"],VCombobox:K["a"],VDialog:g["a"],VForm:L["a"],VIcon:F["a"],VListItem:J["a"],VRow:D["a"],VSpacer:b["a"],VTextField:M["a"]})},ac7c:function(t,e,i){"use strict";var n=i("15fd"),a=i("5530"),s=(i("d3b7"),i("25f0"),i("6ca7"),i("ec29"),i("9d26")),r=i("c37a"),o=i("fe09"),l=["title"];e["a"]=o["a"].extend({name:"v-checkbox",props:{indeterminate:Boolean,indeterminateIcon:{type:String,default:"$checkboxIndeterminate"},offIcon:{type:String,default:"$checkboxOff"},onIcon:{type:String,default:"$checkboxOn"}},data:function(){return{inputIndeterminate:this.indeterminate}},computed:{classes:function(){return Object(a["a"])(Object(a["a"])({},r["a"].options.computed.classes.call(this)),{},{"v-input--selection-controls":!0,"v-input--checkbox":!0,"v-input--indeterminate":this.inputIndeterminate})},computedIcon:function(){return this.inputIndeterminate?this.indeterminateIcon:this.isActive?this.onIcon:this.offIcon},validationState:function(){if(!this.isDisabled||this.inputIndeterminate)return this.hasError&&this.shouldValidate?"error":this.hasSuccess?"success":null!==this.hasColor?this.computedColor:void 0}},watch:{indeterminate:function(t){var e=this;this.$nextTick((function(){return e.inputIndeterminate=t}))},inputIndeterminate:function(t){this.$emit("update:indeterminate",t)},isActive:function(){this.indeterminate&&(this.inputIndeterminate=!1)}},methods:{genCheckbox:function(){var t=this.attrs$,e=(t.title,Object(n["a"])(t,l));return this.$createElement("div",{staticClass:"v-input--selection-controls__input"},[this.$createElement(s["a"],this.setTextColor(this.validationState,{props:{dense:this.dense,dark:this.dark,light:this.light}}),this.computedIcon),this.genInput("checkbox",Object(a["a"])(Object(a["a"])({},e),{},{"aria-checked":this.inputIndeterminate?"mixed":this.isActive.toString()})),this.genRipple(this.setTextColor(this.rippleState))])},genDefaultSlot:function(){return[this.genCheckbox(),this.genLabel()]}}})},b570:function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"d-flex align-center"},[i("v-btn",{staticClass:"mx-0 px-0 text",attrs:{text:"",loading:t.isLoading},on:{click:function(e){return t.backTo()}}},[i("v-icon",[t._v("mdi-chevron-left")]),t._v(" Regresar ")],1)],1)},a=[],s={props:{to:{type:String,default:""}},data:function(){return{isLoading:!1}},mounted:function(){this.isLoading=!1},methods:{backTo:function(){this.$router.push({name:this.to}),this.isLoading=!0}}},r=s,o=i("2877"),l=i("6544"),c=i.n(l),u=i("8336"),d=i("132d"),h=Object(o["a"])(r,n,a,!1,null,null,null);e["a"]=h.exports;c()(h,{VBtn:u["a"],VIcon:d["a"]})},ec29:function(t,e,i){},fe09:function(t,e,i){"use strict";i.d(e,"b",(function(){return o}));i("d3b7"),i("25f0"),i("4de4");var n=i("c37a"),a=i("5311"),s=i("8547"),r=i("58df");function o(t){t.preventDefault()}e["a"]=Object(r["a"])(n["a"],a["a"],s["a"]).extend({name:"selectable",model:{prop:"inputValue",event:"change"},props:{id:String,inputValue:null,falseValue:null,trueValue:null,multiple:{type:Boolean,default:null},label:String},data:function(){return{hasColor:this.inputValue,lazyValue:this.inputValue}},computed:{computedColor:function(){if(this.isActive)return this.color?this.color:this.isDark&&!this.appIsDark?"white":"primary"},isMultiple:function(){return!0===this.multiple||null===this.multiple&&Array.isArray(this.internalValue)},isActive:function(){var t=this,e=this.value,i=this.internalValue;return this.isMultiple?!!Array.isArray(i)&&i.some((function(i){return t.valueComparator(i,e)})):void 0===this.trueValue||void 0===this.falseValue?e?this.valueComparator(e,i):Boolean(i):this.valueComparator(i,this.trueValue)},isDirty:function(){return this.isActive},rippleState:function(){return this.isDisabled||this.validationState?this.validationState:void 0}},watch:{inputValue:function(t){this.lazyValue=t,this.hasColor=t}},methods:{genLabel:function(){var t=n["a"].options.methods.genLabel.call(this);return t?(t.data.on={click:o},t):t},genInput:function(t,e){return this.$createElement("input",{attrs:Object.assign({"aria-checked":this.isActive.toString(),disabled:this.isDisabled,id:this.computedId,role:t,type:t},e),domProps:{value:this.value,checked:this.isActive},on:{blur:this.onBlur,change:this.onChange,focus:this.onFocus,keydown:this.onKeydown,click:o},ref:"input"})},onBlur:function(){this.isFocused=!1},onClick:function(t){this.onChange(),this.$emit("click",t)},onChange:function(){var t=this;if(this.isInteractive){var e=this.value,i=this.internalValue;if(this.isMultiple){Array.isArray(i)||(i=[]);var n=i.length;i=i.filter((function(i){return!t.valueComparator(i,e)})),i.length===n&&i.push(e)}else i=void 0!==this.trueValue&&void 0!==this.falseValue?this.valueComparator(i,this.trueValue)?this.falseValue:this.trueValue:e?this.valueComparator(i,e)?null:e:!i;this.validate(!0,i),this.internalValue=i,this.hasColor=i}},onFocus:function(){this.isFocused=!0},onKeydown:function(t){}}})}}]);