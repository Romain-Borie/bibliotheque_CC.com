# Documentation Git - Guide de Base

## Qu'est-ce que Git ?

**Git** est un système de gestion de versions distribué qui permet de :

- Suivre l'historique des modifications de votre code
- Travailler en équipe sans écraser le travail des autres
- Revenir à une version antérieure en cas de problème
- Créer des branches pour développer de nouvelles fonctionnalités isolément

### Principes de base

- **Repository (dépôt)** : Contient tout l'historique et les fichiers de votre projet
- **Commit** : Un "instantané" de votre code à un moment donné
- **Branch (branche)** : Une ligne de développement indépendante
- **Remote (distant)** : Version du dépôt hébergée sur un serveur (ex: GitHub)

## Qu'est-ce que GitHub ?

**GitHub** est une plateforme web qui héberge des dépôts Git et offre :

- Stockage cloud de vos dépôts Git
- Collaboration facilitée (pull requests, issues, code review)
- Gestion de projets et documentation
- Intégration continue (CI/CD)

> **Note** : Git est l'outil, GitHub est le service d'hébergement (comme GitLab, Bitbucket...)

## Commandes Git de Base

### 1. Clone - Récupérer un dépôt

```bash
git clone https://github.com/utilisateur/projet.git
```

Télécharge une copie complète d'un dépôt distant sur votre machine.

### 2. Fetch - Récupérer les modifications

```bash
git fetch origin
```

Récupère les modifications du dépôt distant **sans les fusionner** avec votre travail local.

### 3. Pull - Récupérer et fusionner

```bash
git pull origin main
```

Récupère les modifications du dépôt distant **et les fusionne** automatiquement avec votre branche locale.

> **Pull = Fetch + Merge**

### 4. Push - Envoyer vos modifications

```bash
git push origin main
```

Envoie vos commits locaux vers le dépôt distant pour les partager avec l'équipe.

### 5. Branch - Gérer les branches

```bash
# Créer une nouvelle branche
git branch nouvelle-fonctionnalite

# Changer de branche
git checkout nouvelle-fonctionnalite

# Créer et basculer en une commande
git checkout -b nouvelle-fonctionnalite

# Lister les branches
git branch -a
```

### 6. Merge - Fusionner des branches

```bash
# Se positionner sur la branche de destination
git checkout main

# Fusionner la branche de fonctionnalité
git merge nouvelle-fonctionnalite
```

### Workflow typique

```bash
# 1. Cloner le projet
git clone https://github.com/utilisateur/projet.git
cd projet

# 2. Créer une branche pour votre fonctionnalité
git checkout -b ma-fonctionnalite

# 3. Faire vos modifications, puis commiter
git add .
git commit -m "Ajout de ma nouvelle fonctionnalité"

# 4. Envoyer votre branche sur GitHub
git push origin ma-fonctionnalite

# 5. Créer une Pull Request sur GitHub
# 6. Après validation, fusionner et supprimer la branche
```

## TortoiseGit vs Git Bash

### Git Bash (Ligne de commande)

**Avantages :**

- Puissant et flexible
- Accès à toutes les commandes Git
- Scripts et automatisation possibles
- Léger et rapide

**Inconvénients :**

- Courbe d'apprentissage plus raide
- Nécessite de mémoriser les commandes
- Interface textuelle uniquement

### TortoiseGit (Interface graphique)

**Avantages :**

- **Intégré à l'Explorateur Windows** : clic droit directement sur les dossiers
- **Interface visuelle intuitive** : pas de commandes à mémoriser
- **Visualisation graphique** : historique, branches, différences visuelles
- **Facilite les opérations courantes** : commit, push, pull en quelques clics
- **Gestion des conflits simplifiée** : outils visuels de merge
- **Idéal pour débutants** et utilisateurs préférant le visuel

**Inconvénients :**

- Moins de contrôle pour les opérations avancées
- Plus lourd que Git Bash
- Nécessite toujours Git installé en arrière-plan

### Comparaison pratique

| Opération         | Git Bash                               | TortoiseGit                                               |
| ----------------- | -------------------------------------- | --------------------------------------------------------- |
| Commit            | `git add . && git commit -m "message"` | Clic droit > Git Commit                                   |
| Push              | `git push origin main`                 | Clic droit > TortoiseGit > Push                           |
| Pull              | `git pull origin main`                 | Clic droit > TortoiseGit > Pull                           |
| Voir l'historique | `git log`                              | Clic droit > TortoiseGit > Show Log (interface graphique) |
| Créer une branche | `git checkout -b nom`                  | Clic droit > TortoiseGit > Create Branch                  |

### Quelle approche choisir ?

- **Débutants** : Commencez avec TortoiseGit pour comprendre les concepts
- **Développeurs confirmés** : Git Bash pour plus de flexibilité et rapidité
- **Approche hybride** : TortoiseGit pour les opérations courantes, Git Bash pour les cas complexes

## Résumé des concepts clés

1. **Git** = Système de gestion de versions
2. **GitHub** = Plateforme d'hébergement de dépôts Git
3. **Clone** = Copier un dépôt distant
4. **Fetch** = Récupérer sans fusionner
5. **Pull** = Récupérer et fusionner
6. **Push** = Envoyer vos modifications
7. **Branch** = Créer une ligne de développement parallèle
8. **Merge** = Fusionner deux branches
9. **TortoiseGit** = Interface graphique pour faciliter l'utilisation de Git

## Ressources complémentaires

- Documentation officielle Git : https://git-scm.com/doc
- GitHub Guides : https://guides.github.com/
- TortoiseGit : https://tortoisegit.org/docs/
- Pro Git Book (gratuit) : https://git-scm.com/book/fr/v2
