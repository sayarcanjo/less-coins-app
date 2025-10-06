# Less Coins - App Mobile para Controle de Despesas

## Descrição
Este é um aplicativo mobile desenvolvido em React Native para gerenciar despesas diárias. Ele permite autenticação segura via login, além de adicionar, editar e deletar despesas, com integração ao Supabase para armazenamento de dados. O aplicativo atende aos requisitos de uma atividade acadêmica:

- **Duas telas**: Login (autenticação) e Main (gerenciamento de despesas).
- **Hooks**: `useState` para gerenciamento de estados e `useEffect` para carregamento inicial de dados.
- **Eventos**: Ações como `onPress` em botões para login, adicionar, editar e deletar despesas.
- **React Navigation**: Navegação entre telas usando `createStackNavigator`.
- **UI**: React Native Elements (`@rneui/themed`) como alternativa ao React Native Paper, com componentes como `Input`, `Button`, `Card`, `ListItem` e `Overlay`.
- **Supabase**: Autenticação via `signInWithPassword` e operações CRUD (criar, ler, atualizar, deletar) na tabela `despesas`.

## Tecnologias Usadas

- React Native
- Expo
- React Navigation
- React Native Elements (`@rneui/themed`)
- Supabase (autenticação e banco de dados)
- React Native Vector Icons

## Instalação e Execução

1. Clone o repositório:
   ```bash
   git clone https://github.com/sayarcanjo/less-coins-app.git
   ```
2. Navegue até a pasta do projeto:
   ```bash
   cd less-coins-app
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Configure o Supabase:
   ```bash
   # Edite o arquivo Services/supabaseClient.js com a URL e a chave anônima do seu projeto Supabase
   # Obtenha-as em Settings > API no dashboard do Supabase
   ```
5. Inicie o aplicativo:
   ```bash
   npx expo start
   # Pressione `a` para abrir no emulador Android ou escaneie o QR code com o Expo Go no celular
   ```

## Estrutura de Arquivos

- `App.js`: Configuração principal com navegação e tema.
- `components/LoginScreen.js`: Tela de login com autenticação via Supabase.
- `components/MainScreen.js`: Tela principal com lista de despesas, operações CRUD e totalizador de gastos.
- `Services/supabaseClient.js`: Configuração do cliente Supabase para autenticação e acesso ao banco de dados.
- `assets/`: Arquivos de imagem, como `minha-logo.png`.

## Como Usar

- Faça login com credenciais válidas (crie uma conta no Supabase, em Auth > Users, se necessário).
- Na tela principal, adicione despesas preenchendo os campos de descrição e valor.
- Use o swipe para a direita para deletar uma despesa ou clique no ícone de lápis para editá-la em um overlay.
- O total de gastos é exibido automaticamente, calculado com base nas despesas registradas.

## Autor
Sayonara Arcanjo - Desenvolvido para atividade de desenvolvimento mobile.

## Licença
MIT - Livre para uso e modificação.
