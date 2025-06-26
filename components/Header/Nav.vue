<script setup>
const emit = defineEmits(['close-menu'])
const handleLinkClick = () => {
    emit('close-menu')
}
</script>
<template>
    <nav class="nav">
        <NuxtLink class="nav__link" to="#about" @click="handleLinkClick">à propos</NuxtLink>
        <NuxtLink class="nav__link" to="#works" @click="handleLinkClick">projets</NuxtLink>
        <NuxtLink class="nav__link" to="#contact" @click="handleLinkClick">contact</NuxtLink>
    </nav>
</template>
<style lang="scss" scoped>
.nav {
    @include flex(row, center, center, $gap-third-desktop);
    @include responsive-tablette {
        @include flex(column, center, center, $gap-third-tablette);
    }
    @include responsive-mobile {
        @include flex(column, center, center, $gap-third-mobile)
    }
    &__link {
        @include font-link;
    }
}

</style>