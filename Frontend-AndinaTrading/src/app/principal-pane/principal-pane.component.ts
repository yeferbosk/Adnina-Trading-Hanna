import {Component, Inject, numberAttribute, OnInit, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser, NgClass, NgFor, NgIf} from '@angular/common';
import {FormsModule} from "@angular/forms";
import {CompaniesService} from "../services/companies.service";
import {ActionsService} from "../services/actions.service";
import {Router} from "@angular/router";
import {HeaderComponent} from "../header/header.component";
import {OrdenService} from "../services/orden.service";
import {ContractService} from "../services/contract.service";

@Component({
  selector: 'app-principal-pane',
  standalone: true,
  imports: [NgFor, FormsModule, NgIf, HeaderComponent, NgClass],
  templateUrl: './principal-pane.component.html',
  styleUrl: './principal-pane.component.css',
})
export class PrincipalPaneComponent  implements OnInit  {

  symbolPrices: { [symbol: string]: number } = {
    ECO: 108.33,
    MSFT: 883.12,
    GOOGL: 742.46,
    AMZN: 648.55,
    META: 475.38,
    TSLA: 902.77,
    NVDA: 731.24,
    'BRK.B': 336.52,
    JPM: 559.61,
    JNJ: 604.92,
    V: 974.13,
    UNH: 682.41,
    HD: 356.07,
    PG: 681.88,
    XOM: 582.44,
    MA: 508.27,
    PFE: 691.30,
    KO: 267.96,
    DIS: 527.65,
    NFLX: 913.05,
    INTC: 122.58,
    BA: 663.91,
    WMT: 335.60,
    CSCO: 636.20,
    PYPL: 846.73,
    T: 899.43,
    VZ: 687.54,
    UNP: 808.92,
    MMM: 715.02,
    CAT: 294.63,
    RTX: 261.79,
    GS: 774.21,
    BABA: 248.99,
    MRK: 529.17,
    IBM: 296.40,
    ACN: 823.56,
    MS: 634.88,
    LMT: 905.44,
    CVX: 771.72,
    AMGN: 524.09,
    AMT: 197.31,
    CL: 575.80,
    BIIB: 313.57,
    SPG: 678.42,
    COF: 252.15,
    MCD: 845.66,
    COP: 467.38,
    WBA: 362.89,
    CB: 876.21,
    NSC: 437.05,
    SLB: 640.47,
    SYK: 919.62,
    TMO: 410.33,
    DHR: 319.14,
    LHX: 537.58,
    ZTS: 140.29,
    ISRG: 993.22,
    SYY: 153.06,
    ADBE: 948.75,
    MDT: 646.18,
    COST: 786.44,
    MSCI: 932.51,
    SBUX: 214.09,
    GM: 703.66,
    F: 148.32,
    ADP: 404.90,
    AXP: 715.41,
    FIS: 210.37,
    FISV: 284.03,
    AIG: 593.78,
    TDG: 471.02,
    PXD: 557.91,
    EOG: 135.44,
    PLD: 385.69,
    CME: 690.73,
    VRTX: 414.66,
    DE: 764.11,
    BMY: 520.28,
    ZBH: 194.87,
    KMB: 611.26,
    NTAP: 329.74,
    APD: 487.32,
    STZ: 603.90,
    WM: 170.82,
    PSA: 918.04,
    EQIX: 967.12,
    CCI: 415.23,
    PGR: 298.56,
    AFL: 286.45,
    OXY: 647.27,
    DD: 718.50,
    LRCX: 843.77,
    EFX: 689.64,
    MU: 121.08,
    CSX: 413.92,
    BAX: 504.27,
    INTU: 704.63,
    HUM: 726.48,
    HLT: 932.84,
    TGT: 890.70,
    GIS: 599.31,
    CHTR: 858.19,
    GILD: 207.22,
    MRNA: 114.73,
    KLAC: 987.55,
    PEP: 438.66,
    MELI: 936.41,
    XEL: 473.80,
    RSG: 285.04,
    CNC: 359.92,
    CBOE: 628.17,
    EXC: 226.11,
    LUV: 344.79,
    REGN: 558.37,
    AMAT: 955.48,
    DXC: 359.60,
    NOC: 816.03,
    C: 634.22,
    WDC: 381.74,
    UBER: 517.05,
    COO: 252.26,
    CTSH: 696.57,
    SBAC: 182.04,
    AON: 801.62,
    SRE: 271.80,
    HCA: 898.31,
    STT: 261.10,
    VLO: 877.44,
    CARR: 498.27,
    VFC: 309.72,
    LULU: 918.65,
    TROW: 316.50,
    CTAS: 569.91,
    RTN: 453.36,
    ABBV: 787.11,
    BDX: 238.64,
    EMR: 342.76,
    TSN: 674.80,
    SWKS: 704.15,
    WELL: 619.99,
    TFX: 152.74,
    CHD: 493.87,
    WMB: 240.51,
    GE: 884.09,
    AVGO: 909.32,
    WEC: 308.40,
    DOV: 557.01,
    FTV: 566.96,
    MCHP: 856.18,
    USB: 312.47,
    CPB: 184.50,
    NUE: 518.39,
    OKE: 679.16,
    AVY: 169.24,
    SO: 836.45,
    MRO: 556.22,
    SJM: 228.55,
    TAP: 788.70,
    XRX: 696.20,
    NEM: 890.14,
    RCL: 430.78,
    ZBRA: 450.83,
    RHI: 272.43,
    PNC: 651.09,
    ABT: 467.40,
    APTV: 557.39,
    EQR: 410.52,
    JCI: 476.66,
    SNA: 599.32,
    IDXX: 747.13,
    ETN: 973.58,
    ORLY: 892.71,
    TRV: 130.06,
    GPC: 847.28,
    VTRS: 260.83,
    FTNT: 921.46,
    IQV: 952.18,
    HAS: 101.55,
    ORCL: 403.36,
    TYL: 384.61,
    PKG: 597.77,
    SHW: 866.09,
    NVR: 219.46,
    FFIV: 489.68,
    MCO: 602.55,
    HRL: 229.83,
    CBRE: 728.19,
    EXR: 215.44,
    LYB: 940.62,
    RHT: 576.30,
    AEE: 515.71,
    TPR: 900.42,
    CLX: 430.20,
    MKTX: 686.23,
    SPLK: 563.41,
    NKE: 361.75,
    RMD: 933.66,
    HES: 771.88,
    HII: 423.19,
    VRSN: 812.50,
    VRTS: 597.24,
    TRIP: 371.02,
    FMC: 132.49,
    AAPL: 125.75,   // precio que ya tenías
    BXP: 188.33,
    SNPS: 857.47,
    KMX: 278.69,
    CPRT: 701.16,
    ANET: 640.55,
    MKC: 317.74,
    IFF: 549.63,
    NWL: 481.28,
    GRMN: 262.14,
    HRS: 931.22,
    TPX: 112.17,
    ALB: 415.92,
    ESS: 534.69,
    AEP: 625.38,
    GOOG: 793.04,
    HPE: 235.81,
    PRU: 873.57,
    CE: 199.08,
    CVS: 699.95,
    SNAP: 115.22,
    SPGI: 972.71,
    NEE: 809.37,
    LOW: 693.14,
    OMC: 548.63,
    FLIR: 429.56
  };

  contratos: any[] = [];
  selectedAction: any = null;
  searchQuery: string = ''; // Para almacenar el texto de búsqueda
  private sp500symbols: any[] = []
  private widget: any; // Referencia al widget de TradingView
  private isBrowser = false;
  filteredSymbols: string[] = [];
  public symbol: string = 'AAPL'; // Variable que almacena el símbolo seleccionado
  public  stockPrice : number =125.5;
  actions :any = []
  money = 0
  rol = 0
  error: string | null = null;


  constructor(@Inject(PLATFORM_ID) private platformId: Object ,
              private companyService:CompaniesService ,
              private actionService:ActionsService,
              private orderService:OrdenService,
              private contractService:ContractService,
              private route :Router) {
    this.isBrowser = isPlatformBrowser(this.platformId);


  }

  ngOnInit(): void {
    this.getAllActions();
    setInterval(() => {
      this.getAllActions();
      this.getAllContracts();
    }, 500);
    this.getAllCompanies();


    const user = localStorage.getItem('user');

    if(user != null) {

      this.rol = JSON.parse(user).rol;
    }

  }

  ngAfterViewInit() {
    if (this.isBrowser) {
      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/tv.js';
      script.type = 'text/javascript';

      script.onload = () => {
        // @ts-ignore
        this.widget = new TradingView.widget({
          container_id: 'tradingview_12345',
          width: '100%',
          height: '440px',
          symbol: this.symbol, // Usamos la variable 'symbol' aquí
          interval: 'D',
          timezone: 'Etc/UTC',
          theme: 'light',
          style: '1',
          locale: 'en',
          toolbar_bg: '#f1f3f6',
          enable_publishing: false,
          hide_top_toolbar: false,
          save_image: false,
          studies: ['MACD@tv-basicstudies'],
        });
      };

      document.body.appendChild(script);
    }
  }

  // Este método se llama cuando un usuario hace clic en un símbolo de la tabla
  showSymbol(symbol: string): void {
    this.symbol = symbol; // Actualiza la variable de símbolo
    this.stockPrice = this.symbolPrices[this.symbol];
    if (this.widget) {
      this.widget.remove(); // Elimina el gráfico anterior
      this.ngAfterViewInit(); // Vuelve a cargar el gráfico con el nuevo símbolo
    }
  }

  // Método para filtrar los símbolos basado en el término de búsqueda
  filterSymbols(): void {
    this.filteredSymbols = this.sp500symbols.filter(symbol =>
      symbol.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }



  sharesOwned = 0;
  buyQuantity = 1;

  increaseQuantity() {
    this.buyQuantity++;
  }

  decreaseQuantity() {
    if (this.buyQuantity > 1) {
      this.buyQuantity--;
    }
  }

  buyStock() {
    this.sharesOwned += this.buyQuantity;

    const empresaId$ = this.companyService.getCompanyIdByName(this.symbol);

    const user = localStorage.getItem('user');



    if(user != null) {

      const id = JSON.parse(user).id;
      const username = JSON.parse(user).username;
      const money = localStorage.getItem(username);

      if (money !== null) {
        this.money = parseFloat(money); // o Number(valor)
        if( this.money == 0){
          alert('Debe de cargar dinero mediante administracion')
          return;
        }

      empresaId$.subscribe((empresaId) => {
        const order = {
          id: 0,
          tipo_orden: "BUY-" + this.symbol,
          precio: this.stockPrice * this.buyQuantity,
          fecha_hora: this.getFechaHoraActual(),
          comision: 0.15 * (this.stockPrice * this.buyQuantity),
          usuario_id:id ,
          created_at: this.getFechaHoraActual(),
          update_at:null,
          deleted_at:null

        };

        this.money = this.money - order.precio;
        localStorage.removeItem(username);
        localStorage.setItem(username, this.money.toString());
        this.orderService.createOrder(order).subscribe(() => {
          console.log(order);
        });
      });

    }
      }

  }

  sellStock() {
    this.sharesOwned += this.buyQuantity;

    const empresaId$ = this.companyService.getCompanyIdByName(this.symbol);

    const user = localStorage.getItem('user');

    if(user != null) {


      const id = JSON.parse(user).id;
      const username = JSON.parse(user).username;
      const money = localStorage.getItem(username);

      if (money !== null) {
        this.money = parseFloat(money); // o Number(valor)
        if(this.money == 0){
          alert('Debe de cargar dinero mediante administracion')
          return;
        }

        empresaId$.subscribe((empresaId) => {
          const order = {
            id: 0,
            tipo_orden: "SELL-" + this.symbol,
            precio: this.stockPrice * this.buyQuantity,
            fecha_hora: this.getFechaHoraActual(),
            comision: 0.15 * (this.stockPrice * this.buyQuantity),
            usuario_id: id,
            created_at: this.getFechaHoraActual(),
            update_at: null,
            deleted_at: null

          };

          this.money = this.money - order.precio;
          localStorage.removeItem(username);
          localStorage.setItem(username, this.money.toString());

          this.orderService.createOrder(order).subscribe(() => {
            console.log(order);


          });
        });
      }
    }

  }


  getFechaHoraActual(): string {
    const ahora = new Date();

    const year = ahora.getFullYear();
    const month = String(ahora.getMonth() + 1).padStart(2, '0'); // Meses van de 0 a 11
    const day = String(ahora.getDate()).padStart(2, '0');
    const hours = String(ahora.getHours()).padStart(2, '0');
    const minutes = String(ahora.getMinutes()).padStart(2, '0');
    const seconds = String(ahora.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  private getAllActions() {



    const user = localStorage.getItem('user');

    if(user != null) {

      const id = JSON.parse(user).id;

      if(this.rol != 3) {
        this.orderService.getOrder(id).subscribe({
          next: (data) => {
            this.actions = data;
          },
          error: (err) => {
            if (err.status === 401) {
              console.warn('No autorizado. Redirigiendo al home...');
              this.route.navigate(['/login']); // ajusta la ruta según tu app
            } else {
              console.error('Error al obtener acciones:', err.message);
            }
          }
        });
      }else{
        this.orderService.getOrders().subscribe({
          next: (data) => {
            this.actions = data;
          },
          error: (err) => {
            if (err.status === 401) {
              console.warn('No autorizado. Redirigiendo al home...');
              this.route.navigate(['/login']); // ajusta la ruta según tu app
            } else {
              console.error('Error al obtener acciones:', err.message);
            }
          }
        });
      }
    }

  }

  private getAllCompanies() {
    this.companyService.getCompanyNames().subscribe({
      next: (names) => {
        this.sp500symbols = names;
        this.filteredSymbols = [...names];  // Copiar los datos a filteredSymbols
      },
      error: (err) => {
        console.error('Error al obtener empresas:', err.message);
      }
    });
  }



  toggleDetails(action: any): void {
    if (this.selectedAction && this.selectedAction.id === action.id) {
      this.selectedAction = null; // Cierra si se vuelve a hacer clic en la misma
    } else {
      this.selectedAction = action;
    }
  }

  makeContract(usuario_id: any, comision: any){

    const user = localStorage.getItem('user');

    if(user != null) {


      const id = JSON.parse(user).id;


      const contract = {
        numero_contrato: 0,
        fecha_hora_inicio: this.getFechaHoraActual(),
        fecha_hora_fin: this.getFechaHoraActual(),
        comision: comision,
        inversionista_id:id,
        comisionista_id: usuario_id,
        created_at: this.getFechaHoraActual(),
        update_at: null,
        deleted_at: null
      }

      this.contractService.createContract(contract).subscribe(() => {
        console.log(contract);
      })


    }

    this.selectedAction = ''

  }

  private getAllContracts() {
    const user = localStorage.getItem('user');
    if (user != null) {


      const id = JSON.parse(user).id;


      this.contractService.getContracts(id).subscribe({
        next: (names) => {
          this.contratos = names;
        },
        error: (err) => {
          console.error('Error al obtener empresas:', err.message);
        }
      });
    }
  }
}
