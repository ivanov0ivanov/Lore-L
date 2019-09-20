<template>
    <div class="check-tokens__container pb-4">
        <ul class="check-tokens list-unstyled text-white">
            <li class="mb-2 d-flex justify-content-between">
                <div class="align-self-center">{{$t("tokensQuantity")}}:</div>
                <div>
                    <button type="button" v-if="!isEdit" class="btn_check-tokens btn-minus rounded-circle m-2" @click.prevent="switchToEdit">-</button>
                    <button type="button" v-else class="btn_check-tokens btn-minus rounded-circle m-2" @click.prevent="onSave">
                        <font-awesome-icon icon="save"/>
                    </button>
                    <span>
                    <label v-if="!isEdit" class="form-check-label">{{Number(tokensCounter.totalTokens).toLocaleString('ru')}}</label>
                    <input v-else type="number" class=" w-50 border-0 bg-light p-0 pl-1 pr-1 rounded black" @keyup.enter="onSave" @keyup.esc="onCancel" v-model="newTotalTokens">
                    </span>
                    <button type="button" v-if="!isEdit" class="btn_check-tokens btn-plus rounded-circle m-2" @click.prevent="switchToEdit">+</button>
                    <button type="button" v-else class="btn_check-tokens btn-plus rounded-circle m-2" @click.prevent="onSave">
                        <font-awesome-icon icon="save"/>
                    </button>
                </div>
            </li>
        </ul>
    </div>
</template>
<style scoped lang="sass">
    .black
        color: #000000 !important
</style>
<script>
    import {mapGetters} from "vuex";
    import { mapActions } from 'vuex';
    import {mapState} from 'vuex';

    export default {
        name: "TokensQuantity",
        data: () => {
            return {
                isEdit: false,
                newTotalTokens: "",
                shareAmount: "",
                tokenAmount: ""
            }
        },
        computed: {
            ...mapGetters({
                tokensCounter: "getTokensCounter"
            }),

            ...mapState({
                items: 'defaultSections'
            })

        },

        methods: {
            ...mapActions({
                editTotalTokens: "editTotalTokens",
                recountSpecialPart: "recountSpecialPart"
            }),

            recountData() {
                this.items.forEach(item => {
                    if(!item.special === true) this.shareAmount = Number(this.shareAmount) + Number(item.share);
                    if(!item.special === true) this.tokenAmount = Number(this.tokenAmount) + Number(item.tokens);
                });

                if(this.shareAmount !== 0) {
                    this.recountSpecialPart({
                        recountShare: Number(100 - this.shareAmount),
                        recountTokens: Number(this.$store.state.tokensCounter.totalTokens - this.tokenAmount)});
                }
                this.cleanData();
            },

            cleanData(){
                this.newTotalTokens = '';
                this.tokenAmount = '';
                this.shareAmount = '';
            },

            switchToEdit() {
                this.newTotalTokens = this.tokensCounter.totalTokens;
                this.isEdit = true;
            },

            onCancel() {
                this.isEdit = false;
                this.cleanData();
            },

            onSave() {
                this.isEdit = false;
                this.editTotalTokens(this.newTotalTokens);
                this.recountData();
                this.cleanData();
            }
        }
    }
</script>
