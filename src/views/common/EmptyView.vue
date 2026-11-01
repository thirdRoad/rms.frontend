<template>
	<RouterLink :to="{ name: 'home' }">Go Home </RouterLink>
	<div>
		<h1>Example domains view</h1>
	</div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>
