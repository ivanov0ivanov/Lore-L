<template>
    <section class="sections__container">
        <div class="container text-center p-0 pt-4 pb-1">
            <form>
                <div class="check-sections mb-5 d-flex justify-content-between">
                    <div class="align-self-center">Всего разделов проекта:</div>
                    <div>
                        <button type="button" class="btn_check-sections btn-minus rounded-circle m-2" @click="count--">-</button>
                        <span>{{count}}</span>
                        <button type="button" class="btn_check-sections btn-plus rounded-circle m-2" @click="count++">+</button>
                    </div>
                </div>
                <table class="table table-bordered mb-5">
                    <thead>
                    <tr class="text-white">
                        <th scope="col">#</th>
                        <th scope="col">Раздел</th>
                        <th scope="col">Доля</th>
                        <th scope="col">Число токенов</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th scope="row"><span>1</span></th>
                        <td><span>Идея</span></td>
                        <td><span>5%</span></td>
                        <td><span>5 000 000</span></td>
                    </tr>
                    <tr>
                        <th scope="row"><span>2</span></th>
                        <td><span>Концепция</span></td>
                        <td><span>5%</span></td>
                        <td><span>5 000 000</span></td>
                    </tr>
                    <tr>
                        <th scope="row"><span>3</span></th>
                        <td><span>Сайт</span></td>
                        <td><span>2%</span></td>
                        <td><span>2 000 000</span></td>
                    </tr>
                    <tr>
                        <th scope="row"><span>4</span></th>
                        <td><span>Документация (whitepaper)</span></td>
                        <td><span>5%</span></td>
                        <td><span>5 000 000</span></td>
                    </tr>
                    <tr>
                        <th scope="row"><span>5</span></th>
                        <td><span>Демо</span></td>
                        <td><span>3%</span></td>
                        <td><span>3 000 000</span></td>
                    </tr>
                    <tr>
                        <th scope="row"><span>6</span></th>
                        <td><span>Сообщество</span></td>
                        <td><span>5%</span></td>
                        <td><span>5 000 000</span></td>
                    </tr>
                    <tr>
                        <th scope="row"><span>7</span></th>
                        <td><span>Прототип</span></td>
                        <td><span>5%</span></td>
                        <td><span>5 000 000</span></td>
                    </tr>
                    <tr>
                        <th scope="row"><span>8</span></th>
                        <td><span>Маркетинг</span></td>
                        <td><span>20%</span></td>
                        <td><span>20 000 000</span></td>
                    </tr>
                    <tr>
                        <th scope="row"><span>9</span></th>
                        <td><span>Моб. версия (iOS, android)</span></td>
                        <td><span>5%</span></td>
                        <td><span>5 000 000</span></td>
                    </tr>
                    <tr>
                        <th scope="row"><span>10</span></th>
                        <td><span>Раб. версия (PC)</span></td>
                        <td><span>8%</span></td>
                        <td><span>8 000 000</span></td>
                    </tr>
                    <tr>
                        <th scope="row"><span>11</span></th>
                        <td><span>Особая часть</span></td>
                        <td><span>37%</span></td>
                        <td><span>37 000 000</span></td>
                    </tr>
                    </tbody>
                </table>
                <TokensQuantity/>
                <div class="first-section__container pt-4 pb-4">
                    <button type="submit" class="btn__first-section">Первый раздел проекта (Идея)</button>
                </div>
            </form>
        </div>
    </section>
</template>

<script>
    import TokensQuantity from "../newProjectPage/TokensQuantity";
    export default {
        name: "SectionSelection",
        components: {TokensQuantity},
        data: () => {
            return {
                count: 0
            }
        }
    }
</script>

<style scoped>

</style>
