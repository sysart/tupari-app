<template>
  <div class="container">
    <div class="moving-thing">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}

.moving-thing {
  display: flex;
  justify-content: center;
  margin: 8px;
  width: 100%;
  min-height: 100%;
  position: absolute;
  animation: scrolling 20s infinite linear;
}

@keyframes scrolling {
  0% {
    transform: translate3D(0, 100%, 0)
  }
  100% {
    transform: translate3D(0, -100%, 0)
  }
}
</style>
