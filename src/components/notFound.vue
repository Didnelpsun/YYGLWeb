<template>
  <div>
    <div class="wrap">
      <div class="logo">
        <img src="../common/img/404.png" alt=""  />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'notFound',
  data () {
    return {

    }
  },
  methods: {
  }
}
</script>

<style scoped>
  body{
    font-family:Arial, Helvetica, sans-serif;
  }
  .wrap{
    width:1000px;
    margin:0 auto;
  }
  .logo{
    width:430px;
    position:absolute;
    top:25%;
    left:35%;
  }
  p{
    color:#eee;
    font-size:13px;
    margin-left:30px;
    padding:5px;
    background:#FF3366;
    text-decoration:none;
    -webkit-border-radius:.3em;
    -moz-border-radius:.3em;
    border-radius:.3em;
  }
  p a:hover{
    color: #fff;
  }
</style>
