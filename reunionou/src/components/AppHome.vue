<template>
  <section class="h-100">
    <div class="container d-flex flex-column justify-content-around h-100 py-5">
      <div class="d-flex justify-content-center align-items-center mb-3">
        <div class="col-sm-8 text-center">
          <h1 class="display-5 font-weight-bold">
            Les <span class="text-primary">Amis</span> sont ceux qui font la vie.
          </h1>
        </div>
      </div>
      <div class="d-flex justify-content-center align-items-center mb-3">
        <div class="col-sm-8 text-center">
          <h5 class="text-muted font-weight-normal">
            Reunionou est la plateforme que permets de gérer vos rencontres. Plus qu'une simple plateforme de gestion de rendez-vous, c'est une planner qui vous feras gagner du temps.
          </h5>
        </div>
      </div>
    </div>
    <div class="text-center mb-5">
                <a href="javascript:void(0)" @click="handleClick" class="btn btn-lg btn-primary">Créer un compte</a>
    </div>
    <div class="accordion container py-5 " id="accordionExample">
        <h2 class="my-5 text-center">Questions fréquemment posées</h2>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                Est-ce que Reunionou est gratuit ?
            </button>
            </h2>
            <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
            <div class="accordion-body">
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vestibulum, mi vitae vulputate sodales, sem sem consectetur lorem, vitae lacinia libero massa eget nibh. Quisque dignissim leo massa, at efficitur mauris sagittis elementum. Nullam porttitor maximus pharetra. Nulla tristique elementum mi, et semper massa. Vivamus at nisl tincidunt, interdum lectus a, scelerisque elit. Fusce sit amet sem luctus, maximus magna sed, egestas ante. 
            </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingTwo">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                Comment je peux créer un événément ?
            </button>
            </h2>
            <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
            <div class="accordion-body">
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vestibulum, mi vitae vulputate sodales, sem sem consectetur lorem, vitae lacinia libero massa eget nibh. Quisque dignissim leo massa, at efficitur mauris sagittis elementum. Nullam porttitor maximus pharetra. Nulla tristique elementum mi, et semper massa. Vivamus at nisl tincidunt, interdum lectus a, scelerisque elit. Fusce sit amet sem luctus, maximus magna sed, egestas ante. 
            </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingThree">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                Je dois obligatoirement créer un comtpe ?
            </button>
            </h2>
            <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
            <div class="accordion-body">
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vestibulum, mi vitae vulputate sodales, sem sem consectetur lorem, vitae lacinia libero massa eget nibh. Quisque dignissim leo massa, at efficitur mauris sagittis elementum. Nullam porttitor maximus pharetra. Nulla tristique elementum mi, et semper massa. Vivamus at nisl tincidunt, interdum lectus a, scelerisque elit. Fusce sit amet sem luctus, maximus magna sed, egestas ante. 
            </div>
            </div>
        </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "AppHome",
  props: ["user"],
  methods: {
      handleClick(){
        this.$router.push('/register')
      }
    }
};
</script>
