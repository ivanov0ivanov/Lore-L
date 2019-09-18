<template>
    <section class="progress-page__container">
        <div class="container text-center pt-3 pb-3">
            <h1 class="h1__custom mb-4">{{$t("progress.progressProject")}}</h1>
            <div class="ready-project__container pb-3">
                <div class="d-flex align-items-center">
                    <span class="text-left">{{$t("progress.readyProject")}}</span>
                    <span>25%</span>
                </div>
            </div>
            <div class="deadlines__container pb-4">
                <div class="d-flex align-items-center">
                    <span class="text-left">{{$t("progress.deadlines")}}</span>
                    <span>75%</span>
                </div>
            </div>

            <div class="chart-timeline__container pb-4">
                <img src="../../assets/png/timeline.png" class="w-100" alt="chart">
            </div>

            <div class="community__container pb-4">
                <div class="d-flex align-items-center">
                    <span class="text-left">{{$t("progress.community")}}</span>
                    <span>{{(1366).toLocaleString('ru')}}</span>
                </div>
            </div>

            <div class="chart-chart__container pb-5">
                <img src="../../assets/png/chart.png" class="w-100" alt="chart">
            </div>

            <div class="used-another-projects__container pb-4">
                <div class="d-flex align-items-center">
                    <span class="text-left">{{$t("progress.citation1")}}<br>{{$t("progress.citation2")}}</span>
                    <span>6</span>
                </div>
            </div>
            <div class="btn_myProject__container">
                <div class="d-flex align-items-center">
                  <router-link to="myProjects" class="btn btn_myProject">{{$t("progress.myProject")}}</router-link>
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

<style scoped lang="sass">
.btn_myProject
    width: 100%
    height: 45px
    padding: 15px
    background: linear-gradient(90deg, rgba(255,57,169,1) 0%, rgba(207,86,237,1) 100%)
    border: 0
    border-radius: 40px
    color: #fff
    font: normal 1em Roboto,sans-serif
    text-transform: uppercase
</style>
