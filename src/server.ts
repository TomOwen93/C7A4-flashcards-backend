import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { Client } from "pg";
import { getEnvVarOrFail } from "./support/envVarUtils";
import { setupDBClientConfig } from "./support/setupDBClientConfig";

dotenv.config(); //Read .env file lines as though they were env vars.

const dbClientConfig = setupDBClientConfig();
const client = new Client(dbClientConfig);

//Configure express routes
const app = express();

app.use(express.json()); //add JSON body parser to each following route handler
app.use(cors()); //add CORS support to each following route handler

app.get("/users", async (_req, res) => {
    try {
        const queryText = "SELECT * FROM USERS;";
        const result = await client.query(queryText);

        res.status(200).json(result.rows);
    } catch (error) {
        //Recover from error rather than letting system halt
        console.error(error);
        res.status(500).send("An error occurred. Check server logs.");
    }
});

app.get("/health-check", async (_req, res) => {
    try {
        //For this to be successful, must connect to db
        await client.query("select now()");
        res.status(200).send("system ok");
    } catch (error) {
        //Recover from error rather than letting system halt
        console.error(error);
        res.status(500).send("An error occurred. Check server logs.");
    }
});

app.get("/decks/:userid", async (req, res) => {
    try {
        const query = "SELECT * FROM DECKS WHERE userid=$1"; //JOIN users ON users.userid=decks.userid WHERE userid=$1;";
        const userId = req.params.userid;
        const decks = await client
            .query(query, [userId])
            .then((response) => response.rows);
        res.status(200).json(decks);
    } catch (error) {
        //Recover from error rather than letting system halt
        console.error(error);
        res.status(500).json("An error occurred. Check server logs.");
    }
});

connectToDBAndStartListening();

async function connectToDBAndStartListening() {
    console.log("Attempting to connect to db");
    // console.log(client)

    await client.connect();
    console.log("Connected to db!");

    const port = getEnvVarOrFail("PORT");
    app.listen(port, () => {
        console.log(
            `Server started listening for HTTP requests on port ${port}.  Let's go!`
        );
    });
}
