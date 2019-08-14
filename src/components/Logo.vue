<template>
<div id="logo">
	<router-link to="/">
		<img
		:src="`/img/layout-${$store.getters.layout}/logo.png`"
		alt="logo">
	</router-link>
</div>
</template>

<style lang="stylus" scoped>
// .row
// 	margin: 0 auto;
#logo
	text-align: center;
	padding-top: 50px;

@media screen and (max-width: 767px)
	#logo img { width: 230px; }
	.layout-1 #logo img { width: 200px; }


@media screen and (max-width: 479px)
	.layout-1 #logo img
	.layout-2 #logo img { width: 160px; }
</style>
