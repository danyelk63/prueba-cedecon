import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  score: number = 0;
  selected: string = "";
  response: string = "";
  message: number = 0;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    let scoreSaved = localStorage.getItem("score");
    if (scoreSaved)
      this.score = parseInt(scoreSaved);
    else
      localStorage.setItem("score", "0");


    let result = document.getElementById("result");
    if (result) {
      result.style.display = "none";
    }
  }

  openRules() {
    this.dialog.open(RulesDialog);
  }

  setOption(option: string) {
    this.selected = option;
    let content = document.getElementById("content");
    let result = document.getElementById("result");
    let elementResult = document.getElementById("option-result");
    let elementResponse = document.getElementById("option-response");
    let options = ["rock", "paper", "scissors", "lizard", "spock"];

    if (content) {
      content.style.display = "none";
    }

    if (result) {
      result.style.display = "flex";
    }

    if (elementResult) {
      elementResult.classList.remove("rock");
      elementResult.classList.remove("paper");
      elementResult.classList.remove("scissors");
      elementResult.classList.remove("lizard");
      elementResult.classList.remove("spock");
      elementResult.classList.add(option);
    }

    this.response = options[Math.floor(Math.random() * ((options.length - 1) - 0)) + 0];

    if (elementResponse) {
      elementResponse.classList.remove("rock");
      elementResponse.classList.remove("paper");
      elementResponse.classList.remove("scissors");
      elementResponse.classList.remove("lizard");
      elementResponse.classList.remove("spock");
      elementResponse.classList.add(this.response);
    }

    if (this.selected == "rock" && (this.response == "lizard" || this.response == "scissors"))
      this.message = 1;
    else if (this.selected == "paper" && (this.response == "rock" || this.response == "spock"))
      this.message = 1;
    else if (this.selected == "scissors" && (this.response == "paper" || this.response == "lizard"))
      this.message = 1;
    else if (this.selected == "lizard" && (this.response == "spock" || this.response == "paper"))
      this.message = 1;
    else if (this.selected == "spock" && (this.response == "scissors" || this.response == "rock"))
      this.message = 1;
    else if (this.selected == this.response)
      this.message = 3;
    else
      this.message = 2;

    localStorage.removeItem("score");
    localStorage.setItem("score", this.score + (this.message == 1 ? 1 : this.message == 2 ? -1 : 0) + "");

    let scoreSaved = localStorage.getItem("score");
    if (scoreSaved)
      this.score = parseInt(scoreSaved);

  }

  again() {
    let content = document.getElementById("content");
    let result = document.getElementById("result");

    if (content) {
      content.style.display = "block";
    }

    if (result) {
      result.style.display = "none";
    }
  }
}


@Component({
  selector: 'rules-dialog',
  template: `
  <div>
    <h1>RULES</h1>
    <img src="../../assets/image-rules-bonus.svg" class="rules">
    <img class="close" src="../../assets/icon-close.svg" (click)="onNoClick()">
  </div>
  
  <style>
    h1{
      font-size: 30px;
      color: hsl(229, 25%, 31%);
    }

    .close{
      position: absolute;
      top: 10px;
      right: 10px;
      width: 25px;
      height:25px;
      cursor: pointer;
    }

    div{
      position: relative;
    }

    @media (max-width: 719px) {
      .rules {
        width: 250px;
      }
    }
  </style>
  `,
})
export class RulesDialog {
  constructor(
    public dialogRef: MatDialogRef<RulesDialog>
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}