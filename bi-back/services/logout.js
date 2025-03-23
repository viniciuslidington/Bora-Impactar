import express from "express";

const router = express.Router();

router.post("/", (req, res) => {
    res.clearCookie('token');
    res.json({ message: 'Logout bem-sucedido' });
});

export default router
