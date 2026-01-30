![logo](./chessjslogo.svg)

# chess.js

[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/jhlywa/chess.js/node.js.yml)](https://github.com/jhlywa/chess.js/actions)
[![npm](https://img.shields.io/npm/v/chess.js?color=blue)](https://www.npmjs.com/package/chess.js)
[![npm](https://img.shields.io/npm/dm/chess.js)](https://www.npmjs.com/package/chess.js)

chess.js is a TypeScript chess library used for chess move
generation/validation, piece placement/movement, and check/checkmate/stalemate
detection - basically everything but the AI.

chess.js has been extensively tested in node.js and most modern browsers.

## Documentation

This README provides a quick example, full documentation can be found at
[https://jhlywa.github.io/chess.js](https://jhlywa.github.io/chess.js).

## Installation

Run the following command to install the most recent version of chess.js from
NPM:

```sh
npm install chess.js
```

## Chess960 Support

chess.js supports Chess960 (Fischer Random Chess) for generating random starting positions and handling variant rules like flexible castling.

### Generating a Chess960 Position
```ts
import { Chess } from 'chess.js'

const fen = Chess.generateChess960()
const chess = new Chess(fen, { isChess960: true })
```

### Playing Chess960
```ts
const chess = new Chess(Chess.generateChess960(), { isChess960: true })

// Moves work the same, including castling
chess.move('e4')
chess.move('O-O')  // Castling to kingside rook
```

## Example Code

The code below plays a random game of chess:

```ts
import { Chess } from 'chess.js'

const chess = new Chess()

while (!chess.isGameOver()) {
  const moves = chess.moves()
  const move = moves[Math.floor(Math.random() * moves.length)]
  chess.move(move)
}
console.log(chess.pgn())
```

## Contributing

If you have any questions, suggestions, or find any bugs please open an issue.
PRs are very welcome too, please read the [Contributing Guide](CONTRIBUTING.md)
first to help make it a smooth process.
