import { PathLocationStrategy } from "@angular/common";

export class MainScene extends Phaser.Scene {

  player: any;
  points: any = [ // wench waypoints
    { x: 360, y: 50}, 
    { x:460 ,y:155 }, 
    { x:75 ,y:155 }, 
    { x:330 ,y:155 }, 
    { x:360 ,y:50 }
  ]
  initialX: number = 360;
  initialY: number = 50;
  newAnimationKey: string = '';

  constructor() {
    super({ key: 'main' });
  }

  preload() {
    // Map Assets Load
    this.load.tilemapTiledJSON('map', '../../assets/startingInnMap.json');
    this.load.image('floors', '../../assets/floors.png');
    this.load.image('Interior', '../../assets/Interior.png');
    this.load.image('Dungeon_Tileset', '../../assets/Dungeon_Tileset.png');

    // Hero Assets Load
    this.load.image('adventurer-run-00', '../../assets/adventurer-run-00.png');
    this.load.image('adventurer-run-01', '../../assets/adventurer-run-01.png');
    this.load.image('adventurer-run-02', '../../assets/adventurer-run-02.png');
    this.load.image('adventurer-run-03', '../../assets/adventurer-run-03.png');
    this.load.image('adventurer-run-04', '../../assets/adventurer-run-04.png');
    this.load.image('adventurer-run-05', '../../assets/adventurer-run-05.png');

    this.load.image('adventurer-idle-00', '../../assets/adventurer-idle-00.png');
    this.load.image('adventurer-idle-01', '../../assets/adventurer-idle-01.png');
    this.load.image('adventurer-idle-02', '../../assets/adventurer-idle-02.png');

    // NPCs Assets Load
    this.load.spritesheet('chiarMan1', '../../assets/Sitting - Chair.png', {
      frameWidth: 64,
      frameHeight: 64
    });
    this.load.spritesheet('chiarMan2', '../../assets/Sitting - Chair2.png', {
      frameWidth: 64,
      frameHeight: 64
    });
    this.load.spritesheet('chiarMan3', '../../assets/Sitting - Chair3.png', {
      frameWidth: 64,
      frameHeight: 64
    });
    this.load.spritesheet('chiarMan4', '../../assets/Sitting - Chair4.png', {
      frameWidth: 64,
      frameHeight: 64
    });
    this.load.spritesheet('chiarMan5', '../../assets/Sitting - Chair5.png', {
      frameWidth: 64,
      frameHeight: 64
    });
    this.load.spritesheet('chiarMan6', '../../assets/Sitting - Chair6.png', {
      frameWidth: 64,
      frameHeight: 64
    });
    this.load.spritesheet('chiarMan7', '../../assets/Sitting - Chair7.png', {
      frameWidth: 64,
      frameHeight: 64
    });
    this.load.spritesheet('chiarMan8', '../../assets/Sitting - Chair8.png', {
      frameWidth: 64,
      frameHeight: 64
    });
    this.load.spritesheet('chiarMan9', '../../assets/Sitting - Chair9.png', {
      frameWidth: 64,
      frameHeight: 64
    });
    this.load.spritesheet('chiarMan10', '../../assets/Sitting - Chair10.png', {
      frameWidth: 64,
      frameHeight: 64
    });

    // NPC Wench Asset Load
    this.load.spritesheet('wench', '../../assets/Generic Female NPCs.png', {
      frameWidth: 46,
      frameHeight: 96
    });
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

    // NPCs Implementation
    let npc1 = this.add.sprite(35, 175, 'chiarMan3', 3);
    npc1.setAngle(5);
    let npc2 = this.add.sprite(109, 175, 'chiarMan4', 1);
    npc2.setAngle(-15);

    let npc3 = this.add.sprite(35, 240, 'chiarMan1', 3);
    npc3.setAngle(5);
    let npc4 = this.add.sprite(109, 240, 'chiarMan6', 1);
    npc4.setAngle(-15);

    let npc5 = this.add.sprite(295, 175, 'chiarMan7', 3);
    npc5.setAngle(15);
    let npc6 = this.add.sprite(365, 175, 'chiarMan2', 1);
    npc6.setAngle(-15);

    let npc7 = this.add.sprite(425, 175, 'chiarMan8', 3);
    npc7.setAngle(15);
    let npc8 = this.add.sprite(495, 175, 'chiarMan9', 1);
    npc8.setAngle(-15);

    let npc9 = this.add.sprite(425, 240, 'chiarMan5', 3);
    npc9.setAngle(15);
    let npc10 = this.add.sprite(495, 240, 'chiarMan10', 1);
    npc10.setAngle(-15);

    // Player Implementation
    this.player = this.physics.add.sprite(44, 120, 'hero').setScale(1.5);
    this.player.setCollideWorldBounds(true);

    interiorCollideLayer?.setCollisionByExclusion([-1], true);
    this.physics.add.collider(this.player, interiorCollideLayer as any);

    // Wench Implementation
    let wench = this.physics.add.sprite(this.initialX, this.initialY, 'wench', 1).setScale(0.5);
    this.moveWench.call(this, wench);

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

    // Wench Animations
    this.anims.create({
      key: 'walk-down',
      frames: this.anims.generateFrameNumbers('wench', { start: 0, end: 2 }),
      frameRate: 10,
      repeat: -1
    });
    
    this.anims.create({
      key: 'walk-left',
      frames: this.anims.generateFrameNumbers('wench', { start: 12, end: 14 }),
      frameRate: 10,
      repeat: -1
    });
    
    // this.anims.create({
    //   key: 'walk-right',
    //   frames: this.anims.generateFrameNumbers('wench', { start: 6, end: 8 }),
    //   frameRate: 10,
    //   repeat: -1
    // });
    
    // this.anims.create({
    //   key: 'walk-up',
    //   frames: this.anims.generateFrameNumbers('wench', { start: 9, end: 11 }),
    //   frameRate: 10,
    //   repeat: -1
    // });
  }

  override update() {
    const cursor = this.input.keyboard?.createCursorKeys();

    if (cursor) {
      if (cursor.up.isDown) {
        this.player.setVelocityY(-160);
        if (!cursor.left.isDown && !cursor.right.isDown) {
          this.player.setVelocityX(0);
        }
        this.player.anims.play('walk', true);
      } 
      else if (cursor.down.isDown) {
        this.player.setVelocityY(160);
        if (!cursor.left.isDown && !cursor.right.isDown) {
          this.player.setVelocityX(0);
        }
        this.player.anims.play('walk', true);
      } 
      else {
        this.player.setVelocityY(0);
      }
    
      if (cursor.left.isDown) {
        this.player.setVelocityX(-160);
        if (!cursor.up.isDown && !cursor.down.isDown) {
          this.player.setVelocityY(0);
        }
        this.player.anims.play('walk', true);
        this.player.setFlipX(true);
      } 
      else if (cursor.right.isDown) {
        this.player.setVelocityX(160);
        if (!cursor.up.isDown && !cursor.down.isDown) {
          this.player.setVelocityY(0);
        }
        this.player.anims.play('walk', true);
        this.player.setFlipX(false);
      } 
      else {
        this.player.setVelocityX(0);
      }
    
      if (!cursor.up.isDown && !cursor.down.isDown && !cursor.left.isDown && !cursor.right.isDown) {
        this.player.anims.play('idle', true);
      }
    }    
  }

  pickRandomPoint() {
    return Phaser.Math.RND.pick(this.points);
  }

  moveWench(wench: any) {
    let point: any = this.pickRandomPoint();
    
    if (point.x > this.initialX) {
      this.newAnimationKey = 'walk-right';
    } else if (point.x < this.initialX) {
      this.newAnimationKey = 'walk-left';
    } else if (point.y > this.initialY) {
      this.newAnimationKey = 'walk-down';
    } else if (point.y < this.initialY) {
      this.newAnimationKey = 'walk-up';
    }

    // this.tweens.add({
    //   targets: wench,
    //   x: point.x,
    //   y: point.y,
    //   duration: 5000,
    //   onStart: () => {
    //     wench.anims.play(this.newAnimationKey, true);
    //   },
    //   onComplete: () => {
    //     this.initialX = point.x;
    //     this.initialY = point.y;
    //     this.moveWench(wench)
    //   }
    // });
  }
}
