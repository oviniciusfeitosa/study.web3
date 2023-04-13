# PexCoin

Este é um Smart Contract escrito em Solidity para um token ERC-20 chamado PexCoinContract. Ele herda várias funcionalidades de outros contratos inteligentes da biblioteca OpenZeppelin, incluindo:

- `ERC20`: um contrato padrão que define a interface para tokens fungíveis.
- `ERC20Burnable`: um contrato que adiciona a capacidade de queimar (destruir) tokens.
- `Pausable`: um contrato que adiciona a capacidade de pausar e retomar a transferência de tokens.
- `Ownable`: um contrato que adiciona a capacidade de definir um proprietário que pode executar certas funções restritas.
- `ERC20Permit`: um contrato que adiciona a funcionalidade de aprovação de transações sem a necessidade de chamadas separadas para approve() e transferFrom().
- `ERC20Votes`: um contrato que adiciona a funcionalidade de votação de governança em relação aos titulares de tokens.

O contrato tem uma função construtora que define o nome e o símbolo do token como "PexCoinContract" e "Pex", respectivamente. O contrato também tem outras funções, como pause(), unpause(), e mint() que podem ser executadas pelo proprietário para pausar a transferência de tokens, retomar a transferência de tokens e criar novos tokens, respectivamente.

Finalmente, o contrato substitui algumas funções internas do contrato ERC20 e ERC20Votes, como _beforeTokenTransfer(), _afterTokenTransfer(), _mint() e _burn(). Essas funções são chamadas automaticamente pelo contrato ERC20 e ERC20Votes antes e depois da transferência, minting e burning de tokens, e o contrato PexCoinContract as substitui para personalizar o comportamento do token de acordo com as necessidades do projeto.


## Quantidade máxima da token

Para definir uma quantidade mínima ou máxima de tokens disponíveis para o contrato ERC20, você pode definir as variáveis ​​_totalSupply e _maxSupply dentro do contrato e ajustar suas valores conforme necessário.

Por exemplo, para definir uma quantidade máxima de tokens que pode ser criada, você pode definir a variável _maxSupply na função construtora ou em outra função que você criar, como esta:

```typescript
uint256 private _maxSupply;

constructor(uint256 maxSupply) ERC20("XPTOCoinContract", "XPTO") {
  _maxSupply = maxSupply;
}

function getMaxSupply() public view returns (uint256) {
  return _maxSupply;
}
```

Neste exemplo, adicionamos uma variável privada _maxSupply e a atribuímos na função construtora. Em seguida, adicionamos uma função getMaxSupply() que pode ser usada para visualizar o valor de _maxSupply.


## Quantidade mínima da token

Para definir uma quantidade mínima, você pode adicionar uma verificação na função _mint() ou em outra função que você criar para garantir que a quantidade a ser criada não seja inferior à quantidade mínima desejada. Por exemplo:

```typescript
uint256 private _minSupply;

constructor(uint256 minSupply) ERC20("XPTOCoinContract", "XPTO") {
    _minSupply = minSupply;
}

function mint(address to, uint256 amount) public onlyOwner {
    require(totalSupply() + amount <= _maxSupply, "Cannot exceed maximum supply");
    require(amount >= _minSupply, "Cannot mint below minimum supply");
    _mint(to, amount);
}
```

Neste exemplo, adicionamos uma variável privada _minSupply e a atribuímos na função construtora. Em seguida, na função mint(), adicionamos duas verificações usando a instrução require(). A primeira verificação garante que a quantidade a ser criada não exceda o valor máximo definido em _maxSupply, enquanto a segunda verificação garante que a quantidade a ser criada não seja inferior ao valor mínimo definido em _minSupply. Se uma dessas verificações falhar, a função mint() não criará nenhum token.

## Quais as vantagens e desvantagens de trabalhar com quantidade mínima e máxima de tokens?

As vantagens de trabalhar com quantidade mínima e máxima de tokens incluem:

- Controle de inflação: definir um limite superior para a quantidade de tokens em circulação pode ajudar a controlar a inflação, impedindo que a oferta de tokens aumente excessivamente e diminua seu valor;
- Garantia de oferta: definir um limite inferior para a quantidade de tokens em circulação pode garantir que sempre haverá uma oferta mínima disponível para atender à demanda;
- Proteção contra manipulação de mercado: limitar a quantidade de tokens pode impedir que indivíduos ou grupos comprem grandes quantidades de tokens e manipulem o mercado;
- Clareza e transparência: definir uma quantidade mínima e máxima de tokens pode tornar o contrato mais claro e transparente, garantindo que os usuários saibam exatamente o que esperar do contrato.

As desvantagens de trabalhar com quantidade mínima e máxima de tokens incluem:

- Restrição da flexibilidade: definir uma quantidade mínima e máxima de tokens pode restringir a flexibilidade do contrato, impedindo que ele responda às necessidades do mercado ou da comunidade;
- Possíveis problemas técnicos: se a quantidade máxima de tokens não for definida com precisão, pode haver problemas técnicos quando a oferta máxima for alcançada;
- Restrição do valor do token: definir uma quantidade máxima de tokens pode limitar o valor do token, impedindo que ele suba além de um determinado valor;
- Dificuldade de previsão: definir uma quantidade mínima e máxima de tokens pode ser difícil, pois é difícil prever a demanda futura do token e o tamanho da comunidade que o usa.

## Como criar novas tokens para esse smartcontrat e como transferir essas tokens criadas?

No smart contract apresentado, há um método "mint" que permite criar novas tokens e transferi-las para um endereço específico. Para criar novas tokens, basta chamar a função "mint" e passar o endereço para onde as novas tokens serão enviadas e a quantidade de tokens a serem criadas como argumentos. Por exemplo:

```typescript
function mint(address to, uint256 amount) public onlyOwner {
    _mint(to, amount);
}
```

Para transferir tokens criados, você pode usar a função padrão "transfer" do contrato ERC20. Para transferir tokens, você precisa chamar a função "transfer" e passar o endereço para onde as tokens serão enviadas e a quantidade de tokens a serem transferidas como argumentos. Por exemplo:

```typescript
function transfer(address to, uint256 amount) public returns (bool) {
    _transfer(msg.sender, to, amount);
    return true;
}
```

Note que o endereço que está transferindo as tokens precisa ter saldo suficiente para realizar a transferência, caso contrário, a transferência será rejeitada. Se você quiser permitir que outros endereços possam criar e transferir tokens, você precisará modificar o contrato para incluir essa funcionalidade.

## Quem pode criar novas tokens e fazer transferências de uma carteira para outra?

No smart contract apresentado, a função "mint" que cria novas tokens está marcada com o modificador "onlyOwner", o que significa que somente o proprietário do contrato (ou seja, o endereço que o implantou) pode chamar essa função e criar novas tokens.

Já a função "transfer" que permite transferir tokens de uma carteira para outra, não tem nenhuma restrição de acesso, o que significa que qualquer endereço que tenha saldo suficiente pode chamar essa função e transferir tokens para outro endereço.

Se você quiser restringir quem pode transferir tokens, você pode modificar o contrato e adicionar regras de acesso ou restrições de transferência. Por exemplo, você pode adicionar uma lista de permissões para permitir que somente certos endereços possam transferir tokens ou adicionar um modificador que restringe o acesso somente a certas contas (por exemplo, somente o proprietário do contrato pode transferir tokens).

