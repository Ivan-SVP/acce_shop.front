<template>
    <form class="form-signin" @submit.prevent="login">
        <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
        <label for="inputEmail" class="sr-only">Логин</label>
        <input type="text" id="inputEmail" class="form-control" placeholder="Username" required="" autofocus=""
               v-model="username">
        <label for="inputPassword" class="sr-only">Password</label>
        <input type="password" id="inputPassword" class="form-control" placeholder="Password" required=""
               v-model="password">
        <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        <p class="mt-5 mb-3 text-muted">© 2017-2018</p>
    </form>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                username: '',
                password: ''
            }
        },
        methods: {
            login: function () {
                let username = this.username;
                let password = this.password;
                this.$store.dispatch('login', {username, password})
                    .then(() => this.$router.push(this.$route.query.next || '/'))
                    .catch(err => console.log(err))
            }
        }
    }
</script>

<style scoped>

</style>