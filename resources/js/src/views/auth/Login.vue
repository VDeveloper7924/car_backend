<template>
  <div class="h-screen flex w-full bg-img vx-row no-gutter items-center justify-center" id="page-login">
    <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-0 m-4">
      <vx-card>
        <div slot="no-body" class="full-page-bg-color">

          <div class="vx-row no-gutter justify-center items-center">

            <div class="vx-col hidden lg:block lg:w-1/2">
              <img src="@assets/images/pages/login.png" alt="login" class="mx-auto">
            </div>

            <div class="vx-col sm:w-full md:w-full lg:w-1/2 d-theme-dark-bg">
              <div class="p-10 login-tabs-container">

                <div class="vx-card__title mb-4">
                  <h4 class="mb-4">Login</h4>
                  <p class="mb-5 pb-5">Welcome back, please login to your account.</p>
                </div>
                
                <login-jwt></login-jwt>

              </div>
            </div>
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>

<script>
  import LoginJwt from "./LoginJWT.vue"

  export default {
    components: {
      LoginJwt,
    },
    created() {

      console.log(this.$store.state.auth.isAuthenticated())
      
      if(this.$store.state.auth.isAuthenticated())
        this.$router.push('home')
    }
  }
</script>

<style lang="scss">
  #page-login {
    .social-login-buttons {
      .bg-facebook { background-color: #1551b1 }
      .bg-twitter { background-color: #00aaff }
      .bg-google { background-color: #4285F4 }
      .bg-github { background-color: #333 }
    }
  }
</style>
