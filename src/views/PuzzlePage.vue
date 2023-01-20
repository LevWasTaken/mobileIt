<template>
    <div>
        Puzzle Page
    </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'PuzzlePage',
    props: ['photo'],
    created() {
        console.log('from puzzle');
        console.log(this.photo);
    }

});
</script>