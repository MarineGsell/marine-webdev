<script setup>
import works from "/data/works.js"
</script>
<template>
    <section class="works">
        <div class="works__about">
            <SvgFleur class="works__about__flower"/>
            <h2 class="works__about__title">Mes réalisations web</h2>
            <p class="works__about__text">Entre projets de formation et créations personnelles, découvrez mon parcours en développement web. Chaque réalisation témoigne de ma progression et de mon approche créative pour concevoir des expériences digitales uniques. Du frontend avec React et Vue.js au backend avec Node.js, je développe des solutions modernes et sur-mesure.</p>
        </div>
        <CardWorks 
            class="works__list"
            v-for="work in works"
            :key="work.id"
            :imgSrc="work.imgSrc"
            :imgAlt="work.imgAlt"
            :title="work.title"
            :category="work.category"
            :techno="work.techno"
            :repo="work.repo"
            :link="work.link"
        />
    </section>
</template>
<style lang="scss" scoped>
.works {
    padding-bottom: $gap-main-desktop;
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
    @include padding-div;
    @include padding-top-section; 
    &__about {
        grid-area: 1 / 1 / 2 / 3;
        @include flex(column, start, start, $gap-second-desktop);
        @include responsive-tablette {
                @include flex(column, start, start, $gap-second-tablette);    
            }
        @include responsive-mobile {
                @include flex(column, start, start, $gap-second-mobile);    
            }
        &__flower {
            @include flower($main-color);
        }
        &__title {
            @include font-h2($text-color);
        }
        &__text {
            text-align: justify;
            @include font-p($text-color);
        }
    }
}
</style>