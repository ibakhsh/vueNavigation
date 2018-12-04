# vueNavigation
Vue Navigation Component you can use according to your project using laravel blade without using vue routers.



1. Download vueNav.vue into any folder inside your assets folder. 
```javascript
    //your passed array must meet this sample output: 
     [
       {
          id: 14,
          user_id: 1,
          object_id: 16,
          add: 1,
          edit: 1,
          delete: 1,
          search: 1,
          menu: 1,
          created_at: "2018-05-05 17:55:57",
          updated_at: "2018-05-05 17:56:59",
          deleted_at: null,
          creation_user: 1,
          updating_user: null,
          object_name: "المستخدمين",
          parent_id: 12,
          command: "users",
          object: {
             id: 16,
             system_id: null,
             name_ar: "المستخدمين",
             name_en: null,
             command: "users",
             description_ar: null,
             description_en: null,
             parent_id: 12,
             type: 3,
             status: 1,
             creation_user: 1,
             updating_user: null,
             created_at: "2018-01-31 08:19:43",
             updated_at: "2018-02-01 10:08:03",
             deleted_at: null
          }
       }
    ]
```
2. include this component inside your app.js 
```javascript
    global.vueNav = require('../vue-components/navigation-menu/vueNav.vue');
    Vue.component('vueNav', vueNav);
```
3. copy and past vueGlobal class inside your app.js 
```javascript
global.vueGlobal = {
    debug: true,
    state: {
        currentObject: null,
        openRouteFunction: null,
        formSubmitFunction: null
    },
    setCurrObject(newValue) {
        if (this.debug) console.log('setCurrObject triggered with:', newValue);
        this.state.currentObject = newValue;
    },
    getCurrObject() {
        if (this.debug) console.log('getCurrObject triggered');
        return this.state.currentObject;
    },
    setOpenRouteFunction(functionRef) {
        if (this.debug) console.log('setOpenRouteFunction triggered', functionRef);
        this.state.openRouteFunction = functionRef;
    },
    openRoute(xRoute, inner = true) {
        if (this.debug) console.log('openRoute triggered', xRoute);
        if (this.state.openRouteFunction != null) this.state.openRouteFunction(xRoute, inner);
    },
    setFormSubmitFunction(functionRef) {
        if (this.debug) console.log('setFormSubmitFunction triggered', functionRef);
        this.state.formSubmitFunction = functionRef;
    },
    formSubmit() {
        if (this.debug) console.log('formSubmit triggered');
        if (this.state.formSubmitFunction != null) this.state.formSubmitFunction();
    }
};
```
4. use this code to implement the rendering anywhere inside your blade.php files: 
```javascript
    
    vueNavRuntime = new Vue({
        el:"#permissionArrayNav",
        render: h => h(vueNav, {
            props:{
                defaultMenu: {!!  json_encode(Session::get('permissions')) !!}
            }
        })
    });

    $( document ).ajaxComplete(function() {
        console.log( "Triggered ajaxComplete handler." );
        vueGlobal.formSubmit();
    });
```
