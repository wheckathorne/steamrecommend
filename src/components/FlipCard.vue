<script setup lang="ts">
defineProps<{
  explanation: string
  gameName: string
}>()
</script>
<template>
  <div class="flip-card">
    <div class="flip-card-inner">
      <div class="flip-card-front">
        <p class="title">Recommended Game:</p>
        <p>{{ gameName }}</p>
      </div>
      <div class="flip-card-back">
        <p class="title">Explanation</p>
        <p>{{ explanation }}</p>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.flip-card {
  background-color: transparent;
  width: 40%;
  height: 254px;
  perspective: 1000px;
  font-family: sans-serif;
}

.title {
  font-size: 1.5em;
  font-weight: 900;
  text-align: center;
  margin: 0;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front, .flip-card-back {
  box-shadow: 0 8px 14px 0 rgba(0,0,0,0.2);
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  border: 1px solid var(--p-sky-500);
  border-radius: 1rem;
}

.flip-card-front {
  background: linear-gradient(120deg, var(--p-sky-100) 60%, var(--p-sky-200) 88%,
  var(--p-sky-100) 40%, var(--p-sky-600) 48%);
  color: var(--p-sky-600);
}

.flip-card-back {
  background: linear-gradient(120deg, var(--p-sky-500) 30%, var(--p-sky-700) 88%,
  var(--p-sky-100) 40%, var(--p-sky-400) 78%);
  color: var(--p-sky-100);
  transform: rotateY(180deg);
}
</style>
