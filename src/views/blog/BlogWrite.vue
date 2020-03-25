<template>
  <div class="write-container" v-title :data-title="title">
    <el-container  class="write-wrap">
      <div class="topTip" >
        <TopTip tagName="创新源于作者的每一次update"  ></TopTip>
      </div>
      <el-main class="write-content">
        <div class="edit-content">
          <el-input resize="none"
                    type="textarea"
                    autosize
                    v-model="articleForm.title"
                    placeholder="请输入标题"
                    class="me-write-input">
          </el-input>
          <div >
            <mavon-editor
              v-model="articleForm.value"
              ref="md"
              @change="change"
              style="min-height: 600px"
              v-bind="editor"
            />
            <el-button type="primary" @click="saveWrite()">主要按钮</el-button>
          </div>
        </div>

        <el-dialog title="摘要 分类 标签"
                   :visible.sync="publishVisible"
                   :close-on-click-modal=false
                   custom-class="me-dialog">

          <el-form :model="articleForm" ref="articleForm" :rules="rules">
            <el-form-item prop="summary">
              <el-input type="textarea"
                        v-model="articleForm.summary"
                        :rows="6"
                        placeholder="请输入摘要">
              </el-input>
            </el-form-item>
            <el-form-item label="文章分类" prop="category">
              <el-select v-model="articleForm.category" value-key="id" placeholder="请选择文章分类">
                <el-option v-for="c in categorys" :key="c.id" :label="c.categoryname" :value="c"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="文章标签" prop="tags">
              <el-checkbox-group v-model="articleForm.tags">
                <el-checkbox v-for="t in tags" :key="t.id" :label="t.id" name="tags">{{t.tagname}}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="publishVisible = false">取 消</el-button>
            <el-button type="primary" @click="publishArticle('articleForm')">发布</el-button>
          </div>
        </el-dialog>

      </el-main>
    </el-container>
  </div>

</template>

<script>
  import {mavonEditor} from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'
  import {publish} from '@/api/article.js'
  import {findAll} from '@/api/tag'
  import {getCategoryAll} from '@/api/category'
  import TopTip from "@/components/TopTip";

    export default {
      name: "BlogWrite",
      // 注册
      components: {
        mavonEditor: mavonEditor,
        TopTip: TopTip
      },
      data() {
        return {
          content: '', // 输入的markdown
          html: '',    // 及时转的html

          publishVisible: false,
          categorys: [],
          tags: [],

          articleForm: {
            id: '',
            title: '',
            summary: '',
            category: '',
            tags: [],
            value: '',
            conentHtml: ''
          },
          editor: {
            value: '',
            ref: '',//保存mavonEditor实例  实际不该这样
            default_open: 'edit',
            toolbars: {
              bold: true, // 粗体
              italic: true, // 斜体
              header: true, // 标题
              underline: true, // 下划线
              strikethrough: true, // 中划线
              mark: true, // 标记
              superscript: true, // 上角标
              subscript: true, // 下角标
              quote: true, // 引用
              ol: true, // 有序列表
              ul: true, // 无序列表
              imagelink: true, // 图片链接
              code: true, // code
              fullscreen: true, // 全屏编辑
              readmodel: true, // 沉浸式阅读
              help: true, // 帮助
              undo: true, // 上一步
              redo: true, // 下一步
              trash: true, // 清空
              navigation: true, // 导航目录
              //subfield: true, // 单双栏模式
              preview: true, // 预览
            }
          },
          rules: {
            summary: [
              {required: true, message: '请输入摘要', trigger: 'blur'},
              {max: 80, message: '不能大于80个字符', trigger: 'blur'}
            ],
            category: [
              {required: true, message: '请选择文章分类', trigger: 'change'}
            ],
            tags: [
              {type: 'array', required: true, message: '请选择标签', trigger: 'change'}
            ]
          }
        }
      },
      methods: {
        // 所有操作都会被解析重新渲染
        change(value, render) {
          // render 为 markdown 解析后的结果[html]
          this.articleForm.conentHtml = render;
        },
        // 提交
        submit() {
          console.log(this.content);
          console.log(this.html);
        },
        saveWrite() {
          if (!this.articleForm.title) {
            this.$message({message: '标题不能为空哦', type: 'warning', showClose: true})
            return
          }

          if (this.articleForm.title.length > 30) {
            this.$message({message: '标题不能大于30个字符', type: 'warning', showClose: true})
            return
          }

          if (!this.articleForm.value) {
            this.$message({message: '内容不能为空哦', type: 'warning', showClose: true})
            return
          }

          this.publishVisible = true;
          // console.log(this.content);
          // console.log(this.html);
          // publish().then(res=>{
          //   console.log(res.data);
          // });
        },
        publishArticle(articleForm) {
          let that = this;
          let author_id = that.$store.state.account;

          alert(author_id);
          this.$refs[articleForm].validate((valid) => {
            if (valid) {

              let tags = this.articleForm.tags.map(function (item) {
                return {id: item};
              });
              let article = {
                id: author_id,
                title: this.articleForm.title,
                summary: this.articleForm.summary,
                category: this.articleForm.category,
                tags: tags,
                body: {
                  content: this.articleForm.value,
                  contentHtml: this.articleForm.conentHtml
                }
              }

              this.publishVisible = false;
              let loading = this.$loading({
                lock: true,
                text: '发布中，请稍后...'
              })
              publish(article).then(res=>{
                console.log(res.data);
                loading.close();
                that.$message({message: '发布成功啦', type: 'success', showClose: true})
                console.log(res.data);
                that.$router.push({path:`/article/${res.data.id}`})
              })
            }


          });

        }
      },
        computed: {
          title() {
            return '创作';
          }
        },
        mounted() {

        },
        created() {
          let that = this;
          findAll().then(res => {
            // that.tags = res.data;
            console.log(res.data);
            that.tags = res.data;
          });
          getCategoryAll().then(res => {
            console.log(res.data);
            that.categorys = res.data;
          })
        }
    }
</script>

<style scoped>

  .topTip{
    position: absolute;
    width: 100%;
    height: 80px
  }


  .write-container{
    position: absolute;
    margin-top: 5%;
    top:5%;
    left: 15%;
    width: 80%;
    height:100%;
    border-radius:30px;
  }

  .write-content{
    width: 100%;
    height: auto;
    padding-left: 70px;
    padding-right: 150px;
  }
  .write-wrap{
    margin:0 auto;
    left: 3%;
  }
  .edit-content{
    width: 100%;
    height: auto;
    padding-left: 100px;
    padding-right: 150px;
    margin-top: 8%;
  }

</style>
