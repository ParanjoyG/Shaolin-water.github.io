class atta {
    constructor(x,y) {
    this.width = x;
    this.height = y;
    this.riprad = 8;
    this.rwidth = this.width >> 1;
    this.rheight = this.height >> 1;
    this.ssize = this.width * (this.height + 2) * 2;
    this.ripplemap = new Array(this.ssize);
    this.col = new Array(this.width * this.height);
    for(this.i=0;this.i<4;this.i++){
      this.col[this.i] = new Array(4);
    }
    this.ttexture = new Array(this.width * this.height);
    this.oldind = this.width;
    this.newind = this.width * (this.height + 3);
    }
  
  
  
    newframe() {
      // update the height map and the image
      this.i = this.oldind;
      this.oldind = this.newind;
      this.newind = this.i;
  
      this.i = 0;
      this.mapind = this.oldind;
      for (this.y = 0; this.y < this.height; this.y++) {
        for (this.x = 0; this.x < this.width; this.x++) {
            this.data = ((this.ripplemap[this.mapind - this.width] + this.ripplemap[this.mapind + this.width] + 
            this.ripplemap[this.mapind - 1] + this.ripplemap[this.mapind + 1]) >> 1);
            this.data -= this.ripplemap[this.newind + this.i];
            this.data -= this.data >> 5;
          if (this.x == 0 || this.y == 0) // avoid the wraparound effect
          this.ripplemap[this.newind + this.i] = 0;
          else
          this.ripplemap[this.newind + this.i] = this.data;
  
          // where data = 0 then still, where data > 0 then wave
          this.data = (1024 - this.data);
  
          // offsets
          this.a = ((this.x - this.rwidth) * this.data / 1024) + this.rwidth;
          this.b = ((this.y - this.rheight) * this.data / 1024) + this.rheight;
  
          //bounds check
          if (this.a >= this.width) 
          this.a = this.width - 1;
          if (this.a < 0) 
          this.a = 0;
          if (this.b >= this.height) 
          this.b = this.height-1;
          if (this.b < 0) 
          this.b=0;
          for(this.k=0;this.k<4;this.k++){
          this.col[this.i][this.k] = img.pixels[4*(this.a + (this.b * this.width))+this.k];}
          this.mapind++;
          this.i++;
        }
      }
    }
  }
  