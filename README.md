# MealPlanner

## Aplicação de planeamento semanal e refeições, com recurso à API https://spoonacular.com/food-api. A aplicação permite consultar os milhares de receitas presentes na refeirda API através de um menu de pesquisa intuitivo, e atribuir até 3 receitas a cada dia da semana. Subsequentemente o utilizador pode consultar a informação sobre o método de preparação e ingredientes necessários às receitas selecionadas, assim como visualizar um gráfico com os valores de calorias, carbohidratos e proteinas que serão consumidos em cada dia (em % da quantidade diária recomendada). Abaixo é apresentado um walkthrough pelos 3 separadores da aplicação:

### Home
#### Secção informativa sobre o projeto e o desenvolvedor, onde é descrito de forma sucinta o método de navegação pela aplicação.

### Manage Plan
#### Este separador é composto por duas secções:

#### 1. Secção de definição dos parámetros de pesquisa, onde é possível selecionar o tipo de cozinha (parámetro cumulativo), tipo de refeição (pequeno almoço, refeição principal, sobremesa, salada, etc), tipo de dieta, eventuais intolerâncias alimentares, e o método de ordenação dos resultados. O utilizador pode combinar todos este parámetros para chegar às seleções ideias de receita para determinada refeição planeada. Caso nenhum parámetro seja selecionado são devolvidas todas as receitas da API (em conjuntos de 10), pelo ordem padrão.

#### 2. Secção dos resultados da pesquisa, onde o utilizador visualiza os resultados devolvidos pela API aos parámetros de pesquisa definidos. São apresentados um máximo de 10 resultados por pesquisa, sendo que o utilizador pode solicitar visualizações sucessivas, até que se esgote o número de resultados total disponível. Para cada receita é apresentada uma imagem representativa, uma descrição, tempo necessário de realização em minutos, número de ingredientes necessário, número de porções resultante da receita e Health Rate (rácio da API, que classifica o quão saudável a receita é).

##### 2.1 Em cada resultado da pesquisa / receita, é apresentado um botão que permite aceder ao Meal Plan. O Meal Plan é apresentado numa janela modal, na qual o utilizador pode associar a receita em questão à refeição de um qualquer dia, assim como eliminar receitas que tenha sido adicionadas anteriormente.

### See Report
#### Este separador é composto por um reporte, e um índice associado ao mesmo, com hiperligações para as várias secções. A primeira secção é um gráfico de barras geral, que apresenta as quantidades de calorias, carbohidratos e proteinas (em % da quantidade diária recomendada) resultantes do plano de refeições definidos pelo utilizador. Posteriormente segue-se a apresentação dos dias e refeições aos quais foram atribuidas receitas pelo utilizador, permitindo para cada caso visualizar a lista de ingredientes necessários e o método de confeção das mesmas.