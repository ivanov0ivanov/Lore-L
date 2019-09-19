<!--<template>-->
<!--    <tr>-->
<!--        <th scope="row">-->
<!--            <div>{{this.$store.state.defaultSections.length}}</div>-->
<!--        </th>-->
<!--        <td>-->
<!--            <div class="d-flex justify-content-between">-->
<!--                <span>-->
<!--                    <label class="form-check-label">Особая часть</label>-->
<!--                </span>-->
<!--            </div>-->
<!--        </td>-->
<!--        <td>-->
<!--            <div>-->
<!--                <span>-->
<!--                    <label class="form-check-label">{{Number(tokensCounter.specialPartShare)}}%</label>-->
<!--                </span>-->
<!--            </div>-->
<!--        </td>-->
<!--        <td>-->
<!--            <div>-->
<!--                <span>-->
<!--                    <label class="form-check-label">{{Number(tokensCounter.specialPartTokens).toLocaleString('ru')}}</label>-->
<!--                </span>-->
<!--            </div>-->
<!--        </td>-->
<!--    </tr>-->
<!--</template>-->


<!--<script>-->
<!--    import {mapActions} from "vuex";-->
<!--    import {mapState} from "vuex";-->
<!--    import {mapGetters} from "vuex";-->
<!--    export default {-->
<!--        name: "SpecialPart",-->
<!--        data() {-->
<!--          return {-->
<!--              tokenAmount: '',-->
<!--              shareAmount: ''-->
<!--          }-->
<!--        },-->
<!--        computed: {-->
<!--            ...mapGetters({-->
<!--                tokensCounter: "getTokensCounter"-->
<!--            }),-->

<!--            ...mapState({-->
<!--                defaultSections: "defaultSections"-->
<!--            })-->
<!--        },-->


<!--        mounted() {-->
<!--            this.defaultSections.forEach(item => {-->
<!--                if(!item.special === true) this.tokenAmount = Number(this.tokenAmount) + Number(item.tokens);-->
<!--                if(!item.special === true) this.shareAmount = Number(this.shareAmount) + Number(item.share);-->
<!--            });-->
<!--             this.recountSpecialPart({-->
<!--                 recountShare: Number(100 - this.shareAmount),-->
<!--                 recountTokens: Number(this.$store.state.tokensCounter.totalTokens - this.tokenAmount)})-->
<!--        },-->
<!--        methods:{-->
<!--            ...mapActions ({-->
<!--                recountSpecialPart: "recountSpecialPart"-->
<!--            })-->
<!--        }-->

<!--    }-->
<!--</script>-->

<!--<style scoped>-->

<!--</style>-->
