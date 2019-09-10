<template>
  <section class="bg-2__profile">
    <div class="container text-center pt-2">
      <h1 class="h1__custom mb-3 text-dark font-weight-bolder">{{$t('profile.balance')}}</h1>

      <div class="row balance__container">
        <table class="table">
          <tr>
            <th scope="row">{{$t('profile.totalBalance')}}</th>
            <td>
              <router-link to="/user/differentBalance" class="balance__link different__balance mb-2">
                <img src="../../assets/png/d-max.png" width="19" height="19" class="balance__img"
                     alt="D">
                17 050 000
              </router-link>
            </td>
          </tr>

          <tr>
            <th scope="row">{{$t('profile.tokens')}} (3)</th>
            <td>
              <router-link to="/user/typesTokens" class="balance__link mb-2">
                <img src="../../assets/png/d-min.png" width="11" height="11" class="balance__img m-0"
                     alt="d-min">
              </router-link>
              <router-link to="/user/typesTokens" class="balance__link mb-2">
                <img src="../../assets/png/bomb.png" width="24" height="24" class="balance__img"
                     alt="bomb">
              </router-link>
              <router-link to="/user/typesTokens" class="balance__link mb-2">
                <img src="../../assets/png/star.png" width="12" height="12" class="balance__img"
                     alt="star">
              </router-link>
            </td>
          </tr>
        </table>

      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'Profile-section2'
  };
</script>

<style scoped>

</style>
