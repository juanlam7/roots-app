import { Component, OnInit } from '@angular/core';
import { Marker } from 'src/app/interfaces/interfaces';
import { AuthService } from 'src/app/services/auth.service';
import { JobsService } from 'src/app/services/jobs.service';

declare var google: any;
declare var Pushbar: any

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  public pushbar:any
  public boxShadow = false

  public currentPage: number = 1;
  public pageSize: number = 0;

  map:any;
  markers: Marker[] = [];

  constructor(private authService: AuthService, private jobsService: JobsService) { }

  ngOnInit() {
    this.pushbar = new Pushbar({
			blur: false,
			overlay: false,
		});

    this.loadMap();
    this.jobsData('init');
  }

  asideClicked(){
    //this.pushbar.close()
    this.boxShadow = !this.boxShadow
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
  }

  renderMarkers() {
    this.markers.forEach(marker => {
      this.addMarker(marker);
    });
  }

  addMarker(marker: Marker) {
    let job = new google.maps.Marker({
      position: { lat: parseFloat(marker.latitude), lng: parseFloat(marker.longitude) },
      map: this.map,
      title: marker.title
    });

    let infowindow = new google.maps.InfoWindow({
      content: 'Nombre: ' + marker.title + '</br> Latitude: ' + marker.latitude + '</br> Longitude: ' + marker.longitude
    });
    job.addListener('click', () => {
      infowindow.open(this.map, job);
    });
  }

  setJobb(lpf:any){
    const centrado = {lat: parseFloat(lpf.latitude), lng: parseFloat(lpf.longitude)};
    this.map.setCenter(centrado)
    this.map.setZoom(6);
  }

  jobsData(type:any = '') {
    if(type === 'previous') {
      console.log('previous')
      this.currentPage--
      this.jobsService.getJobs(this.currentPage).subscribe((res) => {
        this.markers = res.data;
        console.log(res.data)
        this.renderMarkers();
      })
    } else if (type === 'next') {
      console.log('next')
      console.log(this.markers.length)
      this.currentPage++
      this.jobsService.getJobs(this.currentPage).subscribe((res) => {
        this.markers = res.data;
        this.pageSize = res.last_page;
        this.renderMarkers();
      })
    } else if (type === 'init') {
      console.log('init')
      this.jobsService.getJobs(this.currentPage).subscribe((res) => {
        this.markers = res.data;
        this.renderMarkers();
      })
    }
  }
}
