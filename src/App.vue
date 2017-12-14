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

.md-tabs-content {
  background-color: #fff!important;
  color: #222!important;

  .md-content {
    background-color: #fff!important;
    color: #222!important;
  }

  .md-table-head-container {
    height: 36px;
    padding: 4px;
  }

  .md-table.md-theme-default .md-table-head {
    color: #000;
  }

  .md-table.md-theme-default .md-table-row td {
    border-color: rgba(0, 0, 0, 0.2)!important;
  }
}
</style>
