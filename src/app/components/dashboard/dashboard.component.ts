import { Component, OnInit, } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { ApiService } from 'src/app/shared/services/api.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { State } from 'src/app/shared/models/state.model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  formGroup !: FormGroup
  states: Array<State> = [];
  newStates: Map<String, String> = new Map();
  stateDataArr: Array<any> = []
  basicData: any
  basicOptions: any
  stackedData: any
  donutData: any
  chartOptions: any = {
    title: {
      display: true,
      text: 'My Title',
      fontSize: 16
    },
    legend: {
      position: 'bottom'
    },
    responsive: false,
    maintainAspectRatio: false,
    width: 400,
    height: 300,
  };
  stackedOptions: any
  constructor(private breakpointObserver: BreakpointObserver,
    private formBuilder: FormBuilder,
    private sharedService: SharedService,
    private apiService: ApiService) {
  }
  ngOnInit(): void {
    this.getApiData();
  }

  getApiData() {
    this.formGroup = this.formBuilder.group({
      selectedState: ['AR'],
    });

    this.sharedService.sharedData$.subscribe(data => {
      if (data) {
        const arrayOfObjects = Object.entries(data).map(([key, value]) => ({ id: key, value }));
        this.stateDataArr = arrayOfObjects
        let districtLabel: Array<String> = [];
        let confirmedData: Array<String> = [];
        let deceasedData: Array<String> = [];
        let recoveredData: Array<String> = [];
        let stateLabelArray: Array<String> = [];
        let stateNumberArray: Array<any> = [];

        if (this.stateDataArr) {
          const stateTotalArray = Object.entries(this.stateDataArr[0]?.value?.total ?? {}).map(([key, value]) => ({ id: key, value }));

          stateTotalArray.filter((stateEle :any) => {
            if (stateEle.id !== "vaccinated1" && stateEle.id !== "vaccinated2" && stateEle.id !== "other") {
              stateLabelArray.push(stateEle.id.toUpperCase())
              stateNumberArray.push(stateEle.value)
            }
          });

          this.donutData = {
            labels: stateLabelArray,
            datasets: [
              {
                data: stateNumberArray,
                backgroundColor: [
                  "#FF6384",
                  "#bf1029",
                  "#759116",
                  "#FFCE56",
                ],
                hoverBackgroundColor: [
                  "#FF6384",
                  "#bf1029",
                  "759116",
                  "#FFCE56",
                ]
              }
            ]
          };

        };
        const districtsArray = Object.entries(this.stateDataArr[0]?.value?.districts ?? {}).map(([key, value]) => ({ id: key, value }));

        districtsArray.filter((ele) => {
          districtLabel.push(ele.id.toUpperCase())
          if (typeof ele === 'object' && ele !== null && 'value' in ele) {
            const value = (ele as any).value;
            confirmedData.push(value.total.confirmed)
            deceasedData.push(value.total.deceased)
            recoveredData.push(value.total.recovered)
          }
        })

        this.basicData = {
          labels: districtLabel,
          datasets: [
            {
              label: 'Confirmed',
              backgroundColor: '#42A5F5',
              data: confirmedData
            },
            {
              label: 'Recovered',
              backgroundColor: '#759116',
              data: recoveredData
            },
            {
              label: 'Deceased',
              backgroundColor: '#bf1029',
              data: deceasedData
            }
          ]
        };
      }

    })


    // this.sharedService.sharedStates$.subscribe(data => {
    //   // Handle the data from the Shared API response
    //   this.states = data
    // });

    this.sharedService.sharedNewStates$.subscribe(data => {
      // Handle the data from the API response
      this.newStates = data
      if (this.newStates && this.stateDataArr.length) {
        this.formGroup.patchValue({
          selectedState: this.stateDataArr[0]?.id
        })
      }
    });
  }

  onSelectState(event: any): void {
    // Handle the selected state here
    const selectedValue = event.value;
    let districtLabel: Array<String> = [];
    let confirmedData: Array<String> = [];
    let deceasedData: Array<String> = [];
    let recoveredData: Array<String> = [];
    let stateLabelArray: Array<String> = []
    let stateNumberArray: Array<any> = []

    this.stateDataArr.filter((ele) => {
      if (ele.id === selectedValue) {
        const stateTotalArray = Object.entries(ele.value.total).map(([key, value]) => ({ id: key, value }));
        stateTotalArray.filter((stateEle : any) => {
          if (stateEle.id !== "vaccinated1" && stateEle.id !== "vaccinated2" && stateEle.id !== "other") {
            stateLabelArray.push(stateEle.id.toUpperCase())
            stateNumberArray.push(stateEle.value)
          }
        })
        this.donutData = {
          labels: stateLabelArray,
          datasets: [
            {
              data: stateNumberArray,
              backgroundColor: [
                "#FF6384",
                "#bf1029",
                "#759116",
                "#FFCE56",
              ],
              hoverBackgroundColor: [
                "#FF6384",
                "#bf1029",
                "759116",
                "#FFCE56",
              ]
            }
          ]
        };
        const districtsArray = Object.entries(ele.value.districts).map(([key, value]) => ({ id: key, value }));
        districtsArray.filter((ele) => {
          districtLabel.push(ele.id.toUpperCase())
          if (typeof ele === 'object' && ele !== null && 'value' in ele) {
            const value = (ele as any).value;
            confirmedData.push(value.total.confirmed)
            deceasedData.push(value.total.deceased)
            recoveredData.push(value.total.recovered)
          }
        })
        this.basicData = {
          labels: districtLabel,
          datasets: [
            {
              label: 'Confirmed',
              backgroundColor: '#42A5F5',
              data: confirmedData
            },
            {
              label: 'Recovered',
              backgroundColor: '#759116',
              data: recoveredData
            },
            {
              label: 'Deceased',
              backgroundColor: '#bf1029',
              data: deceasedData
            }
          ]
        };
      }
    })
  }
}
