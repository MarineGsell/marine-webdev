<template>
    <HeaderHeroMain />
    <About />
    <!-- <Flowers /> -->
</template>
<style lang="scss" scoped>
* {
    @include flex(column, center, center, $gap-main-desktop);
    @include responsive-tablette {
        @include flex(column, center, center, $gap-main-tablette);
    }
    @include responsive-mobile {
        @include flex(column, center, center, $gap-main-tablette);
    }
}
</style>