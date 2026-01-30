import { expect, test } from 'vitest'
import { Chess } from '../src/chess'

test('Chess960 - generateChess960 produces valid FEN', () => {
  const fen = Chess.generateChess960()
  expect(() => new Chess(fen, { isChess960: true })).not.toThrow()
  expect(fen).not.toBe('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1')
  // Check structure
  const parts = fen.split(' ')
  expect(parts.length).toBe(6)
  expect(parts[1]).toBe('w')
  expect(parts[2]).toBe('KQkq')
})

test('Chess960 - pawn moves', () => {
    const chess = new Chess(Chess.generateChess960(), { isChess960: true })
    const moves = chess.moves()
    const pawnMoves = moves.filter(m => m.match(/^[a-h][34]/))
    expect(pawnMoves.length).toBeGreaterThan(0)
  })

  test('Chess960 - standard chess still works', () => {
    const chess = new Chess()
    expect(chess.moves()).toContain('e4')
    chess.move('e4')
    expect(chess.moves()).toContain('e5')
  })

  test('Chess960 - rook positions set correctly', () => {
    const fen = 'r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 0 1'
    const chess = new Chess(fen, { isChess960: true })
    // Kingside rook should be on h1 (119), queenside on a1 (112)
    expect((chess as any)._rooks.w.kingside).toBe(119)
    expect((chess as any)._rooks.w.queenside).toBe(112)
  })

  test('Chess960 - castling available', () => {
    const fen = 'r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 0 1'
    const chess = new Chess(fen, { isChess960: true })
    const moves = (chess as any)._moves()
    expect(moves.some((m: any) => m.flags & (1 << 1))).toBe(true) // KSIDE_CASTLE
  })