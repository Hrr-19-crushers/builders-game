import * as Phaser from 'phaser'
import * as WebFont from 'webfontloader'

export class BootState extends Phaser.State {
  stage: Phaser.Stage
  fontsReady: boolean

  init () {
    this.stage.backgroundColor = '#EDEEC9';
    this.fontsReady = false;
    this.fontsLoaded = this.fontsLoaded.bind(this);
  }

  preload () {
    WebFont.load({
      google: {
        families: ['Nunito']
      },
      active: this.fontsLoaded
    });

    const text = this.add.text(
      this.world.centerX, 
      this.world.centerY, 
      'loading fonts', 
      { font: '16px Arial', fill: '#dddddd', align: 'center' }
    );
    text.anchor.setTo(0.5, 0.5);

    this.load.image('loaderBg', './assets/images/loader-bg.png');
    this.load.image('loaderBar', './assets/images/loader-bar.png');
  }

  render () {
    if (this.fontsReady) {
      this.game.state.start('Splash');
    }
  }

  fontsLoaded () {
    this.fontsReady = true;
  }

}
