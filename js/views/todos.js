// js/views/todos.js

var app = app || {};

// Todo Item View

// The DOM element for a todo item... 
app.TodoView = Backbone.View.extend({

	// .... is a list tag
	tagName: 'li',

	// Cache the template function for a single item
	template: Handlebars.compile($("#item-template").html()),

	// The DOM events specific to an item
	events:{
		'dblclick label': 'edit',
		'keypress .edit': 'updateOnEnter',
		'blur .edit': 'close'
	},

	initialize: function(){
		this.listenTo(this.model, 'change', this.render);
	},

	render: function(){
		this.$el.html(this.template(this.model.toJSON() ));
		this.$input = this.$('.edit');
		return this;
	},

	edit: function(){
		this.$el.addClass('editing');
		this.$input.focus();
	},

	close: function(){
		var value = this.$input.val().trim();

		if ( value ) {
			this.model.save( { title: value });
		}

		this.$el.removeClass('editing');
	},

	updateOnEnter: function(e){
		if ( e.which === ENTER_KEY ) {
			this.close();
		}
	}
	

});
