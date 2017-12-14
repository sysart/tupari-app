import * as _ from 'lodash'
import sanitizeHtml from 'sanitize-html'

export const GAMES = [
  {
    id: 'golf',
    name: 'Golf',
    img: 'golf.svg',
    inputMode: 'score',
    inputLabel: 'Tulos',
    prevResult: 'Edellinen tulos',
    info: 'Käytössäsi on kuusi palloa. Saat niin monta pistettä kuin saat upotettua putteja.'
  },
  {
    id: 'meet',
    name: 'Tapailu',
    img: 'tapailu.svg',
    info: 'Tutustu toisiin ihmisiin ja kysy heidän salaista koodia'
  },
  {
    id: 'ralli',
    name: 'Ralli',
    img: 'ralli.svg',
    inputMode: 'time',
    inputLabel: 'Kierrosaika',
    prevResult: 'Edellinen kierrosaika',
    scoreMap: {
      1: '1.10,000',
      2: '0.58,000',
      3: '0.53,583',
      4: '0.51,700',
      5: '0.49,000',
      6: '0.48,160'
    }
  },
  {
    id: 'biljardi',
    name: 'Biljardi',
    img: 'biljardi.svg',
    inputMode: 'score',
    inputLabel: 'Tulos',
    prevResult: 'Edellinen tulos',
    info: 'Pussita niin monta palloa kuin saat yhdellä lyöntivuorolla. Saat aloittaa mistä vaan. Saat jokaisesta pussitetusta pallosta yhden pisteen. Kiven eli valkoisen pallon mennessä pussiin vähennetään yksi piste.'
  },
  {
    id: 'vr',
    name: 'Virtuaalipeli',
    img: 'virtuaalipeli.svg',
    inputMode: 'number',
    inputLabel: 'Pisteet',
    prevResult: 'Edelliset pisteet',
    min: 0,
    scoreMap: {
      1: 100,
      2: 1000,
      3: 2000,
      4: 20000,
      5: 40000,
      6: 50000
    }
  },
  {
    id: 'nopeus',
    name: 'Nopeuspeli',
    img: 'nopeuspeli.svg',
    inputMode: 'number',
    inputLabel: 'Pisteet',
    prevResult: 'Edelliset pisteet',
    min: 0,
    scoreMap: {
      1: 0,
      2: 40,
      3: 60,
      4: 80,
      5: 100,
      6: 120
    }
  }
]

export const GAME_IDS = _.map(GAMES, game => game.id)

export function timeToSeconds (time) {
  const [, minutes, seconds,, milliseconds] = time.match(/^(\d)\.(\d{2})(,(\d{1,3}))?$/)
  return parseInt(minutes, 10) * 60 + parseInt(seconds, 10) + (milliseconds ? parseInt(milliseconds, 10) / 1000 : 0)
}

export function getScore (gameId, result) {
  const game = GAMES.find(game => game.id === gameId)
  if (!game || !game.scoreMap) return null

  if (game.inputMode === 'time') result = timeToSeconds(result)

  const score = _(game.scoreMap)
    .pickBy((targetResult, score) => {
      if (game.inputMode === 'time') {
        return result <= timeToSeconds(targetResult)
      } else {
        return result >= targetResult
      }
    })
    .map((_, score) => parseInt(score))
    .max()

  return score || 0
}

export const sanitize = input => {
  return sanitizeHtml(input, {
    allowedTags: [ 'strong', 'small', 'br' ],
    allowedAttributes: {
    }
  })
}

export const MESSAGE_TYPES = {
  JOIN_TEAM: 'JOIN_TEAM',
  RESULT: 'RESULT',
  MEET: 'MEET',
  CHAT: 'CHAT'
}
