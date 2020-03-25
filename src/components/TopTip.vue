<template>
    <div>
        <h1 class="h1-sty">{{tagName}}</h1>
    </div>
</template>

<script>
    export default {
        name: "TopTip",
      props:{
        tagName:{
          type:String
        }
      }
    }
</script>

<style scoped>
    .h1-sty{
      font-size: 80px;
    }
</style>
