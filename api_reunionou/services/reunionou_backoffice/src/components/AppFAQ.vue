<template>
    <div class="accordion container" id="accordionExample">
        <h2 class="my-5 text-center">Questions fréquemment posées</h2>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
                <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="false"
                    aria-controls="collapseOne"
                >
                    Est-ce que Reunionou est gratuit ?
                </button>
            </h2>
            <div
                id="collapseOne"
                class="accordion-collapse collapse"
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
            >
                <div class="accordion-body faq">
                    Reunionou est une application 100% gratuite. La seule chose que vous avez à faire pour pouvoir
                    l'utiliser est de vous créer un compte.
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingTwo">
                <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                >
                    Dois-je obligatoirement créer un compte ?
                </button>
            </h2>
            <div
                id="collapseTwo"
                class="accordion-collapse collapse"
                aria-labelledby="headingTwo"
                data-bs-parent="#accordionExample"
            >
                <div class="accordion-body faq">
                    Oui, c'est la seule condition pour pouvoir utiliser notre application. Cela nous permet de savoir
                    quels événements vous avez créé, ainsi que ceux auxquels vous êtes invité.
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingThree">
                <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseThree"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                >
                    Comment je peux créer un événément ?
                </button>
            </h2>
            <div
                id="collapseThree"
                class="accordion-collapse collapse"
                aria-labelledby="headingThree"
                data-bs-parent="#accordionExample"
            >
                <div class="accordion-body faq">
                    Une fois connecté sur votre compte, il vous suffit de cliquer sur le bouton "Créer un nouvel
                    événement". <br />
                    Il faut faudra ensuite remplir un formulaire afin de renseigner quelques informations sur
                    l'événement que vous souhaitez créer.
                </div>
            </div>
        </div>
        <div class="accordion-item">
            <h2 class="accordion-header" id="headingFour">
                <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseFour"
                    aria-expanded="false"
                    aria-controls="collapseFour"
                >
                    Qui est le créateur de cette application ?
                </button>
            </h2>
            <div
                id="collapseFour"
                class="accordion-collapse collapse"
                aria-labelledby="headingFour"
                data-bs-parent="#accordionExample"
            >
                <div class="accordion-body faq">
                    En réalité, nous sommes 5 développeurs derrière cette application : A.Valentin, F.Pierre-Alexandre,
                    LN.Léopold, O.Théo et W.Lilian. <br />
                    Nous avons réalisé celle-ci lors de notre Licence Professionnelle CIASIE (Conception-Intégration
                    d'Applications et Services Web pour l'Entreprise).
                </div>
            </div>
        </div>
    </div>
    <div class="text-center py-3">
      <router-link class="btn btn-outline-secondary" aria-current="page" to="/">Retour</router-link>
    </div>
</template>

<script>
export default {
    name: 'AppFAQ',
    methods: {
        handleClick() {
            this.$router.push('/');
        }
    }
};
</script>
