<template>
	<div id="language">
		<ul>
			<li
				v-for="(l, key) in ['ru','en','ch']"
				:key="key"
				:class="{active:l==$store.getters.lang}"
			>
				<a
				href="#"
				:class="l"
				@click.prevent="$store.commit('changeLanguage',{
					storage:!0,value:l
				})"></a>
			</li>
		</ul>
	</div>
</template>
