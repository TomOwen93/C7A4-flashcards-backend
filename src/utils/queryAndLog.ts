/**Write a function `queryAndLog(client, sql, params=[])` which wraps node-postgres’s client.query() function 
 * 
 * and logs relevant diagnosis information (to console) before and after the query is run.
You can choose whether to pass the db client to queryAndLog 
(simplest) or whether to obtain it by some other means (e.g. have it available in the module scope). */

import { Client } from "pg";
import dotenv from "dotenv";
import { performance } from "perf_hooks";
import { setupDBClientConfig } from "../support/setupDBClientConfig";

dotenv.config();
const dbClientConfig = setupDBClientConfig();
const controlledClient = new Client(dbClientConfig);

export default async function queryAndLog(
    client: Client,
    sql: string,
    values: string[]
) {
    const startTime = performance.now();
    const qNum = startTime.toString().split("").splice(0, 5).join("");
    // const padqNum = `qNum: ${qNum}`.padStart(15);
    // const padsql = `sql: ${sql}`.padStart(50);
    // const padValues = `values: ${values}`.padStart(15);

    const response = await client.query(sql, values);

    const numRows = response.rowCount;
    // const padNumRows = `rowCount ${numRows}`.padStart(15);

    const elapsedtime = (performance.now() - startTime).toFixed(3);
    // const padElapsedtime = `time: ${elapsedtime}`.padStart(10);

    // const SQL_END = {
    //     qnum: padqNum,
    //     elapsedtime: padElapsedtime,
    //     numRows: padNumRows,
    //     sql: padsql,
    //     values: padValues,
    // };

    console.table({ SQL_START: { qnum: qNum, sql: sql, values: values } });

    console.table({
        SQL_END: {
            qnum: qNum,
            elapsedtime: elapsedtime,
            numRows: numRows,
            sql: sql,
            values: values,
        },
    });
}

async function testQueryAndLog() {
    await controlledClient.connect();
    queryAndLog(controlledClient, "SELECT * FROM users where userid > $1;", [
        "1",
    ]);
}

testQueryAndLog();
