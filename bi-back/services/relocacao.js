import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const prisma = new PrismaClient();
const app = express();
app.use(express.json());
app.use(cors());


app.post("/relocacoes", async (req, res) => {

    await prisma.RelocationProduct.create({
        data: {
            title: req.body.title,
            category: req.body.category,
            number: req.body.number,
            description: req.body.description,
        },
    });
    res.status(201).json(req.body);
});


app.get("/relocacoes", async (req, res) => {

  let relocacoes = [];  

  if (req.query) {
    relocacoes = await prisma.RelocationProduct.findMany({
      where: {
        title: req.query.title,
        category: req.query.category
      },  
    });  
  } else {
    relocacoes = await prisma.RelocationProduct.findMany();  
  };  

  res.status(200).json(relocacoes);

});  

app.put('/relocacoes/:id', async (req, res) => {
    
  await prisma.RelocationProduct.update({
      where : {   
          id : req.params.id
      },
      data: {
        title: req.body.title,
        category: req.body.category,
        number: req.body.number,
        description: req.body.description,
      }
  })
  res.status(201).json(req.body)

})

app.delete('/relocacoes/:id', async (req, res) => {

  await prisma.RelocationProduct.delete({
    where: {
      id: req.params.id
    }
  })

  res.status(201).json(req.body , { message: 'Relocation deleted' })

})

app.listen(3002)