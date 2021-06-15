<template>
  <div class="wrapper">
    <h1 v-if="isUpdate" class="fw-bold mt-5 mb-5 ms-3">Редактирование рецепта</h1>
    <h1 v-else class="fw-bold mt-5 mb-5 ms-3">Создание рецепта</h1>

    <div v-if="showMessage" class="row mt-1 mb-1 d-flex justify-content-center w-100">
      <div class="alert alert-danger d-flex align-items-center" style="width: fit-content;" role="alert">
          <span class="mt-1">
            <template v-if="message.tags || message.ingredients || message.image">
              <span class="d-block" v-if="message.description">{{ message.description.join() }}</span>
              <span class="d-block" v-if="message.tags">{{ message.tags.join() }}</span>
              <span class="d-block" v-if="message.ingredients">{{ message.ingredients.join() }}</span>
              <span class="d-block" v-if="message.image">{{ message.image.join() }}</span>
            </template>
            <template v-else>
              <span class="d-block">Введены невалидные данные.</span>
              <span class="d-block">Попробуйте ещё раз.</span>
            </template>
          </span>
        <button type="button" class="ml-1 p-0 ms-2 btn bg-transparent shadow-none h-100 d-flex align-items-start"
                @click="deleteMessage"
                data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true" class="fs-3" style="margin-top: -10px">&times;</span>
        </button>
      </div>
    </div>

    <div class="d-flex justify-content-center align-items-center form-wrapper mb-5">
      <form class="form" enctype="multipart/form-data" @submit.prevent="addUpdateRecipe">
        <div v-if="loadingData" class="w-100 text-center fs-4">Загрузка... <span class="spinner-border"></span></div>
        <template v-else>

          <div class="mb-5 row">
            <label for="inputTitle" class="col-4 col-form-label p-0 fs-5">Название рецепта</label>
            <div class="col-8 ps-3 pe-0">
              <input
                  required
                  v-model="form.title"
                  type="text"
                  class="form-control p-2"
                  name="title"
                  id="inputTitle"
                  :class="{'is-invalid': message.title}"
              >
            </div>
          </div>

          <div class="mb-5 row">
            <label class="col-4 col-form-label p-0 fs-5">Теги</label>
            <div class="col-8 ps-3 pe-0">
            <span class="fs-6 d-flex flex-row">
              <div class="d-flex align-items-center me-4">
                <i class="color-red fs-4 me-1" @click="changeTag('zavtrak')" :class="
                {'fas fa-check-circle': check_zavtrak,
                'far fa-circle': !check_zavtrak}">
                </i> Завтрак
              </div>
              <div class="d-flex align-items-center me-4">
                <i class="color-green fs-4 me-1" @click="changeTag('obed')" :class="
                {'fas fa-check-circle': check_obed,
                'far fa-circle': !check_obed}">
                </i> Обед
              </div>
              <div class="d-flex align-items-center me-4">
                <i class="color-purple fs-4 me-1" @click="changeTag('uzhin')" :class="
                {'fas fa-check-circle': check_uzhin,
                'far fa-circle': !check_uzhin}">
                </i> Ужин
              </div>
            </span>
            </div>
          </div>

          <div class="mb-1 row">
            <label class="col-4 col-form-label p-0 fs-5">Ингредиенты</label>
            <div class="col-5 ps-3 pe-0 pt-2 pb-2">
              <vue-select class="fs-3"
                          v-model="selectedIngredient.title"
                          :options="options.products"
                          searchable
                          close-on-select
                          placeholder="Выберите ингредиенты:"
                          :search-placeholder="selectedIngredient.title ? selectedIngredient.title: 'Поиск'"
              />
              <button type="button" class="text-dark btn bg-transparent shadow-none ps-0 mb-2"
                      @click.stop="addIngredient"
                      style="font-size: .8rem;">
                <i class="fas fa-plus"></i> Добавить ингредиент
              </button>
              <div v-for="ingredient in form.ingredients" :key="ingredient" style="font-size: .8rem;"
                   class="d-flex justify-content-between">
                <p class="mb-0">{{ ingredient.title }} - {{ ingredient.quantity }} {{ ingredient.unit }}</p>
                <button type="button" class="text-dark btn bg-transparent shadow-none p-0 m-0"
                        style="margin: -4px !important;"
                        @click.stop="deleteIngredient(ingredient)">
                  <i class="fas fa-times"></i>
                </button>
              </div>
            </div>
            <div class="col-2 ps-3 pe-0">
              <input type="number" min="0" max="32767" v-model="selectedIngredient.quantity"
                     class="form-control p-2" oninput="validity.valid||(value='');" style="max-width: 70px;">
            </div>
            <div class="col-1 pe-0 d-flex ps-0 align-items-end" style="max-height: 45px">
              <span v-if="selectedIngredient.unit">{{ selectedIngredient.unit }}</span>
            </div>
          </div>

          <div class="mb-5 row">
            <label for="inputTime" class="col-4 col-form-label p-0 fs-5 pe-3">Время приготовления</label>
            <div class="col-2 ps-3 pe-0 mt-2">
              <input
                  required
                  v-model="form.time"
                  type="number"
                  min="0"
                  max="32767"
                  class="form-control p-2"
                  name="time"
                  id="inputTime"
                  oninput="validity.valid||(value='');"
                  :class="{'is-invalid': message.time}"
              >
            </div>
            <div class="col-3 ps-3 pe-0 mt-1 d-flex align-items-end">
              <p>минут</p>
            </div>
          </div>

          <div class="mb-5 row">
            <label for="inputDescription" class="col-4 col-form-label p-0 fs-5 pe-3">Описание</label>
            <div class="col-8 ps-3 pe-0 mt-1">
              <ckeditor :editor="editor"
                        v-model="form.description"
                        :config="editorConfig"
                        id="inputDescription"
              >
              </ckeditor>
            </div>

          </div>

          <div class="mb-5 row">
            <label for="inputImage" class="col-4 col-form-label p-0 fs-5 pe-3">Изображение</label>
            <div class="col-8 ps-3 pe-0 mt-1">
              <div class="d-flex align-items-center border border-secondary rounded-3">
                <input type="file" class="custom-file-input w-50" id="inputImage"
                       accept="image/*" ref="file" v-on:change="handleFileUpload()">
                <span v-if="imageName" class="ms-4 font-light w-50">{{ imageName }}</span>
                <span v-else class="ms-4 font-light w-50">Картинка не выбрана</span>
              </div>
              <template v-if="imageBase64">
                <div class="mt-3 me-3 d-flex justify-content-end">
                  <img :src="imageBase64" style="max-width: 100px">
                </div>
              </template>
            </div>
          </div>


          <div class="d-flex justify-content-center mt-4">
            <button type="submit" class="button button-blue" :disabled="loadingSubmit">
              <span v-show="loadingSubmit" class="spinner-border spinner-border-sm me-1"></span>
              <span v-if="isUpdate">Изменить рецепт</span>
              <span v-else>Создать рецепт</span>
            </button>
          </div>

        </template>
      </form>
    </div>
  </div>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKEditor from '@ckeditor/ckeditor5-vue';
import VueNextSelect from 'vue-next-select';
import {RecipeUserService, MiscService} from "../services/user.services";
import {constants} from "../constants";

export default {
  name: "AddUpdateRecipe",
  routers: ['AddRecipe', 'UpdateRecipe'],
  title() {
    return this.$route.name === 'AddRecipe' ? 'Создание рецепта' : 'Редактирование рецепта'
  },
  components: {
    'vue-select': VueNextSelect,
    ckeditor: CKEditor.component
  },
  props: ['slug'],
  data() {
    return {
      editor: ClassicEditor,
      editorConfig: {
        toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote'],
        heading: {
          options: [
            {model: 'paragraph', title: 'Параграф', class: 'ck-heading_paragraph'},
            {model: 'heading3', view: 'h3', title: 'Заголовок 3', class: 'ck-heading_heading3'},
            {model: 'heading4', view: 'h4', title: 'Заголовок 4', class: 'ck-heading_heading4'}
          ]
        }
      },
      message: '',
      showMessage: false,
      productsByUnit: {},
      imageBase64: '',
      imageName: '',
      loadingSubmit: false,
      loadingData: false,
      selectedIngredient: {
        title: '',
        unit: '',
        quantity: ''
      },
      form: {
        title: '',
        description: '',
        time: '',
        ingredients: [],
        tags: [],
        image: ''
      },
      options: {
        products: [],
        tags: []
      }
    }
  },
  computed: {
    check_zavtrak() {
      return this.form.tags.includes('zavtrak')
    },
    check_obed() {
      return this.form.tags.includes('obed')
    },
    check_uzhin() {
      return this.form.tags.includes('uzhin')
    },
    selectedProductName() {
      return this.selectedIngredient.title;
    },
    formImage() {
      return this.form.image;
    },
    isUpdate() {
      return !!this.slug
    },
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      this.loadingData = true;
      this.loadListIngredients();
      if (this.isUpdate) {
        this.loadRecipe();
      }
    },
    loadListIngredients() {
      MiscService.getListProducts().then(
          response => {
            this.options.products = response.data.map(x => {
              return x.title
            });
            for (const index in response.data) {
              let product = response.data[index];
              this.productsByUnit[product.title] = product.unit;
            }
            this.loadingData = false;
          }
      )
    },
    loadRecipe() {
      RecipeUserService.getRecipe(this.slug).then(
          response => {
            this.checkAuthorRecipe(response.data);
            this.form.title = response.data.title;
            this.form.description = response.data.description;
            this.form.ingredients = response.data.ingredients;
            this.form.time = response.data.time;
            this.form.tags = response.data.tags.map(x => {
              return x.slug
            });
            if (response.data.image) {
              let imageName = response.data.image.split('/').pop();
              MiscService.getImage(this.changePath(response.data.image)).then(response => {
                this.form.image = new File([response.data], imageName);
              })
            }
          }
      )
    },
    checkAuthorRecipe(recipe) {
      if (this.currentUser.username !== recipe.author.username && !this.currentUser.is_staff) {
        this.$router.push({name: '404', params: {'from_url': window.location.href}});
      }
    },
    async handleFileUpload() {
      this.form.image = this.$refs.file.files[0];
    },
    changeTag(tagSlug) {
      if (this.form.tags.includes(tagSlug)) {
        this.form.tags = this.form.tags.filter(function (value) {
          return value !== tagSlug;
        });
      } else {
        this.form.tags.push(tagSlug);
      }
    },
    addIngredient() {
      if (this.selectedIngredient.title && this.selectedIngredient.unit) {
        this.form.ingredients.push(Object.assign({}, this.selectedIngredient));
      }
    },
    deleteIngredient(ingredient) {
      this.form.ingredients = this.form.ingredients.filter(function (value) {
        return value !== ingredient;
      });
    },
    properForm() {
      let data = new FormData();
      data.append('title', this.form.title);
      data.append('description', this.form.description);
      data.append('time', this.form.time);
      for (let i = 0; i < this.form.ingredients.length; i++) {
        data.append('ingredients', JSON.stringify(this.form.ingredients[i]));
      }
      for (let i = 0; i < this.form.tags.length; i++) {
        data.append('tags', this.form.tags[i]);
      }
      data.append('image', this.form.image);
      return data;
    },
    addUpdateRecipe() {
      if (!this.simpleValidate()) {
        return
      }
      this.loadingSubmit = true;
      let form = this.properForm();
      let func = this.isUpdate ? RecipeUserService.updateRecipe : RecipeUserService.addRecipe
      func(form, this.slug).then(
          () => {
            this.loadingSubmit = false;
            this.$router.push({
              name: 'Home', params: {
                message: this.isUpdate ? 'Рецепт успешно обновлён.' : 'Рецепт успешно добавлен.'
              }
            });
          },
          error => {
            if (error.response.status === 400) {
              this.loadingSubmit = false;
              this.showMessage = true;
              this.message = error.response.data
            }
          }
      );
    },
    simpleValidate() {
      let valid = true
      if (this.form.description.length > 50000) {
        this.message = {'description': ['Описание не должно превышать 50 000 символов!']}
        this.showMessage = true;
        valid = false;
      }
      if (!this.form.ingredients.length) {
        this.message = {'ingredients': ['Введите ингредиенты!']}
        this.showMessage = true;
        valid = false;
      }
      if (!this.form.tags.length) {
        this.message = {'tags': ['Выберите теги!']}
        this.showMessage = true;
        valid = false;
      }
      if (!this.form.image) {
        this.message = {'image': ['Выберите картинку!']}
        this.showMessage = true;
        valid = false;
      }
      if (!valid) {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
      }
      return valid
    },
    deleteMessage() {
      this.showMessage = false;
    },
    changePath(url) {
      let search = 'media/'
      return constants.MEDIA_DIR_URL + url.slice(url.indexOf(search) + search.length);
    }
  },
  watch: {
    selectedProductName(value) {
      if (value) {
        this.selectedIngredient.unit = this.productsByUnit[value];
        this.selectedIngredient.quantity = 0;
      }
    },
    async formImage(value) {
      if (!this.form.image) {
        this.imageBase64 = ''
        this.imageName = ''
        return
      }
      this.imageName = this.form.image.name;
      if (this.imageName.length > 20) {
        this.imageName = this.imageName.slice(0, 14) + ' ... ' + this.imageName.slice(this.imageName.lastIndexOf('.') + 1);
      }
      const fileToBase64 = async (file) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => resolve(reader.result)
            reader.onerror = (e) => reject(e)
          })
      this.imageBase64 = await fileToBase64(value)
    },
    $route(to, from) {
      if (to.name === 'AddRecipe' && from.name === 'UpdateRecipe') {
        this.selectedIngredient = {title: '', unit: '', quantity: ''}
        this.form = {title: '', description: '', time: '', ingredients: [], tags: [], image: ''}
      }
    },
  }
}
</script>

<style scoped>
.vue-select {
  width: 100%;
  margin-top: -8px;
  padding-top: 6px;
  padding-bottom: 8px;
}

.vue-input input {
  font-size: .9rem !important;
}

.custom-file-input::-webkit-file-upload-button {
  visibility: hidden;
}

.custom-file-input::before {
  width: 100%;
  content: 'Выберите картинку:';
  display: inline-block;
  background: linear-gradient(top, #f9f9f9, #e3e3e3);
  border-right: 1px solid #999;
  border-radius: 3px;
  padding: 5px 8px;
  outline: none;
  white-space: nowrap;
  -webkit-user-select: none;
  cursor: pointer;
  text-shadow: 1px 1px #fff;
  font-weight: 700;
  font-size: 10pt;
}

.custom-file-input:active::before {
  background: -webkit-linear-gradient(top, #e3e3e3, #f9f9f9);
}

</style>