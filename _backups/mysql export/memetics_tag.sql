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
-- Table structure for table `tag`
--

DROP TABLE IF EXISTS `tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tag` (
  `tag_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `version` bigint(20) NOT NULL DEFAULT '0',
  PRIMARY KEY (`tag_id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tag`
--

LOCK TABLES `tag` WRITE;
/*!40000 ALTER TABLE `tag` DISABLE KEYS */;
INSERT INTO `tag` VALUES (5,'Muslims',0),(6,'Sexism',0),(7,'Trump_Troll',0),(8,'troll',0),(9,'Trudeau',0),(10,'Feminism',0),(11,'Fry',0),(12,'Immigration',0),(14,'ALP',0),(15,'DanAndrews',0),(16,'Chauvinism',0),(17,'Protesters',0),(18,'BillShorten',0),(19,'rhetoric_Troll',0),(20,'Greens',0),(21,'Socialism',0),(22,'Pedobear',0),(23,'Muslims_Islamophobia',0),(24,'Muslims_Terrorism',0),(26,'ApexGang',0),(27,'Victoria',0),(28,'Multiculturalism',0),(29,'Putin',0),(30,'FuckOffWereFull',0),(31,'Altright',0),(32,'Antifa',0),(35,'BernieSanders',0),(36,'ALP_QLD',0),(37,'Muslims_Immigration',0),(39,'IdentityPolitics',0),(40,'Diversity',0),(41,'Melbourne',0),(42,'Pepe',0),(43,'ClimateChange',0),(44,'AmySchumer',0),(45,'BLM_Kidnapping',0),(46,'BLM',0),(47,'Milktwitter',0),(53,'AIDS',0),(54,'Liberals',0),(55,'Trump',0),(56,'Nationalism',0),(59,'Chicago',0),(60,'CNN',0),(61,'FakeNews',0),(62,'Pinochet',0),(63,'Hillary',0),(64,'AdolfHitler',0),(65,'Obama',0),(66,'AlrightBabes',0),(67,'Kek',0),(68,'Abortion',0),(74,'SafeSchools',0),(75,'BillLeak',0),(76,'auspol',0),(77,'18c',0),(79,'PoliticalCorrectness',0),(80,'SJWs',0),(81,'Education',0),(82,'LGBT',0),(83,'Cosmopolitans',0),(84,'Castro',0),(85,'Aussie_Blokes',0),(86,'Arts',0),(87,'ABC',0),(88,'PeterDutton',0),(89,'Media',0),(90,'Aborigines',0),(91,'Leftists',0),(92,'AngelaMerkel',0),(93,'Muslims_Moderates',0),(94,'MikePence',0),(96,'NigelFarage',0),(97,'Transgender',0),(98,'PennyWong',0),(99,'TheGuardian',0),(100,'Censorship',0);
/*!40000 ALTER TABLE `tag` ENABLE KEYS */;
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
