<template>
	<div id="language">
<!--		<ul>-->
<!--            <li-->
<!--                    v-for="(l, key) in ['ru','en','ch']"-->
<!--                    :key="key"-->
<!--                    :class="{active: l === $store.getters.lang}"-->
<!--            >-->
<!--                <a-->
<!--                        href="#"-->
<!--                        :class="l"-->
<!--                        @click.prevent="$store.commit('changeLanguage',{storage:!0,value:l})"-->
<!--                ></a>-->
<!--            </li>-->
<!--		</ul>-->

<!--        setLocale($store.state.storage.lang),-->
<!--        $store.commit('changeLanguage',{-->
<!--        storage:!0,value:l-->
<!--        })-->

        <a href="#" @click.prevent = "setLocale('ru')">RU</a>
        <a href="#" @click.prevent = "setLocale('en')">EN</a>
        <a href="#" @click.prevent = "setLocale('ch')">CH</a>
	</div>
</template>

<script>

    export default {
        methods: {
            setLocale(locale) {
                this.$i18n.locale = locale;
            }
        }
    };
</script>
