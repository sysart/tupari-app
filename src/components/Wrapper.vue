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
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.background {
  background-image: url('../assets/bgAnim.svg');
  background-position: 0px 0px;
	background-repeat: repeat-x;

	animation: animatedBackground 60s linear infinite;
  background-repeat: no-repeat;
  background-size: auto 60vh;
}
@keyframes animatedBackground {
	from { background-position: 0 0; }
	to { background-position: 100% 0; }
}
</style>
