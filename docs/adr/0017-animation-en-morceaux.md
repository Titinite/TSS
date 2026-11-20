# ADR-0017 - Animation en morceaux en code Phaser, sans Spine

- Statut : acceptée
- Date : 2026-11-20
- Remplace : la partie « animation Spine » de l'ADR-0007

## Contexte

Le budget est de 0 € (ADR-0003). Spine demande une licence payante pour l'éditeur.
DragonBones est gratuit, mais son lecteur officiel est cassé depuis Phaser 3.50
(spike TSS-13) et n'est plus maintenu.

## Options étudiées

1. Phaser 4 + Spine : très bon outil, mais payant.
2. Phaser 3.80 + DragonBones avec un correctif communautaire : gratuit, mais
   fragile et non maintenu.
3. Phaser 4 + animation en morceaux en code : gratuit, uniquement du code
   Phaser officiel.

## Décision

Option 3. Chaque personnage est découpé en morceaux (tête, buste, bras, jambes,
écharpe…) et assemblé dans un conteneur Phaser. Les animations (attente,
attaque, recul, effets) sont écrites avec les tweens de Phaser.

## Conséquences

- Aucun outil ni lecteur payant ; le projet reste 100 % gratuit.
- Pas de déformation de maillage : le rendu repose sur les poses et les effets,
  ce qui convient à un combat au tour par tour.
- Le découpage des personnages est fait par IA ou à la main (TSS-53).
- Un outil d'animation par squelette pourra être ajouté plus tard si un besoin
  réel apparaît (nouvel ADR).
