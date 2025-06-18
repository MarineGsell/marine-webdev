<script setup>
</script>
<template>
    <header class="header">
        <div class="header__logo">
            <SvgLogo class="header__logo__img"/>
        </div>
        <div class="header__nav">
            <HeaderHamburger class="header__nav__hamburger"/>
            <HeaderNav class="header__nav__menu"/>
        </div>
        <NuxtLink class="header__social">
            <SvgLinkedin class="header__social__icon"/>
        </NuxtLink>
    </header>
</template>
<style lang="scss" scoped>
.header {
    height: 72px;
    padding: 0 24px;
    background-color: $bg-color;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    align-items: center;
    &__logo {
        @include box(left);
        &__img {
            height: $logo-height;
            width: auto;
        }
    }
    &__nav {
        @include box(center);
        &__hamburger {
            display: block;
            @include responsive-desktop {
                display: none;
            }
        }
        &__menu {
            @include responsive-tablette {
                display: none;
            }
        }
    }
    &__social {
        color: $main-color;
        cursor: pointer;
        @include box(right);
        &__icon {
            height: $icon-height-nav;
        }
    }
}
</style>