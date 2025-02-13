import express from "express";
import session from "express-session";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());
app.use(session({ 
    secret: "0a81fe9aab38c9011ed6542b2eb9a3db62a0c48dc496699bde624e1c5dbe4232",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 } // 1 dia  // secure: true quando for rodar em hml e prd
}));


app.get("/login", async (req, res) => {

    const { email, password } = req.body;

    try {
        const response = await fetch("https://bora-impactar-prd.setd.rdmapps.com.br/api/login.json", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });


        if (!response.ok) {
            return res.status(response.status).json({ error: "Invalid login or password" });
        }

        const data = await response.json();

        // Armazena o usuário na sessão
        req.session.user = {
            email: email,
            token: data.token // Se a API retornar um token, armazenamos ele
        };

        return res.status(200).json(data);

    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
});


app.get("/auth", async (req, res) => {
    if (req.session.user) {
        return res.status(200).json(req.session.user);
    } else {
        return res.status(401).json({ error: "Unauthorized" });
    }
});


app.post("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(500).json({ error: "Could not log out" });
        res.status(200).json({ message: "Logged out successfully" });
    });
});


app.listen(3000)