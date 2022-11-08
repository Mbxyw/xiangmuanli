<template>
    <div class="Info">
        <div class="intro fr">
            <div class="grzlbt ml40">我的资料 <el-button style="color:#1baeae;margin-left: 650px;" type="text" @click="dialogFormVisible = true">更改个人信息</el-button>
            </div>
            <div class="info_item"><span>昵称</span><span>{{user.username}}</span>
            </div>
            <div class="info_item"><span>密码</span><span>{{user.password}}</span>
            </div>
            <div class="info_item"><span>电话</span><span>{{user.phone?user.phone:'无'}}</span>
            </div>
            <div class="info_item"><span>地址</span><span>{{user.address?user.address:'无'}}</span>
            </div>
        </div>
        <el-dialog title="修改个人信息" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="名称" :label-width="formLabelWidth">
                    <el-input v-model="form.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth">
                    <el-input v-model="form.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="电话" :label-width="formLabelWidth">
                    <el-input v-model="form.phone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="地址" :label-width="formLabelWidth">
                    <el-input v-model="form.address" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false ; adduser() " >确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'Infomation',
    data() {
        return {
            dialogFormVisible: false,
            formLabelWidth: '120px',
            form: {
                username: '',
                password: '',
                address: '',
                phone:'',
            },
      }  
    },
    mounted() {
      this.form=this.user  
    },
    computed: {
        ...mapState({
            userInfo: (state) => state.loginStatus.users,
        }),
        localname() {
            return localStorage.getItem('token')
        },
        user() {
            let arr
             arr=this.userInfo.filter((item) => {
                 if (item.username === this.localname) {
                     return item
                 }
             })
            return { ...arr[0] }
        }
    },
    methods: {
        adduser() {
            // console.log(this.form);
            // console.log(this.$store.state.loginStatus)
            this.$store.commit('loginStatus/ADDUSERS', this.form)
            // console.log(this.$store.state.loginStatus)
        }
    },
}
</script>

<style scoped>
.Info{
    width: 100%;
    height: auto;
    background: #f5f5f5;
    padding-bottom: 20px;
    padding-top: 20px;
}
.Info .intro {
    width: 978px;
    height: 500px;
    margin-left: 100px;
    background: #fff;
}

.Info .intro .grzlbt {
    width: 938px;
    height: 60px;
    line-height: 60px;
    font-size: 20px;
    color: #757575;
}

.Info .intro .info_item {
    height: 45px;
    line-height: 45px;
    width: 900px;
    background: #fdfdfd;
    border: 1px solid #aaa;
    margin-top: 10px;
    margin-bottom: 10px;
    border-radius: 3px;
    margin-left: 40px;
}

.Info .intro .info_item span:nth-of-type(1) {
    display: inline-block;
    font-size: 15px;
    font-weight: bold;
    color: #757575;
    width: 70px;
    height: 45px;
    line-height: 45px;
    padding-left: 20px;
}

.Info .intro .info_item span:nth-of-type(2) {
    display: inline-block;
    font-size: 15px;
    color: #757575;
    width: 480px;
    height: 45px;
    line-height: 45px;
    padding-left: 120px;
}

.Info .intro .info_item span:nth-of-type(3) {
    display: inline-block;
    font-size: 15px;
    width: 160px;
    height: 45px;
    line-height: 45px;
    text-align: right;
}

.Info .intro .info_item span a {
    color: #008080;
}

.Info .intro .info_item span a:hover {
    color: #1baeae;
}

/* 模态窗口 */
</style>