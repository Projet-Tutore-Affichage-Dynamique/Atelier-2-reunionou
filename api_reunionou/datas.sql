INSERT INTO `utilisateur` (`id`,`login`,`pwd`,`email`,`admin`) VALUES
('a368a7e6-3a83-4398-8797-2905e4ee6b6f','PAFman','$2y$10$6IgSKSMqklQ7c2Tmnh1ZMuZKY96S9NEjpP0KS5b6fgKV260KXoNOS','pierre.frisson@gmail.com',1),
('5c09009e-8b43-4c5e-8984-5c61924282f5','LeopoldLNC','$2y$10$FRPbF2EoAxsfxWO2EEmME.AfgcSwXyDuSN41esdLogPApJUwF54cq','leopold55@hotmail.fr',0),
('6962e727-486c-4f97-9e9a-ca68899e6ae8','Vaabt','$2y$10$gy0PH8cfulGBeBR967az6eoQO/Qk9.jbauz6ftKOOMcEkfrdGDjxu','AubertinVal@yahoo.fr',1),
('bd0d009a-3479-4015-8f99-91955b179762','Theo','$2y$10$sqavI9K6PMcAjGns40OQx.pe.zUr4VBC0FsZ5A7K57XWa5MeUgTpu','theo.orias@club-internet.fr',0);

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