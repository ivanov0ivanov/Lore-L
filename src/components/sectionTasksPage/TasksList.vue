<template>
    <li>
            <div class="section-task__container p-3 position-relative" v-bind:class="{bgHover:list.done}" @click.prevent="toggleTask">
                <div class="section-task__make-design">
                    <div class="d-flex justify-content-between">
                        <div class="title">
                        <span>
                            <input type="checkbox" :checked="list.done" @change="toggleTask" class="form-check-input d-none">
                            <label v-if="!isEdit" class="form-check-label">{{list.title}}</label>
                            <input v-else type="text" class="border-0 bg-light pl-1 pr-1" @keyup.enter="onSave" @keyup.esc="onCancel" v-model="newTitle">
                        </span>
                            <font-awesome-icon v-if="!isEdit" icon="pen" @click.prevent="switchToEdit"/>
                            <font-awesome-icon v-else icon="save" @click.prevent="onSave"/>
                        </div>
                        <div class="design-img__container">
                            <img src="../../assets/png/brash.png" alt="brash">
                        </div>
                    </div>
                    <div class="description mb-3 text-muted">
                        <span>
                            <input type="checkbox" :checked="list.done" @change="toggleTask" class="form-check-input d-none">
                            <label v-if="!isEdit" class="form-check-label">{{list.description}}</label>
                            <input v-else type="text" class="border-0 bg-light pl-1 pr-1" @keyup.enter="onSave" @keyup.esc="onCancel" v-model="newDescription">
                        </span>
                    </div>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="tokens d-flex align-items-center">
                            <img src="../../assets/png/d-max.png" width="19" height="19" class="balance__img ml-0 mr-2"
                                 alt="D">
                            <span class="">{{list.tokens}}</span>
                        </div>
                        <router-link to="#" class="rounded-circle bg-dark text-white btn__section-task">
                            <font-awesome-icon icon="arrow-right"/>
                        </router-link>
                    </div>
                </div>
            </div>
    </li>
</template>

<script>
    import {mapActions} from "vuex";

    export default {
        name: "TasksList",
        data(){
         return {
             isEdit: false,
             newTitle: '',
             newDescription: ''
         }
        },
        props:{
            list: {
                type: Object,
                required: true
            },

            sectionsId: {
                type: Object,
                required: true
            }
        },

        created() {
            this.$emit('currentTaskId', this.list.id)
        },

        methods: {
            ...mapActions({
                toggleDoneTask: 'toggleDoneTask',
                editTask: 'editTask'
            }),

            toggleTask() {
                this.toggleDoneTask({done: this.list.id, sectId: this.sectionsId})
            },

            cleanData(){
                this.newTitle = '';
                this.newDescription = '';
            },

            onEdit() {
                if (!this.isEdit) {
                    this.switchToEdit();
                } else {
                    this.onSave();
                }
            },

            switchToEdit() {
                this.newTitle = this.list.title;
                this.newDescription = this.list.description;
                this.isEdit = true;
            },

            onCancel() {
                this.isEdit = false;
                this.cleanData();
            },

            onSave() {
                this.isEdit = false;
                this.editTask({
                    id: this.list.id,
                    title: this.newTitle,
                    description: this.newDescription,
                });
                this.cleanData();
            }
        }

    }
</script>

<style scoped lang="sass">
    .fa-pen, .fa-save
        color: #FB07D2
        align-self: center
        position: absolute
        top: 5px
        left: 5px
</style>
