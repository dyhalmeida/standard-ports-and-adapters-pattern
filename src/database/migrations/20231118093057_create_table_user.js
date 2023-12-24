exports.up = async function(knex) {
    if (await knex.schema.hasTable('user')) return
    return knex.schema.createTable('user', table => {
        table.uuid('id').primary().notNullable(),
        table.string('name').notNullable(),
        table.string('email').notNullable(),
        table.string('password').notNullable()
    })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('user')
};
