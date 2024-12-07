import { Component, OnInit } from '@angular/core';
import { MapMarkerDetail } from 'src/app/interfaces/MapMarkerDetail.model';
import { Placement } from 'src/app/interfaces/Placement.model';
import { User } from 'src/app/interfaces/User.model';
import { PlacementService } from 'src/app/services/placement/placement.service';
import { PlacementVisitService } from 'src/app/services/placementVisit/placement-visit.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-placements-map-view',
  templateUrl: './placements-map-view.component.html',
  styleUrls: ['./placements-map-view.component.css'],
})
export class PlacementsMapViewComponent implements OnInit{

  zoom = 6;
  center: google.maps.LatLngLiteral = {lat: 53.8603, lng: -3.2455};
  options: google.maps.MapOptions = {
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 4,
  };
  markers : MapMarkerDetail[] = [];
  user: User | undefined;
  placements : Placement[] = [];
  showSmartVisitPlanSuggestions : boolean = false;
  smartVisitPlanSuggestions : Placement[][] = [];

  constructor(private userService : UserService, 
  private placementService : PlacementService,
  private placementVisitService : PlacementVisitService){}

  ngOnInit() {

    this.userService.getUser().subscribe({next : (user) =>{
      if(user){
        this.user = user;
      }
    }});

    this.placementService.getPlacementsByUserId(this.user?.user_id ?? '').subscribe({
      next: (placementList) => {
        this.placements = placementList;
        this.placements.forEach((placement) => {
          if(placement.placement_provider.latitude != undefined && placement.placement_provider.latitude != 0 &&  placement.placement_provider.longitude != undefined &&  placement.placement_provider.longitude != 0){
            this.markers.push(new MapMarkerDetail(
              {lat: placement.placement_provider.latitude, lng: placement.placement_provider.longitude},
              {text : placement.placement_provider.name},
              placement.placement_provider.address + ", " + placement.placement_provider.postcode
            ));
          }
        })
      },
      error : (error) => {
      }
    });
  }
  
  OnShowSmartVisitSuggestions(){
    this.showSmartVisitPlanSuggestions = true;

    if(this.user?.school != undefined){
      this.placementVisitService.getSmartVisitPlanSuggestions(this.user?.school).subscribe({
        next : (smartVisitPlanSuggestions) => {
          this.smartVisitPlanSuggestions = smartVisitPlanSuggestions;
        },
        error : (error) => {}
      })
    }
  }

  
}
