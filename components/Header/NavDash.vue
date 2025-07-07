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
            to="#competencesDash" 
            @click="handleLinkClick"
            aria-label="Mes compétences"
            title="Mes compétences"
        >
            Compétences
        </NuxtLink>
        <NuxtLink 
            class="nav__link" 
            to="#opinionsDash" 
            @click="handleLinkClick"
            aria-label="Les témoignages à propos de Marine Chopin Gsell"
            title="Les témoignages à propos de Marine Chopin Gsell"

        >
            Témoignages
        </NuxtLink>
        <NuxtLink 
            class="nav__link" 
            to="#worksDash" 
            @click="handleLinkClick"
            aria-label="Les projets de Marine Chopin Gsell"
            title="Les projets de Marine Chopin Gsell"

        >
            Projets
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