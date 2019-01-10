delimiter $$

CREATE DATABASE `pipelineHub` /*!40100 DEFAULT CHARACTER SET utf8 */$$

delimiter $$

CREATE TABLE `t_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `password` text NOT NULL,
  `create_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8$$



INSERT INTO `t_user` (`id`, `name`, `password`) VALUES
(1, 'scc', '111'),
(2, 'kyle.z.zhang', '111');
