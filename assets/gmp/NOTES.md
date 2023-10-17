# Explication sur ce dossier

> `gmp` signifie `Graphical Modelisation Playground`

Ce dossier contient tous les fichiers de modélisations utilisés pendant le développement en production pour le modèle 3D de la page d'accueil.

## Les différentes ressources

- `galadrim2.blend`: Le modèle 3D accompagné d'une scène. La scène a été générée avec le logiciel libre **[Blender](https://www.blender.org/).** 
- `galadrim2.blend1`: Des fichiers utiles au logiciel de modélisation.
- `render.png`: Cette image est un rendu du modèle 3D, elle a été générée depuis le logiciel libre **Blender**
- `galadrim2.gltf`: Ce fichier est une version exportée du modèle 3D, utilisable dans la plupart des moteurs de jeux et librairies 3D.
- `galadrim2.glb`: Ce fichier est également, au même titre que `galadrim2.glb` une version exportée du modèle 3D, utilisable dans la plupart des moteurs de jeux et librairies 3D.

## Définitions utiles

**[GTLF](https://www.khronos.org/gltf/):**
> glTF (GL Transmission Format) est un format de fichier scènes et modèles 3D utilisant le format JSON. Il est décrit par ses créateurs comme le "JPEG de la 3D". Développé par le Khronos Group, il s'agit d'un format de ressources 3D API-agnostique. Il est annoncé lors de la HTML5DevConf 2016.

**GLB:**
> Ce format de fichier est identique au format `gltf`, cependant la différence est qu'il inclue les textures, contrairement au format `gltf` qui établie des liens avec des fichiers externes. 

## Tester

Pour visualiser le modèle 3D, vous pouvez ouvrir la page `3d_test.html` à la racine du projet.

*Veuillez noter que, comme son nom l'indique, la page HTML est une version de test et qu'elle est susceptible de cesser de fonctionner à tout moment.*
