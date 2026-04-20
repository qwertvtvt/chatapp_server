/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    // rooms
    .createTable('rooms', table => {
      table.string('roomId', 5).primary();
      table.text('roomname').notNullable();
      table.bigInteger('created_at').notNullable();
      table.bigInteger('updated_at').notNullable();
    })

    // chats
    .createTable('chats', table => {
      table.increments('id'); // AUTO INCREMENT
      table.string('roomId', 5).notNullable();
      table.text('username').notNullable();
      table.text('message').notNullable();
      table.integer('system').notNullable();
      table.bigInteger('post_at').notNullable();

      // 外部キー
      table.foreign('roomId')
        .references('rooms.roomId')
        .onDelete('CASCADE');

      // インデックス
      table.index('roomId');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('chats')
    .dropTableIfExists('rooms');
};