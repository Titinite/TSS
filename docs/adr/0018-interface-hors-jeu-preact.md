# ADR-0018 — Interface hors jeu en surcouche DOM Preact

- Statut : acceptée
- Date : 2026-11-20
- Spike : TSS-14

## Contexte

Le jeu a beaucoup d'écrans riches hors combat (menus, boutique, fiches
personnage, réglages) : listes, onglets, formulaires. Il est joué en paysage
sur mobile et sur PC (ADR-0013), avec un canvas Phaser de 1920×1080 mis à
l'échelle.

## Options étudiées

Même écran E-41 « Fiche personnage » réalisé dans chaque approche :

| Critère              | A · Phaser seul         | B · Surcouche Preact                   | C · Surcouche Svelte 5            |
| -------------------- | ----------------------- | -------------------------------------- | --------------------------------- |
| Poids ajouté (gzip)  | 1,2 Ko                  | 6 Ko                                   | 18 Ko                             |
| Code de l'écran      | 75 lignes               | 35 lignes + CSS                        | 33 lignes + CSS                   |
| Téléphone en paysage | Texte ≈ 9 px, illisible | Mise en page adaptée en CSS            | Idem B                            |
| Accessibilité        | Aucune, clavier à coder | Native (rôles, focus, lecteur d'écran) | Native + alertes à la compilation |
| Conventions du dépôt | OK                      | OK                                     | Export par défaut imposé          |

## Décision

- **Phaser** pour tout ce qui est « dans le jeu » : combat, exploration, HUD.
- **Preact** en surcouche DOM, au-dessus du canvas, pour les écrans hors jeu.
- i18next est partagé par les deux.

## Conséquences

- Écrans hors jeu lisibles sur mobile, accessibles et rapides à écrire.
- Deux façons de dessiner l'interface : la charte (couleurs, coins coupés)
  doit exister en CSS et en Phaser.
- Le HUD de combat reste dans Phaser : ses textes doivent être dimensionnés
  pour rester lisibles une fois le canvas réduit sur téléphone.
- La communication jeu ↔ interface passe par un petit bus d'événements typé.
