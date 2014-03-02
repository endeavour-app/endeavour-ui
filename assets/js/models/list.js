$(function() {

    Endeavour.Model.List = Endeavour.Model.Abstract.extend({

        urlRoot: 'http://api.endeavour.local/lists',

        defaults: {
            'ID':                 null, // int
            'ParentID':           null, // int
            'UserID':             null, // int
            'Title':              null, // string
            'Description':        null, // string
            'Created':            null, // str - ISO-8601 date
            'Start':              null, // str - ISO-8601 date
            'Due':                null, // str - ISO-8601 date
            'Deleted':            null, // boolean
        },

        created: null,
        start: null,
        due: null,

        initialize: function() {

            this.items = new Endeavour.Collection.ListItems;

            this.on('change:Created', this.onChangeCreated, this);
            this.on('change:Start', this.onChangeStart, this);
            this.on('change:Due', this.onChangeDue, this);

            this.on('sync', this.onSync, this);

        },

        getItems: function() {
            if (this.items.length < 1) return null;
            return this.items;
        },

        loadItems: function() {
            this.items.url = 'http://api.endeavour.local/lists/' + this.id + '/items';
            this.items.fetch();
            return this;
        },

        onChangeCreated: function() {
            this.created = new Date(this.get('Created'));
            return this;
        },

        onChangeStart: function() {
            this.start = new Date(this.get('Start'));
            return this;
        },

        onChangeDue: function() {
            this.due = new Date(this.get('Due'));
            return this;
        },

        onSync: function() {
            console.log('user sync',this);
            return this;
        },

    });

    Endeavour.Collection.Lists = Endeavour.Collection.Abstract.extend({
        model: Endeavour.Model.List
    });

});