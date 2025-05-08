create database expat_form;
CREATE TABLE `expat_form`.`users` (
`ID` INT NOT NULL AUTO_INCREMENT , 
`account_type` VARCHAR(10) NOT NULL , 
`username` VARCHAR(40) NOT NULL , 
`password` VARCHAR(255) NOT NULL , 
`full_name` VARCHAR(60) NOT NULL , 
`phone_number` VARCHAR(10) NOT NULL , 
`email_address` VARCHAR(60) NOT NULL , 
`contact_name` VARCHAR(60) NOT NULL , 
`contact_title` VARCHAR(60) NOT NULL , 
PRIMARY KEY (`ID`)
);
