<template>
  <router-view></router-view>
</template>

<style lang="scss">
@import "~vue-material/dist/theme/engine"; // Import the theme engine

@include md-register-theme("default", (
  primary: #00ff00,
  accent: #ff0000,
  theme: dark
));

@import "~vue-material/dist/theme/all"; // Apply the theme
</style>
