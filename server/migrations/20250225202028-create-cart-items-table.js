'use strict';

exports.up = function (db) {
  return db.createTable('cart_items', {
    id: { type: 'serial', primaryKey: true },
    cart_id: {
      type: 'int',
      foreignKey: {
        name: 'cart_items_cart_fk',
        table: 'carts',
        rules: {
          onDelete: 'CASCADE',
        },
        mapping: 'id',
      },
      notNull: true,
    },
    product_id: { type: 'int', notNull: true },
    quantity: { type: 'int', notNull: true, defaultValue: 1 },
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
  return db.dropTable('cart_items');
};
