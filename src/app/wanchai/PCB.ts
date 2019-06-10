export interface new_PCB {
  process_Id: Number;
  status: "New" ;
  arrival_Time: Number;
  execue_Time: Number;
  io_Time: Number;
  waitting_time: Number;

}

export class PCB {
  private Pcb = [];

  constructor() {}

  public pushPCB(data: new_PCB): void {
    this.Pcb.push(data);
  }


  public setReady(index: number): void {
    this.Pcb[index].status = "Ready";
  }

  private setRunning(index: number): void {
    this.Pcb[index].status = "Running";
  }
  public setExecuetime(index: number): void {
    this.setRunning(index);
    this.Pcb[index].execue_Time += 1;

  }
  public setIOtime(index: number): void {
    this.Pcb[index].io_Time += 1;
  }

  public setWaittingTime(index: number): void {
    this.Pcb[index].io_Time += 1;
    this.Pcb[index].status = "Waitting";
  }

  public setWaitting(index: number): void {
    this.Pcb[index].status = "Waitting";
  }

  public setTerminate(index: number): void {
    this.Pcb[index].status = "Terminate";
  }

  get getPCB(): any {
    return this.Pcb;
  }
}
