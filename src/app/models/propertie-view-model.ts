export class PropertyViewModel 
{
    public name : string;
    public amenities : any[];
    public gallery : any[];
    public specifications : any[];
    public builder : any;
    public locality : string;
    public cost : number;
    public type : string;
    public imgUrl : string;

    /**
     *
     */
    constructor() 
    {
        this.amenities = []; 
        this.gallery = [];
        this.specifications = [];
    }
}
