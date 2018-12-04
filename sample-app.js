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




global.vueNav = require('../vue-components/navigation-menu/vueNav.vue');



Vue.component('vueNav', vueNav);
