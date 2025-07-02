<script setup>
</script>
<template>
    <header class="header">
        <div class="header__logo">
            <NuxtLink to="#headerDash" aria-label="Retour en haut de la page" title="Retour en haut de la page">
                <SvgLogo class="header__logo__big"/>
                <SvgLogoLittle class="header__logo__little"/>
            </NuxtLink>
        </div>
        <div class="header__nav">
            <HeaderHamburgerDash class="header__nav__hamburger"/>
            <HeaderNavDash class="header__nav__menu"/>
        </div>
        <ButtonsLittle class="header__button">Déconnexion</ButtonsLittle>
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
    &__button {
        width: max-content;
        justify-self: end;
    }
}
</style>