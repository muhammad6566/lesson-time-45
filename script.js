const products = {
    plainBurger: {
        name: 'Gamburger',
        price: 10000,
        kcall: 400,
        amount: 0,
        get Summ() {
            return this.price * this.amount
        },
        get Kcall() {
            return this.kcall * this.amount
        },
    },
    freshBurger: {
        name: 'Gamburger Fresh',
        price: 20500,
        kcall: 700,
        amount: 0,
        get Summ() {
            return this.price * this.amount
        },
        get Kcall() {
            return this.kcall * this.amount
        },
    },
    freshCombo: {
        name: 'Fresh Combo',
        price: 31900,
        kcall: 900,
        amount: 0,
        get Summ() {
            return this.price * this.amount
        },
        get Kcall() {
            return this.kcall * this.amount
        },
    },
}

const btnPlusOrMinus = document.querySelectorAll('.main__product-btn'),
    addCart = document.querySelector('.addCart'),
    receipt = document.querySelector('.receipt'),
    receipt__window = document.querySelector('.receipt__window'),
    receipt__window_out = document.querySelector('.receipt__window-out'),
    receipt__window_btn = document.querySelector('.receipt__window-btn');
for (let i = 0; i < btnPlusOrMinus.length; i++) {
    const el = btnPlusOrMinus[i];
    el.addEventListener('click', function (e) {
        plusOrMinus(this)
    })
}

function plusOrMinus(element) {
    const parent = element.closest('.main__product'),/* closest() elementni o'rab turgan elementi topadi */
        parentId = parent.getAttribute('id'),
        out = parent.querySelector('.main__product-num'),
        price = parent.querySelector('.main__product-price span'),
        kcall = parent.querySelector('.main__product-kcall span'),
        elData = element.getAttribute('data-symbol');
    if (elData == '+' && products[parentId].amount < 10) {
        products[parentId].amount++
    } else if (elData == '-' && products[parentId].amount > 0) {
        products[parentId].amount--
    }
    out.innerHTML = products[parentId].amount
    price.innerHTML = products[parentId].Summ
    kcall.innerHTML = products[parentId].Kcall
}
let arrayProduct = [],
    totalName = '',
    totalPrice = 0,
    totalKcall = 0;
    
    addCart.addEventListener('click' , function (e) {
        e.preventDefault()
        for (const key in products) {
            const po = products[key]
            if (po.amount > 0 ) {
                arrayProduct.push(po)
            }
            po.price = po.Summ
            po.kcall = po.Kcall
            
        }
        for (let i = 0; i < arrayProduct.length; i++) {
            const el = arrayProduct[i];
            totalPrice += el.price
            totalKcall += el.kcall
            totalName += '\n' + el.name + '\n'
        }
        console.log(totalPrice,totalKcall,totalName);
        
        receipt__window_out.innerHTML = `Buyurtma: \n ${totalName} \n Kaloriya: ${totalKcall} \n Umumiy summa: ${totalPrice} so'm`;
        receipt.style.display = 'flex'
        setTimeout(() => {
            receipt.style.opacity = '1'
        }, 100);
        setTimeout(() => {
            receipt__window.style.top = '30%'
        }, 200);
        document.body.style.overflow = 'hidden';
        const outAmount = document.querySelectorAll('.main__product-num');
        const outPrice = document.querySelectorAll('.main__product-price span');
        const outKcall = document.querySelectorAll('.main__product-kcall span');
        for (let i = 0; i < outAmount.length; i++) {
            outAmount[i].innerHTML = 0
            outPrice[i].innerHTML = 0
            outKcall[i].innerHTML = 0
        }
    })

    receipt__window_btn.addEventListener('click' , function () {
        location.reload()
    })

    let timer =document.querySelector('.header__timer-extra');
    let interval;
    function doSomeMagic(){
        if(timer.innerHTML < 100){
            timer.innerHTML++;
            interval = setTimeout(doSomeMagic,50);
        }
        else clearInterval(interval);
    }
      doSomeMagic();