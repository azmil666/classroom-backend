import express from "express";
import { db } from "../db/index.js";
import { classes } from "../db/schema/index.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const data = await db.select().from(classes);
        res.json({
            data,
            pagination: {
                total: data.length,
            },
        });
    } catch (e) {
        console.error("GET /classes error", e);
        res.status(500).json({ error: "Failed to fetch classes" });
    }
});

router.post("/", async (req, res) => {
    try {
        const [createdClass] = await db
            .insert(classes)
            .values({
                ...req.body,
                inviteCode: Math.random().toString(36).substring(2, 9),
                schedules: [],
            })
            .returning({ id: classes.id });

        if (!createdClass) throw new Error("Insert failed");

        res.status(201).json({ data: createdClass });
    } catch (e) {
        console.error(`POST /classes error`, e);
        res.status(500).json({ error: "Failed to create class" });
    }
});

export default router;
