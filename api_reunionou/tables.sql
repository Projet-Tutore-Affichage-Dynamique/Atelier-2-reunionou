SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `db`.`utilisateur`;
CREATE TABLE `db`.`utilisateur` (
    `id` varchar(36) NOT NULL,
    `login` varchar(128) NOT NULL,
    `pwd` varchar(256) NOT NULL,
    `email` varchar(256) NOT NULL,
    `admin` bit,
    PRIMARY KEY (`id`)
)

DROP TABLE IF EXISTS `db`.`events`;
CREATE TABLE `db`.`events`(
    `id` int(11) NOT NULL,
    `id_createur` varchar(36) NOT NULL,
    `titre` varchar(128) NOT NULL,
    `description` varchar(128),
    `date_RV` datetime NOT NULL,
    `geoloc_lat` decimal(2,14) NOT NULL,
    `geoloc_long` decimal(2,14) NOT NULL,
    `url` varchar(256),
    PRIMARY KEY (`id`)
)

DROP TABLE IF EXISTS `db`.`invitation`;
CREATE TABLE `db`.`invitation`(
    `id_event` int(11) NOT NULL,
    `id_invite` varchar(36) NOT NULL,
    `status` int(1) NOT NULL,
    PRIMARY KEY (`id_event`),
    FOREIGN KEY (`id_event`) REFERENCES events(`id`),
    FOREIGN KEY (`id_invite`) REFERENCES utilisateur(`id`)
)

DROP TABLE IF EXISTS `db`.`messages`;
CREATE TABLE `db`.`invitation` (
    `id_event` int(11) NOT NULL,
    `id_createur` varchar(36) NOT NULL,
    `message` varchar(128) NOT NULL,
    PRIMARY KEY (`id_event`),
    FOREIGN KEY (`id_event`) REFERENCES events(`id`),
    FOREIGN KEY (`id_createur`) REFERENCES utilisateur(`id`)
)