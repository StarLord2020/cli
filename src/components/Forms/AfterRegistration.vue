<template>
  <div id="messageForm">  
      <div class="container_ mx-auto">
          <div class="fone">
              <div class="responsive mx-auto relative">
                  <span class="title block">Регистрация успешно завершена!</span>
                  <router-link to="/authorization">Войти</router-link>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
  .container_ {
    margin-top: 50px;
    max-width: 400px;
    background: url(afterregistration_bg.jpg) ;
    background-size:cover;
    color:#fff;
    font-weight: 400;
}
.fone{
    padding: 30px 0px;
    background-color: rgba(110, 72, 194, 0.77);
}
.title {
    margin-bottom: 10px;
    font-size: 22px;
}
.responsive {
    max-width: 260px;
    padding: 0 15px;
}
</style>