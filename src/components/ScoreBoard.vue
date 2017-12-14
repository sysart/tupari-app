<template>
  <!-- <md-table>
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
  </md-table> -->
  <div>
    <div class="header-row">
      <div class="row-item">#</div>
      <div class="row-item">Pelaaja</div>
      <div class="row-item">Tiimi</div>
      <div class="row-item">Tulos</div>
    </div>
    <div v-for="(score, rank) in scoreboard" :key="score.id" class="header-row">
      <div class="row-item">{{rank +1}}</div>
      <div class="row-item">{{score.name}}</div>
      <div class="row-item">{{score.team}}</div>
      <div class="row-item">{{score.result}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ScoreBoard',
  props: ['scoreboard']
}
</script>

<style lang="scss" scoped>
.header-row {
  padding: 10px;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid black;
}

.row-item {
  flex: 1;
}
</style>
