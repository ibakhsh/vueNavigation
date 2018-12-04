# vueNavigation
Vue Navigation Component you can use according to your project using laravel blade



1. Download vueNav.vue into any folder inside your assets folder. 
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
