import * as _ from 'lodash'
import { GAME_IDS } from '@/stuff'

export const teamScores = (session) => {
  const maxPlayers = _(session.teams)
    .filter((team) => team.members)
    .reduce((sum, team) => sum + Object.keys(team.members).length, 0)

  return _(session.teams)
    .filter((team) => team.members)
    .map((team) => {
      const results = GAME_IDS.map(gameId => {
        const memberCount = Object.keys(team.members).length

        const gameScore = _.reduce(team.members, (score, member) => {
          return score + _.get(member, `games[${gameId}].score`, 0)
        }, 0)

        return Math.round(gameScore / memberCount * maxPlayers)
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

export const bestPlayers = (session, count = 20) => {
  return _(session.teams)
    .flatMap(team => {
      return _.values(team.members)
    })
    .filter(member => !member.host)
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
    .take(count)
    .value()
}

export const totalPlayers = (session) => {
  return _(session.teams)
    .filter(team => team.members)
    .reduce((sum, team) => {
      return sum + Object.keys(team.members).length
    }, 0)
}
