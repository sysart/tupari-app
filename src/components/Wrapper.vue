<template>
  <div class="wrapper" :class="classes">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Wrapper',
  props: ['background'],
  computed: {
    classes () {
      return this.background !== 'no' ? 'background' : ''
    }
  }
}
</script>


<style scoped>
.wrapper {
  background: #2a323c;
  padding: 0 4vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.background {
  background-image: url('../assets/bgShape.svg');
  background-position: center top;
  background-repeat: no-repeat;
  background-size: 150vmin;
}
</style>
