import update from 'immutability-helper'
import { useCallback, useState,useEffect } from 'react'
import { Card } from './Card'
import { Grid } from '@mui/material'
const style = {
  display:"flex"
}
export const Container = (cardsA) => {
  {
const [cards, setCards] = useState([
      {
        id: 1,
        text: 'Write a cool JS library',
      },
      {
        id: 2,
        text: 'Make it generic enough',
      },

    ])


    useEffect(() => {
        if (cardsA.cardsA.cards !== undefined) {
          setCards(cardsA.cardsA.cards)
        }
      }, [cardsA])
    


console.log(cards)

    const moveCard = useCallback((dragIndex, hoverIndex) => {
      setCards((prevCards) =>
        update(prevCards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, prevCards[dragIndex]],
          ],
        }),
      )
    }, [])
    const renderCard = useCallback((card, index) => {
      return (
        <Card
          key={card.id}
          index={index}
          id={card.id}
          text={card.text}
          moveCard={moveCard}
        />
      )
    }, [])
    return (

      <Grid container style={style}>{cards.map((card, i) => renderCard(card, i))}</Grid>

    )
  }
}
