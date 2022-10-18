import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { switchMap } from 'rxjs';

import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [`
    img {
      width: 100%;
      border-radius: 5px;
    }
  `]
})
export class HeroeComponent implements OnInit {

  public paramsUrlID: string = "";
  heroe!: Heroe; 

  constructor(  private activeRoute: ActivatedRoute, 
                private heroesService: HeroesService,
                private router: Router ) { }

  ngOnInit(): void {
    this.paramsUrlID = this.activeRoute.snapshot.params['id']
    
    this.getHeroeById();

    // Con Fernando -- Un OBSERVABLE para atrapar el ID de la URL
    // this.activeRoute.params.subscribe( ( { id } ) => console.log( id ));

    // Con Fernando -- Un OBSERVABLE para OBTENERER el HEROE según el ID 
    // this.activeRoute.params
    //   .pipe(
    //     switchMap( ({ id }) => this.heroesService.getHeroePorId( id ) )
    //   )
    //   .subscribe(heroe => this.heroe = heroe );

  }
  
  getHeroeById() {
    this.heroesService.getHeroePorId( this.paramsUrlID ).subscribe(
      {
        next: heroe => {
          this.heroe = heroe;   
          console.log(heroe.id);
        },
        error: (error) => {
          alert(error.message);
        }
      });
  }

  regresar(){
    this.router.navigate(['/heroes/listado']);
  }
}
