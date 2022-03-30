SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `utilisateur`;
CREATE TABLE `utilisateur` (
    `id` varchar(36) NOT NULL,
    `login` varchar(128) NOT NULL,
    `pwd` varchar(256) NOT NULL,
    `email` varchar(256) NOT NULL,
    `admin` tinyint NOT NULL,
    `last_connected` datetime NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `events`;
CREATE TABLE `events`(
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `id_createur` varchar(36) NOT NULL,
    `titre` varchar(128) NOT NULL,
    `description` varchar(128),
    `date_RV` datetime NOT NULL,
    `geoloc` varchar(256) NOT NULL,
    `url` varchar(256),
    PRIMARY KEY (`id`),
    FOREIGN KEY (`id_createur`) REFERENCES utilisateur(`id`),
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `invitation`;
CREATE TABLE `invitation`(
    `id_event` int(11) NOT NULL,
    `id_invite` varchar(36) NOT NULL,
    `status` int(1) NOT NULL,
    PRIMARY KEY (`id_event`, `id_invite`),
    FOREIGN KEY (`id_event`) REFERENCES events(`id`),
    FOREIGN KEY (`id_invite`) REFERENCES utilisateur(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `messages`;
CREATE TABLE `messages` (
    `id_event` int(11) NOT NULL,
    `id_createur` varchar(36) NOT NULL,
    `message` varchar(128) NOT NULL,
    `date` datetime NOT NULL,
    PRIMARY KEY (`id_event`, `id_createur`, `date`),
    FOREIGN KEY (`id_event`) REFERENCES events(`id`),
    FOREIGN KEY (`id_createur`) REFERENCES utilisateur(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `utilisateur_invite`;
CREATE TABLE `utilisateur_invite` (
    `id` varchar(36) NOT NULL,
    `nom_prenom` varchar(128) NOT NULL,
    `email` varchar(256) NOT NULL,
    `created` datetime NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;