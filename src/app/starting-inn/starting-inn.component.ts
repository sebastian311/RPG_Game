import { Component, OnInit } from '@angular/core';
import { MainScene } from "./main-scene"
import Phaser from 'phaser';

@Component({
  selector: 'app-starting-inn',
  templateUrl: './starting-inn.component.html',
  styleUrls: ['./starting-inn.component.scss']
})
export class StartingInnComponent implements OnInit{
  phaserGame: Phaser.Game;
  config: Phaser.Types.Core.GameConfig;

  constructor() {
    this.config = {
      type: Phaser.AUTO,
      height: 10 * 32,
      width: 14 * 32,
      scene: [ MainScene ],
      parent: 'gameContainer',
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 100 }
        }
      }
    };
  }

  ngOnInit() {
    this.phaserGame = new Phaser.Game(this.config);
  }

}
