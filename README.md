# vueNavigation
Vue Navigation Component you can use according to your project using laravel blade



1. Download vueNav.vue into any folder inside your assets folder. 
2. include this component inside your app.js 
3. copy and past vueGlobal class inside your app.js 
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
