<template>
  <main class="container">
    <h1>Mes événements</h1>
    <aside class="mb-5">
      <button class="btn btn-success">Créer un nouvel événement</button>
    </aside>
    <h4>Ils arrivent bientôt</h4>
    <div class="row row-cols-1 row-cols-md-5 g-4">
      <div class="col">
        <div class="card h-100">
          <img src="https://picsum.photos/200" class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">Anniversaire de Jean Charles</h5>
            <p class="card-text">
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </p>
          </div>
          <div class="card-footer">
            <small class="text-muted">Dans 3 jours · 23/03/22</small>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card h-100">
          <img src="https://picsum.photos/200" class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">Sortie cinéma</h5>
            <p class="card-text">
              This card has supporting text below as a natural lead-in to
              additional content.
            </p>
          </div>
          <div class="card-footer">
            <small class="text-muted">Dans 3 jours · 23/03/22</small>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card h-100">
          <img src="https://picsum.photos/200" class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">
              Repas d'anniversaire de Julie
              <span class="badge bg-success">New</span>
            </h5>
            <p class="card-text">
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This card has even longer content
              than the first to show that equal height action.
            </p>
          </div>
          <div class="card-footer">
            <small class="text-muted">Dans 3 jours · 23/03/22</small>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "AppEvents",
};
</script>
