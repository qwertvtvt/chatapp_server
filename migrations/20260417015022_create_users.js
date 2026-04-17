/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    // users
    .createTable('users', table => {
      table.string('userId', 10).primary();
      table.text('username').notNullable();
    })

    // rooms
    .createTable('rooms', table => {
      table.string('roomId', 5).primary();
      table.text('roomname').notNullable();
      table.bigInteger('created_at').notNullable();
    })

    // chats
    .createTable('chats', table => {
      table.increments('id'); // AUTO INCREMENT
      table.string('roomId', 5).notNullable();
      table.string('userId', 10).notNullable();
      table.text('message').notNullable();
      table.bigInteger('post_at').notNullable();

      // 外部キー
      table.foreign('roomId')
        .references('rooms.roomId')
        .onDelete('CASCADE');

      table.foreign('userId')
        .references('users.userId')
        .onDelete('CASCADE');

      // インデックス
      table.index('roomId');
      table.index('userId');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('chats')
    .dropTableIfExists('rooms')
    .dropTableIfExists('users');
};