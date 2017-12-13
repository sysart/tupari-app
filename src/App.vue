<template>
  <router-view></router-view>
</template>

<style lang="scss">
@import "~vue-material/dist/theme/engine"; // Import the theme engine

@include md-register-theme("default", (
  primary: #fff,
  accent: #323c48,
  theme: dark
));

@import "~vue-material/dist/theme/all"; // Apply the theme

.md-card {
  overflow: hidden;
}
</style>
