$(function() {

    window.Endeavour.View.FeedbackDialog = Endeavour.View.FormDialog.extend({

        id: 'feedback-dialog',

        fields: [{
            id: 'feedback-message',
            type: 'textarea',
            label: 'Your message',
            className: 'tall',
            value: '',
            inputKey: 'Feedback',
            pos: 1,
        },
        {
            id: 'feedback-rating',
            type: 'rating',
            label: 'Rate EndeavourApp',
            value: '',
            inputKey: 'Rating',
            pos: 2,
        }],

        initialize: function() {

            Endeavour.View.FormDialog.prototype.initialize.apply(this, arguments);

            this.setTitle('Tell us what you think');
            this.setSubmitText('Send Feedback');

            this.addClass('wide');

        },

        submit: function() {
            console.log(this.getInputs());
            var data = this.getInputs();
            data.Type = 'feedback';
            Endeavour.post({
                url: '/email',
                data: data,
                beforeSend: Endeavour.ajaxSetHeaders,
                success: $.proxy(this.closeDialog, this),
            });
            return this;
        },

    });

});