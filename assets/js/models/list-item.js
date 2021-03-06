$(function() {

    Endeavour.Model.ListItem = Endeavour.Model.Abstract.extend({

        urlRoot: function() {
            return Endeavour.serverURL + '/listitems';
        },

        defaults: {
            'ID':                 null, // int
            'ListID':             null, // int
            'UserID':             null, // int
            'Summary':            null, // string
            'Details':            null, // string
            'Created':            null, // str - ISO-8601 date
            'Due':                null, // str - ISO-8601 date
            'Completed':          null, // str - ISO-8601 date
            'Deleted':            null, // boolean
        },

        created: null,
        completed: null,

        initialize: function() {

            this.on('change:Created', this.onChangeCreated, this);
            this.on('change:Completed', this.onChangeCompleted, this);

            this.on('sync', this.onSync, this);

            this.details = new Endeavour.Model.ListItemDetails;
            this.detailsLoaded = false;
            this.detailsLoading = false;

            // Add this to global collection
            Endeavour.publish('new:model:listItem', this);

        },

        loadDetails: function() {

            if (this.detailsLoading) return this;

            this.detailsLoading = true;
            this.details.url = Endeavour.serverURL + '/listitems/' + this.id + '/details';

            this.details.fetch({
                success: $.proxy(this.onDetailsLoaded, this),
                error: $.proxy(this.onDetailsLoadError, this),
            });
            
            return this;

        },

        onDetailsLoadError: function() {
            this.detailsLoading = false;
            return this;
        },

        onDetailsLoaded: function() {
            this.trigger('loaded:details');
            this.detailsLoaded = true;
            this.detailsLoading = false;
            return this;
        },

        onChangeCreated: function() {
            var created = this.get('Created');
            if (created && typeof created == 'object') {
                this.created = Endeavour.newDate(created.date);
            }
            return this;
        },

        getDueDate: function() {
            
            if (!this.get('Due')) return null;

            return typeof this.get('Due') == 'object' ? Endeavour.newDate(this.get('Due').date) : new Date(this.get('Due'));

        },

        onChangeCompleted: function() {
            var completed = this.get('Completed');
            if (completed && typeof completed == 'object') {
                this.completed = Endeavour.newDate(completed.date);
            }
            return this;
        },

        toggleComplete: function() {
            if (this.get('Completed')) {
                this.save('Completed', 0, {patch: true});
            }
            else {
                this.save('Completed', 'now', {patch: true});
            }
            return this;
        },

        setListID: function(ListID) {

            var lastListID = this.get('ListID');
            var lastList = Endeavour.collection.lists.get(lastListID);

            var list = Endeavour.collection.lists.get(ListID);
            
            if (lastList) lastList.items.remove(this);
            if (list) list.items.add(this);

            console.log('moving item from' +lastListID+' to ' +ListID,lastList, list);

            this.save({ListID: ListID}, {patch: true});

            return this;

        },

        onSync: function() {
            return this;
        },

    });

    Endeavour.Collection.ListItems = Endeavour.Collection.Abstract.extend({
        model: Endeavour.Model.ListItem
    });

});