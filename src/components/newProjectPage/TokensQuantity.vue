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
    export default {
        name: "TokensQuantity",
        data: () => {
            return {
                isEdit: false,
                newTotalTokens: ""
            }
        },
        computed: {
            ...mapGetters({
                tokensCounter: "getTokensCounter"
            })
        },

        methods: {
            ...mapActions({
                editTotalTokens: "editTotalTokens"
            }),

            cleanData(){
                this.newTotalTokens = '';
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
                this.cleanData();
            }
        }
    }
</script>
