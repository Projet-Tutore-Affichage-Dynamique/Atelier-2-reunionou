INSERT INTO `utilisateur` (`id`,`login`,`pwd`,`email`,`admin`) VALUES
('a368a7e6-3a83-4398-8797-2905e4ee6b6f','Pierre-Alexandre','$2y$10$TbaBfnEsritUb/APGrBTXuJpnMUsUDkUnrEw8JQtPuHYWMHS.leDS','pierre.frisson@gmail.com',1),
('5c09009e-8b43-4c5e-8984-5c61924282f5','Leopold','$2y$10$TbaBfnEsritUb/APGrBTXuJpnMUsUDkUnrEw8JQtPuHYWMHS.leDS','leopold55@hotmail.fr',0),
('6962e727-486c-4f97-9e9a-ca68899e6ae8','Valentin','$2y$10$TbaBfnEsritUb/APGrBTXuJpnMUsUDkUnrEw8JQtPuHYWMHS.leDS','AubertinVal@yahoo.fr',1),
('bd0d009a-3479-4015-8f99-91955b179762','Theo','$2y$10$TbaBfnEsritUb/APGrBTXuJpnMUsUDkUnrEw8JQtPuHYWMHS.leDS','theo.orias@club-internet.fr',0);

INSERT INTO `events` (`id`,`id_createur`,`titre`,`description`,`date_RV`,`geoloc`) VALUES
(00000000001, 'a368a7e6-3a83-4398-8797-2905e4ee6b6f', 'Anniv PAF', 'Anniversaire de Pierre-Alexandre', '2023-11-08 13:45:55', '5 Château Stanislas, 55200 Commercy'),
(00000000002, '5c09009e-8b43-4c5e-8984-5c61924282f5', 'Reunion Atelier', 'Reunion dev Atelier reunionou', '2022-03-03 09:00:00', '2Ter Bd Charlemagne, 54000 Nancy');

INSERT INTO `invitation` (`id_event`,`id_invite`,`status`) VALUES
(00000000001, '5c09009e-8b43-4c5e-8984-5c61924282f5', 2),
(00000000002, 'a368a7e6-3a83-4398-8797-2905e4ee6b6f', 3),
(00000000001, '6962e727-486c-4f97-9e9a-ca68899e6ae8', 1),
(00000000002, 'bd0d009a-3479-4015-8f99-91955b179762', 0);

INSERT INTO `messages` (`id_event`,`id_createur`,`message`, `date`) VALUES
(00000000001, 'a368a7e6-3a83-4398-8797-2905e4ee6b6f', 'n oubliez pas les cadeaux', NOW()),
(00000000002, '6962e727-486c-4f97-9e9a-ca68899e6ae8', 'premier rendez vous tres important', NOW());