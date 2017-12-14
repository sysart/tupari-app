<template>
  <div class="gameHero">
    <div v-if="image" class="gameHeroBackground" :style="{ backgroundImage: `url('${imageUrl}')` }"></div>
    <button class="back" @click="$router.push({ name: backTo })">
      <img src="/static/images/takaisin.svg">
    </button>
    <h2 class="gameName">{{title}}</h2>
  </div>
</template>

<script>
export default {
  name: 'PageHeader',
  props: {
    backTo: String,
    title: String,
    image: String
  },
  computed: {
    imageUrl (image) {
      return `/static/images/${image}`
    }
  }
}
</script>

<style lang="scss" scoped>
.gameHero {
  position: relative;
  display: flex;
  flex-direction: row;
  margin: 0 0 1.5em;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
}

.gameHeroBackground {
  z-index: 1;
  content: '';
  display: block;
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: top right;
  background-size: contain;
  opacity: 0.2;
}

.gameName {
  font-size: 2rem;
  position: relative;
  z-index: 2;
  margin: 0 1rem;
  color: #fff;
  flex: 1;
  text-align: right;
}

.back {
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  width: 80px;
  background: #323c48;
  border-radius: 50%;
}

.back img {
  height: 40%;
}
</style>
