// Importa o modelo Address para interagir com a coleção de endereços no banco de dados
const Address = require("../../models/Address");

// Função para adicionar um novo endereço
const addAddress = async (req, res) => {
  try {
    // Extrai os dados do corpo da requisição
    const { userId, address, city, pincode, phone, notes } = req.body;

    // Verifica se todos os campos obrigatórios foram fornecidos
    if (!userId || !address || !city || !pincode || !phone || !notes) {
      return res.status(400).json({
        success: false,
        message: "Dados inválidos fornecidos!",
      });
    }

    // Cria uma nova instância do modelo Address com os dados fornecidos
    const newlyCreatedAddress = new Address({
      userId,
      address,
      city,
      pincode,
      notes,
      phone,
    });

    // Salva o novo endereço no banco de dados
    await newlyCreatedAddress.save();

    // Retorna uma resposta de sucesso com os dados do novo endereço
    res.status(201).json({
      success: true,
      data: newlyCreatedAddress,
    });
  } catch (e) {
    console.log(e); // Registra o erro no console
    res.status(500).json({
      success: false,
      message: "Erro",
    });
  }
};

// Função para buscar todos os endereços de um usuário
const fetchAllAddress = async (req, res) => {
  try {
    const { userId } = req.params; // Extrai o userId dos parâmetros da requisição
    // Verifica se o userId foi fornecido
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "O ID do usuário é obrigatório!",
      });
    }

    // Busca todos os endereços associados ao userId
    const addressList = await Address.find({ userId });

    // Retorna uma resposta de sucesso com a lista de endereços
    res.status(200).json({
      success: true,
      data: addressList,
    });
  } catch (e) {
    console.log(e); // Registra o erro no console
    res.status(500).json({
      success: false,
      message: "Erro",
    });
  }
};

// Função para editar um endereço existente
const editAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params; // Extrai userId e addressId dos parâmetros da requisição
    const formData = req.body; // Extrai os dados do corpo da requisição

    // Verifica se userId e addressId foram fornecidos
    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        message: "O ID do usuário e do endereço é obrigatório!",
      });
    }

    // Busca e atualiza o endereço correspondente ao addressId e userId fornecidos
    const address = await Address.findOneAndUpdate(
      {
        _id: addressId,
        userId,
      },
      formData,
      { new: true } // Retorna o endereço atualizado
    );

    // Verifica se o endereço foi encontrado
    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Endereço não encontrado",
      });
    }

    // Retorna uma resposta de sucesso com os dados do endereço atualizado
    res.status(200).json({
      success: true,
      data: address,
    });
  } catch (e) {
    console.log(e); // Registra o erro no console
    res.status(500).json({
      success: false,
      message: "Erro",
    });
  }
};

// Função para deletar um endereço
const deleteAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params; // Extrai userId e addressId dos parâmetros da requisição
    // Verifica se userId e addressId foram fornecidos
    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        message: "O ID do usuário e do endereço é obrigatório!",
      });
    }

    // Busca e deleta o endereço correspondente ao addressId e userId fornecidos
    const address = await Address.findOneAndDelete({ _id: addressId, userId });

    // Verifica se o endereço foi encontrado
    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Endereço não encontrado",
      });
    }

    // Retorna uma resposta de sucesso informando que o endereço foi deletado
    res.status(200).json({
      success: true,
      message: "Endereço excluído com sucesso",
    });
  } catch (e) {
    console.log(e); // Registra o erro no console
    res.status(500).json({
      success: false,
      message: "Erro",
    });
  }
};

// Exporta as funções para uso em outros módulos
module.exports = { addAddress, editAddress, fetchAllAddress, deleteAddress };
