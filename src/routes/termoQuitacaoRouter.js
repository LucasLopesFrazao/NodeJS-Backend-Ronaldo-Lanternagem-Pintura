const router = require("express").Router();
const TermoQuitacao = require("../../Model/termoQuitacao");
const Carros = require("../../Model/carros");
const Cliente = require("../../Model/clientes");
router.post("/", async (req, res) => {
  const {
    carroId,
    seguradora,
    sinistro,
    orcamento,
    apolice,
    data,
    valorTotal,
    MaoObra,
    Peca,
    Franquia,
    obs,
  } = req.body;

  // VALIDATIONS
  if (!carroId || !seguradora || !valorTotal || !MaoObra) {
    return res
      .status(422)
      .json({ mensagem: "Todos os dados são necessários!" });
  }

  // PERSISTENCE
  try {
    const novoTermoQuitacao = await TermoQuitacao.create({
      carroId: carroId,
      seguradora: seguradora,
      sinistro: sinistro,
      orcamento: orcamento,
      apolice: apolice,
      data: data,
      valorTotal: valorTotal,
      MaoObra: MaoObra,
      Peca: Peca,
      Franquia: Franquia,
      obs: obs,
    });

    res.status(201).json({ mensagem: "Termo de Quitação criado com sucesso!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensagem: "Erro interno!" });
  }
});

router.get("/", async (req, res) => {
  try {
    const termoQuitacao = await TermoQuitacao.findAll({
      include: [{
        model: Carros,
        required: true,
        include: [{
          model: Cliente,
          required: true
        }]
      }]
    });
    res.status(200).json(termoQuitacao);
  } catch (error) {
    console.log(error);
    res.status(500).json({ mensagem: "Erro interno!" });
  }
});

module.exports = router;
