<script setup>
const emit = defineEmits(['close-menu'])
const handleLinkClick = () => {
    emit('close-menu')
}
</script>
<template>
    <nav class="nav">
        <NuxtLink 
            class="nav__link" 
            to="#about" 
            @click="handleLinkClick"
            aria-label="À propos de Marine Chopin Gsell"
            title="À propos de Marine Chopin Gsell"
        >
            à propos
        </NuxtLink>
        <NuxtLink 
            class="nav__link" 
            to="#works" 
            @click="handleLinkClick"
            aria-label="Les travaux de Marine Chopin Gsell"
            title="Les travaux de Marine Chopin Gsell"

        >
            projets
        </NuxtLink>
        <NuxtLink 
            class="nav__link" 
            to="#contact" 
            @click="handleLinkClick"
            aria-label="Contacter Marine Chopin Gsell"
            title="Contacter Marine Chopin Gsell"

        >
            contact
        </NuxtLink>
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