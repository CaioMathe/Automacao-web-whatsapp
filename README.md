<h1 align="center">Automação Web Whatsapp</h1>

O projeto consiste no desenvolvimento de automação do whatsapp para os próprios contatos do whatsapp, além de um sistema de login, onde existe um sistema para salvar as mensagem e filtrar pelo user logado.

Back-end: Django, Django Rest framework e Selenium. </br>
Front-end: React, Axios, Bootstrap, React-Toast. </br>
Banco de dados: Sqlite3
------------------------------------------------------------------------------------------------------------------------

Para executar o Backend da aplicação:

0° Fazer um git clone para a máquina de teste.

1° Ativar a virtual env. e acessar a pasta backend com o comando (Caso seu sistema seja windows): cd backend

2° Realizar a instalação das bibliotecas utilizadas com o seguinte comando no terminal: "pip install -r requirements.txt".

3° Para criar o banco de dados primeiramente executar o comando: python manage.py makemigrations, logo após executar: python manage.py migrate

5° Após finalizar as instalações usar o comando: "python manage.py runserver" para iniciar a aplicação.

------------------------------------------------------------------------------------------------------------------------

Para executar o Frontend da aplicação:

0° Acessar a pasta com o comando: cd frontend.

1° Fazer a instalação das dependências do arquivo: package.json. com o comando: npm install.

3° Iniciar a aplicação com o comando: npm start.

------------------------------------------------------------------------------------------------------------------------
Todas as api's listadas abaixo:

api/web/ ---> Post na tabela Mensagem e processamento da automação. </br>
api/search/ -----> Get dados da tabela, filtrados pelo user.

