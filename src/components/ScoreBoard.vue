<template>
  <md-table>
    <md-table-row>
      <md-table-head md-numeric></md-table-head>
      <md-table-head>Pelaaja</md-table-head>
      <md-table-head>Tiimi</md-table-head>
      <md-table-head md-numeric>Tulos</md-table-head>
    </md-table-row>
    <md-table-row v-for="(score, rank) in scoreboard" :key="score.id">
      <md-table-cell md-numeric>{{rank + 1}}</md-table-cell>
      <md-table-cell>{{score.name}}</md-table-cell>
      <md-table-cell>{{score.team}}</md-table-cell>
      <md-table-cell md-numeric>{{score.result}}</md-table-cell>
    </md-table-row>
  </md-table>
</template>

<script>
export default {
  name: 'ScoreBoard',
  props: ['scoreboard']
}
</script>
