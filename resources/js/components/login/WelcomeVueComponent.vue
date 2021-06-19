<template>
    <div class="all-content">
        <div class="flex-center position-ref full-height">
            <div class="content">
                <div class="title m-b-md">
                BadmintonClub
            </div>
                <div class="links">
                    <router-link to="/login">Login</router-link>
                    <router-link to="/register">Register</router-link>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        mounted() {
            console.log('Component WELCOME mounted.')
        }
    }
</script>


<style scoped>
    .all-content{
        background-color: #fff8b3;
        width: 100%;
        margin: 0;
    }

    .full-height {
        height: 100vh;
    }

    .flex-center {
        align-items: center;
        display: flex;
        justify-content: center;
    }

    .position-ref {
        position: relative;
    }

    .content {
        text-align: center;
    }

    .title {
        font-size: 64px;
    }

    .links > a {
        color: #636b6f;
        padding: 0 25px;
        font-size: 13px;
        font-weight: 600;
        letter-spacing: .1rem;
        text-decoration: none;
        text-transform: uppercase;
    }

    .m-b-md {
        margin-bottom: 30px;
    }
</style>
