define('app/views/image', ['app/views/page'],
    //
    //  Image View
    //
    //  @returns Class
    //
    function(PageView) {

        'use strict';

        return App.ImageView = PageView.extend({

            //
            //  Properties
            //

            templateName: 'image',
            image: null,
            extra: null,


            //
            //  Initialization
            //

            load: function() {
                console.log(this.image);
                Ember.run(this, function() {
                    this.updateCurrentImage();
                    if (this.image.id) {
                        this.updateExtra();
                    }
                });
            }.on('didInsertElement'),


            //
            //  Methods
            //

            updateCurrentImage: function() {
                Ember.run(this, function() {
                    var image = Mist.backendsController.getRequestedImage();
                    if (image) this.get('controller').set('model', image);

                    this.set('image', this.get('controller').get('model'));
                    if (this.image.id) {
                        this.updateExtra();
                    }
                });
            },


            //
            //  Observers
            //

            updateExtra: function () {
                var newExtra = [];
                if (this.image.extra instanceof Object) {
                    forIn(this.image.extra, function (value, key) {
                        newExtra.push({
                            key: key,
                            value: value
                        });
                    });
                }
                this.set('extra', newExtra);
            }.observes('image.extra.[]')
        });
    }
);