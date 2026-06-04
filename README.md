# Auberge Funtana Bianca — Site statique

Site vitrine de la ferme auberge Funtana Bianca, Quenza (Corse). Déployé sur **Cloudflare Pages**.

## Structure des fichiers

```
├── index.html                  # Page principale
├── mentions-legales.html       # Mentions légales
├── confidentialite.html        # Politique de confidentialité & cookies
├── 404.html                    # Page d'erreur
├── sitemap.xml                 # Plan du site
├── robots.txt
├── favicon.svg
├── css/style.css               # Tout le CSS (polices @font-face, design)
├── js/main.js                  # JS : galerie, lightbox, formulaire, cookies
└── assets/
    ├── fonts/                  # Polices auto-hébergées (voir ci-dessous)
    │   ├── cormorant-garamond/
    │   ├── cinzel/
    │   └── jost/
    └── img/
        ├── bg-texture.jpg      # Texture de fond (à convertir en .webp si possible)
        ├── hero.webp           # Photo principale (héro)
        ├── bergerie-1.webp     # Photos bergerie (ratio 2/3)
        ├── bergerie-2.webp     # (ratio 4/3)
        ├── bergerie-3.webp     # (ratio 4/3)
        ├── restauration-1.webp # Photos resto (ratio 1/1)
        ├── restauration-2.webp # (ratio 4/3)
        ├── restauration-3.webp # (ratio 4/3)
        ├── evenements-1.webp   # Photos événements (ratio 16/9)
        ├── evenements-2.webp   # (ratio 4/3)
        ├── evenements-3.webp   # (ratio 4/3)
        ├── carte-quenza.webp   # Capture carte (remplace iframe Maps)
        ├── og-image.webp       # Image Open Graph (1200×630)
        └── galerie/            # Photos galerie
            ├── gal-01.webp
            └── ...
```

---

## 1. Remplacer les photos

1. Convertissez vos photos en **WebP** (outil en ligne : squoosh.app)
2. Nommez-les selon le tableau ci-dessus
3. Copiez-les dans `assets/img/`
4. Pour la **galerie**, copiez les photos dans `assets/img/galerie/` puis éditez `js/main.js` :

```js
const GALLERY_IMAGES = [
  { src: 'assets/img/galerie/gal-01.webp', alt: 'Vue du domaine Funtana Bianca' },
  { src: 'assets/img/galerie/gal-02.webp', alt: 'Caseddu en pierre sèche' },
  // ... ajoutez autant de lignes que nécessaire
];
```

---

## 2. Activer le formulaire Web3Forms

1. Créez un compte gratuit sur [web3forms.com](https://web3forms.com)
2. Créez un "Access Key" pour `funtana-bianca.com`
3. Dans `index.html`, remplacez :
   ```html
   <input type="hidden" name="access_key" value="VOTRE_CLE_WEB3FORMS">
   ```
   par votre vraie clé.
4. Renseignez aussi votre adresse e-mail dans la section Réservation (`<!-- REMPLACER : votre@email.fr -->`).

---

## 3. Télécharger les polices (conformité RGPD)

Rendez-vous sur **[google-webfonts-helper](https://gwfh.mranftl.com/fonts)**

Téléchargez chaque police et placez les fichiers `.woff2` dans les dossiers suivants :

| Police | Dossier | Graisses |
|--------|---------|---------|
| Cormorant Garamond | `assets/fonts/cormorant-garamond/` | 300, 300i, 400, 400i, 600 |
| Cinzel | `assets/fonts/cinzel/` | 400, 600 |
| Jost | `assets/fonts/jost/` | 300, 400, 500 |

Nommez les fichiers comme dans `css/style.css` (ex: `cormorant-garamond-v21-latin-300.woff2`).

**Tant que les polices ne sont pas téléchargées**, le site utilise les polices système (Georgia / Trebuchet) : le design reste lisible.

---

## 4. Carte : préparer la capture d'écran

Remplacez `assets/img/carte-quenza.svg` par une vraie capture :

1. Ouvrez [OpenStreetMap](https://www.openstreetmap.org/#map=14/41.7897/9.1260) ou Google Maps
2. Centrez sur les coordonnées **41.7897°N, 9.1260°E**
3. Faites une capture d'écran (560×300 px recommandé)
4. Convertissez en WebP et nommez `carte-quenza.webp`
5. Dans `index.html`, remplacez `carte-quenza.svg` par `carte-quenza.webp`

---

## 5. Déployer sur Cloudflare Pages

### Premier déploiement

1. Poussez ce dépôt sur GitHub (`git push`)
2. Connectez-vous sur [dash.cloudflare.com](https://dash.cloudflare.com)
3. **Pages → Create a project → Connect to Git**
4. Sélectionnez ce dépôt
5. Paramètres :
   - **Framework preset :** None
   - **Build command :** (vide)
   - **Build output directory :** `/` (ou `.`)
6. Cliquez **Save and Deploy**

### Relier le domaine `funtana-bianca.com`

1. Dans Cloudflare Pages → votre projet → **Custom domains**
2. Ajoutez `www.funtana-bianca.com` et `funtana-bianca.com`
3. Si votre domaine est géré par Cloudflare DNS : les records CNAME sont ajoutés automatiquement
4. Si votre domaine est ailleurs : pointez les DNS vers Cloudflare (NS records)
5. HTTPS est activé automatiquement par Cloudflare (certificat Let's Encrypt)

---

## 6. Mettre à jour le site

```bash
# Modifier des fichiers localement, puis :
git add .
git commit -m "Mise à jour photos"
git push
# Cloudflare Pages redéploie automatiquement en ~30 secondes
```

---

## 7. À renseigner avant la mise en ligne

- [ ] Adresse e-mail de contact (2 occurrences dans `index.html`, 2 dans les pages légales)
- [ ] Clé API Web3Forms
- [ ] Photos réelles (hero, bergerie, restauration, événements)
- [ ] Capture carte Google Maps / OpenStreetMap
- [ ] Image Open Graph (`assets/img/og-image.webp`, 1200×630)
- [ ] Polices auto-hébergées dans `assets/fonts/`
- [ ] Vérifier les horaires et tarifs (déjà renseignés d'après le site original)
- [ ] Vérifier l'adresse hébergeur dans `mentions-legales.html`

---

## Contacts & support

- **Téléphone :** 06 81 17 18 17 · 07 62 60 92 91
- **Site :** [www.funtana-bianca.com](https://www.funtana-bianca.com)
- **Coordonnées GPS :** 41.7897°N, 9.1260°E
