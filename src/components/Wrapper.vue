<template>
  <div class="wrapper">
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
  min-height: 100vh;

  background-image: url('/static/images/bgAnim.svg');
  background-position: 0px 0px;
	background-repeat: repeat-x;

	animation: animatedBackground 120s linear infinite;
  background-repeat: no-repeat;
  background-size: auto 60vh;
}

@keyframes animatedBackground {
	0% { background-position: 0 0; }
	50% { background-position: 100% 0; }
  100% { background-position: 0 0; }
}
</style>
