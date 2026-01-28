import AgentAPI from "apminsight";
AgentAPI.config()

import express from 'express';
import cors from 'cors';
import subjectsRouter from "./routes/subjects.js";
import securityMiddleware from "./middleware/security.js";
import {toNodeHandler} from "better-auth/node";
import {auth} from "./lib/auth";

const app = express();
const PORT = 8000;

if (!process.env.FRONTEND_URL) {
    console.warn("FRONTEND_URL not set - CORS will be restrictive");
}
app.use(cors({
    origin: process.env.FRONTEND_URL || false,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.all('/api/auth/*splat', toNodeHandler(auth));

app.use(express.json());

app.use(securityMiddleware);

app.use('/api/subjects', subjectsRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Listening on port http://localhost:${PORT}`);
});


