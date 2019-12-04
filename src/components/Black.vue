<template>
  
</template>

<script>
export default {
    name: 'Black',
    data () {
        if(this.$route.params.page == 'campus'){
            this.$router.replace({
                name: 'campus',
                params: {active: this.$route.params.active}
            })
        }else if(this.$route.params.page == 'comment'){
            this.$router.replace({
                name: 'comment',
                params: {itemId: this.$route.params.itemId,page: this.$route.params.backpage,active: this.$route.params.active}
            })
        }else{
            this.$router.replace('main')
        }
        return {
        }
        
    }
}
</script>

<style>

</style>