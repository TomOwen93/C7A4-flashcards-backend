import { Client } from "pg";
import express from "express";

type Express = ReturnType<typeof express>;

export function addUserRoutes(app: Express, client: Client) {
    /* ------- template for /decks request methods -------*/
    // app.get("/users/", async (req, res) => {
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

    app.get("/users", async (req, res) => {
        try {
            const query = "SELECT * FROM users";

            const response = await client.query(query);
            const data = response.rows;
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json(
                `request ${req.url} caused error, check server logs.`
            );
        }
    });

    app.get("/users/:userid", async (req, res) => {
        try {
            const query = "SELECT * FROM users WHERE userid=$1";
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

    app.post<{ username: string }>("/users/", async (req, res) => {
        try {
            const query = "INSERT INTO users(username) values($1) returning *;";
            const values = [req.body.username];

            const response = await client.query(query, values);
            const data = response.rows[0];
            console.log(data);
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json(
                `request ${req.url} caused error, check server logs.`
            );
        }
    });
}
