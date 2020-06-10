/**
 * A slider with track and thumb NOTES: 1. these not working on properties: //% width.min=30 width.max = 160 //% height.min=2 height.max = 10 2. increment property not implemeted 3. may want to add numberic data
 */
enum Orientation {
    //% block="horizontal"
    Horizontal = 0,
    //% block="vertical"
    Vertical = 1,
}
// % weight=100 color=#008080 % groups='["Create",
// "Actions", "Properties"]'
namespace slider {
    //% blockId=sliderCreate block="slider with value %value minimum %minimum maximum %maximum || width %width height %height orientation %orientation"
    //% value.defl=50
    //% min.defl=0
    //% max.defl=100
    //% width.defl=100
    //% height.defl=6
    //% expandableArgumentMode=toggle
    //% inlineInputMode=inline
    //% blockSetVariable=mySlider
    //% weight=100
    //% group="Create"
    export function create(value: number = 50,
        min: number = 0, max: number = 100, width: number = 100, height: number = 6, orientaton: Orientation = Orientation.Horizontal): Slider {
        return new Slider(value, min, max,  width, height, orientaton);
    }
}
// % blockNamespace=slider color="#008080" blockGap=8
class Slider {
    private track: Sprite;
    private track_img: Image;
    private thumb: Sprite;
    private thumb_img: Image
    private _value: number;
    private _min: number;
    private _max: number;
    private _orientation:Orientation;
    private _width: number;
    private _thumb_width:number;
    private _thumb_height:number;
    private _height: number;
    private _left: number;
    private _top: number;
    private _track_color:number;
    private _thumb_color:number;
    private _selected_color: number;    
    private _selected:boolean;
    private _data:string;
    private _thumb_text: string;

    //% group="Properties" blockSetVariable="mySlider"
    //% blockCombine block="value"
    get value(): number {
        return this._value;
    }
    //% group="Properties" blockSetVariable="mySlider"
    //% blockCombine block="value"
    set value(value: number) {
        this._value = value
        this._thumb_text = "";
        this.calc_value();
    }
    private calc_value(){
        this._value = Math.min(Math.max(this._value, this._min), this._max);
        if (this._orientation == Orientation.Horizontal)
        {
            this.thumb.left = this._left - Math.floor(this._thumb_width / 2) + Math.round(this._width *(this._value - this._min) / (this._max - this._min));
        } else {
            this.thumb.top = 120 - this._top - Math.floor(this._thumb_height / 2) - Math.round(this._height *(this._value - this._min) / (this._max - this._min));
        }
        this.thumb.say(this._value.toString());
    }
    //% group="Properties" blockSetVariable="mySlider"
    //% blockCombine block="min"
    get min(): number {
        return this._min;
    }
    //% group="Properties" blockSetVariable="mySlider"
    //% blockCombine block="min"
    set min(value: number) {
        this._min = value;
        this.calc_value();
    }
    //% group="Properties" blockSetVariable="mySlider"
    //% blockCombine block="max"
    get max(): number {
        return this._max;
    }
    //% group="Properties" blockSetVariable="mySlider"
    //% blockCombine block="max"
    set max(value: number) {
        this._max = value;
        this.calc_value();
    }
    //% group="Properties" blockSetVariable="mySlider"
    //% blockCombine block="width"
    get width(): number {
        return this._width;
    }
    //% group="Properties" blockSetVariable="mySlider"
    //% blockCombine block="height"
    get height(): number {
        return this._height;
    }
    //% group="Properties" blockSetVariable="mySlider"
    //% blockCombine block="left"
    get left(): number {
        return this._left;
    }
    //% group="Properties" blockSetVariable="mySlider"
    //% blockCombine block="left"
    set left(value: number) {
        this._left = value;
        this.update_slider();
    }
    //% group="Properties" blockSetVariable="mySlider"
    //% blockCombine block="top"
    get top(): number {
        return this._top;
    }
    //% group="Properties" blockSetVariable="mySlider"
    //% blockCombine block="top"
    set top(value: number) {
        this._top = value;
        this.update_slider();
    }
    //% group="Properties" blockSetVariable="mySlider"
    //% blockCombine block="selected border color"
    get selected_color(): number {
        return this._selected_color;
    }
    //% group="Properties" blockSetVariable="mySlider"
    //% blockCombine block="selected border color"
    set selected_color(value: number) {
        this._selected_color = value;
        this.update_slider();
    }
    //% group="Properties" blockSetVariable="mySlider"
    //% blockCombine block="selected"
    get selected(): boolean {
        return this._selected;
    }
    //% group="Properties" blockSetVariable="mySlider"
    //% blockCombine block="selected"
    set selected(value: boolean) {
        this._selected = value;
        this.update_slider();
    }
    //% group="Properties" blockSetVariable="mySlider"
    //% blockCombine block="data"
    get data(): string {
        return this._data;
    }
    //% group="Properties" blockSetVariable="mySlider"
    //% blockCombine block="data"
    set data(value: string) {
        this._data = value;
        this.update_slider();
    }
    //% group="Properties" blockSetVariable="mySlider"
    //% blockCombine block="thumb text"
    get thumb_text(): string {
        return this._thumb_text;
    }
    //% group="Properties" blockSetVariable="mySlider"
    //% blockCombine block="thumb text"
    set thumb_text(value: string) {
        this._thumb_text = value;
        this.update_slider();
    }
    //% group="Properties" blockSetVariable="mySlider"
    //% blockCombine block="track color"
    get track_color(): number {
        return this._track_color;
    }
    //% group="Properties" blockSetVariable="mySlider"
    //% blockCombine block="track color"
    set track_color(color: number) {
        this._track_color = color;
        this.update_slider();
    }
    //% group="Properties" blockSetVariable="mySlider"
    //% blockCombine block="thumb color"
    get thumb_color(): number {
        return this._thumb_color;
    }
    //% group="Properties" blockSetVariable="mySlider"
    //% blockCombine block="thumb color"
    set thumb_color(color: number) {
        this._thumb_color = color;
        this.update_slider();
    }
    //% group="Properties" blockSetVariable="mySlider"
    //% blockCombine block="thumb sprite"
    get thumb_sprite(): Sprite {
        return this.thumb;
    }
    constructor(value: number, min: number, max: number, width: number, height: number, orientation: Orientation) {
        this._value = value;
        this._min = min;
        this._max = max;
        this._orientation = orientation
        this._width = width;
        this._height = height;
        this._track_color = 6;
        this._thumb_color = 2;
        this._selected_color = 5;
        this.track_img = image.create(this._width, this._height);
        this.track_img.fill(this._track_color);
        this.track = sprites.create(this.track_img);
        if (this._orientation == Orientation.Horizontal){
           this._left = (160 - this._width) / 2;
            this._top = 120 - this._height - 2;
            this._thumb_width = 1;
            this._thumb_height = this._height;
        } else {       
            this._left = 3
            this._top = (120 - this._height) / 2;
            this._thumb_width = this._width;
            this._thumb_height = 1;
        }
        this.thumb_img = image.create(this._thumb_width, this._thumb_height);
        this.thumb_img.fill(this._thumb_color);
        this.thumb = sprites.create(this.thumb_img);
        this._selected = false;
        this.update_slider();
    }
    
    private update_slider() {
        this.track_img.fill(this.track_color);
        this.track.top = this._top;
        this.track.left = this._left;
        this.thumb_img.fill(this._thumb_color);
        if(this._orientation == Orientation.Horizontal){
            this.thumb.top = this._top;
        } else{
            this.thumb.left = this._left;
        }
        
        if (this._selected){
            helpers.imageDrawRect(this.track_img, 0, 0, this._width, this._height, this._selected_color)
        } else {
            helpers.imageDrawRect(this.track_img, 0, 0, this._width, this._height, this._track_color)
        }
        this.calc_value();
        if (!this._thumb_text.isEmpty()){
            this.thumb.say(this._thumb_text);
        }
    }   
}
