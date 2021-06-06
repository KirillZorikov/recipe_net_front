<template>
  <div class="col-card ps-3 pe-3 pb-3">
    <div class="card">
      <img src="../assets/test.jpg" class="card-img-top">
      <div class="card-body">
        <h5 class="card-title">Французские булки</h5>
        <div class="d-flex justify-content-start align-items-center">
          <span class="tag-green p-3 pt-1 pb-1 me-2">Обед</span>
          <span class="tag-red p-3 pt-1 pb-1 me-2">Завтрак</span>
          <span class="tag-purple p-3 pt-1 pb-1 me-2">Ужин</span>
        </div>
        <p class="card-text text-secondary mb-0 mt-2"><i class="far fa-clock"></i> 20 мин.</p>
        <p class="card-text text-secondary mb-2"><i class="far fa-user"></i> lera</p>
        <div class="d-flex justify-content-between align-items-center">
          <button type="button" class="button button-light-blue d-flex align-items-center">
              <i class="fas fa-plus me-2"></i>Добавить в покупки
          </button>
          <!--          <span class="star">&#9734;</span>-->
          <span class="star">&#9734;</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecipeCard"
}
</script>

<style scoped>

</style>