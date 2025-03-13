import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const prisma = new PrismaClient();
const app = express();
app.use(express.json());
app.use(cors());

app.post("/request", async (req, res) => {

    await prisma.request.create({
        data: {
            title: req.body.title,
            category: req.body.category,
            urgency: req.body.urgency,
            description: req.body.description,
        }
    });
    return res.status(201).json(req.body);
});


app.get("/request", async (req, res) => {

  let requests = [];  

  if (req.query) {
    requests = await prisma.request.findMany({
      where: {
        title: req.query.title,
        category: req.query.category
      },  
    });  
  } else {
    requests = await prisma.request.findMany();  
  };  

  res.status(200).json(requests);

});  

app.put('/request/:id', async (req, res) => {

    const requestId = parseInt(req.params.id, 10)
    

    await prisma.request.update({ //Atualiza o request com o valor da variavel passada no params. http://localhost:3000/users/valor
        where: {
            id: requestId
        },
        data: {
            title: req.body.title,
            category: req.body.category,
            number: req.body.number,
            urgency: req.body.urgency,
            description: req.body.description,
        }
    })

    res.status(201).json(req.body)

});

app.delete('/request/:id', async (req, res) => { // Seleciona o usuario do mesmo

    const requestId = parseInt(req.params.id, 10)

    await prisma.request.delete({
        where: {
            id: requestId
        }
    })
    
    res.status(200).json({messega: "Usuario deletado comm sucesso"})

})


app.listen(3001)