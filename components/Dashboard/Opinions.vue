<template>
    <section class="opinions" id="opinionsDash">
        <h2 class="opinions__title">Témoignages à valider</h2>
        <p class="opinions__text">Vous n'avez aucun témoignage à valider</p>
    </section>
</template>
<style lang="scss" scoped>
.opinions {
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