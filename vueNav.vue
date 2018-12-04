<template>
    <div class="nav metismenu">
        <li class="loaded-menu" v-for="system in loadSystems()" v-bind:key="system.object_id">
            <a>
                <i class=""></i> 
                <span class="nav-label"> {{system.object_name}} </span> 
                <span class="fa arrow"></span>
            </a>
            <ul class="nav nav-second-level collapse" style="height: 0px;">
                <li v-for="object in loadObjects(system.object_id)"  v-bind:key="object.object_id"
                    v-bind:id="'parent_id:'+object.parent_id+', object_id:'+system.object_id" 
                >
                    <a v-on:click="openRoute(object.command)">
                        <i class="fa fa-square-o"></i>
                        <span class="nav-label">{{object.object_name}}</span>
                    </a>
                </li>
            </ul>
        </li>
    </div>
</template>

<script>
export default {
    props: {
            defaultMenu: {
                require: true,
                type:Array,
                default () {
                    return []
                }
            }
        },
    data: function() { 
            return {allMenu: [], currObject: null }
        },
    beforeMount: function(){
        // console.log('we are in vueNav beforeMount');
                // var that = this;
                 this.loadAll();
    },
    mounted: function(){
        vueGlobal.setOpenRouteFunction(this.openRoute);
        vueGlobal.setFormSubmitFunction(this.formSubmit);
    },
    methods: {
            open: function(xUrl){
                var that = this;
                $.get(xUrl,function(response){
                    console.log('get returned ok..');
                    $("#vue-iboxContainer").html(response);
                    $(document).ready(function(){
                        that.ajaxHyperLinks();
                    });
                }).fail(function(result){
                    /*console.log('get has error');
                    console.log(result);
                    console.log(result.responseText);
                    console.log(result.responseJSON);
                    console.log(result.responseJSON.error);*/
                    if(result.status==401){
                        window.location.replace('logout');
                    }
                });
                return false;
            },
            getCurrObject: function(){
                return this.currObject;
            },
            openRoute: function(xRoute, inner=true){
                console.log('xRoute:'+xRoute+", isInner?"+inner);
                if(inner) {
                    this.currObject = _.filter(this.allMenu,{"command":xRoute});
                    vueGlobal.setCurrObject(this.currObject[0]);
                    //console.log(JSON.stringify(this.currObject));
                }
                var routeUrl = "/"+xRoute;
                this.open(routeUrl);
            },
            setMenu(allMenu){
                this.allMenu = allMenu;
            },
            loadAll: function(){
                if(this.allMenu != undefined && this.allMenu.length == 0) {
                    if(this.defaultMenu != undefined && this.defaultMenu.length > 0) { 
                        console.log('defaultMenu detected!');
                        this.allMenu = this.defaultMenu;
                        return true;
                    }
                }

                // console.log(this.allMenu);
                // console.log("defaultMenu:");
                // console.log(this.defaultMenu);

                var that = this;
                $.ajax({
                    method: "get",
                    url: "mainMenu"
                }).done(function(result){
                    // console.log('menu loaded:');
                    // console.log(result);
                    that.allMenu = [];
                    that.allMenu = result;
                });
                
            },
            loadSystems: function(){
                var that = this;
                var array = [];
                _(that.allMenu).each(function(row){
                    if(row.parent_id == null) array.push(row);
                });
                return array;
            },
            loadObjects: function(xSystemId){
                var that = this;
                var array = [];
                _(that.allMenu).each(function(row){
                    if(row.parent_id == xSystemId) array.push(row);
                });
                return array;
            },
            ajaxHyperLinks: function(){
                var that = this;
                $.each($("a[href]"), function(){
                    var a = $(this);
                    var href = $(this).attr("href");
                    //console.log(href);
                    if ((!href.endsWith('/logout')) 
                     && (!href.endsWith('#')) 
                        ) {
                        $(this).bind('click',function(e) {
                            e.preventDefault();
                            that.open(href); 
                            return false;
                        });
                        $(this).removeAttr("href");
                    }
                });
                $("a[rel='prev']").html(">>");
                $("a[rel='next']").html("<<");
            },
            formSubmit: function (){
                var that = this;
                var formSelector = 'form';
                console.log('binding formSubmit');
                
                $(formSelector).on("submit", $(formSelector) , function(event) {
                    event.preventDefault();
                    
                    $form = $(this); //wrap this in jQuery
                    var disabled = $(formSelector+" :input").prop("disabled", false);
                    var formData = $(formSelector+" :input").serializeArray();
                    var reEnable = $(disabled).prop("disabled", true);
                    
                    $.ajax({
                        method: $form.attr('method'),
                        url: $form.attr('action'),
                        data: formData, 
                        context: $("#vue-iboxContainer"),
                          statusCode: {
                            401: function() {
                                alert( "Unauthenticated" );
                            }
                        }
                    }).done(function(result){
                        console.log('ajax is done');
                        $("#vue-iboxContainer").html(result);
                        $(document).ready(function(){
                            that.ajaxHyperLinks();
                        });
                    }).fail(function(msg){
                        alert('There was an error submitting:'+msg.statusText);
                        console.error(msg);
                        that.ajaxHyperLinks();
                    });
                    return false;
                });
            }
        }
}
</script>


<style>
    .loaded-menu {
        font-family: 'Tajawal', sans-serif;
    }
</style>