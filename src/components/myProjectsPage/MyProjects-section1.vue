<template>
    <section class="my-projects__container">
        <div class="container text-center pt-3 pb-2">
            <div class="new-project__container p-3 pb-4">
                    <router-link to="/NewProject" class="btn_new-project d-flex flex-column text-decoration-none font-weight-bold">
                        <span>Пора начать</span>
                        <span>НОВЫЙ</span>
                        <span>ПРОЕКТ!</span>
                    </router-link>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "MyProjects-section1"
    }
</script>

<style scoped>

</style>
