class Burgers {
    constructor(name, meat, size) {                 
        this.name = name;
        this.meat = meat;
        this.size = size;
    }

    displayOrder() {                        //* this will display input to the user when enter
        return `Your Order:\n${this.orderNumber}) a ${this.size} ${this.meat} ${this.name}.`;
    }

    price() {                               //* conditional to calculate price dependig on user input
        let standard = 7.99;
        let double = 9.99; 
        let extra = 1.99;

        if (this.size !== "double") {
            return standard;

        } else if (this.meat == 'chicken' && this.size == "double") {
            return double;

        } else {
            return double + extra;
        }
    }
}

class Orders {                              //*  this class will store input values from user and serve as an option menu
    constructor() {
        this.ordersArray = [];
    }

    addOrder(order) {                       //*give user the ability to add more orders and store them in array
        this.ordersArray.push(order);
    }

    viewAllOrders() {                       //*return user all input orders 
        return this.ordersArray;
    }

    deleteOrder(orderNumber) {
        const index = this.ordersArray.findIndex(order => order.orderNumber === orderNumber);  //* find the index of the order with the given order number
        if (index !== -1) {  //* if the order exists in the orders array
          this.ordersArray.splice(index, 1);  //* remove the order from the orders array
          return true;  //* return true to indicate that the order was deleted successfully
        }
        return false;  //* return false to indicate that the order was not found in the orders array
      }

}

class OrderReceipt extends Burgers {                     //* child of Burger class adding one more parameter
    constructor(name, meat, size, orderNumber) {
        super(name, meat, size);
        this.orderNumber = orderNumber;
    }

    printOrder() {  

        //*create variable to hold value                              
        let totalprice = 0;
        let keepOrdering = true;
        let orderNumber = 0;
        
        const orders = new Orders();        //* variable order will create new instance of class Orders

        while (keepOrdering) {    //* conditional to make app react to user's selection
            orderNumber++;    
            let order = new OrderReceipt(prompt('Enter name of burger: '), prompt('Enter type of meat: (steak or chicken) '), prompt('You want this double or single burger: '), orderNumber);  //* letting user input arguments to new instance of OrderReceipt   
            alert(`Your receipt\n${order.displayOrder()} Total is: $${order.price().toFixed(2)}`);  //* alert user cost of order.  using method toFixed to keep decimals not go over 2
            orders.addOrder(order);
            totalprice += order.price();                                                //* since order creates a new instance of OrderReceipt which is a child of Burger, we can call method price() storing the value in totalPrice var
            let moreOrder = prompt(`Do you want to add another order? (y/n)`);          //* allow user to add more orders
            if(moreOrder != 'y') {                                                     //* conditional to react according to user's selection
                keepOrdering = false;       
                let checkOrders = prompt(`want to see your order? (y/n)`);              //* allow user to see all order of instance
                if(checkOrders == 'y'){                                                 //* conditional to react according to user's selection
                    let allOrders = orders.viewAllOrders();                     
                    let orderList = '';                                                 //* stores 
                    allOrders.forEach(order => {                                        //* forEach loop to apply "displayOrder" method to each value on variable "allOrder" 
                        orderList += `${order.displayOrder()}\n`;
                    });
                    alert(`All orders:\n${orderList}`);                                 //* display ordersArray in a new format
                    orderNumber = prompt('Do you want to remove an order? (y/n)')
                    if (orderNumber == 'y') {
                        let index = prompt('Enter order number:');
                        let deleted = orders.deleteOrder(index);                        //* not sure why always index is not found, there might be an error 
                        if (deleted) {
                          alert(`Order ${index} was successfully deleted.`);
                        } else {
                          alert(`Order ${index} was not found.`);
                        }
                      }
                      
                    alert(`Your total price is: $${totalprice.toFixed(2)}`);            //* display total amount with no more than 2 decimals
                }else{
                    alert(`Your total price is: $${totalprice.toFixed(2)}`);            //* if user select 'n' will dis[lay total amount with no more than 2 decimals
                }
            }

        }
    }
}

let orderReceipt = new OrderReceipt();                                                  //* creating a new instance
orderReceipt.printOrder();                                                              //* to start the app in browser
