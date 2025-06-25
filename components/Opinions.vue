<script setup>
import opinions from "/data/opinions.js"
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
                    :name="opinion.name"
                    :job="opinion.job"
                    :opinion="opinion.opinion"
                >
                    <NuxtImg 
                        v-if="opinion.src" 
                        :src="opinion.src" 
                        :alt="opinion.alt" 
                        class="opinion__content__cards__card__picture" 
                    />
                </CardOpinion>
            </div>
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
                padding-bottom: $gap-main-tablette;       
            }
            @include responsive-mobile {
                gap: $gap-second-mobile; 
                padding-bottom: $gap-main-mobile;
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