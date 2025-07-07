<script setup>
const { data: opinions } = await useFetch('/api/opinions?isValidated=true', {key: 'opinions'})

// Modale
const modale = ref(false)
const openModale = () => {
    modale.value = true
}
const closeModale = () => {
    modale.value = false
}
</script>
<template>
    <section class="opinion">
        <div class="opinion__content">
            <h2 class="opinion__content__title">Témoignages</h2>
            <div class="opinion__content__cards">
                <CardOpinion 
                    v-for="opinion in opinions"
                    class="opinion__content__cards__card"
                    :key="opinion.id"
                    :firstName="opinion.firstName"
                    :lastName="opinion.lastName"
                    :job="opinion.job"
                    :company="opinion.company"
                    :to="opinion.link"
                    :opinion="opinion.opinion"
                    :opinionId="opinion.id"
                >
                    <NuxtImg 
                        v-if="opinion.imgSrc" 
                        :src="opinion.imgSrc" 
                        :alt="`Photo de ${opinion.firstName} ${opinion.lastName}`" 
                        class="opinion__content__cards__card__picture" 
                    />
                </CardOpinion>
                <ModaleMain 
                    v-if="modale"
                    @close="closeModale()"
                />
            </div>
            <ButtonsMain @click="openModale()">Laissez votre avis</ButtonsMain>
        </div>
    </section>
</template>
<style lang="scss" scoped>
.opinion {
    background: $bg-gradient2;
    @include padding-top-section;
    &__content {
        @include flex(column, center, center, $gap-second-desktop);
        @include responsive-tablette {
            @include flex(column, center, center, $gap-second-tablette);    
        }
        @include responsive-mobile {
            @include flex(column, center, center, $gap-second-mobile);    
        }
        @include padding-div;
        &__title {
            width: 100%;
            text-align: center;
            @include font-h2($text-color)
        }
        &__cards {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: auto;
            gap: $gap-second-desktop;
            @include responsive-tablette {
                gap: $gap-second-tablette; 
            }
            @include responsive-mobile {
                gap: $gap-second-mobile; 
                grid-template-columns: repeat(1, 1fr);       
            }
            &__card {
                width: 100%;
                &__picture {
                    @include picture;
                }
            }
        }
    }
}
</style>