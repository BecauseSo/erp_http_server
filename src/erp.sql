-- MySQL dump 10.13  Distrib 5.7.23, for macos10.13 (x86_64)
--
-- Host: 39.99.140.176    Database: erpcasbin
-- ------------------------------------------------------
-- Server version	5.7.28

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
-- Table structure for table `SKUApply`
--

DROP TABLE IF EXISTS `SKUApply`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `SKUApply` (
  `idSKUApply` int(11) NOT NULL AUTO_INCREMENT,
  `SPU_apply_id` int(11) NOT NULL,
  `SKU_code` varchar(45) NOT NULL,
  PRIMARY KEY (`idSKUApply`),
  UNIQUE KEY `SKU_code_UNIQUE` (`SKU_code`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SKUApply`
--

LOCK TABLES `SKUApply` WRITE;
/*!40000 ALTER TABLE `SKUApply` DISABLE KEYS */;
INSERT INTO `SKUApply` VALUES (13,10,'A0993-B'),(17,11,'s'),(18,13,'aasdasa'),(19,11,'www');
/*!40000 ALTER TABLE `SKUApply` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SKUTotal`
--

DROP TABLE IF EXISTS `SKUTotal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `SKUTotal` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `SPU_id` int(11) NOT NULL,
  `SKU_code` varchar(45) NOT NULL,
  `specification` varchar(45) DEFAULT NULL,
  `image` longtext,
  `buy_price` double DEFAULT NULL,
  `product_size` varchar(45) DEFAULT NULL,
  `weight` double DEFAULT NULL,
  `purchasing_cycle` int(11) DEFAULT NULL,
  `sensitive_information` varchar(45) DEFAULT NULL,
  `SKU_remark` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `SKU_code_UNIQUE` (`SKU_code`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SKUTotal`
--

LOCK TABLES `SKUTotal` WRITE;
/*!40000 ALTER TABLE `SKUTotal` DISABLE KEYS */;
INSERT INTO `SKUTotal` VALUES (10,14,'A0993-B','黑色-XL','http://localhost:8112/spu/product/image/1573032745312.png',15.23,'30*20*15',111777,3,'纯电产品','qqqq'),(16,15,'s','ss','http://localhost:8112/spu/product/image/1573061052836.png',11,'sss',11,1,'sss','www'),(17,17,'aasdasa','sda',NULL,11,'asd',2,1,'asd','asda'),(18,15,'www','asd',NULL,111,'www',11,1,'asdas','asd');
/*!40000 ALTER TABLE `SKUTotal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SPUApply`
--

DROP TABLE IF EXISTS `SPUApply`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `SPUApply` (
  `idSPUApply` int(11) NOT NULL AUTO_INCREMENT,
  `SPU_total_id` int(11) DEFAULT NULL,
  `apply_user_id` int(11) DEFAULT NULL,
  `apply_time` varchar(45) DEFAULT NULL,
  `apply_status` int(11) DEFAULT NULL,
  PRIMARY KEY (`idSPUApply`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SPUApply`
--

LOCK TABLES `SPUApply` WRITE;
/*!40000 ALTER TABLE `SPUApply` DISABLE KEYS */;
INSERT INTO `SPUApply` VALUES (6,9,1,NULL,0),(7,10,1,NULL,0),(8,11,1,NULL,0),(10,14,1,'2019/10/31',1),(11,15,1,NULL,0),(12,16,1,NULL,0),(13,17,1,NULL,0),(14,18,1,NULL,0);
/*!40000 ALTER TABLE `SPUApply` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SPUTotal`
--

DROP TABLE IF EXISTS `SPUTotal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `SPUTotal` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `SPU_code` varchar(45) DEFAULT NULL,
  `product_name` longtext,
  `product_image` longtext,
  `video_link` longtext,
  `sales` int(11) DEFAULT NULL,
  `product_link` longtext,
  `is_fake` int(11) DEFAULT NULL,
  `has_battery` int(11) DEFAULT NULL,
  `is_infringement` int(11) DEFAULT NULL,
  `has_magnetism` int(11) DEFAULT NULL,
  `is_liquid` int(11) DEFAULT NULL,
  `is_powder` int(11) DEFAULT NULL,
  `area` varchar(45) DEFAULT NULL,
  `need_custom_made` int(11) DEFAULT NULL,
  `individual_package` int(11) DEFAULT NULL,
  `is_in_stock` int(11) DEFAULT NULL,
  `start_values` int(11) DEFAULT NULL,
  `language` varchar(45) DEFAULT NULL,
  `freight` double DEFAULT NULL,
  `plug_type` varchar(45) DEFAULT NULL,
  `voltage` varchar(45) DEFAULT NULL,
  `create_user_id` int(11) NOT NULL,
  `create_time` varchar(45) DEFAULT NULL,
  `SPU_remark` longtext,
  PRIMARY KEY (`id`),
  UNIQUE KEY `SPU_code_UNIQUE` (`SPU_code`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SPUTotal`
--

LOCK TABLES `SPUTotal` WRITE;
/*!40000 ALTER TABLE `SPUTotal` DISABLE KEYS */;
INSERT INTO `SPUTotal` VALUES (14,'A0993','车用置物袋汽车隔离网兜','http://localhost:8112/spu/product/image/1573524235395.png','htt://www.baidu.com',10,'https://detail.1688.com/offer/572859046642.html?spm=b26110380.sw1688.mof001.122.f3624803Kll7fD',1,0,0,0,0,0,'欧美，澳洲',0,1,1,3,'英文，法语',10,'美规','110V',1,NULL,'wwww'),(15,'sss','a','http://localhost:8112/spu/product/image/1573060587691.png','sss',NULL,'sss',0,NULL,NULL,NULL,NULL,NULL,'sss',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL),(16,'www','aawaw',NULL,'asd',NULL,'asd',0,NULL,NULL,NULL,NULL,NULL,'asdas',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL),(17,'qqq','www',NULL,'asdasd',NULL,'qwasd',0,NULL,NULL,NULL,NULL,NULL,'qqq',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL),(18,'asdasd','asdasd','http://localhost:8112/spu/product/image/1573060130418.png','asdasd',NULL,'asd',0,NULL,NULL,NULL,NULL,NULL,'asdasd',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,1,NULL,NULL);
/*!40000 ALTER TABLE `SPUTotal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `apartment`
--

DROP TABLE IF EXISTS `apartment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `apartment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `apart_name` varchar(45) NOT NULL,
  `parent_id` int(11) NOT NULL,
  `apart_description` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `apartment`
--

LOCK TABLES `apartment` WRITE;
/*!40000 ALTER TABLE `apartment` DISABLE KEYS */;
INSERT INTO `apartment` VALUES (1,'总公司',0,'总公司'),(5,'销售部',1,'销售部'),(7,'人事部',1,'人事部'),(10,'销售A',5,'销售A'),(12,'销售B',5,'销售B'),(13,'销售C',5,'销售C');
/*!40000 ALTER TABLE `apartment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `apartmentrelationship`
--

DROP TABLE IF EXISTS `apartmentrelationship`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `apartmentrelationship` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `apart_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `apartmentrelationship`
--

LOCK TABLES `apartmentrelationship` WRITE;
/*!40000 ALTER TABLE `apartmentrelationship` DISABLE KEYS */;
INSERT INTO `apartmentrelationship` VALUES (5,1,1),(6,2,1),(8,8,13);
/*!40000 ALTER TABLE `apartmentrelationship` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `commissionrules`
--

DROP TABLE IF EXISTS `commissionrules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `commissionrules` (
  `idcommissionrules` int(11) NOT NULL,
  `apart_id` int(11) DEFAULT NULL,
  `rule_type` varchar(45) DEFAULT NULL,
  `service_fee_rate` double DEFAULT NULL,
  `unit_freight` double DEFAULT NULL,
  `registration_fee` double DEFAULT NULL,
  `commissionrules_remark` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idcommissionrules`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `commissionrules`
--

LOCK TABLES `commissionrules` WRITE;
/*!40000 ALTER TABLE `commissionrules` DISABLE KEYS */;
/*!40000 ALTER TABLE `commissionrules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company`
--

DROP TABLE IF EXISTS `company`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `company` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `agent` varchar(200) NOT NULL,
  `company_name` varchar(200) NOT NULL,
  `business_license_image` varchar(200) NOT NULL,
  `ad_connect_name` varchar(100) DEFAULT NULL,
  `ad_connect_email` varchar(100) DEFAULT NULL,
  `time_zone` varchar(45) DEFAULT NULL,
  `BM` varchar(45) DEFAULT NULL,
  `account_status` int(11) NOT NULL DEFAULT '0',
  `logout_time` varchar(45) DEFAULT NULL,
  `BMAPI` longtext,
  `belong_to` int(11) DEFAULT NULL,
  `company_remark` varchar(100) DEFAULT NULL,
  `fanslink` longtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company`
--

LOCK TABLES `company` WRITE;
/*!40000 ALTER TABLE `company` DISABLE KEYS */;
INSERT INTO `company` VALUES (27,'蓝标','开平市天卓网络科技有限公司','http://localhost:8112/license/1571935393301.png','wang jian','studiodtdh@gmail.com','-6','702908613512813',0,'2019/5/1 上午12:00:00','',NULL,'ss','[\"https://www.facebook.com/Best-Lives-834635540276872/\",\"http://baidu.com\"]'),(31,'1','1','http://localhost:8112/license/1573207013918.png','1','','','',0,'','',NULL,'',''),(32,'asdbjb','aknsdjn','','ksjnkdnak','ansdknaskn','asdkn','kajnsdkjand',1,'alsdlasmd','alksdkma',NULL,'alkmsdlkmalskd',''),(33,'ajnsdkjnak','aksndkanksj','','kasndkajnskdj','akjnsdkanjskdj','asndkajnsdkj','aksndkansj',0,'asndkjnaskjd','aknsdkjnj',NULL,'aknsdkjanskd',''),(34,'bbbb','akjsndkjn','','ajhsbdjhb','ahbsdjhbaj','ahsbdjab','jahbsdjh',0,'ajhbsdjb','jabhsdj',NULL,'jahbsdj',''),(35,'ccnakn','kandjk','','aksnd','kansdkjn','aknsdkjn','aknsdkn',0,'kansdj','kansdk',NULL,'kjnksdj',''),(36,'sndkn','ksndkn','','skjndfkj','ksndfkjn','skjdnjn','ksndfkjn',0,'sndfj','skdjn',NULL,'ksndfk',''),(37,'kjnskdnak','kasndkjn','','sjndfjn','skjdnfkj','skdjnfj','skdnfkj',0,'skjdnfkj','skdjnfkjn',NULL,'skdfjnkn',''),(38,'akjsndkn','ksndkjn','','skjdnfkj','skdnfkjn','skdnfkjn','ksdnfkn',0,'sjndfkn','ksjdnfk',NULL,'ksdnfk',''),(39,'kz,msdnakn','ksjndfkjn','','ksjdnfkjn','skdnfkj','sndfksn','skdnfkjn',0,'skdjnfk','sdkfnk',NULL,'skdnfkjsndf',''),(40,'kjsndfnskj','ksndfkjnk','','sdjfnkn','dknfksndkf','sdfnkjnfksj','ksndfkjn',0,'skdnfkn','dkfnkjn',NULL,'skdnfknsf',''),(41,'lkslkdmal','sndlmslkd','','sldfkmsl','lsmflm','lskmdflmlk','lsmdflkm',0,'slkmdflm','lsdmflkm',NULL,'lsmdlfmsd',''),(42,'aaaaa','asdasd','','skjn','skndfj','skjndfj','sknfkj',0,'skndfj','skdnf',NULL,'skfdn',''),(43,'serqasdafa','asdasd','','asdasd','asd','sda','asd',0,'asdasd','sfsdf',NULL,'sdfsf',''),(44,'asfasfasfwda','sdfsgsdf','','sdfsdf','sfdsf','sdgsdf','sfsf',0,'sdfsf','sdfsdfsg',NULL,'sdfsf','');
/*!40000 ALTER TABLE `company` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `companyaccount`
--

DROP TABLE IF EXISTS `companyaccount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `companyaccount` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_account_id` varchar(45) DEFAULT NULL,
  `shop_id` int(11) DEFAULT NULL,
  `company_id` int(11) DEFAULT NULL,
  `isunlock` varchar(45) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `companyaccount_remark` varchar(45) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `companyaccount`
--

LOCK TABLES `companyaccount` WRITE;
/*!40000 ALTER TABLE `companyaccount` DISABLE KEYS */;
INSERT INTO `companyaccount` VALUES (1,'6421270629308',1,27,'是',0,'www',1),(9,'ajsndk',17,37,'否',0,'asdasd',1);
/*!40000 ALTER TABLE `companyaccount` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `erpgroup`
--

DROP TABLE IF EXISTS `erpgroup`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `erpgroup` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group_name` varchar(45) NOT NULL,
  `group_display_name` varchar(45) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `erpgroup`
--

LOCK TABLES `erpgroup` WRITE;
/*!40000 ALTER TABLE `erpgroup` DISABLE KEYS */;
INSERT INTO `erpgroup` VALUES (1,'root','root用户'),(2,'user','一般用户'),(4,'admin','管理员'),(5,'sellman','销售'),(6,'manager','经理');
/*!40000 ALTER TABLE `erpgroup` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fanslink`
--

DROP TABLE IF EXISTS `fanslink`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fanslink` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `link` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fanslink`
--

LOCK TABLES `fanslink` WRITE;
/*!40000 ALTER TABLE `fanslink` DISABLE KEYS */;
/*!40000 ALTER TABLE `fanslink` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fanslinkrelationship`
--

DROP TABLE IF EXISTS `fanslinkrelationship`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `fanslinkrelationship` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `link_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fanslinkrelationship`
--

LOCK TABLES `fanslinkrelationship` WRITE;
/*!40000 ALTER TABLE `fanslinkrelationship` DISABLE KEYS */;
/*!40000 ALTER TABLE `fanslinkrelationship` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `function`
--

DROP TABLE IF EXISTS `function`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `function` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `function_name` varchar(45) NOT NULL,
  `function_description` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `function`
--

LOCK TABLES `function` WRITE;
/*!40000 ALTER TABLE `function` DISABLE KEYS */;
INSERT INTO `function` VALUES (1,'权限管理','修改角色组权限'),(2,'用户管理','获取并修改用户信息'),(3,'登录','用户登录'),(4,'基础','用户基础功能'),(5,'部门管理','公司架构管理'),(6,'店铺账号管理','管理店铺跟账号'),(7,'店铺账号获取','获取店铺跟账号信息'),(8,'SKU管理','SKU管理'),(9,'SKU申请','运营SKU申请权限');
/*!40000 ALTER TABLE `function` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `functionrelationship`
--

DROP TABLE IF EXISTS `functionrelationship`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `functionrelationship` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) NOT NULL,
  `function_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `functionrelationship`
--

LOCK TABLES `functionrelationship` WRITE;
/*!40000 ALTER TABLE `functionrelationship` DISABLE KEYS */;
INSERT INTO `functionrelationship` VALUES (1,1,1),(2,1,2),(3,1,3),(4,4,1),(5,4,2),(6,4,3),(7,1,4),(8,2,4),(9,4,4),(10,5,4),(11,6,4),(13,6,1),(21,1,5),(22,1,6),(23,1,7),(24,1,8),(25,1,9);
/*!40000 ALTER TABLE `functionrelationship` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grouprelationship`
--

DROP TABLE IF EXISTS `grouprelationship`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `grouprelationship` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grouprelationship`
--

LOCK TABLES `grouprelationship` WRITE;
/*!40000 ALTER TABLE `grouprelationship` DISABLE KEYS */;
INSERT INTO `grouprelationship` VALUES (9,2,2),(10,4,2),(11,6,2),(12,1,2),(13,7,2),(18,1,1),(28,2,5),(29,8,5);
/*!40000 ALTER TABLE `grouprelationship` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personaccount`
--

DROP TABLE IF EXISTS `personaccount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `personaccount` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `person_username` varchar(45) DEFAULT NULL,
  `person_password` varchar(45) DEFAULT NULL,
  `cookies` longtext,
  `Rdolp` varchar(45) DEFAULT NULL,
  `Rdo_username` varchar(45) DEFAULT NULL,
  `Rdo_password` varchar(45) DEFAULT NULL,
  `Rdo_port` int(11) DEFAULT NULL,
  `first_login_time` varchar(45) DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `company_id` int(11) DEFAULT NULL,
  `belongto` int(11) DEFAULT NULL,
  `person_status` int(11) DEFAULT NULL,
  `person_remark` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personaccount`
--

LOCK TABLES `personaccount` WRITE;
/*!40000 ALTER TABLE `personaccount` DISABLE KEYS */;
INSERT INTO `personaccount` VALUES (4,'kajsdn','ajsndknaskj','ksjndkfn','akjsndkn','kansdkjn','knsadkn',11,'ksnkdnfskf',0,33,1,0,'ksjndfn');
/*!40000 ALTER TABLE `personaccount` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchaseplan`
--

DROP TABLE IF EXISTS `purchaseplan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `purchaseplan` (
  `idPlan` int(11) NOT NULL AUTO_INCREMENT,
  `sku_id` int(11) NOT NULL,
  `sales_7_days` int(11) DEFAULT NULL,
  `sales_1_day` int(11) DEFAULT NULL,
  `add_count` int(11) DEFAULT NULL,
  `prepare_days` int(11) DEFAULT NULL,
  `operation_remark` varchar(45) DEFAULT NULL,
  `apply_user_id` int(11) DEFAULT NULL,
  `apply_status` int(11) DEFAULT NULL,
  `apply_time` varchar(45) DEFAULT NULL,
  `review_user_id` int(11) DEFAULT NULL,
  `review_time` varchar(45) DEFAULT NULL,
  `purchaseplan_remark` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idPlan`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchaseplan`
--

LOCK TABLES `purchaseplan` WRITE;
/*!40000 ALTER TABLE `purchaseplan` DISABLE KEYS */;
/*!40000 ALTER TABLE `purchaseplan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(45) NOT NULL,
  `url` varchar(200) NOT NULL,
  `role_display_name` varchar(45) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (2,'login','/user/login','用户登录'),(3,'userinfo','/user/info','获取用户信息'),(4,'usergroupall','/user/group/all','用户的所有角色组'),(5,'useradd','/user/add','添加新用户'),(6,'userdelete','/user/delete','删除用户'),(7,'userall','/user/all','所有用户'),(8,'roleadd','/role/add',NULL),(9,'groupall','/group/all','所有角色组'),(10,'groupadd','/group/add','添加角色组'),(11,'groupdelete','/group/delete','删除角色组'),(12,'groupusers','/group/users','角色组中的所有用户'),(13,'groupfunctionall','/group/function/all','角色组的所有权限'),(14,'groupfunctionadd','/group/function/add','角色组添加功能权限'),(15,'groupfunctiondelete','/group/function/delete','角色组删除功能权限'),(16,'grouprelationshipadd','/group/relationship/add','用户添加到角色组'),(17,'grouprelationshipdelete','/group/relationship/delete','用户从角色组删除'),(18,'userfunctionall','/user/function/all','获取用户所有权限'),(19,'functionall','/function/all','获取所有功能列表'),(20,'apartall','/apart/all','获取所有部门信息'),(21,'apartadd','/apart/add','添加部门'),(22,'apartdelete','/apart/delete','移除部门'),(23,'usermodify','/user/modify','修改用户信息'),(24,'shopadd','/shop/add','添加店铺'),(25,'shopmodify','/shop/modify','修改店铺'),(26,'shopdelete','/shop/delete','删除店铺'),(27,'shopall','/shop/all','获取所有店铺'),(28,'companyall','/company/all','获取所有企业主体'),(29,'companyadd','/company/add','添加企业主体'),(30,'companydelete','/company/delete','删除企业主体'),(31,'companymodify','/company/modify','修改企业主体'),(32,'companylicenseupload','/company/license/upload','上传企业执照'),(33,'accountcompanyall','/account/company/all','所有企业账号'),(34,'accountpersonall','/account/person/all','所有个人账号'),(35,'accountcompanyadd','/account/company/add','添加企业账号'),(36,'accountpersonadd','/account/person/add','添加个人账号'),(37,'accountcompanydelete','/account/company/delete','删除企业账号'),(38,'accountpersondelete','/account/person/delete','删除个人账号'),(39,'accountcompanymodify','/account/company/modify','修改企业账号'),(40,'accountpersonmodify','/account/person/modify','修改个人账号'),(41,'shopsearch','/shop/search','店铺搜索'),(42,'companysearch','/company/search','企业主体搜索'),(43,'usersearch','/user/search','用户搜索'),(44,'useraccountcompanyall','/user/account/company/all','获取用户的所有企业账号'),(45,'useraccountpersonall','/user/account/person/all','获取用户的所有个人账号'),(46,'usershopall','/user/shop/all','获取用户所有店铺'),(47,'skuapplyadd','/sku/apply/add','SKU申请'),(48,'spuapplyadd','/spu/apply/add','SPU申请'),(49,'skuapplymodify','/sku/apply/user/modify','修改SKU申请'),(50,'spuapplymodify','/spu/apply/user/modify','修改SPU申请'),(51,'skutotaldelete','/sku/total/delete','SKU删除'),(52,'skutotalmodify','/sku/total/modify','修改SKU'),(53,'skuproductimageupload','/sku/product/image/upload','上传产品图片'),(61,'skuuserall','/sku/user/all',NULL),(62,'spuuserapplysearch','/spu/user/apply/search',NULL),(63,'/sku/apply/manager/modify','/sku/apply/manager/modify',NULL),(64,'/spu/apply/manager/modify','/spu/apply/manager/modify',NULL),(65,'/sku/manager/all','/sku/manager/all',NULL),(66,'/sku/manager/allapply','/sku/manager/allapply',NULL),(67,'/spu/total/delete','/spu/total/delete',NULL),(68,'/spu/sku/all','/spu/sku/all',NULL),(69,'/sku/search','/sku/search',NULL);
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rolerelationship`
--

DROP TABLE IF EXISTS `rolerelationship`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rolerelationship` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `function_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  `action` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=98 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rolerelationship`
--

LOCK TABLES `rolerelationship` WRITE;
/*!40000 ALTER TABLE `rolerelationship` DISABLE KEYS */;
INSERT INTO `rolerelationship` VALUES (30,1,4,0),(31,1,5,0),(32,1,6,0),(33,1,7,0),(34,1,8,0),(35,1,9,0),(36,1,10,0),(37,1,11,0),(38,1,12,0),(39,1,13,0),(40,1,14,0),(41,1,15,0),(42,1,16,0),(43,2,3,0),(44,3,2,0),(45,2,17,0),(46,4,18,0),(47,1,19,0),(48,5,20,0),(49,5,21,0),(50,5,22,0),(51,2,23,0),(52,6,24,0),(53,6,25,0),(54,6,26,0),(55,6,27,0),(56,6,28,0),(57,6,29,0),(58,6,30,0),(59,6,31,0),(60,6,32,0),(61,6,33,0),(62,6,34,0),(63,6,35,0),(64,6,36,0),(65,6,37,0),(66,6,38,0),(67,6,39,0),(68,6,40,0),(69,6,41,0),(70,6,42,0),(71,6,43,0),(72,7,44,0),(73,7,45,0),(74,7,46,0),(75,8,47,0),(76,8,48,0),(77,8,49,0),(78,8,50,0),(79,8,51,0),(80,9,47,0),(81,8,52,0),(82,8,53,0),(83,9,48,0),(84,9,49,0),(85,9,50,0),(86,9,53,0),(87,8,61,0),(88,9,61,0),(89,9,62,0),(90,8,63,0),(91,8,64,0),(92,8,65,0),(93,8,66,0),(94,8,67,0),(95,9,68,0),(96,9,69,0),(97,8,69,0);
/*!40000 ALTER TABLE `rolerelationship` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `salary`
--

DROP TABLE IF EXISTS `salary`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `salary` (
  `idsalary` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `basic_salary` double DEFAULT NULL,
  `commission` double DEFAULT NULL,
  `date` int(11) DEFAULT NULL,
  `salary_status` int(11) DEFAULT NULL,
  `salary_remark` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idsalary`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `salary`
--

LOCK TABLES `salary` WRITE;
/*!40000 ALTER TABLE `salary` DISABLE KEYS */;
/*!40000 ALTER TABLE `salary` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shop`
--

DROP TABLE IF EXISTS `shop`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `shop` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `domain` varchar(45) DEFAULT NULL,
  `backstage` varchar(45) DEFAULT NULL,
  `backstage_username` varchar(45) DEFAULT NULL,
  `backstage_password` varchar(45) DEFAULT NULL,
  `email_password` varchar(45) DEFAULT NULL,
  `receipt_paypal` varchar(200) DEFAULT NULL,
  `receipt_credit_card` varchar(200) DEFAULT NULL,
  `deduction` varchar(45) DEFAULT NULL,
  `customer_service_email` varchar(45) DEFAULT NULL,
  `shop_api` longtext,
  `authorization_erp` varchar(45) DEFAULT NULL,
  `company_id` int(11) DEFAULT NULL,
  `shop_remark` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shop`
--

LOCK TABLES `shop` WRITE;
/*!40000 ALTER TABLE `shop` DISABLE KEYS */;
INSERT INTO `shop` VALUES (1,'https://www.dreamy-lives.com','https://bestlives.myshopify.com/admin/','studiodtdh@gmail.com','kdf3f3rg','jjdfl2243','mypaypal1@gmail.com, mypaypal1@gmail.com','Asibill 8877301','王健信用卡','shopifycustome01@gmail.com','API密钥=ebe88dc339a33e1b48e404469d85d9fc;密码=6a5f6dd71d23023b98bf95e46371376','是',27,'ssss'),(11,'skdnfj','ksndfkjnk','skdnfkjks','skjndfjn','ksndkj','ksndfkn','ksndfkn','ksndfkjn','ksnfkn','skndfkjn','sknfkj',40,'skjdnfkj'),(12,'jabkjnasbdbwuajksdn','ksjdfkjnkjenfjksn','ksjndfkjnsk','skndfkjnsdkfjn','skdnfjsndfkn','ksndfkjsn','ksjndfjsnf','ksndfkjn','ksnfjn','ksndfkjnk','ksndfkj',42,'s'),(14,'kansdjaksnfj','knjsndfkan','knskjdnkj','kandkjnk','andkjan','ksnkfjnskj','kjsnkfnskj','ksndfkjnsdj','ksnfj','sjndfknsdkjfn','ksndfkjnk',35,'skndfknfs'),(15,'ksjbdfsdkjfn','ksndkjfnskjdn','ksndfjsndfk','ksndfknkj','ksndfknkj','skndfjnskdn','kjnskdnfksndfkj','ksndfkdjnfkj','ksnkdfnkn','ksndkfnskdn','ksndfkn',32,'skjndfkjn'),(16,'aksnkdjnakfnkasnj','kjnskdnkajndkj','knskjdnkajnd','knaksdnkas','knksjndkansdk','knskdnk','kanksdnkj','kanskdn','knasdkn','knksndkansk','knaksndk',41,'asdalnskjnfkjasd'),(17,'aksfkjanskdjn','knsakjndkjans','ksjnkdnfksj','ksnfdjsndkj','ksndfkjns','knskdnfkn','ksndkfnk','ksndkfnk','skndfjn','ksndfkjnskj','ksjndkfn',43,'ksjndfkn'),(18,'aksnfnasjndk','ksndjfnkj','ksndkfnskjndfk','ksnkdfnksn','ksnkdfnksjdnk','ksnkdfnkj','ksndkfjnk','ksndkfnksjdnk','ksndkfn','kksnjdkfjnskn','ksndkfnk',41,'skjndfkn'),(19,'fjankjsndkn','ksdkjngksjndkfn','knskdfnkn','ksndknskj','kjsndfkjnk','ksndfkjnsdkn','ksndknfksjnd','ksndfjnskdn','ksjndjfnskd','ksnkdjfnsdfj','sjdnfksjndfk',34,'skjdnfkjsn');
/*!40000 ALTER TABLE `shop` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `team`
--

DROP TABLE IF EXISTS `team`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `team` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `team_name` varchar(200) NOT NULL,
  `apart_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team`
--

LOCK TABLES `team` WRITE;
/*!40000 ALTER TABLE `team` DISABLE KEYS */;
/*!40000 ALTER TABLE `team` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teamrelationship`
--

DROP TABLE IF EXISTS `teamrelationship`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `teamrelationship` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `team_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `isleader` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teamrelationship`
--

LOCK TABLES `teamrelationship` WRITE;
/*!40000 ALTER TABLE `teamrelationship` DISABLE KEYS */;
/*!40000 ALTER TABLE `teamrelationship` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(50) CHARACTER SET utf8 NOT NULL,
  `password` varchar(50) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '0',
  `phone_number` varchar(45) DEFAULT NULL,
  `email` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'cimi','123456',0,'15926438053','714104989@qq.com'),(2,'余啸','123456',0,'1598888888','yuxiao@email.com'),(4,'余啸','123456',1,'1598888888','yuxiao@gmail.com'),(6,'yuxiao','123456',1,'1277681763','yuxiao@hmail.com'),(7,'余啸','123456',1,'17819823','asdkjkn@akjsn.com'),(8,'aaa','123456',0,'12222222','aaaa@qqq.com');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `yunyin`
--

DROP TABLE IF EXISTS `yunyin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `yunyin` (
  `idyunyin` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) DEFAULT NULL,
  `shop_id` int(11) DEFAULT NULL,
  `paid_orders` int(11) DEFAULT NULL,
  `ad_cost` int(11) DEFAULT NULL,
  `turnover` int(11) DEFAULT NULL,
  `unit_price` int(11) DEFAULT NULL,
  `formalities_cost` int(11) DEFAULT NULL,
  `register_cost` int(11) DEFAULT NULL,
  `product_total_cost` int(11) DEFAULT NULL,
  `ROI` int(11) DEFAULT NULL,
  `unit_ad_cost` int(11) DEFAULT NULL,
  `gross_profit` int(11) DEFAULT NULL,
  `gross_profit_rate` int(11) DEFAULT NULL,
  `date` int(11) DEFAULT NULL,
  `review_status` int(11) DEFAULT NULL,
  `reviewer` int(11) DEFAULT NULL,
  `review_time` int(11) DEFAULT NULL,
  `yunyin_remark` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idyunyin`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `yunyin`
--

LOCK TABLES `yunyin` WRITE;
/*!40000 ALTER TABLE `yunyin` DISABLE KEYS */;
/*!40000 ALTER TABLE `yunyin` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-11-12 11:27:41
