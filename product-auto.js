var products = {};

var sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

var leftbtn = document.querySelector('div._aaqf._aaqh button');
var prod=0
while (document.querySelector('div._aaqf._aaqh button')) {
    var h1 = document.querySelector('h1._ap3a._aaco._aacu._aacx._aad7._aade').innerText;

    products[prod] = {};
    products[prod].discription = h1;
    products[prod].images = {};
    document.querySelectorAll('div._aagu._aato div._aagv img').forEach(
        (el) => {
            products[prod].images[el.src] = "";
        }
    );

    if (products[prod].images[0] === null) {
       Reflect.deleteProperty(products, prod);
        prod++;
        continue;
    }

    console.log(products);

    const nextbtn = document.querySelector('button[aria-label="Next"]');
    while (document.querySelector('button[aria-label="Next"]')) {
    console.log(products);

        nextbtn.click();
        document.querySelectorAll('div._aagu._aato div._aagv img').forEach(
            (el) => {
                products[prod].images[el.src] = "";
            }
        );
        await sleep(2000); // Wait for the next image to load
    }

    products[prod].images = Object.keys(products[prod].images);
    prod++;
    document.querySelector('div._aaqf._aaqh button').click();
    await sleep(2000); // Wait for the next product to load
}