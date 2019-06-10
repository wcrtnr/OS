import { Component, OnInit } from '@angular/core';
import { PCB } from "./PCB";

@Component({
  selector: 'app-wanchai',
  templateUrl: './wanchai.component.html',
  styleUrls: ['./wanchai.component.scss']
})
export class WanchaiComponent implements OnInit {

  public pcb = new PCB(); // รับค่าจากคลาส PCB
  public time: number = 0; // เวลาที่เริ่มใช้ CPU
  public averageWaittingtime: number = 0; //เวลาที่ใช้ในการนับเวลารอในการใช้ CPU
  public Numprocess: any = null; // Process ID
  private Q1_process = [];

  public cdr = []; // IO_Queue
  public disk = [];
  public printer = [];

  private CDR: any = null; // นับเวลา I/O
  private Disk: any = null;
  private Printer: any = null;

  constructor() {

  }
  private initial(): void {
    this.Q1_process = [];

  }

  public ngOnInit(): void {
  }
  public addProcess(): void {
    this.pcb.pushPCB({
      process_Id: this.pcb.getPCB.length + 1,
      status: "New",
      arrival_Time: this.time,
      execue_Time: 0,
      io_Time: 0,
      waitting_time: 0,
    });
  }


  public start(): void {
    setInterval(() => {
      let countTerminate: number = 0;
      let countWaitting: number = 0;
      let countRuuning: number = 0;

      for (let i = 0; i < this.pcb.getPCB.length; i++) {

        if (this.pcb.getPCB[i].status == "New") {
          // เพิ่มค่าใน Queue 1 เฉพาะสถานะ New
          this.pcb.setReady(i);

        }
        if (this.pcb.getPCB[i].status == "Ready") {
          this.pcb.getPCB[i].waitting_time += 1;
          this.Q1_process.push({ process_Id: i + 1 });
        }

        if (this.pcb.getPCB[i].status == "Terminate") {
          countTerminate += 1;
          countWaitting += this.pcb.getPCB[i].waitting_time;
        }

      }

      this.pcb.setExecuetime(this.Q1_process[0].process_Id - 1);
      this.averageWaittingtime = countWaitting / countTerminate;
      this.time = this.time + 1;

    }, 1000)


  }

  public setTerminate(id: number): void {
    this.Numprocess = null;
    this.pcb.setTerminate(id-1);
    this.initial();
  }

  public clear() {
    setTimeout(() => {
      location.reload();
    }, 500);
  }



  public AddIO(process: any, type: "CD" | "DISK" | "PRINTER"): void {

    if (this.Q1_process[0]) {
      this.Q1_process.splice(0, 1);
      this.Q1_process[0];  // ลบ Process ใน Q1

    }
    this.Numprocess = null; // ล้างค่าการ Process ใน CPU
    this.pcb.setWaitting(process.process_Id - 1);
    if (type == "CD") {
      this.cdr.push({
        process_Id: process.process_Id,
        process: this.Q1_process,
        type: type,
        status: "Waitting"
      });
      if (this.CDR == null) {
        this.CDR = setInterval(() => {
          this.cdr[0].status = "Running";
          this.pcb.setWaittingTime(this.cdr[0].process_Id - 1);
          for (let j = 0; j < this.cdr.length; j++) {
            if (this.cdr[j].status == "Waitting") {
              this.pcb.getPCB[this.cdr[j].process_Id - 1];
            }
          }
        }, 1000);
      }
    } else if (type == "DISK") {
      this.disk.push({
        process_Id: process.process_Id,
        type: type,
        status: "Waitting"
      });
      if (this.Disk == null) {
        this.Disk = setInterval(() => {
          this.disk[0].status = "Running";
          this.pcb.setWaittingTime(this.disk[0].process_Id - 1);
          for (let j = 0; j < this.disk.length; j++) {
            if (this.disk[j].status == "Waitting") {
              this.pcb.getPCB[this.disk[j].process_Id - 1];
            }
          }
        }, 1000);
      }
    }
    else if (type == "PRINTER") {
      this.printer.push({
        process_Id: process.process_Id,
        type: type,
        status: "Waitting"
      });
      if (this.Printer == null) {
        this.Printer = setInterval(() => {
          this.printer[0].status = "Running";
          this.pcb.setWaittingTime(this.printer[0].process_Id - 1);
          for (let j = 0; j < this.printer.length; j++) {
            if (this.printer[j].status == "Waitting") {
              this.pcb.getPCB[this.printer[j].process_Id - 1];
            }
          }
        }, 1000);
      }
    }
  }

}
