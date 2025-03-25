<template>
    <form>
        <div class="form-field">
            <label for="username" class="form-label">Логин</label>
            <input 
                id="username"
                v-model="username"
                class="form-input"
                placeholder="Например, anonymus@anonymous.com"
                required
            />
        </div>
        <div class="form-field">
            <label for="password" class="form-label">Пароль</label>
            <input 
                id="password"
                v-model="password"
                class="form-input"
                placeholder="*********"
                required
            />
        </div>
        <div class="button-container">
            <button
                type="submit"
                class="login-button"
                :disabled="loading"
            >
                <span v-if="loading" class="button-text">Загрузка...</span>
                <span v-else class="button-text">Войти</span>
            </button>
            <button class="forgot-password">
                <span class="button-text">Забыли пароль?</span>
            </button>
        </div>
    </form>
</template>

<script setup>
const username = ref('');
const password = ref('');
const loading = ref(false);

</script>

<style lang="scss" scoped>
.form-field {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
}

.form-input {
    border: none;
    border-radius: 15px;
    padding: 10px;
}

.form-label {
    font-size:10px;
    color: #52405a;
    margin-left: 10px;
    margin-bottom: 5px;
    font-weight: bold;
    font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.login-button {
    border: none;
    border-radius: 15px;
    background-color: #f8f3ff;
    padding: 10px;
    width: 20%;
}

.button-text {
    font-size: 14px;
    font-weight: 600;
    color: #52405a;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.button-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.forgot-password {
    border: none;
    border-radius: 15px;
    background-color: #f8f3ff;
    padding: 10px;
    width: 30%;
}
</style>