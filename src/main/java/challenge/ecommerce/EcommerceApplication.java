package challenge.ecommerce;

import challenge.ecommerce.enums.Category;
import challenge.ecommerce.enums.UserType;
import challenge.ecommerce.models.Client;
import challenge.ecommerce.models.Product;
import challenge.ecommerce.repositories.ClientRepository;
import challenge.ecommerce.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

@SpringBootApplication
public class EcommerceApplication {

	@Autowired
	private PasswordEncoder passwordEncoder;
	public static void main(String[] args) {
		SpringApplication.run(EcommerceApplication.class, args);
		System.out.println("Application started :)");
	}

	@Bean
	public CommandLineRunner initData(ProductRepository productRepository, ClientRepository clientRepository) {
		return (args) -> {
			// Clients
			Client admin = new Client("admin", "admin","admin@kobestore.com", passwordEncoder.encode("123"),UserType.ADMIN);
			clientRepository.save(admin);

			Client client = new Client("client", "client","client@mail", passwordEncoder.encode("123"),UserType.CLIENT);
			clientRepository.save(client);

			//Products

			//Funko POPS!
			Product product1 = new Product("Funko POP! Goku Casual","Figura de Goku ssj en vinilo de 9 cm","https://i.ibb.co/1mKLVDX/funko-pop-goku-casual-dragon-ball-z.jpg", (short) 15,2499.0,"Dragon Ball Z", Category.ACTIONFIGURES, "Funko POP!");
			productRepository.save(product1);
			Product product2 = new Product("Funko POP! Gotenks Casual","Figura de Gotenks en vinilo de 9 cm","https://i.ibb.co/3htX09L/funko-pop-gotenks-dragon-ball.jpg", (short) 31,2699.0,"Dragon Ball Z", Category.ACTIONFIGURES, "Funko POP!");
			productRepository.save(product2);
			Product product3 = new Product("Funko POP! Future Trunks","Figura de Future Trunks en vinilo de 9 cm","https://i.ibb.co/TbZdL17/funko-pop-trunks-del-futuro-dragon-ball.jpg", (short) 9,4499.0,"Dragon Ball Z", Category.ACTIONFIGURES, "Funko POP!");
			productRepository.save(product3);
			Product product4 = new Product("Funko POP! Android 18","Figura de Android 18 en vinilo de 9 cm","https://i.ibb.co/2scTHyV/212286-800-auto.webp", (short) 5,4999.0,"Dragon Ball Z", Category.ACTIONFIGURES, "Funko POP!");
			productRepository.save(product4);
			Product product5 = new Product("Funko POP! Thanos Gold","Figura de Thanos Gold en vinilo de 9 cm","https://i.ibb.co/DWXjyNs/204545-800-auto.webp", (short) 10,6999.0,"Marvel", Category.ACTIONFIGURES, "Funko POP!");
			productRepository.save(product5);
			Product product6 = new Product("Funko POP! Thor","Figura de Thor en vinilo de 9 cm","https://i.ibb.co/ZX4Pppx/204651-800-auto.webp", (short) 14,4999.0,"Marvel", Category.ACTIONFIGURES, "Funko POP!");
			productRepository.save(product6);
			Product product7 = new Product("Funko POP! Cyclops","Figura de Cyclops en vinilo de 9 cm","https://i.ibb.co/6v7v9XX/205860-800-auto.webp", (short) 13,3499.0,"Marvel", Category.ACTIONFIGURES, "Funko POP!");
			productRepository.save(product7);
			Product product8 = new Product("Funko POP! Storm","Figura de Storm en vinilo de 8 cm","https://i.ibb.co/wS2SWtF/212264-800-auto.webp", (short) 7,4999.0,"Marvel", Category.ACTIONFIGURES, "Funko POP!");
			productRepository.save(product8);
			Product product9 = new Product("Funko POP! Kefla Ssj","Figura de Kefla Ssj en vinilo de 8 cm","https://i.ibb.co/xHb1zdx/205868-800-auto.webp", (short) 14,4999.0,"Dragon Ball Z", Category.ACTIONFIGURES, "Funko POP!");
			productRepository.save(product9);
			Product product10 = new Product("Funko POP! Thor Gold","Figura de Thor Gold en vinilo de 10 cm","https://i.ibb.co/2ZNLfWd/212275-800-auto.webp", (short) 12,5999.0,"Marvel", Category.ACTIONFIGURES, "Funko POP!");
			productRepository.save(product10);

			//Static Figures
			Product product11 = new Product("Marvel Series - Winter Soldier","Figura estatica de Winter Soldier de 20 cm de altura","https://i.ibb.co/hdx9bNN/entrega-011-P24032-9a-marvel-figurines-1647803149626.webp", (short) 7,6999.0,"Marvel", Category.ACTIONFIGURES, "Static Figures");
			productRepository.save(product11);
			Product product12 = new Product("Marvel Series - War Machine","Figura estatica de War Machine de 20 cm de altura","https://i.ibb.co/7nJjFk3/entrega-011-P24031-marvel-figurines-entrega31a-maquina-guerra-1647287255924.webp", (short) 11,6999.0,"Marvel", Category.ACTIONFIGURES, "Static Figures");
			productRepository.save(product12);
			Product product13 = new Product("Marvel Series - Iron Man","Figura estatica de Iron Man de 20 cm de altura","https://i.ibb.co/v4y4GyC/entrega-011-N19055-Marvel-Movie-Collection-entrega55-iron-man-a-1601847012273-cloned-at1635108877273.webp", (short) 4,7999.0,"Marvel", Category.ACTIONFIGURES, "Static Figures");
			productRepository.save(product13);
			Product product14 = new Product("Marvel Series - Ultron","Figura estatica de Ultron de 20 cm de altura","https://i.ibb.co/LzkQHF9/entrega-011-N19024-24a-marvel-figurines-1560511549346-cloned-at1636317846851.webp", (short) 7,6999.0,"Marvel", Category.ACTIONFIGURES, "Static Figures");
			productRepository.save(product14);
			Product product15 = new Product("Marvel Series - Captain America","Figura estatica de Captain America de 20 cm de altura","https://i.ibb.co/gd2X0bH/entrega-011-N19028-28a-marvel-figurines-1564738782765-cloned-at1637490474173.webp", (short) 9,7999.0,"Marvel", Category.ACTIONFIGURES, "Static Figures");
			productRepository.save(product15);
			Product product16 = new Product("Marvel Series - Thor","Figura estatica de Thor de 20 cm de altura","https://i.ibb.co/ZSg6BKp/entrega-011-P24022-Marvel-Movie-Collection-entrega56-thor-a-1638988647449.webp", (short) 12,7999.0,"Marvel", Category.ACTIONFIGURES, "Static Figures");
			productRepository.save(product16);
			Product product17 = new Product("Marvel Series - Hela","Figura estatica de Hela de 20 cm de altura","https://i.ibb.co/rHPMBNK/entrega-011-P24023-Marvel-Movie-Collection-entrega44-hela-a-1639982180388.webp", (short) 17,5999.0,"Marvel", Category.ACTIONFIGURES, "Static Figures");
			productRepository.save(product17);
			Product product18 = new Product("Marvel Series - Black Widow","Figura estatica de Black Widow de 20 cm de altura","https://i.ibb.co/rmVKbY7/entrega-011-P24024-viuda-negra-2-1642009101980.webp", (short) 3,7999.0,"Marvel", Category.ACTIONFIGURES, "Static Figures");
			productRepository.save(product18);
			Product product19 = new Product("Marvel Series - Black Panther","Figura estatica de Black Panther de 20 cm de altura","https://i.ibb.co/S076Dbp/entrega-011-P24028-Marvel-Movie-Collection-entrega51-erik-killmonger-a-1654370239943.webp", (short) 8,6999.0,"Marvel", Category.ACTIONFIGURES, "Static Figures");
			productRepository.save(product19);
			Product product20 = new Product("Marvel Series - Vison","Figura estatica de Vision de 20 cm de altura","https://i.ibb.co/yQ6f1Cj/entrega-011-P24027-19a-marvel-figurines-1652632580845.webp", (short) 13,6999.0,"Marvel", Category.git add , "Static Figures");
			productRepository.save(product20);
		};
	}
}
