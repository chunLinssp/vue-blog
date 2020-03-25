<template>
  <el-container>
    <el-main>
        <div class="main">
          <el-button @click="getId"></el-button>
          <div class="desktop-panel">
<!--            <di class="top-desktop">-->
              <h1 class="top-text">公开信息</h1>
<!--            </di>-->
            <div>
              <div >
                <div>
                  <div class="img-sty">
                    <img :src="userInfo.avatar" class="me-picture"/>
                  </div>
                  <div class="setting_right" @click.stop="uploadHeadImg">
                    <div class="caption">更改头像</div>
                  </div>
                  <input type="file" accept="image/*" @change="handleFile" class="hiddenInput"/>
                </div>
                <ul >
                  <li>
                    <label class="label-sty">名称</label>
                    <div class="div-dasktop">
                      <span class="span-sty">
                        {{ userInfo.nickname }}
                      </span>
                    </div>
                  </li>
                  <li>
                    <label class="label-sty">账号</label>
                    <div class="div-dasktop">
                      <span class="span-sty">
                        {{ userInfo.account }}
                      </span>
                    </div>
                  </li>
                  <li>
                    <label class="label-sty">邮箱</label>
                    <div class="div-dasktop">
                      <span class="span-sty">
                        <span v-if="userInfo.email.length!=0">{{ userInfo.email }}</span>
                          <a v-else @click="updateEmailName">
                            请完善信息
                        </a>
                        <a  v-else @click="updateEmailName" v-if="userInfo.email.length!=0" >
                            修改
                        </a>
                      </span>
                    </div>
                  </li>
                  <li>
                    <label class="label-sty">联系电话</label>
                    <div class="div-dasktop">
                      <span class="span-sty">
                        <span v-if="userInfo.mobilePhoneNumber.length!=0">{{userInfo.mobilePhoneNumber}}</span>
                         <a v-else @click="updateMobilePhoneNumberName" >
                            请完善信息
                        </a>
                         <a v-else @click="updateMobilePhoneNumberName" v-if="userInfo.mobilePhoneNumber.length!=0" >
                            修改
                        </a>
                      </span>
                    </div>

                  </li>
                  <li>
                    <label class="label-sty">在线时长</label>
                    <div class="div-dasktop">
                      <span class="span-sty">
                        <span v-if="userInfo.email.length!=0" >{{ onlineCount }}天</span>
                         <a v-else>
                            请完善信息
                        </a>
                      </span>
                    </div>
                  </li>
                </ul>
                <!--                  <hr class="hr-sty">-->
              </div>
            </div>
          </div>
          </div>

      <el-dialog title="设置" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item :label="funName" :label-width="formLabelWidth">
            <el-input v-model="updateVal" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateValFun">确 定</el-button>
        </div>
      </el-dialog>
    </el-main>
    <footer1></footer1>
  </el-container>
</template>

<script>
import header from '@/views/BaseHeader'
import footer from '@/components/BaseFooter'
import store1 from '@/store/index'
import $ from 'jquery';
    export default {
        components:{
          header1:header,
          footer1:footer
        },
      data (){
        return{
          userId:'',
          userInfo:{
            account:'',
            avatar:'',
            createDate:'',
            email:'',
            lastLogin:'',
            mobilePhoneNumber:'',
            nickname:''
          },
          dialogFormVisible:false,
          formLabelWidth: '120px',
          updateVal:'',
          onlineCount:'',
          files:'',
          imgUrl:''
        }
      },
      created() {
        this.userId = this.$store.state.account;
        var that = this;
        this.$axios('/users/getCurrentUser/'+  this.userId ).then(res=>{
            this.userInfo = res.data.data;
            var now = new Date();
            var formatNow = this.formatDate(now);
            var data = this.formatDate(this.userInfo.createDate);
            var diff = this.dateDiff(data,formatNow);
             that.onlineCount = diff;
        });
      },
      name: "",
        methods:{
          getId(){
                alert(this.onlineCount)
            },
          updateValFun(){
            if(this.funName == "手机"){
              this.updateMobilePhoneNumber();
            }else if(this.funName=="邮箱"){
              this.updateEmail();
            }
          },
          updateEmailName(){
            this.funName = '邮箱';
            this.dialogFormVisible = true;
          },
          updateMobilePhoneNumberName(){
            this.funName = '手机';
            this.dialogFormVisible = true;
          },
          updateEmail(){
            var pattern = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
            var mail = this.updateVal;
            var uid = this.userId;
            if(pattern.test(mail)){
              this.dialogFormVisible = false;
              var that = this;
              let param = new URLSearchParams();
              param.append("id",uid);
              param.append("mail",mail);
              alert(mail);
              this.$axios.post('/users/updateEmail',param).then(res=>{
                  console.log(res.data);
                  if(res.data.code == 0){
                    this.$message('设置成功，请等待审核');
                  }
              })
            }else{
              this.$message('请输入正确的邮箱地址');
            }
          },
        updateMobilePhoneNumber() {
          var regex = /^(13[0-9]{9})|(15[0-9]{9})|(17[0-9]{9})|(18[0-9]{9})|(19[0-9]{9})$/;
          if(regex.test(this.updateVal)){
            var uid = this.userId;
            var phone = this.updateVal;
            let param = new URLSearchParams();
            param.append("id",uid);
            param.append("phone",phone);
            alert("bbb");
            this.$axios.post('/users/updatePhone',param).then(res=>{
              console.log(res.data);
              if(res.data.code == 0){
                this.$message('设置成功，请等待审核');
                this.dialogFormVisible = false;
              }
            })
          }else{
            this.$message('请输入正确的手机号码');
          }
        },
        formatDate(date) {
          var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

          if (month.length < 2) month = '0' + month;
          if (day.length < 2) day = '0' + day;
          return [year, month, day].join('-');
        },
          dateDiff(firstDate,secondDate){
            var firstDate = new Date(firstDate);
            var secondDate = new Date(secondDate);
            var diff = Math.abs(firstDate.getTime() - secondDate.getTime())
            var result = parseInt(diff / (1000 * 60 * 60 * 24));
            return result
          },
          // 打开图片上传
          uploadHeadImg: function () {
            this.$el.querySelector('.hiddenInput').click()
          },
          testF:  function (formData) {
            $.ajax({
              url:'/users/getPictureUrl',
              type:'POST',
              async:false,
              data :{

              }
            })
            // await this.$axios.post('/users/getPictureUrl',formData).then(res=>{
            //     that.imgUrl = res.data;
            // })
          },
          // 将头像显示
          handleFile: function (e) {
            e.preventDefault();
            let FILE = e.target.files[0];
            let fileSize = FILE.size /1024;
            if(fileSize < 3000){
              let formData = new FormData();
              let uid = this.userId;
              formData.append('file',FILE);
              formData.append('id',uid);

              const instance = this.$axios.create({
                withCredentials :true
              });
              var that = this;
              // let param = new URLSearchParams();
              // alert(this.imgUrl);
              // param.append("id",uid);
              // param.append("url",this.imgUrl);
              // this.$axios.post('/users/getPictureUrl',param).then(res=>{
              //   that.imgUrl = res.data;
              // });
              instance.post('/users/updateAvater',formData
                 ).then(res=> {
                  console.log(res);
              });
              // }).then(data => {
              //   alert(that.imgUrl);
              //   let param = new URLSearchParams();
              //   param.append("id",uid);
              //   param.append("url",that.imgUrl);
              //   this.$axios.post('/users/updatePicture',param).then(res=>{
              //     console.log(res.data);
              //   })
              // });

              let $target = e.target || e.srcElement
              let file = $target.files[0]
              var reader = new FileReader()
              reader.onload = (data) => {
                let res = data.target || data.srcElement
                this.userInfo.avatar = res.result
              }
              reader.readAsDataURL(file)
            }else{
              this.$message('请上传小于3M的照片');
            }
          }
       }
    }
</script>

<style scoped>
  .text {
    font-size: 14px;
    color: #9a9a9a;
  }

  .item {
    margin-bottom: 18px;
    padding-left: 20px;
    font-family: "Microsoft YaHei";
    font-size: 20px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {h
    clear: both
  }

  .box-card {
    width: 480px;
  }
  .main{
    background-color: #fff;
    border-radius: 5px;
    width: 900px;
    height: 450px;
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .img-sty{
    text-align: center;
  }
  .h1-sty{
    padding-top: 5px;
    padding-left: 10px;
    font-family:"Helvetica Neue";
  }

  .hr-sty{
    width:80%;
    margin:0 auto;
    border: 0;
    height: 0;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    margin-left: 120px;
    margin-right: 50px;
  }
  .label-sty{
    margin-left: 50px;
    float: left;
    width: 6em;
    margin-right: 1em;
    padding: 20px 0;
    color: #9a9a9a;
  }
  ul{
    padding-left: 0;
    list-style-type: none;
  }
  .div-dasktop{
    display: table-cell;
    width: 1%;
    word-wrap: break-word;
    word-break: break-all;
    padding: 20px 0;
    border-bottom: 1px solid #e4e8eb;
  }
  .span-sty{
    display: block;
    font-weight: normal;
  }
  li{
    display: list-item;
    text-align: -webkit-match-parent;
  }
  a{
    float: right;
    margin-right: 20px;
  }
  .top-text{
    margin-left: 20px;
    margin-top: 10px;
    font-size: 20px;
    font-weight: 400;
    line-height: 1;
  }
  .top-desktop{
    padding: 16px 0;
  }
  .desktop-panel{
    height: 450px;
    margin-bottom: 30px;
    background-color: #fff;
    border-radius: 3px;
    -moz-border-radius: 3px;
    -webkit-border-radius: 3px;
    box-shadow: 0 1px 5px 0 rgba(0,0,0,0.05);
  }
  .me-picture{
    width: 60px;
    height: 60px;
    border: 1px solid #ddd;
    border-radius: 50%;
    vertical-align: middle;
  }
  .item_bock {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height:94px;
    width: 300px;
    padding:0px 24px 0px 38px;
    border-bottom: 1px solid #f7f7f7;
    background: #fff;
  }
  .head_p {
    height:132px;
  }
  .head_img{
    height: 90px;
  }
  .head_img img{
    width:90px;
    height:90px;
    border-radius:50px
  }
  .setting_right{
    display: flex;
    height: 37px;
    justify-content: flex-end;
    align-items: center;
  }
  .hiddenInput{
    display: none;
  }
  .caption {
    color: #8F8F8F;
    font-size: 20px;
    height: 37px;
  }

</style>
