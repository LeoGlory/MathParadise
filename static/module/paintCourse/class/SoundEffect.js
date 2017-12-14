var SoundEffect = {
    
    
    rightSoundUrl:"../../../soundeffect/right.mp3",
    wrongSoundUrl:"../../../soundeffect/wrong.mp3",
	sound:new Audio(),
	greatSound:null/*new Audio("../../../soundeffect/great.mp3")*/,
	playRight:function()
	{
		//this.reset();
		//console.log("this.rightSound="+this.rightSound)
		if(this.sound)
		{
            this.sound.src = SoundEffect.rightSoundUrl;
            this.sound.play();
            
		}
	},
	playWrong:function()
	{
		//this.reset();
        
        if(this.sound)
        {
            this.sound.src = SoundEffect.wrongSoundUrl;
            this.sound.play();
            
        }
    },
	playGreat:function()
	{
		//this.reset();
        if(this.sound)
        {
            this.sound.src = SoundEffect.rightSoundUrl;
            this.sound.play();
            
        }
    },
	reset:function()
	{
		if(this.rightSound && !this.rightSound.paused)
		{
			this.rightSound.pause();
			this.rightSound.currentTime=0;
		}
		if(this.wrongSound && !this.wrongSound.paused)
		{
			this.wrongSound.pause();
			this.wrongSound.currentTime=0;
		}
		if(this.greatSound && !this.greatSound.paused)
		{
			this.greatSound.pause();
			this.greatSound.currentTime=0;
		}
		
	}

}