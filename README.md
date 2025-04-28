# Pokedex - Documentation

## 1. Présentation du projet  
Le **Pokedex** est une application web permettant de consulter une base de données de Pokémon avec les fonctionnalités suivantes :  
- Interface utilisateur pour explorer les Pokémon  
- Filtrage par génération  
- Recherche par nom  
- Tri des Pokémon selon différents critères  
- Affichage détaillé des statistiques et évolutions de chaque Pokémon  
- Support multilingue (Français et Anglais)  

## 2. Prérequis  
Avant de commencer, assurez-vous d'avoir les éléments suivants installés :  
- **Node.js** : Version 14 ou supérieure  
- **Python** : Version 3.7 ou supérieure  
- **npm** ou **yarn** : Pour gérer les dépendances JavaScript  
- **pip** : Pour installer les dépendances Python  

## 3. Installation  

### Clonez le dépôt GitHub :  
```bash  
git clone https://github.com/amauury/pokedex-bts.git  
cd pokedex-bts  
```  

### Installation des dépendances pour le frontend :  
```bash  
cd pokedex  
npm install  
```  

### Installation des dépendances pour l'API :  
```bash  
cd api  
pip install flask flask-cors
```  

## 4. Configuration de la base de données  
Le projet utilise une base de données SQLite nommée `pokedex.db`.  

## 5. Lancement du projet  

### Démarrer l'API backend :  
```bash  
cd api  
python api.py  
```  
L'API sera accessible à l'adresse : [http://localhost:5001](http://localhost:5001)  

### Démarrer l'application frontend :  
```bash  
cd pokedex  
npm start  
```  
L'application sera accessible à l'adresse : [http://localhost:3000](http://localhost:3000)  

## 6. Fonctionnalités  

### Interface utilisateur  
- **Recherche** : Filtrez les Pokémon par leur nom  
- **Tri** : Triez les Pokémon par ordre croissant/décroissant, alphabétique, poids ou taille  
- **Filtrage par génération** : Affichez uniquement les Pokémon d'une génération spécifique  
- **Mode Shiny** : Basculez entre l'apparence normale et shiny des Pokémon  
- **Multilangue** : Changez la langue de l'interface entre français et anglais  

### Page détaillée  
- Consultez les statistiques détaillées de chaque Pokémon  
- Visualisez les chaînes d'évolution  
- Découvrez les types de chaque Pokémon  

## 7. Structure du projet  
- `pokedex` : Application frontend React  
- `api` : API backend Flask  
- `api.py` : Point d'entrée de l'API  
- `pokedex.db` : Base de données SQLite  