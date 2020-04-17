
exports.up = function(knex) {
	return knex.schema
		.createTable('dish_type', tbl => {
			tbl.increments();
			tbl.string('name', 255)
				.notNullable()
				.unique();
	})
		.createTable('meal_type', tbl => {
			tbl.increments();
			tbl.string('name', 255)
				.notNullable()
				.unique();
		})
		.createTable('ingredients', tbl => {
			tbl.increments();
			tbl.string('name', 255)
				.notNullable()
				.unique();
			tbl.decimal('quantity')
				.notNullable();
		})
		.createTable('origins', tbl => {
			tbl.increments();
			tbl.string('name', 255)
				.notNullable()
				.unique();
		})
		.createTable('steps', tbl => {
			tbl.increments();
			tbl.string('name', 255)
				.notNullable();
		})
		.createTable('recipes', tbl => {
			tbl.increments();
			tbl.string('name', 255)
				.notNullable();
			tbl.integer('prepping_time')
				.notNullable();
			tbl.integer('cooling_time')
				.notNullable();
			tbl.integer('servings')
				.notNullable();
			tbl.text('notes');
			tbl.foreign('meal_type').references('meal_type.id')
				.notNullable()
				.unsigned()
				.onDelete('CASCADE')
				.onUpdate('CASCADE');
			tbl.foreign('dish_type').references('dish_type.id')
				.notNullable()
				.unsigned()
				.onDelete('CASCADE')
				.onUpdate('CASCADE');
			tbl.foreign('origins').references('origins.id')
				.notNullable()
				.unsigned()
				.onDelete('CASCADE')
				.onUpdate('CASCADE');
		})
		.createTable('recipes_ingredients', tbl => {
			tbl.increments();
			tbl.foreign('recipe_id').references('recipes.id')
				.notNullable()
				.unsigned()
				.onDelete('CASCADE');
			tbl.foreign('step_id').references('steps.id')
				.notNullable()
				.unsigned()
				.onDelete('CASCADE')
				.onUpdate('CASCADE');
			tbl.primary(['recipe_id', 'step_id']);
		})
		.createTable('recipes_steps', tbl => {
			tbl.increments();
			tbl.foreign('recipe_id').references('recipes.id')
				.notNullable()
				.unsigned()
				.onDelete('CASCADE')
				.onUpdate('CASCADE');
			tbl.foreign('ingredient_id').references('ingredients.id')
				.notNullable()
				.unsigned()
				.onDelete('CASCADE')
				.onUpdate('CASCADE');
			tbl.primary(['recipe_id', 'ingredient_id']);
		})

};

exports.down = function(knex) {
	return knex.schema
		.dropTableIfExists('recipes_steps')
		.dropTableIfExists('recipes_ingredients')
		.dropTableIfExists('recipes')
		.dropTableIfExists('steps')
		.dropTableIfExists('origins')
		.dropTableIfExists('ingredients')
		.dropTableIfExists('dish_type')
		.dropTableIfExists('meal_type')
};
