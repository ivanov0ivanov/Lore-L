<template>
    <section class="progress-page__container">
        <div class="container text-center pt-3 pb-3">
            <h1 class="h1__custom mb-4">Прогресс проекта</h1>
            <div class="ready-project__container pb-3">
                <div class="d-flex align-items-center">
                    <span class="text-left">Готовность проекта</span>
                    <span>25%</span>
                </div>
            </div>
            <div class="deadlines__container pb-4">
                <div class="d-flex align-items-center">
                    <span class="text-left">Соблюдение сроков</span>
                    <span>75%</span>
                </div>
            </div>

            <div class="chart-timeline__container pb-4">
                <img src="../../assets/png/timeline.png" class="w-100" alt="chart">
            </div>

            <div class="community__container pb-4">
                <div class="d-flex align-items-center">
                    <span class="text-left">Сообщество</span>
                    <span>1 366</span>
                </div>
            </div>

            <div class="chart-chart__container pb-5">
                <img src="../../assets/png/chart.png" class="w-100" alt="chart">
            </div>

            <div class="used-another-projects__container">
                <div class="d-flex align-items-center">
                    <span class="text-left">Цитируемость<br>(использование другими проектами)</span>
                    <span>6</span>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "ProgressPage-sections"
    }
</script>

<style scoped>

</style>
