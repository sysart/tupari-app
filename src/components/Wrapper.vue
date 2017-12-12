<template>
  <div class="wrapper">
    <slot></slot>
  </div>
</template>

<style scoped>
.wrapper {
  background: #2a323c;
  background-image: url('../assets/bgShape.svg');
  background-position: center top;
  background-repeat: no-repeat;
  background-size: 150vmin;
  padding: 0 4vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
