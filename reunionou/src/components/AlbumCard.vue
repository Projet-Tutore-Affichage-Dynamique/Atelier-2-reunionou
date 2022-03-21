<template>
  <div class="card my-3" style="width: 18rem">
    <div class="card-header">type: {{ album["primary-type"] }}</div>
    <div class="card-body">
      <h5 class="card-title">Titre: {{ album.title }}</h5>
      <h5 class="text-muted">Sortie: {{ album["first-release-date"] }}</h5>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    album: Object,
  },
};
</script>
