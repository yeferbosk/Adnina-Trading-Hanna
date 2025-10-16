import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { DecimalPipe, CommonModule } from '@angular/common';
import {LoginService} from "../services/login.service";
import {OrdenService} from "../services/orden.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule, // <-- NECESARIO para *ngIf
    DecimalPipe
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  userCountry: string = 'colombia';
  userName: string = 'Jhon Doe';
  userRole: string = 'Inversionista';
  portfolioUSD: number = 0.0;
  userlist = []
  money:any = 0.0
  user : any = ''
  isAdmin = false;
  isAdminRoute= false;
  constructor(private router: Router , private loginService: LoginService  , private orderService: OrdenService) {


  }

  ngOnInit(): void {

    if (this.router.url === '/admin') {
        this.isAdminRoute = true;
    }




    const username = localStorage.getItem('username');
    this.loginService.getUsers().subscribe(users => {
      this.userlist = users;
      const foundUser = users.find((u: any) => u.username === username);

      if (foundUser) {
        this.user = foundUser;
        console.log('Usuario encontrado:', this.user);

        this.userName = this.user.full_name;

        // Asignar rol con switch
        switch (foundUser.rol) {
          case 1:
            this.userRole = 'ADMIN';
            this.isAdmin = true;
            break;
          case 2:
            this.userRole = 'Accionista';
            break;
          case 3:
            this.userRole = 'Comisionista';
            break;
          default:
            this.userRole = 'Desconocido';
        }


        // Asignar país
        switch (foundUser.city) {
          case 1:
            this.userCountry = 'colombia';
            break;
          case 2:
            this.userCountry = 'ecuador';
            break;
          case 3:
            this.userCountry = 'peru';
            break;
          default:
            this.userCountry = '';
        }

        localStorage.setItem('user', JSON.stringify(this.user));

      } else {
        console.warn('Usuario no encontrado');
      }

    });


    setInterval(() => {
      this.orderService.calcularPortafolio(this.user.id);
      this.money = localStorage.getItem(this.user.username);
      const portfolio = localStorage.getItem('portafolio');
      if (portfolio !== null) {
        this.portfolioUSD = parseFloat(portfolio);
      }
    }, 500); // ca

  }


  logout(): void {
    localStorage.removeItem('access_token')
    this.router.navigate(['/home']);
  }

  admin():void{
    this.router.navigate(['/admin']);
  }

  andina():void{
    this.router.navigate(['/andina']);
  }

  getFlagUrl(country: string): string {
    switch (country.toLowerCase()) {
      case 'colombia':
        return 'https://flagcdn.com/w40/co.png';
      case 'ecuador':
        return 'https://flagcdn.com/w40/ec.png';
      case 'peru':
        return 'https://flagcdn.com/w40/pe.png';
      default:
        return '';
    }
  }
}
