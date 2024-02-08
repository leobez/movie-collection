# Movie collection

Site que exibe informações sobre diversos filmes.

O site utiliza da API gratuita disponibilizada pelo [TMDB](https://www.themoviedb.org/), afim de exibir informações de diversos filmes.

Site hospedado com os serviços: [netlify](https://www.netlify.com/)

[Link para o site](https://moviecollection-leob.netlify.app/)

<hr>
  
Site feito com React e TypeScript.
  
Rotas utilizadas da API:
  
`/movie/`: GET. Usada para recuperar informações sobre filmes. Utilizada na tela principal do site com o argumento "top_rated?" afim de exibir os filmes mais bem avaliados.
    
`/movie/:id`: GET. Usada para recuperar informações sobre filmes. Utilizada na tela do filme, passando seu "id" a fim de recuperar suas informações. 
  
`/search/movie`: GET. Usada para recuperar informações de filmes baseado em um query, com o uso do argumento "?query=". Usado para criar a barra de pesquisa do site.
  
`/genre/movie/list`: GET. Usada para recuperar um array de objetos contendo os gêneros dos filmes. Usado para exibir os gêneros dos filmes em todas as telas que estes são exibidos. 

`/discover/movie`: GET. Usada para recuperar filmes baseado em gêneros passados através do arugmento "&with_genres=". Foi usado na página de "sortear um filme".

<hr>

Documentação completa da API pode ser encontrada [aqui](https://developer.themoviedb.org/reference/intro/getting-started)
  




