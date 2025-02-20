import express from "express";
import session from "express-session";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(
    session({
        secret: "0a81fe9aab38c9011ed6542b2eb9a3db62a0c48dc496699bde624e1c5dbe4232",
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false, maxAge: 1 * 60 * 1000 },
    })
);

const processData = (data) => {
    return {
        id: data.id,
        name: data.name,
        description: data.description,
        is_formalized: data.is_formalized,
        start_year: data.start_year,
        contact_phone: data.contact_phone,
        instagram_link: data.instagram_link,
        x_link: data.x_link,
        facebook_link: data.facebook_link,
        pix_qr_code_link: data.pix_qr_code_link,
        gallery_images_url: data.gallery_images_url.join(", "), // URLs separadas por vírgulas
        skills: data.skills.map((skill) => skill.name).join(", "), // Apenas os nomes das skills
        causes: data.causes.map((cause) => cause.name).join(", "), // Apenas os nomes das causes
        sustainable_development_goals: data.sustainable_development_goals
            .map((goal) => goal.name)
            .join(", "), // Apenas os nomes dos objetivos
    };
};

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const response = await fetch(
            "https://bora-impactar-prd.setd.rdmapps.com.br/api/login.json",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": "true",
                },
                body: JSON.stringify({ email, password }),
            }
        );

        if (!response.ok) {
            console.error("Failed to login:", response.statusText);
            return res
                .status(response.status)
                .json({ error: "Invalid login or password" });
        }

        const data = await response.json();
        const processedData = processData(data.ngo); // Trata o JSON usando a função processData

        const existingData = await prisma.ONGdata.findUnique({
            where: { id: processedData.id },
        });

        if (existingData) {
            await prisma.ONGdata.update({
                where: { id: processedData.id },
                data: processedData,
            });
        } else {
            await prisma.ONGdata.create({
                data: processedData,
            });
        }

        // Armazena o usuário na sessão
        req.session.user = {
            email: email,
            token: data.token, // Se a API retornar um token, armazenamos ele
        };

        return res.status(200).json("Logged In Successfully");

    } catch (error) {
        console.error("Error during login:", error);
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

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
