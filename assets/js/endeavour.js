$(function() {

    var Endeavour = window.Endeavour = new Backbone.Marionette.Application();

    Endeavour.serverURL = 'http://api.endeavour.local';

    Endeavour.publish = Backbone.Events.trigger;
    Endeavour.subscribe = Backbone.Events.on;

    Endeavour.Model = {};
    Endeavour.View = {};

    Endeavour.post = function(options) {
        options.type = 'POST';
        return Endeavour.ajax(options);
    };

    Endeavour.get = function(options) {
        options.type = 'GET';
        return Endeavour.ajax(options);
    };

    Endeavour.ajax = function(options) {
        options.url = Endeavour.serverURL + options.url;
        options.dataType = 'json';
        return $.ajax(options);
    };

});