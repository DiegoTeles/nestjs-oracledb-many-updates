import { Injectable } from '@nestjs/common';
const oracledb = require('oracledb');
const dbConfig = require('./dbConfig');

@Injectable()
export class AppService {
  async getHello(): Promise<any> {
    let connection;

    try {
      connection = await oracledb.getConnection(dbConfig);

      // const getAll = () => {

        const array = [1001, 1002]
        let data = {
          name: 'Orgulho da profisson',
          ids: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT },
          rids: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
        }
      
        array.map((val, index) => {
          index++
          const key = `id${index}`
          Object.assign(data, { [key]: val })
        })
      
        // return data
      // }
      // const array = [1001, 1002]
      const mapper = array.map((item, index) => {
        index++
        return `:id${index}`
      })

      const sql = `UPDATE no_dmlrupdtab
       SET name = :name
       WHERE id IN (${mapper})
       RETURNING id, ROWID INTO :ids, :rids`;

      const result = await connection.execute(
        sql,
        data,
        { autoCommit: true },
      );

      console.log(result);
    } catch (err) {
      console.error(err);
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (err) {
          console.error(err);
        }
      }
    }
  }
}
