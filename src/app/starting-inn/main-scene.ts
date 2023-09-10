import { PathLocationStrategy } from "@angular/common";

export class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'main' });
  }

  preload() {
    this.load.tilemapCSV('map', '../../assets/startInnMap.csv');
    this.load.image('floors', '../../assets/floors.png');
  }

  create() {
    const map = this.make.tilemap({ key: 'map' });
    const floorTileset = map.addTilesetImage('Floors', 'floors');

    const floorLayer = map.createLayer('layer', floorTileset as any);
  }
}
