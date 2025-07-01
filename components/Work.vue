<script setup>
const { data: worksData } = await useFetch('/api/works')
const works = computed(() => {
    return worksData.value
})
// Filter Bar
const categories = ['Tous', 'Frontend', 'Backend', 'Performances & SEO'] 
const activeCategory = ref('Tous')
const filteredWorks = computed(() => {
    if(activeCategory.value == 'Tous'){
        return works.value
    } else {
        return works.value?.filter(work => work.category === activeCategory.value)
    }
})

const filteredByCategory = (category) => {
    activeCategory.value = category
}

</script>
<template>
    <section class="works" id="works">
        <div class="works__about">
            <h2 class="works__about__title">Mes réalisations web</h2>
            <p class="works__about__text">Entre projets de formation et créations personnelles, découvrez mon parcours en développement web. Chaque réalisation témoigne de ma progression et de mon approche créative pour concevoir des expériences digitales uniques. Du frontend avec React et Vue.js au backend avec Node.js, je développe des solutions modernes et sur-mesure.</p>
        </div>
        <div class="works__filter">
            <ButtonsFilter 
                v-for="category in categories"
                :key="category"
                :category="category"
                :isActive="activeCategory === category"
                @filter="filteredByCategory"
            >
                {{ category }}
            </ButtonsFilter>
        </div>
        <div class="works__list">
            <CardWorks 
                v-for="work in filteredWorks"
                :key="work.id"
                :imgSrc="work.imgSrc"
                :imgAlt="work.imgAlt"
                :title="work.title"
                :repo="work.repo"
                :link="work.link"
                :content="work.description"
            />
        </div>
    </section>
</template>
<style lang="scss" scoped>
.works {
    @include flex(column, center, center, $gap-second-desktop);
    @include responsive-tablette {
        @include flex(column, center, center, $gap-second-tablette);    
    }
    @include responsive-mobile {
        @include flex(column, center, center, $gap-second-mobile);    
    }
    @include padding-div;
    @include padding-top-section; 
    &__about {
        width: 100%;
        @include flex(column, center, center, $gap-second-desktop);
        @include responsive-tablette {
                @include flex(column, center, center, $gap-second-tablette);    
            }
        @include responsive-mobile {
                @include flex(column, center, center, $gap-second-mobile);    
            }
        &__title {
            @include font-h2($text-color);
        }
        &__text {
            text-align: justify;
            @include font-p($text-color);
        }
    }
    &__filter {
        @include flex(row, center, center, $gap-third-desktop);
        @include responsive-tablette {
            @include flex(row, center, center, $gap-third-tablette);    
        }
        @include responsive-mobile {
            @include flex(column, center, center, $gap-third-mobile);    
        }
    }
    &__list {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: auto;
        gap: $gap-second-desktop;
        @include responsive-tablette {
            gap: $gap-second-tablette; 
            grid-template-columns: repeat(2, 1fr);  
        }
        @include responsive-mobile {
            grid-template-columns: repeat(1, 1fr);  
            gap: $gap-second-mobile; 
        }
    } 
}
</style>