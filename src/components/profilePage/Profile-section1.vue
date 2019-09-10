<template>
  <section class="bg-1__profile">
    <div class="container text-center pt-3 pb-3">
      <h1 class="h1__custom mb-3 text-dark font-weight-bolder">{{$t('profile.personalInfo')}}</h1>

      <div class="personal-info__container">
        <table class="table">
          <tr>
            <th scope="row">{{$t('profile.fullName')}}</th>
            <td>
              <router-link to="/user" class="personal-info__link mb-2">
                Иванов Иван
              </router-link>
            </td>
          </tr>
          <tr>
            <th scope="row">{{$t('profile.loginAvatar')}} ...</th>
            <td>
              <router-link to="/user" class="personal-info__link mb-2">
                Feodor
                <img src="../../assets/png/man-icon.png" width="24" height="24" class="personal-info__img" alt="user">
              </router-link>
            </td>
          </tr>
          <tr>
            <th scope="row">{{$t('profile.email')}}</th>
            <td>
              <router-link to="/user" class="personal-info__link mb-2">
                feodor@in.com
              </router-link>
            </td>
          </tr>
          <tr>
            <th scope="row">{{$t('profile.messages')}}</th>
            <td>
              <div class="personal-info_massage">
                <router-link to="/user" class="personal-info__link mb-2">
                  <img src="../../assets/png/whatsapp.png" width="24" height="24" class="personal-info__img"
                       alt="whatsapp">
                </router-link>
                <router-link to="/user" class="personal-info__link mb-2">
                  <img src="../../assets/png/telegram-icon.png" width="24" height="24" class="personal-info__img"
                       alt="telegram">
                </router-link>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'Profile-section1'
  };
</script>

<style scoped>

</style>
