import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommentaireService } from '../_services/commentaire.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';
import { VoitureService } from '../_services/voiture.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username: string;
  content: string;
  voitures: any;
  idUser = Number;
  currentVoiture = null;
  currentIndex = -1;
  closeResult: string;
  submitted = false;
  voitureId : Number;
  voitureActuel:any;
  voitureToAddAnComment: any;

  commentaire = {
    detailsCommentaire: '',
    userId:'',
    voitureId:''
  }

  constructor(private userService: UserService,
              private voitureService: VoitureService, 
              private tokenStorageService: TokenStorageService,
              private modalService : NgbModal,
              private commentaireService: CommentaireService) { }
              open(content) {
                this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
                  this.closeResult = `Closed with: ${result}`;
                }, (reason) => {
                  this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
                });
              }
            
              private getDismissReason(reason: any): string {
                if (reason === ModalDismissReasons.ESC) {
                  return 'by pressing ESC';
                } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
                  return 'by clicking on a backdrop';
                } else {
                  return `with: ${reason}`;
                }
              }

  ngOnInit() {
    this.retrieveVoitures();
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.userService.getPublicContent().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );


    if (this.isLoggedIn) {

      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.idUser = user.id;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;

      //console.log('ito');
      console.log(this.voitureActuel); //et  
      this.voitureToAddAnComment = this.voitureActuel;
      
    }


  }

  getVoiture(id) {
    this.voitureService.get(id)
      .subscribe(
        data => {
          this.currentVoiture = data;
          console.log(data);
          this.voitureId = this.currentVoiture.id;
          console.log(this.voitureId);
        },
        error => {
          console.log(error);
        });
        this.voitureActuel = this.currentVoiture; //eto le akana ny valeur volohany
        

  }

  saveCommentaire() {
      const data = {
        detailsCommentaire: this.commentaire.detailsCommentaire,
        userId: this.idUser,
        voitureId: this.voitureId
      };
      console.log(data);
      this.commentaireService.createComments(data)
        .subscribe(
          response => {
            console.log(response);
            this.submitted = true;
          },
          error => {
            console.log(error);
          });
  }


  retrieveVoitures() {
    this.voitureService.getAll()
      .subscribe(
        data => {
          this.voitures = data;
          console.log(data);
          ;
          console.log(this.idUser);
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
