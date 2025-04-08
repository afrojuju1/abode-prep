import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

const CARD_API = 'https://deckofcardsapi.com/api/deck'

type CardType = {
  code: string
  image: string
  value: string
  suit: string
}

export default function BlackjackGame() {
  const [deckId, setDeckId] = useState<string | null>(null)
  const [playerHand, setPlayerHand] = useState<CardType[]>([])
  const [dealerHand, setDealerHand] = useState<CardType[]>([])
  const [gameOver, setGameOver] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    startNewGame()
  }, [])

  const startNewGame = async () => {
    const res = await fetch(`${CARD_API}/new/shuffle/?deck_count=1`)
    const data = await res.json()
    setDeckId(data.deck_id)
    setGameOver(false)
    setMessage('')
    dealInitialCards(data.deck_id)
  }

  const dealInitialCards = async (id: string) => {
    const res = await fetch(`${CARD_API}/${id}/draw/?count=4`)
    const data = await res.json()
    setPlayerHand([data.cards[0], data.cards[2]])
    setDealerHand([data.cards[1], data.cards[3]])
  }

  const drawCard = async (): Promise<CardType> => {
    const res = await fetch(`${CARD_API}/${deckId}/draw/?count=1`)
    const data = await res.json()
    return data.cards[0]
  }

  const calculateTotal = (hand: CardType[]): number => {
    let total = 0
    let aces = 0
  
    for (const card of hand) {
      if (['KING', 'QUEEN', 'JACK'].includes(card.value)) {
        total += 10
      } else if (card.value === 'ACE') {
        total += 11
        aces++
      } else {
        total += parseInt(card.value)
      }
    }
  
    while (total > 21 && aces > 0) {
      total -= 10
      aces--
    }
  
    return total
  }

  const handleHit = async () => {
    const card = await drawCard()
    const newHand = [...playerHand, card]
    setPlayerHand(newHand)
    const total = calculateTotal(newHand)
    if (total > 21) {
      setMessage('You busted! Dealer wins.')
      setGameOver(true)
    }
  }

  const handleStand = async () => {
    let dealerNewHand = [...dealerHand]
    while (calculateTotal(dealerNewHand) < 17) {
      const card = await drawCard()
      dealerNewHand.push(card)
    }
    setDealerHand(dealerNewHand)
  
    const playerTotal = calculateTotal(playerHand)
    const dealerTotal = calculateTotal(dealerNewHand)
  
    if (dealerTotal > 21 || playerTotal > dealerTotal) {
      setMessage('🎉 You win!')
      toast.success('You beat the dealer!')
    } else if (dealerTotal === playerTotal) {
      setMessage("It's a tie!")
    } else {
      setMessage('Dealer wins.')
    }
  
    setGameOver(true)
  }

  return (
    <div className="p-6 flex flex-col items-center gap-4">
      <h1 className="text-2xl font-bold">🃏 Blackjack</h1>

      <div className="flex gap-8 w-full justify-center">
        <Card className="w-64">
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold">Player</h2>
            <p>Total: {calculateTotal(playerHand)}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {playerHand.map((card) => (
                <img key={card.code} src={card.image} alt={card.code} className="w-12 h-auto" />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="w-64">
          <CardContent className="p-4">
            <h2 className="text-lg font-semibold">Dealer</h2>
            <p>Total: {gameOver ? calculateTotal(dealerHand) : '???'}</p>
            <div className="flex flex-wrap gap-2 mt-2">
                {dealerHand.map((card, i) => {
                    // Hide the second card if game is not over
                    const isSecondCard = i === 1
                    const shouldHide = !gameOver && isSecondCard

                    return (
                    <img
                        key={card.code + i}
                        src={shouldHide ? 'https://deckofcardsapi.com/static/img/back.png' : card.image}
                        alt={shouldHide ? 'Hidden' : card.code}
                        className="w-12 h-auto"
                    />
                    )
                })}
            </div>
          </CardContent>
        </Card>
      </div>

      {!gameOver ? (
        <div className="flex gap-4 mt-4">
          <Button onClick={handleHit}>Hit</Button>
          <Button onClick={handleStand}>Stand</Button>
        </div>
      ) : (
        <div className="mt-4 text-xl font-medium">{message}</div>
      )}

      {gameOver && (
        <Button className="mt-4" onClick={startNewGame}>Play Again</Button>
      )}
    </div>
  )
}