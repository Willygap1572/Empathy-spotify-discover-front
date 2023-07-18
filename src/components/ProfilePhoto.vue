<template>
    <div class="image__container">
        <img :src="userphoto" alt="Profile photo">
    </div>
</template>
<script>
export default {
    name: "ProfilePhoto",
    props: {
        userphoto: {
            type: String,
            required: true
        }
    }
}
</script>
<style>
.image__container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.image__container img {
    border-radius: 50%;
    padding: 10px;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border: 5px solid var(--primary-color);
}
</style>
