class App {
  constructor() {
    this.clearButton = document.getElementById("clear-btn");
    this.loadButton = document.getElementById("load-btn");
    this.carContainerElement = document.getElementById("cars-container");
  }

  async init() {
    await this.load();

    // Register click listener
    this.clearButton.onclick = this.clear;
    this.loadButton.onclick = this.run;
  }

  run = () => {
    const selectedDriverType = document.getElementById("tipe").value;
    const selectedDate = document.getElementById("tanggal").value;
    const selectedTime = document.getElementById("waktu").value;
    const selectedPassengers = document.getElementById("jumlahPenumpang").value;

    console.log(selectedDate);


    const filterFunction = (car) => {
      console.log(car);
      console.log(selectedTime);
      console.log(new Date(Number(selectedTime)).getHours());
      console.log(new Date(car.availableAt).getHours());
      // if (selectedDriverType && car.type !== selectedDriverType) {
      //   return false;
      // }
      if (selectedDate && new Date(car.availableAt) < new Date(selectedDate)) {
        return false;
      }
      if (selectedTime && new Date(car.availableAt).getHours() !== new Date(Number(selectedTime)).getHours()) {
        return false;
      }
      if (selectedPassengers && car.capacity < parseInt(selectedPassengers)) {
        return false;
      }
      return true;
    };

    const filteredCars = Car.list.filter(filterFunction);

    this.clear();

    filteredCars.forEach((car) => {
      const node = document.createElement("div");
      node.innerHTML = car.render();
      this.carContainerElement.appendChild(node);
    });
  };


  async load() {
    const cars = await Binar.listCars();
    Car.init(cars);
  }

  clear = () => {
    let child = this.carContainerElement.firstElementChild;

    while (child) {
      child.remove();
      child = this.carContainerElement.firstElementChild;
    }
  };
}
