import { Client } from "pg";
import express from "express";

type Express = ReturnType<typeof express>;

export function addCardRoutes(app: Express, client: Client) {
    /* ------- template for /cards request methods -------*/
    // app.get("/cards/", async (req, res) => {
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

    app.get("/cards", async (req, res) => {
        try {
            const query = "SELECT * FROM cards;";
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

    app.get("/cards/:deckid", async (req, res) => {
        try {
            const query = "SELECT * FROM cards WHERE deckid=$1";
            const values = [req.params.deckid];
            const response = await client.query(query, values);
            const data = response.rows;
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json(
                `request ${req.url} caused error, check server logs.`
            );
        }
    });

    app.post("/cards", async (req, res) => {
        try {
            const query =
                "INSERT INTO cards(front, back, deckid) values ($1, $2, $3) RETURNING *";
            const values = [req.body.front, req.body.back, req.body.deckid];
            const response = await client.query(query, values);
            const data = response.rows[0];

            res.status(200).json(data);
        } catch (error) {
            res.status(500).json(
                `request ${req.url} caused error, check server logs.`
            );
        }
    });

    app.patch("/cards/:cardid", async (req, res) => {
        try {
            const query =
                "UPDATE cards SET front = $1, back = $2  WHERE cardid = $3 RETURNING *";
            const values = [req.body.front, req.body.back, req.body.cardid];
            const response = await client.query(query, values);
            const data = response.rows[0];

            res.status(200).json(data);
        } catch (error) {
            res.status(500).json(
                `request ${req.url} caused error, check server logs.`
            );
        }
    });

    app.delete("/cards/:cardid", async (req, res) => {
        try {
            const query = "DELETE FROM cards WHERE cardid = $1";
            const values = [req.params.cardid];
            const response = await client.query(query, values);
            const data = response.rows[0];

            res.status(200).json(data);
        } catch (error) {
            res.status(500).json(
                `request ${req.url} caused error, check server logs.`
            );
        }
    });
}
