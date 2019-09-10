<template>
    <section class="my-projects__container">
        <div class="container text-center pb-3">
            <h1 class="h1__custom fs_custom font-weight-bold">Проекты в работе: </h1>
            <div class="projects-list__container d-flex justify-content-between pb-3">
                <div class="projects-list">
                    <ul class="list-unstyled">
                        <li class="font-weight-bold">
                            <span class="">1. </span>
                            <span class="font-weight-normal text-white" style="font-size:12px">Проект: </span>
                            <span class="project-list_color">Loring Start</span>
                        </li>
                    </ul>
                </div>
                <router-link to="#" class="btn_view-progress d-flex flex-column text-decoration-none text-white">
                    <span class="mb-1">См. Прогресс</span>
                    <span>Готовность: <span>25%</span></span>
                </router-link>
            </div>
            <div class="control-btn__container d-flex justify-content-between">
                <router-link to="#" class="control-btn btn_overview text-decoration-none">
                    Обзор
                </router-link>
                <router-link to="#" class="control-btn btn_members text-decoration-none">
                    Участники
                </router-link>
                <router-link to="#" class="control-btn btn_setting text-decoration-none">
                    Настройки
                </router-link>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "MyProjects-section2"
    }
</script>

<style scoped>

</style>
