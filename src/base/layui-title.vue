<template>
  <fieldset class="layui-elem-field layui-field-title">
    <legend :style="{marginLeft: MarginLeft+'px'}">{{title}}</legend>
    <div class="btns">
      <slot name="btns"></slot>
    </div>
  </fieldset>
</template>

<script>
export default {
  name: 'layui-title',
  props: {
    title: {
      type: String,
      default: '标题'
    },
    MarginLeft: {
      type: String,
      default: '20'
    },
    FontSize: {
      type: String,
      default: '16'
    }
  },
  computed: {
    Style () {
      return {
        marginLeft: this.MarginLeft,
        fontSize: this.FontSize
      }
    }
  }
}
</script>

<style scoped>
  @import url(../../static/layui/css/layui.css);
  .layui-field-title {
    height: 21px;
    user-select: none;
  }
  .layui-elem-field legend {
    margin-left: 20px;
    font-size: 16px;
  }
  .btns {
    float: right;
    margin: 0 20px;
    font-size: 14px;
    background: #fff;
    transform: translateY(-100%);
  }
  .title-btn {
    padding: 0 15px;
    font-size: 14px;
  }
</style>
