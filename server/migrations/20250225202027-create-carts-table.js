'use strict';

exports.up = function (db) {
  return db.createTable('carts', {
    id: { type: 'serial', primaryKey: true },
    user_id: {
      type: 'int',
      foreignKey: {
        name: 'cart_user_fk',
        table: 'users',
        rules: {
          onDelete: 'CASCADE',
        },
        mapping: 'id',
      },
      nullable: true,
    },
    session_id: { type: 'string', length: 100, nullable: true },
    created_at: {
      type: 'timestamp',
      defaultValue: new String('CURRENT_TIMESTAMP'),
    },
    updated_at: {
      type: 'timestamp',
      defaultValue: new String('CURRENT_TIMESTAMP'),
    },
  });
};

exports.down = function (db) {
  return db.dropTable('carts');
};
