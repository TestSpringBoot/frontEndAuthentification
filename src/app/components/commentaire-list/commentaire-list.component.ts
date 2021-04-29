import { Component, OnInit } from '@angular/core';
import { CommentaireService } from 'src/app/_services/commentaire.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-commentaire-list',
  templateUrl: './commentaire-list.component.html',
  styleUrls: ['./commentaire-list.component.css']
})
export class CommentaireListComponent implements OnInit {

  commentaires: any;
  currentCommentaire = null;
  currentIndex = -1;

  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username: string;
  content: string;
  currentVoiture = null;

  constructor(private commentaireService: CommentaireService, 
              private tokenStorageService: TokenStorageService,
              private userService: UserService) { }

  ngOnInit() {
    this.retrieveCommentaires();

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

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;
    }
  }

  retrieveCommentaires() {
    this.commentaireService.getAll()
      .subscribe(
        data => {
          this.commentaires = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList() {
    this.retrieveCommentaires();
    this.currentCommentaire = null;
    this.currentIndex = -1;
  }

  setActiviteCommentaire(commentaire, index) {
    this.currentCommentaire = commentaire;
    this.currentIndex = index;
  }

}
