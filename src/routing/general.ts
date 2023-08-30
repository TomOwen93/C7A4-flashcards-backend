import { Client } from "pg";
import express from "express";
import { getResetQuery } from "../support/getResetQuery";

type Express = ReturnType<typeof express>;

export function addGeneralRoutes(app: Express, client: Client) {
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


    app.get("/reset/database", async (_req, res) => {
        try {
            const query = getResetQuery();
            await client.query(query);
            res.status(200).json("success");
        } catch (error) {
            res.status(500).json("failed")
        }
    })

}
