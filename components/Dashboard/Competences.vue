<template>
    <section class="competences" id="competencesDash">
        <h2 class="competences__title">Compétences</h2>
        <p class="competences__text">Rajouter une compétence</p>  
    </section>
</template>
<style lang="scss" scoped>
.competences {
    padding-top: $gap-main-desktop;
    @include flex(column, center, center, $gap-second-desktop);
    &__title {
        @include font-h2($text-color);
    }
    &__text {
        @include font-p($text-color)
    }
}
</style>