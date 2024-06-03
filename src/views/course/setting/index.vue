<template>
  <div class="courseSetting"   v-loading.lock="fullscreenLoading">
    <el-card>
      课程设置
      <div class="hr"></div>
      <el-form ref="form" :model="form" label-width="140px" label-position="right">
        <el-form-item label="音视频加密">
          <el-radio-group v-model="form.audio_video_encrypt">
            <el-radio label="1">加密</el-radio>
            <el-radio label="2">不加密</el-radio>
          </el-radio-group>
          <template>
            <div class="msg_text">
              <p>1.如需加密，需要您的 <span>百家云帐号已开通音视频加密权限</span> (请与客户经理确认是否已开通)，否则设为加密也无法生效</p>
              <p>2.修改设百后，新设百仅对 <span>点播课、音频课中新上传的点播视频/点播音频</span> 生效</p>
            </div>
          </template>
        </el-form-item>
        <el-form-item label="音视频转码分辨率">
          <el-checkbox-group v-model="form.audio_video_definition">
            <el-checkbox v-for="item in sizes" :label="item.id" :key="item.id">{{ item.name }}</el-checkbox>
          </el-checkbox-group>
          <template>
            <div class="msg_text">
              <p>1.实际转码时，只会转码出分辨率s源文件分辨率的音视频</p>
              <p>2.修改设百后，新设百仅对 <span>点播课、音频课中新上传的点播视频/点播音频</span> 生效</p>
            </div>
          </template>
        </el-form-item>
        <el-form-item label="App端课堂下载">
          <el-radio-group v-model="form.datum_download">
            <el-radio label="1">支持</el-radio>
            <el-radio label="0">不支持</el-radio>
          </el-radio-group>
          <template>
            <div class="msg_text">
              <p>选择支持，App端点播视频/点播音频/直播回放视频可以被下载</p>
              <p> <span>提示:开启下载功能，将可能导致视频或回放学习进度不准确，并可能导致视频外泄，请谨慎开启</span> </p>
            </div>
          </template>
        </el-form-item>
        <el-form-item label="随堂讲义下载">
          <el-radio-group v-model="form.is_cached">
            <el-radio label="1">支持</el-radio>
            <el-radio label="0">不支持</el-radio>
          </el-radio-group>
          <template>
            <div class="msg_text">
              <p>选择支持，课程随堂讲义可以被下载</p>
            </div>
          </template>
        </el-form-item> <el-form-item>
          <el-button type="primary" style="width: 130px;" @click="onSubmit">保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import API from '../../../api/api_courseSetting.js'
export default {

  data() {
    return {
      fullscreenLoading:false,
      form: {
        audio_video_encrypt: '', //音视频加密
        audio_video_definition: '',//音视频转码分辨率
        datum_download: '',//App端课程下载
        is_cached: '',//随堂讲义下载
        double_speed_play: "",
        recorded_response_event: ''
      },
      sizes: [{ name: '320x180(标清)', id: '16' }, { name: '640x360(高清)', id: '1' }, { name: '960x540(超清)', id: '2' }, { name: '1280x720(720P)', id: '4' }, { name: '1920x1080(1080P)', id: '8' }]
    }
  },
  methods: {
    async getSetting() { // 请求初始数据 渲染
     this.fullscreenLoading=true
      let res = await API.getCourseSetting()
      console.log(res);

      this.form = res.data
      this.form.audio_video_definition = this.form.audio_video_definition.split(',')// 字符串转数组 回填渲染
      setTimeout(() => {
        this.fullscreenLoading=false
      }, 300);
    },
    onSubmit() { // 提交设置
      if (typeof this.form.audio_video_definition == 'object') { // 数组转字符串
        this.form.audio_video_definition = this.form.audio_video_definition.join(',')
      }
      console.log(this.form.audio_video_definition)
      console.log(this.form);
      if (this.form.audio_video_definition == '') {
        this.$message.error('请选择音视频转码分辨率')
        return
      }
      API.editCourseSetting(this.form).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.$message.success('设置成功')
        } else {
          this.$message.error(res.msg)
        }
        this.getSetting()
      })
    }
  },
  created() {
    this.getSetting()//
  }
}
</script>
<style lang='scss' scoped>

body {
    margin: 0;
  }
.courseSetting {
  overflow: hidden;
}

.hr {
  height: 2px;
  background-color: #eee;
  margin: 10px -2rem;
}

.msg_text {
  font-size: 14px;
  color: #999999;

  >p {
    white-space: nowrap;
    overflow: hidden;
    height: 23px;
    line-height: 23px;

    >span {
      color: red;
    }
  }
}
</style>