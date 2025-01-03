# Order - Gestão de Restaurantes

![WhatsApp Image 2024-05-23 at 16 57 12](https://github.com/user-attachments/assets/e4d53d20-935d-401b-bb6e-40f78c7a36ba)

### Projeto feito para o TCC do 3° ano do ensino médio integrado ao técnico em Desenvolvimento de Sistemas
Grupo: <a href="https://www.linkedin.com/in/jo%C3%A3o-pedro-louren%C3%A7o-dos-santos-28b501291/" target="_blank">João Pedro Lourenço</a>, <a href="https://www.instagram.com/lah_mell0/">Laura Mello</a>, <a href="https://github.com/EnzoTakaku7">Enzo Takaku</a>

## Visão Geral

O Order é um sistema desenvolvido utilizando React e Firebase, projetado para otimizar a gestão de restaurantes. Ele busca aumentar a eficiência operacional, proporcionar uma experiência gastronômica superior e criar um ambiente mais agradável e produtivo para todos os envolvidos.

Principais Benefícios:

Redução dos tempos de espera;

Maximização da satisfação dos clientes;

Facilidade na gestão operacional e financeira.

# Funcionalidades

## 1. Organização de Mesas

Gerenciamento eficiente de mesas, incluindo a marcação de mesas ocupadas e livres;

Controle de itens em estoque, vinculado ao cardápio para atualizações automáticas.

## 2. Sistema de Agendamento de Mesas

Interface intuitiva para reservas;

Controle de reservas baseado em mesas específicas;

Visualização das reservas em andamento e histórico. 

![WhatsApp Image 2024-11-23 at 00 40 35](https://github.com/user-attachments/assets/8d286e1a-2007-4c67-a816-6c1e25efa0f2)

## 3. Criação e Gerenciamento de Comandas

Associação de itens do cardápio às comandas;

Controle de pedidos por mesa, incluindo o valor total;

Redução de erros e confusões no processo de anotação.

![WhatsApp Image 2024-11-23 at 00 56 55](https://github.com/user-attachments/assets/1d62ac05-7af0-4d3a-8dcd-4e77a35f319d)

![WhatsApp Image 2024-11-23 at 00 58 36](https://github.com/user-attachments/assets/d3808d5e-5ca3-4347-be4f-72d4e906a2a6)


## 4. Cardápio Interativo

Exibição de produtos em categorias como "Pratos Principais", "Bebidas" e "Outros";

Atualizações em tempo real de preços e descrições;

Suporte à inserção e edição de imagens dos produtos utilizando o Firebase Storage.

![WhatsApp Image 2024-11-23 at 00 46 34](https://github.com/user-attachments/assets/1c9ab0f0-2536-4879-b667-e11f94d8e20e)

## 5. Análise de Renda Mensal

Integração com as coleções "funcionários" e "pedidos" do Firebase Firestore;

Relatórios detalhados para tomada de decisões financeiras;

Cálculo automático de totais e valores por mês.

![WhatsApp Image 2024-11-23 at 01 01 51](https://github.com/user-attachments/assets/f88a439a-e426-4ff3-be43-2b38d17f7993)

## 6. Gestão de Funcionários

Cadastro e monitoramento de informações sobre funcionários;

Exibição de desempenho e participação em atividades do restaurante.

![WhatsApp Image 2024-11-23 at 01 00 09](https://github.com/user-attachments/assets/3ca79d4b-89e8-4376-b7db-f300535ab619)

# Tecnologias Utilizadas

## React: Desenvolvimento da interface do usuário;

## Firebase:

Firestore: Banco de dados em tempo real para gerenciamento de coleções como "produtos", "mesas", "pedidos" e "funcionários";

Firebase Storage: Armazenamento de imagens dos produtos;

Autenticação Firebase: Login seguro para acesso ao sistema.

# Estrutura do Projeto

## Frontend

### Componentização: Divisão modular para melhor manutenção e expansão do código.

### Custom Hooks:

<ul>
  <li>useFetchDocuments: Busca dados de coleções no Firestore;</li>
  <li>useInsertDocument: Inserção de documentos em coleções;</li>
  <li>useDeleteDocument: Exclusão de documentos e seus arquivos associados.</li>
</ul>
  

 

 

## Backend

### Firebase Firestore:

### Estrutura organizada por coleções:
<ul>
  <li>produtos: Gerenciamento do cardápio;</li>
  <li>mesas: Controle e estado das mesas;</li>
  <li>pedidos: Listagem e controle de pedidos realizados;</li>
  <li>funcionários: Informações dos colaboradores;</li>
  <li>itensEstoque: Controle de produtos no estoque.</li>
</ul>


# Roadmap Futuro

Integração com sistemas de pagamento digital;

Funcionalidade de avaliações de clientes;

Expansão para suporte multilíngue;

Dashboards de visualização de dados em tempo real.

### Com o Order, o restaurante não apenas gerencia suas operações com mais eficiência, mas também melhora significativamente a experiência dos clientes, criando momentos únicos e memoráveis.

