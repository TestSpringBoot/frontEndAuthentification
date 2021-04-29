import { Component, OnInit } from '@angular/core';
import { VoitureService } from 'src/app/_services/voiture.service';

@Component({
  selector: 'app-voiture-list',
  templateUrl: './voiture-list.component.html',
  styleUrls: ['./voiture-list.component.css']
})
export class VoitureListComponent implements OnInit {

  voitures: any;
  currentVoiture = null;
  currentIndex = -1;

  constructor(private voitureService: VoitureService) { }

  ngOnInit() {
    this.retrieveVoitures();
  }

  retrieveVoitures() {
    this.voitureService.getAll()
      .subscribe(
        data => {
          this.voitures = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList() {
    this.retrieveVoitures();
    this.currentVoiture = null;
    this.currentIndex = -1;
  }

  setActiviteVoiture(voiture, index) {
    this.currentVoiture = voiture;
    this.currentIndex = index;
  }

}
