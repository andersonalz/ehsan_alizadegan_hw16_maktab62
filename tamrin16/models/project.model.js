const model = {}

module.exports = function(connection) {

  model.findAll = async function(callback) {
    try {
      const [rows] = await connection.query(`
        SELECT p.*, pcm.manager_id, pcm.customer_id
        FROM project as p
        JOIN pcm
        ON pcm.project_id = p.id
      `);

      const helper = [];
      for(const row of rows) {
        const foundRow = helper.find(r => r.id === row.id);
        if(!foundRow) {
          helper.push(row);
        } else {
          
          if(Array.isArray(foundRow.manager_id)) {
            if(!foundRow.manager_id.includes(row.manager_id)) {
              foundRow.manager_id.push(row.manager_id);
            }
          } else {
            foundRow.manager_id = [row.manager_id];
          }
          
          if(Array.isArray(foundRow.customer_id)) {
            if(!foundRow.customer_id.includes(row.customer_id)) {
              foundRow.customer_id.push(row.customer_id);
            }
          } else {
            foundRow.customer_id = [row.customer_id];
          }
        }
        
      }

      return [ , helper ];
    } catch(err) {
      return [ err ];
    }
  }
  model.findById = async function(id, callback) {
    try {
      const [ row ] = await connection.query(`
        SELECT p.*, pcm.manager_id, pcm.customer_id
        FROM project as p
        JOIN pcm
        ON pcm.project_id = p.id
        WHERE p.id = ?
        `,
        [id]
      );

      if(!row.length) {
        return [ , row];
      }
      
      const helper = row[0];
      
      for(const r of row) {
        if(Array.isArray(helper.manager_id)) {
          if(!helper.manager_id.includes(r.manager_id)) {
            helper.manager_id.push(r.manager_id);
          }
        } else {
          helper.manager_id = [r.manager_id];
        }
        if(Array.isArray(helper.customer_id)) {
          if(!helper.customer_id.includes(r.customer_id)) {
            helper.customer_id.push(r.customer_id);
          }
        } else {
          helper.customer_id = [r.customer_id]
        }
      }
      return [ , [helper]];

    } catch(err) {
      return [ err ];
    }
  }
  model.create = async function(data, callback) {
    try {
      const [ row ] = await connection.query(
        `INSERT INTO project (title, description) VALUES (?, ?)`,
        [ data.title, data.description ],
      );
      return [ , row ];
    } catch(err) {
      return [ err ];
    }
  }
  model.update = async function(id, data) {
    try {
      const [ row ] = await connection.query(
        `UPDATE project SET title = ?, description = ? WHERE id = ?`,
        [ data.title, data.description, id ]
      );
      return [ , row ];
    } catch(err) {
      return [ err ];
    }
  }
  model.delete = async function(id, callback) {
    try {
      const [ row ] = await connection.query(
        `DELETE FROM project WHERE id = ?`,
        [ id ]
      );
      return [ , row ];
    } catch(err) {
      return [ err ];
    }
  }

  return model
}