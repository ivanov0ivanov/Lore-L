<template>
    <main class="bg-1__sectionTasks left-corner">
        <section class="sectionTasks__container">
            <div class="container text-center pt-3 pb-2">
                <h1 class="h1__custom mt-3 mb-5 text-white font-weight-bolder">{{$t("sectionList.sectionasTasks")}}</h1>
                <div class="new-task__container pb-4">

                    <ul v-for="item of items" :key="item.id" class="list-unstyled text-left d-flex flex-wrap">
                        <TasksList v-for="list of item.tasksList" :key="list.id" :list="list" @currentTaskId="newTaskId"
                                   :sectionsId="sectionsId"/>
                    </ul>


                    <div class="new-task_btn__container text-right">
                        <button class="btn-danger delete-task_btn rounded-circle p-3 align-top" @click="onDel">
                            <font-awesome-icon icon="minus"/>
                        </button>
                        <button type="button" class="new-task_btn rounded-circle p-3" @click="newTaskClick">
                            <font-awesome-icon icon="plus"/>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<script>
    import TasksList from "../../components/sectionTasksPage/TasksList";
    import {mapGetters} from "vuex";
    import {mapActions} from "vuex";

    export default {
        name: "SectionTasks",
        components: {TasksList},
        data() {
            return {
                currentId: ''
            }
        },
        props: {
            sectionsId: {
                type: Number,
                required: true
            }
        },
        computed: mapGetters({
            items: 'getDefaultSections'
        }),

        methods: {
            ...mapActions({
                addTask: 'addTask',
                deleteTask: 'deleteTask'
            }),

            newTaskId(id) {
                this.currentId = id;
            },

            newTaskClick() {
                this.addTask({id: this.currentId, sectId: this.sectionsId})
            },

            onDel() {
                this.items.map(item => {
                    if (item.tasksList.some(itm => itm.done === true)) {
                        if (confirm('Вы уверены что хотите удалить это?')) {
                            this.deleteTask()
                        }
                    } else {
                        alert('Выберите раздел')
                    }
                })
            }
        }
    }
</script>

<style scoped lang="sass">
    main
        max-width: 375px
        margin: 0 auto

        .fa-plus
            font-size: 140px
</style>

