-- MySQL dump 10.13  Distrib 5.7.12, for Win64 (x86_64)
--
-- Host: localhost    Database: memetics
-- ------------------------------------------------------
-- Server version	5.7.17-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `profile`
--

DROP TABLE IF EXISTS `profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `profile` (
  `profile_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) DEFAULT NULL,
  `nickname` varchar(30) NOT NULL,
  `country` varchar(50) NOT NULL,
  `first_name` varchar(30) DEFAULT NULL,
  `last_name` varchar(30) DEFAULT NULL,
  `city` varchar(30) DEFAULT NULL,
  `state` varchar(30) DEFAULT NULL,
  `web_site` varchar(50) DEFAULT NULL,
  `modified_date` timestamp NULL DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT NULL,
  `role` varchar(20) DEFAULT NULL,
  `sign_in_provider` varchar(20) DEFAULT NULL,
  `version` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`profile_id`),
  UNIQUE KEY `nickname_UNIQUE` (`nickname`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profile`
--

LOCK TABLES `profile` WRITE;
/*!40000 ALTER TABLE `profile` DISABLE KEYS */;
INSERT INTO `profile` VALUES (1,'drmobutu@gmail.com',NULL,'AussieMaga','change','Kek','Mit Uns','City','qld',NULL,'2017-08-16 08:52:20','2017-01-23 14:00:00','ROLE_ADMIN','TWITTER',3),(14,'test','$2a$10$27PzcaFviIJPU4a7nxVASufXOJ4n4Au63oBTDWy2iIxDR5QDkO5s.','test','test',NULL,NULL,NULL,NULL,NULL,'2017-04-16 08:47:21','2017-04-16 08:47:21','ROLE_USER',NULL,0),(35,'Ethan.Robinson29@hotmail.com','$2a$10$r4Lekmf/VGtytBQcOfgNM.KGfpMlQHshfMXviJubI17KAWJL0gsFi','Alexandra','Australia','Alexander','Rees','Alexanderville','Australian Capital Territory','https://riley.net.au','2017-04-26 11:04:03','2017-04-26 11:04:03','ROLE_USER',NULL,0),(36,'Alice_Bartoletti@gmail.com',NULL,'Lucas','French Southern Territories','AussieBloke',NULL,NULL,NULL,NULL,'2017-04-26 11:04:33','2017-04-26 11:04:33','ROLE_USER','TWITTER',0),(37,'paulx2893@gmail.com',NULL,'Maya','Liberia','Mansplainer','McGee',NULL,NULL,NULL,'2017-04-26 11:04:44','2017-04-26 11:04:44','ROLE_USER','FACEBOOK',0),(39,'test3@test3.com','$2a$10$fxzWmUCXYjJURTsrCO1tnOczvcLD6gE1a4hzbd7Pf3VEtxMIxOb/C','nickname3','au',NULL,NULL,NULL,NULL,NULL,'2017-04-26 11:26:54','2017-04-26 11:26:54','ROLE_USER',NULL,0),(40,'test4@test.com','$2a$10$HYLfC.VZdOrF8UZGanB8n.bCbrvfuJ1HHvJTFZqzn3Fx4SyP50acG','nickname4','au',NULL,NULL,NULL,NULL,NULL,'2017-04-26 11:29:48','2017-04-26 11:29:48','ROLE_USER',NULL,0),(41,'williamfosterau@gmail.com',NULL,'William Foster','Australia','William','Foster',NULL,NULL,NULL,'2017-04-30 10:44:39','2017-04-30 10:44:39','ROLE_ADMIN','TWITTER',0),(42,'_paulx2893@gmail.com',NULL,'KekMitUns','AU','Kek','Mit Uns',NULL,NULL,NULL,'2017-05-01 01:23:29','2017-05-01 01:23:29','ROLE_ADMIN','TWITTER',0),(43,'aussiemaga@outlook.com',NULL,'aussiemaga2','Australia','aupol','news',NULL,NULL,NULL,'2017-06-30 11:09:38','2017-06-30 11:09:38','ROLE_USER','TWITTER',0);
/*!40000 ALTER TABLE `profile` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-04-21  7:55:22
