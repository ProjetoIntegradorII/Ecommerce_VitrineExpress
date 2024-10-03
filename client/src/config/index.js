// Estrutura de dados para os campos do formulário de registro
export const registerFormControls = [
  {
    name: "userName", // Nome do campo
    label: "Nome de usuário", // Rótulo a ser exibido
    placeholder: "Digite seu nome de usuário", // Placeholder do campo
    componentType: "input", // Tipo de componente a ser renderizado
    type: "text", // Tipo de entrada
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Entre com seu email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Senha",
    placeholder: "Entre com sua senha",
    componentType: "input",
    type: "password",
  },
];

// Estrutura de dados para os campos do formulário de login
export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Entre com seu email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Entre com sua senha",
    componentType: "input",
    type: "password",
  },
];

// Estrutura de dados para os campos do formulário de adição de produto
export const addProductFormElements = [
  {
    label: "Titulo", // Rótulo do campo
    name: "title", // Nome do campo
    componentType: "input", // Tipo de componente a ser renderizado
    type: "text", // Tipo de entrada
    placeholder: "Insira o título do produto", // Placeholder do campo
  },
  {
    label: "Descrição",
    name: "description",
    componentType: "textarea", // Campo de texto
    placeholder: "Insira a descrição do produto",
  },
  {
    label: "Categoria",
    name: "category",
    componentType: "select", // Campo de seleção
    options: [ // Opções disponíveis para seleção
      { id: "papelaria", label: "Papelaria" },
      { id: "aviamento", label: "Aviamento" },
      { id: "outros", label: "Outros" },
    ],
  },
  {
    label: "Marca",
    name: "brand",
    componentType: "select",
    options: [
      { id: "fabercastell", label: "Faber-Castell" },
      { id: "tilibra", label: "Tilibra" },
      { id: "pilot", label: "Pilot" },
      { id: "circulo", label: "Círculo" },
      { id: "saojose", label: "São José" },
      { id: "pecci", label: "Pecci" },
      { id: "outro", label: "Outros" },
    ],
  },
  {
    label: "Preço",
    name: "price",
    componentType: "input",
    type: "number", // Tipo numérico para preço
    placeholder: "Insira o preço do produto",
  },
  {
    label: "Promoção",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Insira o preço de venda na promoção",
  },
  {
    label: "Total em Estoque",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Insira o estoque total", // Placeholder para estoque
  },
];

// Estrutura de dados para os itens do menu do cabeçalho
export const shoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/shop/home", // Caminho para a página inicial
  },
  {
    id: "products",
    label: "Produtos",
    path: "/shop/listing", // Caminho para a lista de produtos
  },
  {
    id: "papelaria",
    label: "Papelaria",
    path: "/shop/listing", // Caminho para a categoria de homens
  },
  {
    id: "aviamento",
    label: "Aviamento",
    path: "/shop/listing", // Caminho para a categoria de mulheres
  },
  {
    id: "outros",
    label: "Outros",
    path: "/shop/listing", // Caminho para a categoria de crianças
  },
  {
    id: "search",
    label: "Pesquisar",
    path: "/shop/search", // Caminho para a pesquisa
  },
  {
    id: "sabout",
    label: "Sobre",
    path: "/shop/about", // Caminho para o sobre
  },
];

// Mapeia categorias para seus rótulos
export const categoryOptionsMap = {
  papelaria: "Papelaria",
  aviamento: "Aviamento",
  outros: "Outros",
};

// Mapeia marcas para seus rótulos
export const brandOptionsMap = {
  fabercastell: "Faber-Castell",
  tilibra: "Tilibra",
  pilot: "Pilot",
  circulo: "Círculo",
  saojose: "São José",
  pecci: "Pecci",
  outro: "Outros",
};

// Opções de filtro para categorias e marcas
export const filterOptions = {
  category: [
    { id: "papelaria", label: "Papelaria" },
    { id: "aviamento", label: "Aviamento" },
    { id: "outros", label: "Outros" },
  ],
  brand: [
    { id: "fabercastell", label: "Faber-Castell" },
    { id: "tilibra", label: "Tilibra " },
    { id: "pilot", label: "Pilot" },
    { id: "circulo", label: "Círculo" },
    { id: "saojose", label: "São José" },
    { id: "pecci", label: "Pecci" },
    { id: "outro", label: "Outros" },
  ],
};

// Opções de classificação de produtos
export const sortOptions = [
  { id: "price-lowtohigh", label: "Preço: Menor" },
  { id: "price-hightolow", label: "Preço: Maior" },
  { id: "title-atoz", label: "Titulo: A a Z" },
  { id: "title-ztoa", label: "Titulo: Z a A" },
];

// Estrutura de dados para os campos do formulário de endereço
export const addressFormControls = [
  {
    label: "Endereço",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Digite seu endereço", // Placeholder para endereço
  },
  {
    label: "Cidade",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Digite sua cidade", // Placeholder para cidade
  },
  {
    label: "CEP",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Digite seu CEP", // Placeholder para código postal
  },
  {
    label: "Telefone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Digite seu número de telefone", // Placeholder para telefone
  },
  {
    label: "Notas",
    name: "notes",
    componentType: "textarea", // Campo de texto
    placeholder: "Notas adicionais", // Placeholder para notas adicionais
  },
];
