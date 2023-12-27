# Site que exibe informações de filmes.

O site utiliza da API gratuita disponibilizada pelo [TMDB](https://www.themoviedb.org/), afim de exibir informações de diversos filmes.

Site feito com React e TypeScript.

Rotas utilizadas da API:

`/movie/`
Usada para recuperar informações sobre filmes. 
Utilizada na tela principal do site com o argumento `top_rated?` afim de exibir os filmes mais bem avaliados. 

`/movie/:id`
Usada para recuperar informações sobre filmes. 
Utilizada na tela do filme, passando seu `id` a fim de recuperar suas informações. 

`/search/movie`
Usada para recuperar informações de filmes baseado em um query, com o uso do argumento `?query=` 
Usado para criar a barra de pesquisa do site.

`/genre/movie/list`
Usada para recuperar um array de objetos contendo os gêneros dos filmes.
Usado para exibir os gêneros dos filmes em todas as telas que estes são exibidos. 

Documentação completa da API pode ser encontrada aqui: [Aqui](https://developer.themoviedb.org/reference/intro/getting-started)





