SELECT * 
FROM `Burgers`
NATURAL JOIN `BurgersToppings`
NATURAL JOIN `Toppings`
ORDER BY `idBurgers`