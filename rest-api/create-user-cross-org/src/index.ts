import express, { Request, Response } from "express";
// import { Request, Response } from "express-serve-static-core";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import fetch from "node-fetch"; // Import fetch for Node.js
import { THOUGHTSPOT_HOST, SECRET_KEY, THOUGHTSPOT_USERNAME, THOUGHTSPOT_PASSWORD } from "./constants";

const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.json());
app.use(express.static(__dirname));

// Endpoint to generate token
app.post("/create-user", async (req: Request, res: Response): Promise<void> => {
    try {
        if (!THOUGHTSPOT_HOST || !THOUGHTSPOT_PASSWORD) {
            res.status(500).json({ error: "Server is missing required configurations" });
            return;
        }

        const headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
        };

        const body = JSON.stringify({
            user_identifier: u1,
            display_name: u1,
            password: Cloud123!,

            account_type: LOCAL_USER,
            account_status: ACTIVE,
            email: "u1@gmail.com",

            org_identifiers: [
                "o1",
                "o2"
            ],
            dry_run: false,
            delete_unspecified_users: false,
            notify_on_share: true
        });


        const response = await fetch(`${THOUGHTSPOT_HOST}/api/rest/2.0/users/import`, {
            method: "POST",
            headers: headers,
            body: body,
            redirect: "follow" as RequestRedirect,
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(`API error: ${JSON.stringify(result)}`);
        }

        res.json({ token: result });
    } catch (error: unknown) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Failed to create user", details: (error as Error).message });
    }
});

app.post("/", (req: Request, res: Response) => {
    console.log(req.body.name);
    res.end();
});

app.get("/", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, (err?: Error) => {
    if (err) console.error(err);
    console.log(`Server listening on http://localhost:${PORT}`);
});
