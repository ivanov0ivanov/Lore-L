<template>
    <div class="check-tokens__container pb-4">
        <ul class="check-tokens list-unstyled text-white">
            <li class="mb-2 d-flex justify-content-between">
                <div class="align-self-center">Условных токенов проекта:</div>
                <div>
                    <button type="button" class="btn_check-tokens btn-minus rounded-circle m-2" @click="count--">-</button>
                    <span>{{count+100000000}}</span>
                    <button type="button" class="btn_check-tokens btn-plus rounded-circle m-2" @click="count++">+</button>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "TokensQuantity",
        data: () => {
            return {
                count: 0
            }
        }
    }
</script>
