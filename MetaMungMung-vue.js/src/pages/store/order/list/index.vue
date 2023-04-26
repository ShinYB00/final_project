<template>
	<div class="services_section layout_padding">
		<div class="container">

			<router-link :to="{ name: 'ProductPage' }">
				<h1 class="services_taital" style="margin-left: 10px; margin-bottom: 30px; float: none">
					<span>스토어</span>
					<img
						src="@/assets/images/offMeeting/paw-print.png"
						style="width: 70px"
					/>
					<span style="color: #1f1f1f">멍멍스토어</span>
				</h1>
			</router-link>

			<OrderList/>
		</div>
	</div>
</template>

<script>
import OrderList from "../../../../components/store/order/OrderList.vue";

export default{
	components: {
		OrderList
	}
}
</script>

<style>

</style>