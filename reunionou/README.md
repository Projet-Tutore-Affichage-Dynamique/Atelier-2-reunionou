# reunionou

## Setup le projet
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and hot-reloads for development

**Routes disponibles sans connexion**
- / (accueil)
- /login (page de connexion)
- /register (page de création de compte)
- /event_join/:id_createur/:id (page pour rejoindre un événement via un lien)
- /faq (page F.A.Q.)


**Routes disponibles avec connexion**
- /events (page des événements)
- /invitations (page des invitations)
- /account (page du compte)
- /account/password (page changement de mdp)
- /new_event (page pour créer un événement)
- /events/:id (page détaillé d'un événement)

**Autre route**
- /[xyz] (page not found) 