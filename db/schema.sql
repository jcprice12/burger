-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema burger_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema burger_db
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `burger_db`;
CREATE SCHEMA `burger_db` DEFAULT CHARACTER SET utf8 ;
USE `burger_db` ;

-- -----------------------------------------------------
-- Table `burger_db`.`Burgers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Burgers` (
  `idBurgers` INT AUTO_INCREMENT NOT NULL,
  `comments` VARCHAR(255) NULL,
  `date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL,
  `devoured` TINYINT NOT NULL DEFAULT 0,
  `eatenDate` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`idBurgers`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `burger_db`.`Toppings`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Toppings` (
  `nameToppings` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`nameToppings`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `burger_db`.`BurgersToppings`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `BurgersToppings` (
  `idBurgers` INT NOT NULL,
  `nameToppings` VARCHAR(255) NOT NULL,
  INDEX `fk_BurgersToppings_Burgers_idx` (`idBurgers` ASC),
  INDEX `fk_BurgersToppings_Toppings1_idx` (`nameToppings` ASC),
  CONSTRAINT `fk_BurgersToppings_Burgers`
    FOREIGN KEY (`idBurgers`)
    REFERENCES `Burgers` (`idBurgers`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_BurgersToppings_Toppings1`
    FOREIGN KEY (`nameToppings`)
    REFERENCES `Toppings` (`nameToppings`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
