<template>
    <main class="bg-1__sectionTasks left-corner">
        <section class="sectionTasks__container">
            <div class="container text-center pt-3 pb-2">
                <h1 class="h1__custom mt-3 mb-5 text-white font-weight-bolder">Задачи раздела</h1>
                <div class="new-task__container pb-4">
                    <ul class="list-unstyled text-left d-flex flex-wrap">
                        <li>
                            <div class="section-task__container p-3 position-relative">
                                <div class="section-task__make-design">
                                    <div class="d-flex justify-content-between">
                                        <div class="title">
                                            Разработать<br>дизайн
                                        </div>
                                        <div class="design-img__container">
                                            <img src="../../assets/png/brash.png" alt="brash">
                                        </div>
                                    </div>
                                    <div class="description mb-3 text-muted">
                                        Дизайн
                                    </div>
                                    <div class="d-flex justify-content-between align-items-center">
                                        <div class="tokens d-flex align-items-center">
                                            <img src="../../assets/png/d-max.png" width="19" height="19" class="balance__img ml-0 mr-2"
                                                 alt="D">
                                            <span class="">2000</span>
                                        </div>
                                        <router-link to="#" class="rounded-circle bg-dark text-white btn__section-task">
                                            <font-awesome-icon icon="arrow-right"/>
                                        </router-link>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="section-task__container p-3 position-relative">
                                <div class="section-task__module-creation">
                                    <div class="d-flex justify-content-between">
                                        <div class="title">
                                            Создать<br>модуль
                                        </div>
                                        <div class="brackets-img__container">
                                            <img src="../../assets/png/brackets-blue.png" alt="brackets">
                                        </div>
                                    </div>
                                    <div class="description mb-3 text-muted">
                                        Программирование
                                    </div>
                                    <div class="d-flex justify-content-between align-items-center">
                                        <div class="tokens d-flex align-items-center">
                                            <img src="../../assets/png/d-max.png" width="19" height="19" class="balance__img ml-0 mr-2"
                                                 alt="D">
                                            <span class="">30000</span>
                                        </div>
                                        <router-link to="#" class="rounded-circle bg-dark text-white btn__section-task">
                                            <font-awesome-icon icon="arrow-right"/>
                                        </router-link>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="section-task__container p-3 position-relative">
                                <div class="section-task__translations">
                                    <div class="d-flex justify-content-between">
                                        <div class="title">
                                            Перевести на<br>китайский
                                        </div>
                                        <div class="brackets-img__container">
                                            <img src="../../assets/png/brackets-green.png" alt="brackets">
                                        </div>
                                    </div>
                                    <div class="description mb-3 text-muted">
                                        Переводы
                                    </div>
                                    <div class="d-flex justify-content-between align-items-center">
                                        <div class="tokens d-flex align-items-center">
                                            <img src="../../assets/png/d-max.png" width="19" height="19" class="balance__img ml-0 mr-2"
                                                 alt="D">
                                            <span class="">5000</span>
                                        </div>
                                        <router-link to="#" class="rounded-circle bg-dark text-white btn__section-task">
                                            <font-awesome-icon icon="arrow-right"/>
                                        </router-link>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="section-task__container p-3 position-relative">
                                <div class="section-task__updateSite">
                                    <div class="d-flex justify-content-between">
                                        <div class="title">
                                            обновить<br>сайт
                                        </div>
                                        <div class="brackets-img__container">
                                            <img src="../../assets/png/brackets-sky.png" alt="brackets">
                                        </div>
                                    </div>
                                    <div class="description mb-3 text-muted">
                                        Веб
                                    </div>
                                    <div class="d-flex justify-content-between align-items-center">
                                        <div class="tokens d-flex align-items-center">
                                            <img src="../../assets/png/d-max.png" width="19" height="19" class="balance__img ml-0 mr-2"
                                                 alt="D">
                                            <span class="">3000</span>
                                        </div>
                                        <router-link to="#" class="rounded-circle bg-dark text-white btn__section-task">
                                            <font-awesome-icon icon="arrow-right"/>
                                        </router-link>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div class="new-task_btn__container text-right">
                        <button type="button" class="new-task_btn rounded-circle p-3">
                            <font-awesome-icon icon="plus"/>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<script>
    export default {
        name: "SectionTasks"
    }
</script>

<style scoped lang="sass">
    main
        max-width: 375px
        margin: 0 auto

    .fa-plus
        font-size: 140px
</style>

