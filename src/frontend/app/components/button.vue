<template>
	<button @click="onClick" @mousemove="handleMouseMove" :style="style" :class="classes">
		<slot />
	</button>
</template>
<script setup lang="ts">
import { ref } from 'vue'
defineProps<{
	classes: string;
	onClick?: () => void;
}>()
const x = ref(0)
const y = ref(0)

const handleMouseMove = (e: any) => {
	x.value = e.offsetX;
	y.value = e.offsetY;

	// Update style object
	style.value = {
		"--x": `${x.value}px`,
		"--y": `${y.value}px`,
	};
};

const style = ref({
	"--x": "0px",
	"--y": "0px",
});
</script>
