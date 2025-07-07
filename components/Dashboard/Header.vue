<template>
    <section class="header" id="headerDash">
        <SvgFleur class="header__left"/>
        <h1 class="header__title">Dashboard</h1>
        <SvgFleur class="header__right"/>
    </section>
</template>
<style lang="scss" scoped>
.header {
    padding-top: $gap-main-desktop;
    width: 100%;
    @include flex(row, space-around, center, $gap-third-desktop);
    &__title {
        text-align: center;
        @include font-h1;
    }
    &__left {
        @include flower($second-color);
    }
    &__right {
        @include flower($second-color);
    }
}

</style>