<script setup>
</script>
<template>
    <div class="header">
        <NuxtImg
            class="header__logo" 
            src="/logo.webp" 
        />
        <nav class="header__nav">
            <NuxtLink class="header__nav__link" to="#">à propos</NuxtLink>
            <NuxtLink class="header__nav__link" to="#">projets</NuxtLink>
            <NuxtLink class="header__nav__link" to="#">contact</NuxtLink>
        </nav>
        <NuxtLink class="header__social">
            <SvgLinkedin class="header__social__icon"/>
        </NuxtLink>
    </div>
</template>
<style lang="scss" scoped>
.header {
    height: 72px;
    padding: 0 24px;
    background-color: $bg-color;
    @include flex(row, space-between, center, 0);
    &__logo {
        height: 40px;
        width: auto;
    }
    &__nav {
        @include flex(row, center, center, $gap-third-desktop);
        &__link {
            @include font-link;
        }
    }
    &__social {
        color: $main-color;
        &__icon {
            height: 40px;
        }
    }
}
</style>