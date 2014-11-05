Thoughts = new Meteor.Collection("thoughts");

Meteor.startup(function () {
    Thoughts._ensureIndex({name: 1}, {unique: true});
    Meteor.methods({
        burnItDown: function() {
            return Thoughts.remove({});
        },
        nukeSpecific: function(msg) {
            return Thoughts.remove({name: msg})
        }
    });

});


