// Estrutura de dados para os campos do formulário de registro
export const registerFormControls = [
  {
    name: "userName", // Nome do campo
    label: "User Name", // Rótulo a ser exibido
    placeholder: "Enter your user name", // Placeholder do campo
    componentType: "input", // Tipo de componente a ser renderizado
    type: "text", // Tipo de entrada
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

// Estrutura de dados para os campos do formulário de login
export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

// Estrutura de dados para os campos do formulário de adição de produto
export const addProductFormElements = [
  {
    label: "Title", // Rótulo do campo
    name: "title", // Nome do campo
    componentType: "input", // Tipo de componente a ser renderizado
    type: "text", // Tipo de entrada
    placeholder: "Enter product title", // Placeholder do campo
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea", // Campo de texto
    placeholder: "Enter product description",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select", // Campo de seleção
    options: [ // Opções disponíveis para seleção
      { id: "men", label: "Men" },
      { id: "women", label: "Women" },
      { id: "kids", label: "Kids" },
      { id: "accessories", label: "Accessories" },
      { id: "footwear", label: "Footwear" },
    ],
  },
  {
    label: "Brand",
    name: "brand",
    componentType: "select",
    options: [
      { id: "nike", label: "Nike" },
      { id: "adidas", label: "Adidas" },
      { id: "puma", label: "Puma" },
      { id: "levi", label: "Levi's" },
      { id: "zara", label: "Zara" },
      { id: "h&m", label: "H&M" },
    ],
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number", // Tipo numérico para preço
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price (optional)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock", // Placeholder para estoque
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
    label: "Products",
    path: "/shop/listing", // Caminho para a lista de produtos
  },
  {
    id: "men",
    label: "Men",
    path: "/shop/listing", // Caminho para a categoria de homens
  },
  {
    id: "women",
    label: "Women",
    path: "/shop/listing", // Caminho para a categoria de mulheres
  },
  {
    id: "kids",
    label: "Kids",
    path: "/shop/listing", // Caminho para a categoria de crianças
  },
  {
    id: "footwear",
    label: "Footwear",
    path: "/shop/listing", // Caminho para a categoria de calçados
  },
  {
    id: "accessories",
    label: "Accessories",
    path: "/shop/listing", // Caminho para a categoria de acessórios
  },
  {
    id: "search",
    label: "Search",
    path: "/shop/search", // Caminho para a pesquisa
  },
];

// Mapeia categorias para seus rótulos
export const categoryOptionsMap = {
  men: "Men",
  women: "Women",
  kids: "Kids",
  accessories: "Accessories",
  footwear: "Footwear",
};

// Mapeia marcas para seus rótulos
export const brandOptionsMap = {
  nike: "Nike",
  adidas: "Adidas",
  puma: "Puma",
  levi: "Levi",
  zara: "Zara",
  "h&m": "H&M",
};

// Opções de filtro para categorias e marcas
export const filterOptions = {
  category: [
    { id: "men", label: "Men" },
    { id: "women", label: "Women" },
    { id: "kids", label: "Kids" },
    { id: "accessories", label: "Accessories" },
    { id: "footwear", label: "Footwear" },
  ],
  brand: [
    { id: "nike", label: "Nike" },
    { id: "adidas", label: "Adidas" },
    { id: "puma", label: "Puma" },
    { id: "levi", label: "Levi's" },
    { id: "zara", label: "Zara" },
    { id: "h&m", label: "H&M" },
  ],
};

// Opções de classificação de produtos
export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

// Estrutura de dados para os campos do formulário de endereço
export const addressFormControls = [
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address", // Placeholder para endereço
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city", // Placeholder para cidade
  },
  {
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode", // Placeholder para código postal
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number", // Placeholder para telefone
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea", // Campo de texto
    placeholder: "Enter any additional notes", // Placeholder para notas adicionais
  },
];
