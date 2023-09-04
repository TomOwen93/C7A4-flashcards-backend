import { Client } from "pg";
import express from "express";

type Express = ReturnType<typeof express>;

export function addDeckRoutes(app: Express, client: Client) {
    /* ------- template for /decks request methods -------*/
    // app.get("/decks/", async (req, res) => {
    //     try {
    //         const query = "";
    //         const values = [req.params];
    //         const response = await client.query(query, values);
    //         const data = response.rows
    //         res.status(200).json(data)
    //     } catch (error) {
    //         res.status(500).json(`request ${req.url} caused error, check server logs.`);
    //     }
    // })

    app.get("/decks", async (req, res) => {
        try {
            const query = "SELECT * FROM DECKS;";
            // const values = [""];
            const response = await client.query(query);
            const data = response.rows;
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json(
                `request ${req.url} caused error, check server logs.`
            );
        }
    });

    app.get("/decks/:userid", async (req, res) => {
        try {
            const query = "SELECT * FROM decks WHERE userid=$1";
            const values = [req.params.userid];
            const response = await client.query(query, values);
            const data = response.rows;
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json(
                `request ${req.url} caused error, check server logs.`
            );
        }
    });

    app.post("/decks", async (req, res) => {
        try {
            const query =
                "INSERT INTO decks(name, userid) values ($1, $2) RETURNING *";
            const values = [req.body.name, req.body.userid];
            const response = await client.query(query, values);
            const data = response.rows[0];

            res.status(200).json(data);
        } catch (error) {
            res.status(500).json(
                `request ${req.url} caused error, check server logs.`
            );
        }
    });

    app.delete("/decks/:deckid", async (req, res) => {
        try {
            const queryCards = `DELETE FROM cards where deckid = $1;`;
            const queryDecks = `DELETE FROM decks where deckid = $1;`;
            const values = [req.params.deckid];
            const responseCards = await client.query(queryCards, values);
            await client.query(queryDecks, values);

            const dataCards = responseCards.rows;
            // const dataDecks = responseDecks.rows;

            res.status(200).json(dataCards);
        } catch (error) {
            res.status(500).json(
                `request ${req.url} caused error, check server logs.`
            );
        }
    });

    app.patch("/decks/:deckid", async (req, res) => {
        try {
            const query = "UPDATE decks SET name = $1 WHERE deckid = $2";
            const values = [req.body.name, req.params.deckid];
            const response = await client.query(query, values);
            const data = response.rows;
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json(
                `request ${req.url} caused error, check server logs.`
            );
        }
    });
}
