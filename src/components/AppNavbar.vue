<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
	<header>
		<nav class="container">
			<div class="branding">
				<h1>RMs</h1>
			</div>

			<ul class="nav-routes">
				<li><RouterLink to="/">Home</RouterLink></li>
				<li><RouterLink to="/tables">Tables</RouterLink></li>
				<li><RouterLink to="/products">Products</RouterLink></li>
				<li><RouterLink to="/kitchen">Kitchen</RouterLink></li>
				<li><RouterLink to="/modaration">Modaration</RouterLink></li>
				<li><RouterLink to="/cash">Cash</RouterLink></li>
				<li><RouterLink to="/logout">Logout</RouterLink></li>
			</ul>
		</nav>
	</header>
</template>

<style scoped>
header {
	background-color: rgba(255, 255, 255, 0.95);
	backdrop-filter: blur(8px);
	border-bottom: 1px solid #e5e7eb;
	box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
	position: sticky;
	top: 0;
	z-index: 100;
	width: 100%;

	nav {
		display: flex;
		align-items: center;
		justify-content: space-between;
		max-width: 1200px;
		margin: 0 auto;
		padding: 12px 24px;

		.branding {
			h1 {
				font-size: 1.1rem;
				font-weight: 700;
				color: #111827;
				margin: 0;
				letter-spacing: -0.025em;
			}
		}

		.nav-routes {
			display: flex;
			align-items: center;
			gap: 6px;
			list-style: none;
			margin: 0;
			padding: 0;

			a {
				text-decoration: none;
				color: #4b5563;
				font-weight: 500;
				font-size: 0.9rem;
				padding: 8px 14px;
				border-radius: 8px;
				transition: all 0.2s ease-in-out;

				&:hover {
					color: #e11d48;
					background-color: #fff1f2;
				}

				&.router-link-active {
					color: #ffffff;
					font-weight: 600;
					background-color: #e11d48;
					box-shadow: 0 4px 12px rgba(225, 29, 72, 0.25);
				}
			}
		}
	}
}
</style>
