const model = {}

module.exports = function(connection) {

  model.findAll = async function(callback) {
    try {
      const [rows] = await connection.query(
        'SELECT * FROM `manager`'
      );
      return [ , rows ];
    } catch(err) {
      return [ err ];
    }
  }
  model.findById = async function(id, callback) {
    try {
      const [ row ] = await connection.query(
        'SELECT * FROM `manager` WHERE `id` = ?',
        [id]
      );
      return [ , row ];
    } catch(err) {
      return [ err ];
    }
  }
  model.create = async function(data, callback) {
    try {
      const [ row ] = await connection.query(
        'INSERT INTO `manager` (`name`, `phone`, `national_code`) VALUES (?, ?, ?)',
        [ data.name, data.phone, data.nationalCode ],
      );
      return [ , row ];
    } catch(err) {
      return [ err ];
    }
  }
  model.update = async function(id, data) {
    try {
      const [ row ] = await connection.query(
        'UPDATE `manager` SET `name` = ?, `phone` = ?, `national_code` = ? WHERE `id` = ?',
        [ data.name, data.phone, data.nationalCode, id ]
      );
      return [ , row ];
    } catch(err) {
      return [ err ];
    }
  }
  model.delete = async function(id, callback) {
    try {
      const [ row ] = await connection.query(
        'DELETE FROM manager WHERE id = ?',
        [ id ]
      );
      return [ , row ];
    } catch(err) {
      return [ err ];
    }
  }

  return model
}