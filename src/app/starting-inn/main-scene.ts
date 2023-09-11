import { PathLocationStrategy } from "@angular/common";

export class MainScene extends Phaser.Scene {

  player: any;

  constructor() {
    super({ key: 'main' });
  }

  preload() {
    this.load.tilemapTiledJSON('map', '../../assets/startingInnMap.json');
    this.load.image('floors', '../../assets/floors.png');
    this.load.image('Interior', '../../assets/Interior.png');
    this.load.image('Dungeon_Tileset', '../../assets/Dungeon_Tileset.png');

    this.load.image('adventurer-run-00', '../../assets/adventurer-run-00.png');
    this.load.image('adventurer-run-01', '../../assets/adventurer-run-01.png');
    this.load.image('adventurer-run-02', '../../assets/adventurer-run-02.png');
    this.load.image('adventurer-run-03', '../../assets/adventurer-run-03.png');
    this.load.image('adventurer-run-04', '../../assets/adventurer-run-04.png');
    this.load.image('adventurer-run-05', '../../assets/adventurer-run-05.png');

    this.load.image('adventurer-idle-00', '../../assets/adventurer-idle-00.png');
    this.load.image('adventurer-idle-01', '../../assets/adventurer-idle-01.png');
    this.load.image('adventurer-idle-02', '../../assets/adventurer-idle-02.png');

  }

  create() {
    // Map Implementation
    const map = this.make.tilemap({ key: 'map' });

    const floorTileset = map.addTilesetImage('floors', 'floors');
    const interiorCollideTileset = map.addTilesetImage('Interior', 'Interior');
    const interiorNonCollideTileset = map.addTilesetImage('Interior', 'Interior');
    const doorTileset = map.addTilesetImage('Interior', 'Interior');

    const floorLayer = map.createLayer('Floor Layer', floorTileset as any);
    const interiorCollideLayer = map.createLayer('Collision Interiors Layer', interiorCollideTileset as any);
    const interiorNonCollideLayer = map.createLayer('Door Stairs Layer', interiorNonCollideTileset as any);
    const doorLayer = map.createLayer('Door Layer', doorTileset as any);

    // Player Implementation
    this.player = this.physics.add.sprite(35, 120, 'hero');
    this.player.setCollideWorldBounds(true);

    interiorCollideLayer?.setCollisionByExclusion([-1], true);
    this.physics.add.collider(this.player, interiorCollideLayer as any);

    // Player Animations
    this.anims.create({      
      key: 'idle',
      frames: [
        { key: 'adventurer-idle-00' },
        { key: 'adventurer-idle-01' },
        { key: 'adventurer-idle-02' }
      ],
      frameRate: 10,
      repeat: -1,
    });
  
    this.anims.create({
      key: 'walk',
      frames: [
        { key: 'adventurer-run-00' },
        { key: 'adventurer-run-01' },
        { key: 'adventurer-run-02' },
        { key: 'adventurer-run-03' },
        { key: 'adventurer-run-04' },
        { key: 'adventurer-run-05' }
      ],
      frameRate: 10,
      repeat: -1,
    });
  }

  override update() {
    const cursor = this.input.keyboard?.createCursorKeys();

    if (cursor) {
      if (cursor.up.isDown) {
        this.player.setVelocityY(-160);
        this.player.anims.play('walk', true);
      }
      else if (cursor.down.isDown) {
        this.player.setVelocityY(160);
        this.player.anims.play('walk', true);
      }
      else if (cursor.left.isDown) {
        this.player.setVelocityX(-160);
        this.player.anims.play('walk', true);
      }
      else if (cursor.right.isDown) {
        this.player.setVelocityX(160);
        this.player.anims.play('walk', true);
      }
      else {
        this.player.setVelocityX(0);
        this.player.setVelocityY(0);
        this.player.anims.play('idle', true);
      }
    }
  }
}
