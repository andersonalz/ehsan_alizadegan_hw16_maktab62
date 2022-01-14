const model = {}

module.exports = function(connection) {

  model.findAll = async function() {
    try {
      const [rows] = await connection.query(`
        SELECT p.*, pcm.manager_id, pcm.customer_id
        FROM project as p
        JOIN pcm
        ON pcm.project_id = p.id
      `);
      return [ , rows ];
    } catch(err) {
      return [ err ];
    }
  }
  model.findById = async function(id) {
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
      return [ , row ];
    } catch(err) {
      return [ err ];
    }
  }
  model.create = async function(data) {
    try {
      const [ row ] = await connection.query(
        `INSERT INTO pcm (manager_id, customer_id, project_id) VALUES (?, ?, ?)`,
        [ data.managerId, data.customerId, data.projectId ],
      );
      return [ , row ];
    } catch(err) {
      return [ err ];
    }
  }
  model.update = async function(id, data) {
    try {
      const [ row ] = await connection.query(
        `UPDATE pcm SET title = ?, description = ? WHERE id = ?`,
        [ data.title, data.description, id ]
      );
      return [ , row ];
    } catch(err) {
      return [ err ];
    }
  }
  model.delete = async function(id) {
    try {
      const [ row ] = await connection.query(
        `DELETE FROM pcm WHERE id = ?`,
        [ id ]
      );
      return [ , row ];
    } catch(err) {
      return [ err ];
    }
  }
  model.deleteByManagerIdProjectId = async function(managerId, projectId) {
    try {
      const [ row ] = await connection.query(
        `DELETE FROM pcm WHERE manager_id = ? AND project_id = ?`,
        [ managerId, projectId ]
      );
      return [ , row ];
    } catch(err) {
      return [ err ];
    }
  }
  model.deleteByCustomerIdProjectId = async function(customerId, projectId) {
    try {
      const [ row ] = await connection.query(
        `DELETE FROM pcm WHERE customer_id = ? AND project_id = ?`,
        [ customerId, projectId ]
      );
      return [ , row ];
    } catch(err) {
      return [ err ];
    }
  }
  model.findByProjectId = async function(projectId) {
    try {
      const [ rows ] = await connection.query(`
        SELECT *
        FROM pcm
        WHERE project_id = ?
        `,
        [ projectId ]
      );

      return [ , rows ];
    } catch(err) {
      return [ err ];
    }
  }

  return model
}