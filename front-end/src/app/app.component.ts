import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { ApiService } from './api.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	title = 'Application TP3';
	productsAll: any[] = [];
	isLoggedIn = false;
	loginForm = { login: '', password: '' };

	constructor(
		private productService: ProductService,
		private apiService: ApiService
	) { }

	ngOnInit(): void {
		this.checkAuthentication();
	}

	login(): void {
		const { login, password } = this.loginForm;

		this.apiService.loginClient(login, password).subscribe(
			(client) => {
				this.isLoggedIn = true;
				this.loadProducts();
			},
			(error) => {
				console.error('Erreur lors de la connexion :', error);
				this.loginForm = { login: '', password: '' };
			}
		);
	}

	private checkAuthentication(): void {
	}

	private loadProducts(): void {
		this.productService.getProducts().subscribe(
			(data: any[]) => {
				this.productsAll = data;
			},
			(error) => {
				console.error('Erreur lors du chargement des produits :', error);
			}
		);
	}
}
