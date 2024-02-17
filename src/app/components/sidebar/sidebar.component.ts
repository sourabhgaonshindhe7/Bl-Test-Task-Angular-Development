import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { State } from '../../shared/models/state.model'


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  drawer: any;
  newStates = new Map<string, string>([
    ['AN', 'Andaman and Nicobar Islands'],
    ['AP', 'Andhra Pradesh'],
    ['AR', 'Arunachal Pradesh'],
    ['AS', 'Assam'],
    ['BR', 'Bihar'],
    ['CH', 'Chandigarh'],
    ['CT', 'Chhattisgarh'],
    ['DN', 'Dadra and Nagar Haveli'],
    ['DD', 'Daman and Diu'],
    ['DL', 'Delhi'],
    ['GA', 'Goa'],
    ['GJ', 'Gujarat'],
    ['HR', 'Haryana'],
    ['HP', 'Himachal Pradesh'],
    ['JK', 'Jammu and Kashmir'],
    ['JH', 'Jharkhand'],
    ['KA', 'Karnataka'],
    ['KL', 'Kerala'],
    ['LD', 'Lakshadweep'],
    ['LA', 'Ladhak'],
    ['MP', 'Madhya Pradesh'],
    ['MH', 'Maharashtra'],
    ['MN', 'Manipur'],
    ['ML', 'Meghalaya'],
    ['MZ', 'Mizoram'],
    ['NL', 'Nagaland'],
    ['OR', 'Odisha'],
    ['PY', 'Puducherry'],
    ['PB', 'Punjab'],
    ['RJ', 'Rajasthan'],
    ['SK', 'Sikkim'],
    ['TN', 'Tamil Nadu'],
    ['TR', 'Telangana'],
    ['TT', 'Tripura'],
    ['UP', 'Uttar Pradesh'],
    ['UT', 'Uttarakhand'],
    ['WB', 'West Bengal']
  ])

  constructor(private breakpointObserver: BreakpointObserver,
    private apiService: ApiService,
    private sharedService: SharedService) { }

  ngOnInit(): void {
    this.sendDataToComponents();
  }

  sendDataToComponents() {
    this.apiService.getData().subscribe(data => {
      if (data) {
        this.sharedService.setSharedData(data);
      }
    });
    this.sharedService.setNewStates(this.newStates)
  }

  toggle() {
    this.drawer.toggle();
  }

}
