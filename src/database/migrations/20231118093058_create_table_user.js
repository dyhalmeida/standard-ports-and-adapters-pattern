exports.up = async function(knex) {
    if (await knex.schema.hasTable('transaction')) return
    return knex.schema.createTable('user', table => {
        table.uuid('id').primary().notNullable(),
        table.string('description').notNullable(),
        table.decimal('value').notNullable(),
        table.date('expiration').notNullable(),
        table.uuid('userId').references('id').inTable('user').notNullable()
        // table.timestamps(true, true),
        // table.timestamp('deleted_at').nullable()
    })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('transaction')
};
