<template>
    <div class="empty-layout">
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: "EmptyLayout"
    }
</script>


<style scoped>
    .empty-layout {
        height: 100%;
        display: -ms-flexbox;
        display: -webkit-box;
        display: flex;
        -ms-flex-align: center;
        -ms-flex-pack: center;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-pack: center;
        justify-content: center;
        padding-top: 40px;
        padding-bottom: 40px;
        background-color: #bdbdbd;
    }
</style>