USE `burger_db`;
SELECT *, GROUP_CONCAT(`nameToppings` SEPARATOR ',') AS `toppings`
FROM `Burgers`
NATURAL JOIN `BurgersToppings`
NATURAL JOIN `Toppings`
GROUP BY `idBurgers`
ORDER BY `idBurgers`