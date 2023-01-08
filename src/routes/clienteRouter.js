const router = require("express").Router();
const Cliente = require("../../Model/clientes");

router.get('/carros/:id', async(req, res) => {
    const { id } = req.params;
    try {
        const cliente = await Cliente.findByPk(id)
        const carros = await cliente.getCarros();
        res.status(200).json(carros);
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensagem: "Erro interno!" });
    }
})

router.post("/", async (req, res) => {
  const { nome, cpf, rg } = req.body;

  // VALIDATIONS
  if (!nome || !cpf || !rg) {
    return res
      .status(422)
      .json({ mensagem: "Todos os dados são necessários!" });
  }

  // PERSISTENCE
  try {
    const novoCliente = await Cliente.create({
      nome: nome,
      cpf: cpf,
      rg: rg,
    });

    res.status(201).json({ mensagem: "Cliente criado com sucesso!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensagem: "Erro interno!" });
  }
});

router.get("/", async (req, res) => {
  try {
    const clientes = await Cliente.findAll();
    res.status(200).json(clientes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensagem: "Erro interno!" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const cliente = await Cliente.findByPk(id);
    if (cliente) {
      res.status(200).json(cliente);
    } else {
      res.status(404).json({ mensagem: "Cliente não encontrado!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensagem: "Erro interno!" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { nome, cpf, rg } = req.body;
  try{
    const cliente = await Cliente.findByPk(id);
    if (cliente) {
      await cliente.update({
        nome: nome,
        cpf: cpf,
        rg: rg,
      });
      res.status(200).json({ mensagem: "Cliente atualizado com sucesso!" });
    } else {
      res.status(404).json({ mensagem: "Cliente não encontrado!" });
    }
  }
  catch(error){
    console.log(error);
    res.status(500).json({ mensagem: "Erro interno!" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const cliente = await Cliente.findByPk(id);
    if (cliente) {
      await cliente.destroy();
      res.status(200).json({ mensagem: "Cliente deletado com sucesso!" });
    } else {
      res.status(404).json({ mensagem: "Cliente não encontrado!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensagem: "Erro interno!" });
  }
});

module.exports = router;
