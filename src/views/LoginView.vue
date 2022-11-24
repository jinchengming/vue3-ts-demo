<template>
    <div class="login-box">

        <el-form ref="ruleFormRef" :model="loginData" status-icon :rules="rules" label-width="80px"
            class="login-form">
            <h2 class="login-title">后台管理系统</h2>
            <el-form-item label="账号" prop="username">
                <el-input v-model="loginData.username" type="text" autocomplete="off" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="loginData.password" type="password" autocomplete="off" />
            </el-form-item>

            <el-form-item>
                <el-button class="login-btn" type="primary" @click="submitForm(ruleFormRef)">Submit</el-button>
                <el-button class="login-btn" @click="resetForm(ruleFormRef)">Reset</el-button>
            </el-form-item>
        </el-form>

    </div>
</template>

<script lang="ts">
import { FormInstance } from 'element-plus'
import { defineComponent, reactive, ref } from 'vue'
import {LoginUser} from '@/type/login'
import {login} from '@/request/api'
import { useRouter } from 'vue-router'
export default defineComponent({
    name: 'LoginView',
    setup() {
        const loginData:LoginUser = reactive({
            username:"",
            password:""
        })

        const rules = {
            username: [
                {
                    required: true,
                    message: "用户名不能为空",
                    trigger: "blur"
                }
            ],
            password: [
                {
                    required: true,
                    message: "密码不能为空",
                    trigger: "blur"
                }
            ]

        }

        const router = useRouter()

        const ruleFormRef = ref<FormInstance>()

        const submitForm = (formE1: FormInstance | undefined) => {
            if (!formE1) return
            // 表单内容验证
            formE1.validate((valid) => {
                if (valid){
                    login(loginData).then((res) => {
                        console.log(res)
                        localStorage.setItem('token', res.data.token)
                        // 页面跳转
                        router.push('/')
                    })
                }else {
                    console.log("error submit")
                    return false;
                }
            })
        }

        const resetForm = (formE1: FormInstance | undefined) => {
            if (!formE1) return
            formE1.resetFields()
        }

        return {
            loginData,
            rules,
            resetForm,
            submitForm,
            ruleFormRef
        }
    }
})
</script>

<style lang="scss" scoped>
.login-box {
    width: 100%;
    height: 100%;
    background: url('../assets/bg.jpeg');
    padding: 1px;
    text-align: center;
    .login-title{
        margin-bottom: 15px;
    }
    .login-form{
        width: 420px;
        margin: 200px auto;
        padding: 20px;
        background-color: #fff;
        border-radius: 20px;
        .login-btn{
            width: 48%;
        }
    }
}
</style>