<script setup>
</script>
<template>
    <header class="header">
        <div class="header__logo">
            <SvgLogo class="header__logo__big"/>
            <SvgLogoLittle class="header__logo__little"/>
        </div>
        <div class="header__nav">
            <HeaderHamburger class="header__nav__hamburger"/>
            <HeaderNav class="header__nav__menu"/>
        </div>
        <a 
            class="header__social" 
            href="https://www.linkedin.com/in/marine-chopin-gsell-07941a334/"
            target="_blank"
        >
            <SvgLinkedin class="header__social__icon"/>
        </a>
    </header>
</template>
<style lang="scss" scoped>
.header {
    position: fixed;
    width: 100%;
    z-index: 100;
    height: 72px;
    padding: 0 24px;
    background-color: $bg-transparent;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    align-items: center;
    &__logo {
        @include box(left);
        &__big {
            height: $logo-height;
            width: auto;
            @include responsive-mobile {
                display: none
            }
        }
        &__little {
            height: $logo-height;
            width: auto;
            @include responsive-desktop-tablette {
                display: none;
            }
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