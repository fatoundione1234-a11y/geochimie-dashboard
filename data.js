const GEO_DATA = {
  projet: "Zone Aurifère Fictive",
  region: "Bouclier Précambrien",
  date: "2024",

  samples: [
    { id:"GC-01", roche:"Grauwacke",                    fm:"Pontiac",   prof:45,  au:12,    sio2:65.4, al2o3:15.2, fe2o3:4.8,  mgo:2.1, cao:4.5, na2o:3.2, k2o:2.8, as:18,  sb:0.5,  cu:35,  pb:22,  zn:72,  ag:0.8,  te:0.1,  s:0.15 },
    { id:"GC-02", roche:"Granite porphyre",             fm:"Abitibi",   prof:80,  au:3250,  sio2:72.1, al2o3:13.8, fe2o3:2.3,  mgo:0.9, cao:1.8, na2o:3.8, k2o:4.5, as:285, sb:12.5, cu:125, pb:48,  zn:185, ag:8.5,  te:4.2,  s:1.85 },
    { id:"GC-03", roche:"Basalte tholéiitique",         fm:"Normétal",  prof:120, au:58,    sio2:48.3, al2o3:16.5, fe2o3:11.2, mgo:7.4, cao:9.8, na2o:2.5, k2o:0.9, as:42,  sb:1.8,  cu:85,  pb:35,  zn:105, ag:1.5,  te:0.3,  s:0.28 },
    { id:"GC-04", roche:"Tonalite",                     fm:"Chicobi",   prof:55,  au:780,   sio2:55.7, al2o3:17.1, fe2o3:8.6,  mgo:4.3, cao:7.2, na2o:3.1, k2o:1.6, as:165, sb:6.8,  cu:68,  pb:55,  zn:88,  ag:3.2,  te:1.8,  s:0.62 },
    { id:"GC-05", roche:"Rhyolite",                     fm:"Rouyn",     prof:200, au:15,    sio2:78.5, al2o3:11.2, fe2o3:1.5,  mgo:0.4, cao:0.7, na2o:2.9, k2o:5.1, as:22,  sb:0.8,  cu:18,  pb:12,  zn:42,  ag:0.4,  te:0.05, s:0.08 },
    { id:"GC-06", roche:"Komatiite",                    fm:"Duparquet", prof:340, au:125,   sio2:44.8, al2o3:14.9, fe2o3:13.5, mgo:9.2, cao:11.4,na2o:2.1, k2o:0.5, as:55,  sb:2.1,  cu:145, pb:28,  zn:120, ag:2.1,  te:0.4,  s:0.35 },
    { id:"GC-07", roche:"Zone de cisaillement-Au",      fm:"Pontiac",   prof:88,  au:8950,  sio2:62.5, al2o3:15.8, fe2o3:9.2,  mgo:3.5, cao:5.8, na2o:3.0, k2o:2.1, as:520, sb:28.4, cu:285, pb:95,  zn:215, ag:15.8, te:8.5,  s:3.2  },
    { id:"GC-08", roche:"Andésite",                     fm:"Normétal",  prof:145, au:42,    sio2:56.2, al2o3:17.5, fe2o3:8.4,  mgo:4.8, cao:7.5, na2o:3.4, k2o:1.8, as:38,  sb:1.5,  cu:72,  pb:42,  zn:95,  ag:1.2,  te:0.2,  s:0.22 },
    { id:"GC-09", roche:"Granodiorite",                 fm:"Abitibi",   prof:95,  au:4820,  sio2:68.4, al2o3:15.1, fe2o3:5.6,  mgo:2.2, cao:3.8, na2o:3.6, k2o:3.5, as:345, sb:18.2, cu:185, pb:68,  zn:155, ag:12.5, te:5.8,  s:2.45 },
    { id:"GC-10", roche:"Quartzite ferrugineux",        fm:"Chicobi",   prof:210, au:285,   sio2:72.8, al2o3:8.5,  fe2o3:12.5, mgo:3.1, cao:2.8, na2o:1.5, k2o:1.2, as:88,  sb:3.5,  cu:52,  pb:185, zn:320, ag:3.8,  te:0.8,  s:1.2  },
    { id:"GC-11", roche:"Dyke de quartz-carbonates",    fm:"Pontiac",   prof:62,  au:12400, sio2:78.2, al2o3:10.5, fe2o3:6.8,  mgo:2.8, cao:3.5, na2o:2.2, k2o:1.8, as:685, sb:35.8, cu:425, pb:125, zn:285, ag:22.5, te:12.5, s:4.85 },
    { id:"GC-12", roche:"Schiste graphiteux",           fm:"Rouyn",     prof:175, au:185,   sio2:48.5, al2o3:22.5, fe2o3:8.5,  mgo:3.8, cao:5.2, na2o:2.8, k2o:3.5, as:125, sb:8.2,  cu:95,  pb:88,  zn:145, ag:4.5,  te:1.5,  s:2.1  },
    { id:"GC-13", roche:"Syénite",                      fm:"Abitibi",   prof:420, au:38,    sio2:62.8, al2o3:16.2, fe2o3:4.8,  mgo:1.8, cao:4.5, na2o:4.5, k2o:4.8, as:28,  sb:1.2,  cu:38,  pb:32,  zn:68,  ag:0.9,  te:0.2,  s:0.12 },
    { id:"GC-14", roche:"Zone BIF (Fer)",               fm:"Chicobi",   prof:280, au:1850,  sio2:42.5, al2o3:12.5, fe2o3:32.5, mgo:5.8, cao:8.5, na2o:1.2, k2o:0.8, as:225, sb:12.5, cu:185, pb:155, zn:425, ag:8.5,  te:3.5,  s:2.85 },
    { id:"GC-15", roche:"Diorite altérée-séricitisée",  fm:"Normétal",  prof:115, au:6200,  sio2:58.5, al2o3:18.5, fe2o3:8.2,  mgo:3.2, cao:4.8, na2o:2.5, k2o:3.8, as:485, sb:25.8, cu:245, pb:85,  zn:195, ag:18.5, te:9.8,  s:3.85 }
  ],

  pathfinders: [
    { elem:"As",  nom:"Arsenic",   role:"Halo d'altération primaire",     corr:0.92, seuil:100,  moy:188,  unit:"ppm" },
    { elem:"Sb",  nom:"Antimoine", role:"Enveloppe distale primaire",     corr:0.88, seuil:8,    moy:10.4, unit:"ppm" },
    { elem:"Te",  nom:"Tellure",   role:"Indicateur direct de télurites", corr:0.97, seuil:1,    moy:2.8,  unit:"ppm" },
    { elem:"Ag",  nom:"Argent",    role:"Co-précipitation avec Au",       corr:0.85, seuil:5,    moy:6.9,  unit:"ppm" },
    { elem:"Cu",  nom:"Cuivre",    role:"Sulfures associés",              corr:0.68, seuil:150,  moy:132,  unit:"ppm" },
    { elem:"S",   nom:"Soufre",    role:"Porteur des sulfures aurifères", corr:0.91, seuil:1.5,  moy:1.79, unit:"%"   },
    { elem:"Pb",  nom:"Plomb",     role:"Galène argentifère associée",    corr:0.72, seuil:80,   moy:64,   unit:"ppm" },
    { elem:"Fe",  nom:"Fe₂O₃",    role:"Oxydation des sulfures (gossans)",corr:0.55, seuil:10,  moy:8.2,  unit:"%"   }
  ]
};
