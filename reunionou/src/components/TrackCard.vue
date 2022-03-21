<template>
    <div class="card my-3" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">{{recording.title}}</h5>
            <h6 class="card-subtitle mb-2 text-muted">
                {{recording['artist-credit'][0].name}}
            </h6>
            <p>{{recording['releases'][0]['release-group']['primary-type']}}</p>
            
            <p>release date : {{recording['releases'][0].date}}</p>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <router-link :to="{ name: 'TrackInformation', params: { id: recording.id  }}">View track infos</router-link>
        </div>
    </div>
</template>


<script>
export default{
    props: {
        recording: Object
    }
}
</script>

