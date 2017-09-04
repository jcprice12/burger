USE `burger_db`;
INSERT INTO `Toppings` (`nameToppings`) VALUES
("guacamole"),
("cheese"),
("bacon"),
("onions"),
("pickles"),
("mayonnaise"),
("mustard"),
("ketchup"),
("lettuce"),
("tomato");

INSERT INTO `Burgers` (`comments`) VALUES
("Medium Please"),
("Cook it however you want I guess"),
("Ehh is this optional?");

INSERT INTO `BurgersToppings` (`idBurgers`, `nameToppings`) VALUES
(2, "cheese"),
(2, "onions"),
(2, "ketchup"),
(2, "mustard"),
(3, "mayonnaise"),#that's really gross
(1, "cheese"),
(1, "onions"),
(1, "ketchup"),
(1, "mustard");
