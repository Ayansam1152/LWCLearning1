import { LightningElement } from 'lwc';

export default class HelloWorld extends LightningElement {
    // here we will design our components
    // fName = 'Vijay';
    // lName = 'Pal'

    employee = {
        fName: 'Vijay',
        lName: 'Pal',
        Age:26,
        City: 'Delhi'
    }

    get getEmployeeRank(){
        const rank = this.employee.Age > 50 ? "One":this.employee.Age > 30 ? "Two":"Three";
        return rank;
    }
}