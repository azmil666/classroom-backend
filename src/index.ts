import fs from "fs";
import path from "path";

const apmConfigPath = path.resolve(process.cwd(), "apminsightnode.json");

if (!fs.existsSync(apmConfigPath)) {
    const config = {
        licenseKey: process.env.SITE24X7_LICENSE_KEY,
        appName: process.env.SITE24X7_APP_NAME || "classroom-backend",
    };

    fs.writeFileSync(apmConfigPath, JSON.stringify(config, null, 2));
    console.log("✅ apminsightnode.json generated dynamically");
}

await import("apminsight");

console.log("✅ Site24x7 agent loaded");

import express from 'express';
import cors from 'cors';
import subjectsRouter from "./routes/subjects.js";
import usersRouter from "./routes/users.js";
import classesRouter from "./routes/classes.js";
import departmentsRouter from "./routes/departments.js";
import statsRouter from "./routes/stats.js";
import enrollmentsRouter from "./routes/enrollments.js";
import securityMiddleware from "./middleware/security.js";
import {toNodeHandler} from "better-auth/node";
import {auth} from "./lib/auth.js";

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

app.use(express.json());

app.all('/api/auth/*splat', toNodeHandler(auth));



if (process.env.NODE_ENV === "production") {
    app.use(securityMiddleware);
}


app.use('/api/subjects', subjectsRouter);
app.use('/api/users', usersRouter);
app.use('/api/classes', classesRouter);
app.use("/api/departments", departmentsRouter);
app.use("/api/stats", statsRouter);
app.use("/api/enrollments", enrollmentsRouter);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Listening on port http://localhost:${PORT}`);
});


