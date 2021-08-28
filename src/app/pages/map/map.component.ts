import { Component, OnInit } from '@angular/core';
import { Marker } from 'src/app/interfaces/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { JobsService } from 'src/app/services/jobs.service';

declare var google: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  map = null;
  markers: Marker[] = [];

  constructor(private authService: AuthService, private jobsService: JobsService) { }

  ngOnInit() {
    this.loadMap();
    this.jobsData();
  }

  loadMap() {

    const mapEle: any | HTMLElement = document.getElementById('map');

    const myLatLng = {lat: 10.491, lng: -66.902};
    // create map
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 4
    });

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      //this.renderMarkers();
      mapEle.classList.add('show-map');
    });

    google.maps.event.addListenerOnce(this.map, 'click', (mapsMouseEvent: any) => {
      //this.renderMarkers();
      console.log(JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2))
    });
  }

  renderMarkers() {
    this.markers.forEach(marker => {
      this.addMarker(marker);
    });
  }

  addMarker(marker: Marker) {
    return new google.maps.Marker({
      position: { lat: parseFloat(marker.latitude), lng: parseFloat(marker.longitude) },
      map: this.map,
      title: marker.title
    });
  }

  jobsData() {
    this.jobsService.getJobs().subscribe((res) => {
      this.markers = res.data;
      this.renderMarkers();
    })
  }
}
