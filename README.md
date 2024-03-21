# **COMMANDES BOT EMS**

## __Citoyens__
- **``/cv``** : Faire un CV + créé un chanel avec son nom **si il a deja un nom** et s'il a pas de nom --> DEMANDER avec 1 input son nom et prénom RP AVANT de créer le channel avec son nom. → et comme ça, ça met son nom RP directement aussi

## __EMS Employés__
- **`/pds`** : Prise de service + comptage heures
- **`/fds xx`** : Fin de service + ajout de 20 réas + ajout delta PDS/FDS heures
- **`/ems`** : Pour avoir une liste de tous les EMS actuellement en service avec leur noms et leur grades et un badge pour savoir s'ils peuvent réas par balle ou pas
- **`/patient`** : Commande pour créer un dossier patient qui va direct en bdd avec le nom prénom de la personne, comment il est mort, et ID card
- **`/absence`** : Commande pour créer une absence qui met un role absent direct et qui bloque la pds si absent sauf s'il arrete son absence. et met un embed en disant qu'il est absent.
- **`/mesinfos`** : Pour voir ses infos en tant qu'EMS (nom, prénom, grade, heures totales, réas totales, heures de la semaine, réas de la semaine)

## __EMS Direction__
- **`/listcv`** : pour voir toute la liste des CV déposés et des mecs en attente d'entretien
- **`/entretien`** : Pour créer un embed d'un entretien de la direction et va direct en BDD
- **`/aptitudes`** : Pour créer un embed d'un test d'aptitude de LSPD et/ou BCSO

## __EMS Patrons__
- **`/lead`** : Voir le total des heures de tous les EMS et le total des réas (semaine) MAIS !! Trié en ordre décroissant des RÉAS !! et pas des heures !
- **`/reset`** : fait le reset de la BDD des réas et heures hebdomadaires des EMS.

- **`/forcefds xx <@121212>`** : d'un mec pour lui forcer sa fds avec nombre de réas (quand le mec est tag)
- **`/addtime xx <@1212>`** : pour add (exemple 120minutes ) a un mec qu'on tag
- **`/addreas xx <@1212>`** : pour add 20 réas à un mec qu'on tag
- **`/remtime xx <@1212>`** : pour remove (exemple 120minutes ) a un mec qu'on tag (sachant que le min des heures = 0h)
- **`/remreas xx <@1212>`** : pour remove 20 réas à un mec qu'on tag

- **`/infos <@1212>`** : pour avoir les infos d'un EMS depuis qu'il est EMS avec le nb de réas de la semaine actuelle, ses heures de la semaine actuelle, ses heures totales depuis qu'il est EMS **et surtout +** ses réas totales depuis qu'il est EMS.
- **`/annonce`** : qui permet de faire une annonce personnalisée (mais qui fonctionne mdr) **et surtout +** ou on choisi dans quel channel on l'envoie !!
- **`/who`** : Permet de voir qui est la personne en fonction de son ID actuel en ville
- **`/joueurs`** : Permet de voir tous les joueurs actuellement en ville et leurs ID et s'ils sont staffs ou pas.
- **`/check xx`** : Permet de check tous les X derniers messages dans une conv
- **`/purge xx`** : permet de supprimer les X derniers messages dans une conv
