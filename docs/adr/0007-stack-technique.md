# ADR-007 — Stack technique : Phaser 4 + Spine, NestJS

- **Statut** : Acceptée
- **Date** : 2026-11-19
- **Décideur** : Thibault (PO)
- **Ticket** : TSS-13

## Contexte

Jeu web 2D narratif, mobile et PC, en paysage, développé seul, avec un budget de 0 € (jusqu'à 200 € plus tard, ADR-003).
Les personnages ont de nombreuses animations et cosmétiques (ADR-002) : une animation squelettique est nécessaire pour éviter de redessiner chaque skin image par image.

## Options étudiées

| Option | Résultat |
|---|---|
| Phaser 3 + DragonBones | **Rejetée** : le runtime officiel (v5.6.2, 2018) plante sur Phaser 3.90 (`TextureTintPipeline` supprimé depuis Phaser 3.50). Aucun runtime maintenu |
| Phaser 3.24 + DragonBones | **Rejetée** : moteur de 2020, plus maintenu |
| Patcher le runtime DragonBones | **Rejetée** : fork à maintenir seul jusqu'au lancement |
| PixiJS + DragonBones | **Rejetée** : moteur de rendu seulement (pas de scènes, loader, tweens, entrées) |
| Phaser 4 + images par image | **Rejetée** : chaque cosmétique impose de redessiner toutes les animations |
| **Phaser 4 + Spine** | **Retenue** |

## Décision

- **Client** : Phaser 4, Vite, TypeScript strict, inkjs, i18next, PWA.
- **Animation** : Spine, runtime officiel `@esotericsoftware/spine-phaser-v4`.
- **Serveur** : NestJS, Prisma, PostgreSQL, Redis.
- **Partagé** : TypeScript pur et Zod dans `packages/shared`.

## Conséquences

- ✅ Moteur et runtime d'animation maintenus, compatibles WebGL mobile.
- ✅ Skins et cosmétiques produits sans redessiner les animations.
- ⚠️ Licence **Spine Essential** (paiement unique, environ 69 à 99 $) prise sur le budget de 200 €. Achat et intégration du runtime au **Vertical slice**. D'ici là, le prototype utilise des sprites provisoires.
- ⚠️ Essential n'inclut pas les maillages : passage à Professional possible plus tard (on paie la différence).
- ⚠️ Licence valable tant que les revenus restent sous 500 000 $ par an.
- ❓ La surcouche d'interface (menus, boutique) reste à trancher par le spike TSS-14.

## Preuves (spike)

- Phaser 3.90 + DragonBones : typecheck et build OK, échec à l'exécution.
- Phaser 4.2.1 : typecheck strict OK, build environ 358 Ko gzip, 2 000 sprites + tween en WebGL sans erreur.
