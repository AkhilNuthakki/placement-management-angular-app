export class MapMarkerDetail {

    position : google.maps.LatLngLiteral;
    label : google.maps.MarkerLabel;
    title : string

    constructor(position : google.maps.LatLngLiteral, label : google.maps.MarkerLabel, title : string){
        this.position = position;
        this.label = label;
        this.title = title;
    }
}