export class Products {
  async getProducts() {
    let result = await fetch("./js/products.json");
    let data = await result.json();
    let products = data.items;
    products = products.map((item) => {
      const { title, price } = item.fields;
      const { id } = item.sys;
      const image = item.fields.image.fields.file.url;
      return { title, price, id, image };
    });
    return products;
  }
}
