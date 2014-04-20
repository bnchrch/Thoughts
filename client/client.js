Thoughts = new Meteor.Collection("thoughts");

gradient = function () {
    var messages = document.getElementsByClassName("thought");
    for (var i = 0; i < messages.length; i++) {
      color_bg = "rgba(255,102,0," + (((messages.length-i)/messages.length)) + ")";
      messages[i].style["background-color"]=color_bg;
    }

  };

  Template.thought.rendered = function () {
    gradient();
  }

  Template.leaderboard.thoughts = function () {
    return Thoughts.find({}, {sort: {last_interacted: -1}});
  };

  Template.leaderboard.selected_name = function () {
    var thought = Thoughts.findOne(Session.get("selected_thought"));
    return thought && thought.name;
  };

  Template.thought.selected = function () {
    return Session.equals("selected_thought", this._id) ? "selected" : '';
  };


Template.leaderboard.events({
  'click input.remove_person': function (event, template) {
      console.log("thought removed!");
      Thoughts.remove(Session.get("selected_thought"));
    }
  });

  Template.thought.events({
    'click': function () {
      var date = new Date();
      var time_added = date.getTime();
      Session.set("selected_thought", this._id);
      Thoughts.update(this._id, {last_interacted: time_added,name: Thoughts.findOne(Session.get("selected_thought")).name})
      gradient();
    }

  });

  Template.main_control.events({
      'keypress input.thought_entry': function (event, template) {
        if(event.which === 13 && template.find('.thought_entry').value != ''){
            var date = new Date();
            var time_added = date.getTime();
            Thoughts.insert({name: template.find('.thought_entry').value, last_interacted: time_added});
            template.find('.thought_entry').value = '';
            gradient();
          }
      }
    });
