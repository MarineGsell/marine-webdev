<script setup>
// Data
import competences from "/data/competences.js";
const frontend = competences.filter(competence => competence.categorie === "Frontend")
const backend = competences.filter(competence => competence.categorie === "Backend")
const outils = competences.filter(competence => competence.categorie === "Outils")
// const rate = competence.map()

</script>
<template>
    <section class="competences">
        <div class="competences__content">
            <h2 class="competences__content__title">Compétences</h2>
            <div class="competences__content__cards">
                <CardCompetence
                    class="competences__content__cards__card"
                    title="Frontend"
                >
                    <CardCompetenceLine 
                        v-for="competence in frontend"
                        :competence="competence.title"
                        :rate="competence.rate"
                    />
                </CardCompetence>
                <CardCompetence
                    class="competences__content__cards__card"
                    title="Backend"
                >
                    <CardCompetenceLine 
                        v-for="competence in backend"
                        :competence="competence.title"
                        :rate="competence.rate"
                    />
                </CardCompetence>
                <CardCompetence
                    class="competences__content__cards__card"
                    title="Outils"
                >
                    <CardCompetenceLine 
                        v-for="competence in outils"
                        :competence="competence.title"
                        :rate="competence.rate"
                    />
                </CardCompetence>
            </div>
        </div>
    </section>
</template>
<style lang="scss" scoped>
.competences {
    background-color: $bg-color;
    @include padding-top-section;
    &__content {
        width: 100%;
        @include padding-div;
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
        &__cards {
            width: 100%;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: $gap-third-desktop;
            @include responsive-tablette {
                gap: $gap-third-tablette;
                grid-template-columns: repeat(1, 1fr);
                width: 70%;
            }
            @include responsive-mobile {
                gap: $gap-third-mobile;
                width: 90%;
            }
        }
    }
}
</style>