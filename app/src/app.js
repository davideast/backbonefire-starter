var Model = Backbone.Firebase.Model.extend({
  urlRoot: 'https://webapi.firebaseio.com/todos'
});

var model = new Model({
  id: 1
});

model.fetch({
  success: function() {
    console.log('success!');
  }
});

model.on('sync', function() {
  console.log('sync event');
});
