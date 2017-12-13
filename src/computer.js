import * as _ from 'lodash'
import { GAME_IDS } from '@/stuff'

export const teamScores = (session) => {
  return _(session.teams)
    .filter((team) => team.members)
    .map((team) => {
      const results = GAME_IDS.map(gameId => {
        const memberCount = Object.keys(team.members).length

        const gameScore = _.reduce(team.members, (score, member) => {
          return score + _.get(member, `games[${gameId}].score`, 0)
        }, 0)

        return Math.round(gameScore / memberCount)
      })

      const total = results.reduce((sum, score) => sum + score, 0)

      return {
        name: team.name,
        members: team.members ? Object.keys(team.members).length : 0,
        results,
        total
      }
    })
    .sortBy(['name'])
    .reverse()
    .sortBy(['total'])
    .reverse()
    .value()
}

export const bestPlayers = (session) => {
  return _(session.teams)
    .flatMap(team => {
      return _.values(team.members)
    })
    .map(member => {
      const score = member.games ? _.reduce(member.games, (score, game) => {
        return score + game.score
      }, 0) : 0
      return {
        name: member.name,
        score
      }
    })
    .sortBy(['name'])
    .reverse()
    .sortBy(['score'])
    .reverse()
    .take(3)
    .value()
}

export const totalPlayers = (session) => {
  return _(session.teams)
    .filter(team => team.members)
    .reduce((sum, team) => {
      return sum + Object.keys(team.members).length
    }, 0)
}
