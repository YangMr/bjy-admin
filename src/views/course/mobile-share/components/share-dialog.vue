<template>
    <el-dialog :before-close="beforeCloseImg" title="示例图" :visible.sync="visible" width="520px" close-on-click-modal close-on-press-escape>
        <div style="text-align: center;">
            <img src="https://devwx.baijiayun.com/adminstyle/img/share.0f8d1f8e.png" alt="">
        </div>
    </el-dialog>
</template>
<script>
export default {

    props:['visible'],

    data() {
        return {
            // visible: true,
        }
    },
    created(){
     console.log(this.visible);
    },
    methods: {
        beforeCloseImg(){
            this.$emit('beforeCloseImg')
        }
    }

    
}
</script>
<style lang='scss' scoped>
img {
    width: 320px;
    border: 1px solid #ccc;
}
</style>