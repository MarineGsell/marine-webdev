<script setup>
// Layout
definePageMeta({
    layout: "admin"
})
</script>
<template>
    <main class="admin">
        <h2 class="admin__title">Connexion admin</h2>
        <form class="admin__form">
            <div class="admin__form__column">
                <div class="admin__form__column__field">
                    <label class="admin__form__column__field__label">Email</label>
                    <input type="email" name="" id="" class="admin__form__column__field__input">
                </div>
                <div class="admin__form__column__field">
                    <label class="admin__form__column__field__label">Mot de passe</label>
                    <input type="password" name="" id="" class="admin__form__column__field__input">
                </div>
            </div>
            <ButtonsMain>Connexion</ButtonsMain>
        </form>
        <a class="admin__link" href="/">Retour au site</a>
    </main>
</template>
<style lang="scss" scoped>
.admin {
    height: 100vh;
    background-color: $bg-color;
    @include flex(column, center, center, $gap-second-desktop);
    &__title {
        @include font-h2($text-color);
    }
    &__form {
        @include flex(column, center, center, $gap-third-desktop);
        &__column {
            @include flex(column, center, center, $gap-third-desktop);
            &__field {
                @include flex(column, center, start, 8px);
                &__label {
                    @include font-p($text-color);
                }
                &__input {
                    width: 100%;
                    @include input($white);
                }
            }
        }
    }
    &__link {
        text-decoration: none;
        @include font-p($text-color-second);
        &:hover {
            text-decoration: underline;
            @include font-p($main-color);        
        }
    }
}
</style>