$(function() {

    window.Endeavour.View.Dashboard = Backbone.Marionette.View.extend({

        id: 'dashboard',
        tagName: 'div',

        initialize: function() {

            this.$el
                .append("<h1><em>Dashing...</em></h1>")
                .append("dashing!");

        },

        render: function() {

            return this;

        },

    });

});