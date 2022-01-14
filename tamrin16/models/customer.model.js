const model = {}

module.exports = function(connection) {

  model.findAll = async function() {
    try {
      const [rows] = await connection.query(
        'SELECT * FROM `customer`'
      );
      return [ , rows ];
    } catch(err) {
      return [ err ];
    }
  }
  model.findById = async function(id) {
    try {
      const [ row ] = await connection.query(
        'SELECT * FROM `customer` WHERE `id` = ?',
        [id]
      );
      return [ , row ];
    } catch(err) {
      return [ err ];
    }
  }
  model.create = async function(data) {
    try {
      const [ row ] = await connection.query(
        'INSERT INTO `customer` (`type`, `name`, `phone`, `created_at`) VALUES (?, ?, ?, ?)',
        [ data.type, data.name, data.phone, new Date() ],
      );
      return [ , row ];
    } catch(err) {
      return [ err ];
    }
  }
  model.update = async function(id, data) {
    try {
      const [ row ] = await connection.query(
        'UPDATE `customer` SET `type` = ?, `name` = ?, `phoneNumber` = ? WHERE `id` = ?',
        [ data.type, data.name, data.phone, id ]
      );
      return [ , row ];
    } catch(err) {
      return [ err ];
    }
  }
  model.delete = async function(id) {
    try {
      const [ row ] = await connection.query(
        'DELETE FROM `customer` WHERE `id` = ?',
        [ id ]
      );
      return [ , row ];
    } catch(err) {
      return [ err ];
    }
  }

  return model
}