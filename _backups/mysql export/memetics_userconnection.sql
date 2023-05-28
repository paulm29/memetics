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
-- Table structure for table `userconnection`
--

DROP TABLE IF EXISTS `userconnection`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `userconnection` (
  `userId` varchar(255) NOT NULL,
  `providerId` varchar(255) NOT NULL,
  `providerUserId` varchar(255) NOT NULL,
  `rank` int(11) NOT NULL,
  `displayName` varchar(255) DEFAULT NULL,
  `profileUrl` varchar(512) DEFAULT NULL,
  `imageUrl` varchar(512) DEFAULT NULL,
  `accessToken` varchar(512) NOT NULL,
  `secret` varchar(512) DEFAULT NULL,
  `refreshToken` varchar(512) DEFAULT NULL,
  `expireTime` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`userId`,`providerId`,`providerUserId`),
  UNIQUE KEY `UserConnectionRank` (`userId`,`providerId`,`rank`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userconnection`
--

LOCK TABLES `userconnection` WRITE;
/*!40000 ALTER TABLE `userconnection` DISABLE KEYS */;
INSERT INTO `userconnection` VALUES ('aussiemaga@outlook.com','twitter','870769769053421569',1,'@AupolNews','http://twitter.com/AupolNews','http://pbs.twimg.com/profile_images/873313835440001024/qo2AclRo_normal.jpg','870769769053421569-hMWBAmL5p1XqMdDBgdhw1NduHRFV7K1','AUbpu7yDE1ZbCw3ZPsuwPU8djWPHdXzs6WIRL4Rk2tx6l',NULL,NULL),('drmobutu@gmail.com','twitter','800616534502539264',1,'@AussieMAGA','http://twitter.com/AussieMAGA','http://pbs.twimg.com/profile_images/884734529461551105/2jiB0nOU_normal.jpg','800616534502539264-XoL8OfJofRRNwbk98llCaN7T2pMIDtY','v32R2afWJRvlSZ2iZu0pwTAJGXKzv92KqXKdvpRmw1uZU',NULL,NULL),('paulx2893@gmail.com','facebook','223577288107031',1,'Mansplainer McGee','https://www.facebook.com/app_scoped_user_id/223577288107031/','https://graph.facebook.com/v2.8/223577288107031/picture','EAAFb5k1gLQABANDjpwqXyQ38615EVocxKCzcCZC4K2zuCzDH7QXBodgs16IxoKZB2MHnB5Y7SrmnZAGGhLT4lsv9WSmSVc9Pqf0d4qofTnfocJFT7gDJde0KjT7zO3Kxe4zIhoyK5zV0pbdyJSVf8wS0kh4Y57lulYxGbZCjUAZDZD',NULL,NULL,1498388678272);
/*!40000 ALTER TABLE `userconnection` ENABLE KEYS */;
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
