class Car {
  static list = [];

  static init(cars) {
    this.list = cars.map((i) => new this(i));
  }

  constructor({
    id,
    plate,
    manufacture,
    model,
    image,
    rentPerDay,
    capacity,
    description,
    transmission,
    available,
    type,
    year,
    options,
    specs,
    availableAt,
  }) {
    this.id = id;
    this.plate = plate;
    this.manufacture = manufacture;
    this.model = model;
    this.image = image;
    this.rentPerDay = rentPerDay;
    this.capacity = capacity;
    this.description = description;
    this.transmission = transmission;
    this.available = available;
    this.type = type;
    this.year = year;
    this.options = options;
    this.specs = specs;
    this.availableAt = availableAt;
  }



  render() {

    return `
    <div class="car-container">
      <img class="car-image" src="${this.image}" alt="${this.manufacture}">
      <p class="car-name"><b>Nama/Tipe Mobil</b></p>
      <p><b>Rp ${this.rentPerDay} / hari</b></p>
      <p>Manufacture: <b>${this.description}</b></p>
      <p><b>${this.capacity} Orang</b></p>
      <p><b>${this.transmission}</b></p>
      <p><b>Tahun ${this.year}</b></p>
      <button>Pilih mobil</button>
    </div>
  `;
  }
}
