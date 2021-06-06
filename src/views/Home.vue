<template>
  <div class="container mt-3">
    <div class="wrapper">
      <div class="row">
        <div class="col-12">
          <div class="d-flex justify-content-between align-items-center p-3">
            <h1>Рецепты</h1>
            <span class="fs-6 d-flex flex-row">
          <div class="d-flex align-items-center">
            <i class="fas fa-check-circle color-red fs-4 me-2"></i> Завтрак
          </div>
          <div class="d-flex align-items-center">
            <i class="far fa-circle color-green fs-4 ms-3 me-2"></i> Обед
          </div>
          <div class="d-flex align-items-center">
            <i class="far fa-circle color-purple fs-4 ms-3 me-2"></i> Ужин
          </div>
        </span>
          </div>
        </div>
      </div>
      <div class="row p-3">
        <RecipeCard/>
        <RecipeCard/>
        <RecipeCard/>
        <RecipeCard/>
      </div>
    </div>
  </div>
</template>

<script>
import RecipeCard from "../components/RecipeCard";
export default {
  name: "Home",
  components: {RecipeCard}
}
</script>

<style scoped>

</style>