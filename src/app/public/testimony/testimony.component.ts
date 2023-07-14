import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { PlacesService } from 'src/app/shared/services/places.service';
import { tap, catchError } from 'rxjs/operators';




@Component({
  selector: 'app-testimony',
  templateUrl: './testimony.component.html',
  styleUrls: ['./testimony.component.scss']
})
export class TestimonyComponent implements OnInit, AfterViewInit {
  placeId = 'ChIJX5qshlphYAwRaOTvfq48S1A';
  @ViewChild('googleReviewContainer') googleReviewContainer: any;

  service: any;
  public reviews: Array<any> = [];

  constructor(private placesService: PlacesService) { 

  }

  ngOnInit() {
   
  }

  ngAfterViewInit(): void {
    // const request = {
    //   placeId: this.placeId,
    //   fields: ['reviews']
    // };
    // this.service = new google.maps.places.PlacesService(document.getElementById('googleReviews'));
    // console.log('this.service', this.service);
    // this.service.getDetails(request, this.callback);

    this.getPlaceReviews();
  }
  
  // public callback = (place: any, status: any) => {
  //   console.log('place', place);
  //   console.log('status', status);
  //   if (status === google.maps.places.PlacesServiceStatus.OK) {
  //     this.reviews = place.reviews.slice();
  //   }
  // };

  getPlaceReviews(): void {
    console.log(this.googleReviewContainer.nativeElement);
    this.placesService = new PlacesService();

    this.placesService.getPlaceDetails(this.placeId, this.googleReviewContainer.nativeElement)
      .pipe(
        tap((reviews: any[]) => {
          this.reviews = reviews;
          console.log('Reviews:', reviews);
        }),
        catchError((error) => {
          console.error('Error:', error);
          throw error; // Re-throw the error to propagate it to the error handler
        })
      )
      .subscribe();
  }

  createRange(number: any) {
    const items: number[] = [];
    for (let i = 1; i <= number; i++) {
      items.push(i);
    }
    return items;
  }

}