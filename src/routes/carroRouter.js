const router = require("express").Router();
const Carros = require("../../Model/carros");
const Cliente = require("../../Model/clientes");

router.post("/", async (req, res) => {
  const { clienteId, marca, modelo, cor, ano, placa, chassi } = req.body;

  // VALIDATIONS
  if (!clienteId || !marca || !modelo || !cor || !ano || !placa || !chassi) {
    return res
      .status(422)
      .json({ mensagem: "Todos os dados são necessários!" });
  }

  // PERSISTENCE
  try {
    const novoCarro = await Carros.create({
      clienteId: clienteId,
      marca: marca,
      modelo: modelo,
      cor: cor,
      ano: ano,
      placa: placa,
      chassi: chassi,
    });

    res.status(201).json({ mensagem: "Carro criado com sucesso!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensagem: "Erro interno!" });
  }
});

router.get("/", async (req, res) => {
    try {
        const carros = await Carros.findAll({
          include: [
            {
              model: Cliente,
              as: "cliente",
              attributes: ["id", "nome", "cpf", "rg"],
            },
          ],
        });

        res.status(200).json(carros);
    } catch (error) {
        console.log(error);
        res.status(500).json({ mensagem: "Erro interno!" });
    }
    }
);

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try{
    const carro = await Carros.findByPk(id, {
      include: [
        {
          model: Cliente,
          as: "cliente",
          attributes: ["id", "nome", "cpf", "rg"],
        },
      ],
    });
    if(!carro){
      return res.status(404).json({ mensagem: "Carro não encontrado!" });
    }
    res.status(200).json(carro);
  }
  catch(error){
    console.log(error);
    res.status(500).json({ mensagem: "Erro interno!" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { clienteId, marca, modelo, cor, ano, placa, chassi } = req.body;
  try{
    const carro = await Carros.findByPk(id);
    if(!carro){
      return res.status(404).json({ mensagem: "Carro não encontrado!" });
    }
    await carro.update({
      clienteId: clienteId,
      marca: marca,
      modelo: modelo,
      cor: cor,
      ano: ano,
      placa: placa,
      chassi: chassi,
    });
    res.status(200).json({ mensagem: "Carro atualizado com sucesso!" });
  }
  catch(error){
    console.log(error);
    res.status(500).json({ mensagem: "Erro interno!" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try{
    const carro = await Carros.findByPk(id);
    if(!carro){
      return res.status(404).json({ mensagem: "Carro não encontrado!" });
    }
    await carro.destroy();
    res.status(200).json({ mensagem: "Carro excluído com sucesso!" });
  }
  catch(error){
    console.log(error);
    res.status(500).json({ mensagem: "Erro interno!" });
  }
});

module.exports = router;