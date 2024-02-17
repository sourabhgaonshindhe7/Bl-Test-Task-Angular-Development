import { Component, OnInit } from '@angular/core';
import { State } from 'src/app/shared/models/state.model';
import { tableModel } from 'src/app/shared/models/tableModel';
import { ApiService } from 'src/app/shared/services/api.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  dataSource: any;
  states: Map<String, String> = new Map();
  sharedata: any
  constructor(private sharedService: SharedService) { }
  ngOnInit() {
    this.getCovidData()
  }
  getCovidData() {
    let obj = {
      id: '',
      name: '',
      confirmed: 0,
      recoverd: 0,
      deseased: 0
    }
    let arr: Array<tableModel> = [];

    this.sharedService.sharedNewStates$.subscribe(data => {
      this.states = data

    });
    this.sharedService.sharedData$.subscribe(data => {
      if (data) {
        const arrayOfObjects = Object.entries(data).map(([key, value]) => ({ id: key, value }));
        this.sharedata = arrayOfObjects;
        if (this.sharedata) {
          this.sharedata.filter((ele: any) => {
            obj = {
              id: ele.id,
              name: '',
              confirmed: ele.value.total.confirmed,
              recoverd: ele.value.total.recovered,
              deseased: ele.value.total.deceased
            }
            arr.push(obj);
          })
        }
        if (arr.length) {
          this.dataSource = arr.map(stateObj => ({ ...stateObj, name: this.states.get(stateObj.id) }))
        }
      }
    })
  }
}
