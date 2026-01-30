import { Chess } from '../src/chess'
import * as readline from 'readline'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

function prompt(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, resolve)
  })
}

async function main() {
  console.log('Chess960 Playground')
  console.log('Type "new" for a new Chess960 game, "fen" to show FEN, "moves" to show legal moves, or moves like "e2e4". Type "quit" to exit.')

  let chess = new Chess(Chess.generateChess960(), { isChess960: true })
  console.log('Initial FEN:', chess.fen())
  const allMoves = chess.moves()
  console.log('Total moves:', allMoves.length)
  console.log('Some example moves:', allMoves.slice(0, 10).join(', '))
  const pawnMoves = allMoves.filter(m => m.match(/^[a-h][345678]/))
  console.log('Pawn moves (e.g., e6, e5):', pawnMoves.slice(0, 5).join(', '))

  while (true) {
    console.log(chess.ascii())

    const input = await prompt('> ')

    if (input === 'quit') {
      break
    } else if (input === 'new') {
      chess = new Chess(Chess.generateChess960(), { isChess960: true })
      console.log('New Chess960 game started!')
    } else if (input === 'fen') {
      console.log('FEN:', chess.fen())
    } else if (input === 'moves') {
      const moves = chess.moves()
      console.log('Legal moves:', moves.slice(0, 10).join(', '), moves.length > 10 ? '...' : '')
    } else {
      try {
        chess.move(input)
        console.log('Move applied.')
      } catch (error) {
        console.log('Invalid move:', (error as Error).message)
      }
    }
  }

  rl.close()
}

main().catch(console.error)