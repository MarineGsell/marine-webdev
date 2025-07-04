<script setup>
const { fetch: refreshSession } = useUserSession()

const competences = reactive({
  title: '',
  categorie: '',
  rate:''
})

async function addCompetence() {
    $fetch('/api/competences', {
        method: 'POST',
        body: competences
    })
    .then(async () => {
        // Refresh the session on client-side and redirect to the home page
        await refreshSession()
    })
    .catch((e) => alert(e))
}

</script>
<template>
    <section class="competences" id="competencesDash">
        <Competences />
        <form class="competences__form" @submit.prevent="addCompetence">
            <div class="competences__form__column">
                <div class="competences__form__column__field">
                    <label class="competences__form__column__field__label">Nom de la compétence</label>
                    <input 
                        type="text" 
                        v-model="competences.title"
                        class="competences__form__column__field__input"
                        placeholder="Ex: HTML, CSS, JavaScript..."
                    >
                </div>
                <div class="competences__form__column__field">
                    <label class="competences__form__column__field__label">Catégorie</label>
                    <select class="competences__form__column__field__select" v-model="competences.categorie">
                        <option value="">Choisir une catégorie</option>
                        <option value="Frontend">Frontend</option>
                        <option value="Backend">Backend</option>
                        <option value="Outils">Outils</option>
                    </select>
                </div>
                <div class="competences__form__column__field">
                    <label class="competences__form__column__field__label">Niveau</label>
                    <input 
                        type="number" 
                        v-model="competences.rate"
                        class="competences__form__column__field__input"
                        min="1"
                        max="5"
                    >
                </div>
            </div>
            <ButtonsMain type="submit">Ajouter la compétence</ButtonsMain>
        </form>
    </section>
</template>
<style lang="scss" scoped>
.competences {
    padding-top: $gap-main-desktop;
    @include flex(column, center, center, $gap-second-desktop);
    &__form {
        width: 100%;
        @include flex(column, center, center, $gap-third-desktop);
        &__column {
            width: 100%;
            @include flex(column, center, center, $gap-third-desktop);
            &__field {
                width: 100%;;
                @include flex(column, center, start, 8px);
                &__label {
                    @include font-p($text-color);
                }
                &__input {
                    width: 100%;
                    @include input($white);
                }
                &__select {
                    width: 100%;
                    @include input($white);
                }
            }
        }
    }
}
</style>