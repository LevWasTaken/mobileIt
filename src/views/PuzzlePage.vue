<template>
  <div>Puzzle Page</div>
  <img :src="photo.webviewPath" class="miniature" />
  <div id="slice"></div>
  <ion-button @click="transformImageToPuzzle">Transform Image</ion-button>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { UserPhoto } from "@/composables/photoHandler";
import { create } from "ionicons/icons";
const props = defineProps<{
  photo: UserPhoto;
}>();
const photo = ref(props.photo);

const slice = () => {
  const sliceDiv = document.getElementById("slice");
  const gridX = 4;
  const gridY = 4;
  const gridWidth = sliceDiv.offsetWidth / gridX;
  const gridHeight = sliceDiv.offsetHeight / gridY;
  const grid = [];
  for (let y = 0; y < gridY; y++) {
    for (let x = 0; x < gridX; x++) {
      grid.push({
        x: x * gridWidth,
        y: y * gridHeight,
        width: gridWidth,
        height: gridHeight,
      });
    }
  }
  const img = document.querySelector("img");

  const createImg = (x, y, width, height) => {
    const div = document.createElement("div");
    div.style.backgroundImage = `url(${img.src})`;
    div.style.backgroundPosition = `-${x}px -${y}px`;
    div.style.width = `${width}px`;
    div.style.height = `${height}px`;
    div.style.left = `${x}px`;
    div.style.top = `${y}px`;
    div.id = `${x}-${y}`;
    sliceDiv.appendChild(div);
  };

  grid.forEach((item) => {
    createImg(item.x, item.y, item.width, item.height);
  });

  return sliceDiv;
};

const transformImageToPuzzle = () => {
  slice();
  shuffleImages();
};

const shuffleImages = () => {
  const sliceDiv = document.getElementById("slice");
  const divs = sliceDiv.querySelectorAll("div");
  const divsArray = Array.from(divs);
  const divsArrayShuffled = divsArray.sort(() => Math.random() - 0.5);
  divsArrayShuffled.forEach((div) => {
    sliceDiv.appendChild(div);
  });
};
</script>

<style scoped>
#slice {
  width: 850px;
  height: 500px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  perspective: 400px;
  cursor: pointer;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

#slice img {
  height: auto;
  width: 100%;
}

img {
  width: 100%;
  height: auto;
}

#slice div {
  position: absolute;
  z-index: 1;
  background-repeat: no-repeat;
  transform: rotateY(-50deg) scale(0.5);
  transform-origin: bottom;
  transition: all 0.6s cubic-bezier(0.71, 0.05, 0.09, 0.91);
}

#slice.active div {
  opacity: 1;
  transform: rotate(0deg) translateY(0);
  transition-delay: 0.5s;
}
.miniature {
  width: 100px;
  height: 100px;
}
</style>
