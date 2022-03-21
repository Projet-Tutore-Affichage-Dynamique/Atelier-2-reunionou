<template>
  <div class="card my-3" style="width: 18rem;">
    <div class="card-header">
      {{artist.type}}
    </div>
    <div class="card-body">
      <h5 class="card-title">{{artist.name}}</h5>
      <p class="card-text" v-if="artist.area != undefined"><span class="badge bg-success">{{artist.area.name}}</span></p>
      <p v-else><span class="badge bg-warning">unknown country</span></p>
      <div class="card-text" v-if="artist['life-span'].begin != undefined"><span class="text-muted">Born in {{artist['life-span'].begin}}</span></div>
      <div v-else><span class="text-muted">unknown date of birth</span></div>
      <p v-if="artist.gender != undefined">{{artist.gender}}</p>
      <p v-else>Unknown gender</p>
      <p v-if="artist.disambiguation != undefined">{{artist.disambiguation}}</p>
      <router-link :to="{ name: 'ArtistInformation', params: { id: artist.id  }}" class="btn btn-primary">See artist's musics</router-link>
    </div>
  </div>
</template>

<script>
export default{
    props: {
        artist: Object
    }
}
</script>

