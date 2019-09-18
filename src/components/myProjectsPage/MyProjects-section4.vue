<template>
    <section class="my-projects__container">
        <div class="container text-center pb-2">
            <div class="total-tokens__container pb-4">
                <ul class="total-tokens list-unstyled text-white">
                    <li class="mb-2">{{$t('myproject.issued')}}: <span>{{(100000000).toLocaleString('ru')}}</span></li>
                    <li>{{$t('myproject.paid')}}: <span>{{(25850000).toLocaleString('ru')}}</span></li>
                </ul>
            </div>
            <div class="change-project__container pb-2">
                <button type="button" class="btn__change-project">{{$t('myproject.change')}}?</button>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "MyProjects-section4"
    }
</script>

<style scoped>

</style>
