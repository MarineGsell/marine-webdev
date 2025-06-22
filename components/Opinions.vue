<script setup>
import opinions from "/data/opinions.js"
</script>
<template>
    <section class="opinion">
        <h2 class="opinion__title">Témoignages</h2>
        <div class="opinion__content">
            <CardOpinion 
                v-for="opinion in opinions"
                class="opinion__content__card"
                :key="opinion.id"
                :name="opinion.name"
                :job="opinion.job"
                :opinion="opinion.opinion"
            >
                <NuxtImg 
                    v-if="opinion.src" 
                    :src="opinion.src" 
                    :alt="opinion.alt" 
                    class="opinion__content__card__picture" 
                />
            </CardOpinion>
        </div>
    </section>
</template>
<style lang="scss" scoped>
.opinion {
    padding-bottom: $gap-main-desktop;
    @include padding-div;
    @include flex(column, center, center, $gap-main-desktop);
    @include responsive-tablette {
        @include flex(column, center, center, $gap-main-tablette);    
    }
    @include responsive-mobile {
        @include flex(column, center, center, $gap-main-mobile);    
    }
    &__title {
        width: 100%;
        text-align: center;
        @include font-h2($text-color)
    }
    &__content {
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
</style>