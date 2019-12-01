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